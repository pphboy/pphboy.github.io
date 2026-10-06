# Work Specification

## Current behavior

A Work owns its configuration, private conversation history, shared workspace, Service definitions, and captured execution context. Core controls lifecycle and isolation.

Export requires a **stopped Work**. Import validates the archive and target requirements, then publishes a new **stopped Work**. It assigns new Work, Service, volume, network, certificate, and control identities. The recipient starts it explicitly.

Changing desired configuration does not immediately replace active context. Pending settings require an explicit Apply. Import preserves active and desired configuration without silently applying pending changes.

## Current format: `.work` v1

The MIME type is `application/vnd.piwork.work-package`. The snapshot kind is `cold-full`.

| Bytes | Meaning |
| --- | --- |
| Eight bytes `PIWORK1\n` | Format magic. |
| Unsigned 64-bit big-endian integer | UTF-8 JSON manifest length. |
| Manifest JSON | Strict format/version, compatibility, references, and blob metadata. |
| Ordered raw blobs | Each blob's declared byte length and SHA-256 digest. |

There are no blob headers, compression, or trailing bytes. Core creates the manifest; users do not hand-author it. The archive includes fixed image content by immutable digest.

Included durable content covers the `agent-private` and `workspace` volume trees, Work-owned contexts, `AGENTS.md`, Skills, prepared Pi Package artifacts, Service/configuration revisions, and retained history. Logical references are remapped on import; original user files and SDK history bytes are retained.

## Portability boundaries

- Live processes, temporary container layers, anonymous volumes, tmpfs, and external services are excluded.
- Platform model API keys, user tokens, installation certificates, and global catalogs are excluded.
- User secrets in files and history are included because user content is not filtered.
- Target Core must have an enabled matching model, readable credentials, compatible platform/images, and enough quota.
- Offline inspection checks integrity and structure; it does not prove recipient compatibility or trust in embedded code.

V1 is Linux and protocol/layout specific. Current limits include 100 GiB package bytes, 100 GiB logical restore size, and one million tree entries. Unsupported special files, user xattrs, ACLs, or capabilities fail export. The host-assigned `security.selinux` label is excluded, and restore uses the target host's label.

## Experimental and future direction

The current portable format is version 1; it is not a generic host backup or cross-platform process checkpoint. Broader portability is future direction, not part of this format's guarantees.

For the complete strict manifest, tree encoding, history validation, and limits, use the authoritative [Work package format](https://github.com/pphboy/piwork/blob/main/docs/work-package-format.md), [portable-work spec](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md), and [snapshot guide](https://github.com/pphboy/piwork/blob/main/docs/work-snapshot.md).
