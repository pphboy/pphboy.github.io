import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { deploy } from './deploy.mjs'

function git(cwd, ...args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function write(root, name, contents) {
  const path = join(root, name)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, contents)
}

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'piwork-deploy-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const repository = join(root, 'remote.git')
  const seed = join(root, 'seed')
  const source = join(root, 'dist')
  git(root, 'init', '--bare', '--initial-branch=gh-pages', repository)
  git(root, 'init', '--initial-branch=gh-pages', seed)
  git(seed, 'config', 'user.name', 'Website test')
  git(seed, 'config', 'user.email', 'website@example.invalid')
  for (const [name, body] of Object.entries({
    'index.html': 'existing blog',
    'archives/index.html': 'existing archive',
    'assets/root.sh': 'root executable',
    CNAME: 'example.invalid',
    '.nojekyll': '',
    'piwork/index.html': 'old product',
    'piwork/obsolete.js': 'obsolete product asset'
  })) write(seed, name, body)
  chmodSync(join(seed, 'assets/root.sh'), 0o755)
  git(seed, 'add', '--all')
  git(seed, 'commit', '-m', 'Seed existing sites')
  git(seed, 'remote', 'add', 'origin', repository)
  git(seed, 'push', 'origin', 'gh-pages')
  write(source, 'index.html', 'new product')
  write(source, 'assets/app.js', 'new asset')
  return { root, repository, seed, source }
}

function rootTree(repository) {
  return git(repository, 'ls-tree', '-r', 'gh-pages').split('\n').filter(line => !line.split('\t')[1]?.startsWith('piwork/')).join('\n')
}

test('product publication replaces only its subtree and is idempotent', t => {
  const f = fixture(t)
  const before = rootTree(f.repository)
  const commit = deploy({ scope: 'piwork', source: f.source, repository: f.repository })
  assert.equal(rootTree(f.repository), before)
  assert.equal(git(f.repository, 'show', 'gh-pages:piwork/index.html'), 'new product')
  assert.equal(git(f.repository, 'show', 'gh-pages:piwork/assets/app.js'), 'new asset')
  assert.equal(git(f.repository, 'ls-tree', 'gh-pages', 'piwork/obsolete.js'), '')
  assert.equal(deploy({ scope: 'piwork', source: f.source, repository: f.repository }), commit)
})

test('blog publication retains product and hosting controls while removing stale blog files', t => {
  const f = fixture(t)
  const product = git(f.repository, 'rev-parse', 'gh-pages:piwork')
  write(f.source, 'index.html', 'new blog')
  write(f.source, 'piwork/index.html', 'must not overwrite product')
  write(f.source, 'CNAME', 'must not overwrite custom domain')
  deploy({ scope: 'blog', source: f.source, repository: f.repository })
  assert.equal(git(f.repository, 'rev-parse', 'gh-pages:piwork'), product)
  assert.equal(git(f.repository, 'show', 'gh-pages:CNAME'), 'example.invalid')
  assert.match(git(f.repository, 'ls-tree', 'gh-pages', '.nojekyll'), /\.nojekyll$/)
  assert.equal(git(f.repository, 'show', 'gh-pages:index.html'), 'new blog')
  assert.equal(git(f.repository, 'ls-tree', 'gh-pages', 'archives/index.html'), '')
})

test('invalid scope or missing build fails before changing the remote', t => {
  const f = fixture(t)
  const before = git(f.repository, 'rev-parse', 'gh-pages')
  assert.throws(() => deploy({ scope: 'root', source: f.source, repository: f.repository }), /scope/)
  assert.throws(() => deploy({ scope: 'piwork', source: f.source, repository: f.repository, branch: 'main' }), /gh-pages/)
  rmSync(join(f.source, 'index.html'))
  assert.throws(() => deploy({ scope: 'piwork', source: f.source, repository: f.repository }), /Build the site first/)
  assert.equal(git(f.repository, 'rev-parse', 'gh-pages'), before)
})

test('a competing blog commit is retained after a rejected product push', t => {
  const f = fixture(t)
  const checkout = join(f.root, 'pages')
  const racer = join(f.root, 'racer')
  git(f.root, 'clone', '--branch=gh-pages', f.repository, checkout)
  git(f.root, 'clone', '--branch=gh-pages', f.repository, racer)
  git(racer, 'config', 'user.name', 'Concurrent publisher')
  git(racer, 'config', 'user.email', 'racer@example.invalid')
  write(racer, 'index.html', 'concurrent blog update')
  git(racer, 'add', '--all')
  git(racer, 'commit', '-m', 'Concurrent blog update')
  // A real Git hook advances the remote after push's ref advertisement.
  const hook = join(checkout, '.git/hooks/pre-push')
  writeFileSync(hook, `#!/bin/sh\nset -eu\nif test ! -e '${f.root}/raced'; then\n  touch '${f.root}/raced'\n  git -C '${racer}' push origin gh-pages\nfi\n`)
  chmodSync(hook, 0o755)
  deploy({ scope: 'piwork', source: f.source, checkout })
  assert.ok(existsSync(join(f.root, 'raced')))
  assert.equal(git(f.repository, 'show', 'gh-pages:index.html'), 'concurrent blog update')
  assert.equal(git(f.repository, 'show', 'gh-pages:piwork/index.html'), 'new product')
  assert.equal(git(f.repository, 'rev-list', '--count', 'gh-pages'), '3')
})

test('an existing dirty or wrong-branch checkout is refused', t => {
  const f = fixture(t)
  const checkout = join(f.root, 'pages')
  git(f.root, 'clone', '--branch=gh-pages', f.repository, checkout)
  write(checkout, 'index.html', 'uncommitted work')
  assert.throws(() => deploy({ scope: 'piwork', source: f.source, checkout }), /must be clean/)
  assert.equal(readFileSync(join(checkout, 'index.html'), 'utf8'), 'uncommitted work')
  git(checkout, 'reset', '--hard', 'HEAD')
  git(checkout, 'switch', '-c', 'main')
  assert.throws(() => deploy({ scope: 'piwork', source: f.source, checkout }), /must be on gh-pages/)
})
