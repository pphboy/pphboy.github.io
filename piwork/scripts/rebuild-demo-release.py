#!/usr/bin/env python3
"""Reassemble approved Work exports from demo data and digest-pinned public layers."""
import argparse
import concurrent.futures
import gzip
import hashlib
import io
import json
from pathlib import Path
import re
import shutil
import tarfile
import urllib.parse
import urllib.request
import zipfile


def sha(path):
    with path.open('rb') as source:
        return hashlib.file_digest(source, 'sha256').hexdigest()


def read_json(url, headers=None):
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers or {}), timeout=120) as response:
        return json.load(response)


def download_layer(cache, repo, token, layer):
    digest = layer['diffId'].removeprefix('sha256:')
    target = cache / digest
    if target.exists():
        return
    url = f'https://registry-1.docker.io/v2/{repo}/blobs/{layer["digest"]}'
    request = urllib.request.Request(url, headers={'Authorization': f'Bearer {token}'})
    part = target.with_suffix('.part')
    with urllib.request.urlopen(request, timeout=180) as response:
        if 'gzip' not in layer['mediaType']:
            raise RuntimeError('Expected a gzip-compressed public OCI layer')
        with gzip.GzipFile(fileobj=response) as source, part.open('wb') as output:
            shutil.copyfileobj(source, output, 1024 * 1024)
    if sha(part) != digest:
        part.unlink(missing_ok=True)
        raise RuntimeError('Public layer digest mismatch')
    part.replace(target)
    print('Verified public layer', digest[:16], flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--seeds', type=Path, required=True)
    parser.add_argument('--cache', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    args.cache.mkdir(parents=True, exist_ok=True)
    args.output.mkdir(parents=True, exist_ok=True)
    specs = json.loads((args.seeds / 'release-files.json').read_text())
    images = json.loads((args.seeds / 'public-images.json').read_text())
    seed_data = {}
    needed = set()
    configs = {image['configDigest'].split(':')[1] for image in images}
    for spec in specs:
        small = {}
        with tarfile.open(args.seeds / spec['seed'], 'r:gz') as archive:
            for entry in archive:
                if not entry.isfile() or not re.fullmatch(r'prefix\.bin|blobs/[a-f0-9]{64}', entry.name):
                    raise RuntimeError('Unexpected seed entry')
                small[entry.name] = archive.extractfile(entry).read()
        prefix = small['prefix.bin']
        if prefix[:8] != b'PIWORK1\n' or int.from_bytes(prefix[8:16], 'big') != len(prefix)-16:
            raise RuntimeError('Invalid native Work prefix')
        manifest = json.loads(prefix[16:])
        if not all(image['config'] in configs for image in manifest['images']):
            raise RuntimeError('Work references an unapproved image')
        for blob in manifest['blobs']:
            if 'blobs/' + blob['digest'] not in small:
                if 'image-layer' not in blob['kinds']:
                    raise RuntimeError('Missing private demo data')
                needed.add(blob['digest'])
        seed_data[spec['workFile']] = (small, manifest)
    indexed = {}
    for image in images:
        for layer in image['layers']:
            indexed.setdefault(layer['diffId'].split(':')[1], (image['repository'], layer))
    if not needed <= indexed.keys():
        raise RuntimeError('A required image layer is not public')
    jobs = []
    tokens = {}
    for digest in needed:
        if (args.cache / digest).exists():
            continue
        repo, layer = indexed[digest]
        if repo not in tokens:
            query = urllib.parse.urlencode({'service': 'registry.docker.io', 'scope': f'repository:{repo}:pull'})
            tokens[repo] = read_json('https://auth.docker.io/token?' + query)['token']
        jobs.append((repo, tokens[repo], layer))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(lambda job: download_layer(args.cache, *job), jobs))
    results = []
    for spec in specs:
        small, manifest = seed_data[spec['workFile']]
        target = args.output / spec['workFile']
        overall = hashlib.sha256()
        with target.open('wb') as output:
            output.write(small['prefix.bin']); overall.update(small['prefix.bin'])
            for blob in manifest['blobs']:
                data = small.get('blobs/' + blob['digest'])
                source = io.BytesIO(data) if data is not None else (args.cache / blob['digest']).open('rb')
                size, digest = 0, hashlib.sha256()
                with source:
                    while chunk := source.read(1024 * 1024):
                        output.write(chunk); overall.update(chunk); digest.update(chunk); size += len(chunk)
                if size != blob['size'] or digest.hexdigest() != blob['digest']:
                    raise RuntimeError('Blob did not match original Work')
        if target.stat().st_size != spec['workBytes'] or overall.hexdigest() != spec['workSha256']:
            raise RuntimeError('Rebuilt Work does not match the approved export')
        (args.output / (target.name + '.sha256')).write_text(spec['workSha256'] + '  ' + target.name + '\n')
        archive = args.output / spec['file']
        with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=1, allowZip64=True) as zipped:
            for entry in spec['archiveEntries']:
                info = zipfile.ZipInfo(entry['filename'], tuple(entry['date_time']))
                for key in ['compress_type', 'create_system', 'create_version', 'extract_version', 'external_attr', 'internal_attr']:
                    setattr(info, key, entry[key])
                info._compresslevel = 1
                if entry['filename'] == target.name:
                    info.file_size = target.stat().st_size
                    with target.open('rb') as source, zipped.open(info, 'w') as output:
                        shutil.copyfileobj(source, output, 1024 * 1024)
                else:
                    zipped.writestr(info, entry['text'].encode(), compresslevel=1)
        with zipfile.ZipFile(archive) as zipped, zipped.open(target.name) as source:
            if hashlib.file_digest(source, 'sha256').hexdigest() != spec['workSha256']:
                raise RuntimeError('Archive does not contain the approved Work')
        digest = sha(archive)
        (args.output / (archive.name + '.sha256')).write_text(digest + '  ' + archive.name + '\n')
        results.append({**{key: spec[key] for key in ['demo','locale','file','workFile','workBytes','workSha256']}, 'bytes': archive.stat().st_size, 'sha256': digest, 'archiveMatchesLocal': digest == spec['sha256']})
        print('Native Work and ZIP verified:', target.name, 'ZIP matches local:', digest == spec['sha256'], flush=True)
    (args.output / 'release-result.json').write_text(json.dumps(results, indent=2) + '\n')


if __name__ == '__main__':
    main()
