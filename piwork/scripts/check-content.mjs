import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = path => readFileSync(resolve(root, path), 'utf8')
const release = JSON.parse(read('docs/.vitepress/theme/download-release.json'))
const repository = 'https://github.com/pphboy/piwork-microvm'
assert.match(release.version, /^\d+\.\d+\.\d+$/)
assert.match(release.piworkVersion, /^\d+\.\d+\.\d+$/)
assert.equal(release.releaseUrl, `${repository}/releases/tag/v${release.version}`)
assert.equal(release.checksumsUrl, `${repository}/releases/download/v${release.version}/SHA256SUMS`)
assert.deepEqual(release.platforms.map(p => p.id).sort(), ['linux', 'windows'])
for (const platform of release.platforms) {
  const extension = platform.id === 'windows' ? '.exe' : ''
  assert.equal(platform.architecture, 'x86-64')
  assert.equal(platform.file, `piwork-microvm-gui-v${release.version}-${platform.id}-amd64${extension}`, 'The download must be the matching GUI, not a CLI or checksum file')
  assert.match(platform.sha256, /^[a-f0-9]{64}$/)
  assert(Number.isSafeInteger(platform.sizeBytes) && platform.sizeBytes > 0)
}

const files = ['docs/.vitepress/theme/HomeStory.vue']
for (const prefix of ['', 'zh/']) {
  for (const name of ['index.md', 'guide/downloads.md', 'guide/quick-start.md', 'guide/first-work.md', 'guide/index.md']) {
    const file = `docs/${prefix}${name}`
    files.push(file)
    const text = read(file)
    assert(!/docker (?:run|pull|compose)|\breleases\/latest\b|5 (?:minutes|分钟)|5 分钟/.test(text), `${file}: the public onboarding must stay on the one-click path`)
  }
}
const images = new Set()
for (const file of files) {
  for (const [, path] of read(file).matchAll(/src="(\/screenshots\/[^"\s]+)"/g)) {
    assert(existsSync(resolve(root, `docs/public${path}`)), `${file}: missing screenshot ${path}`)
    const bytes = readFileSync(resolve(root, `docs/public${path}`))
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${path}: expected a real PNG asset`)
    images.add(path)
  }
}
assert(images.size >= 6, 'The story and setup need their product screenshots')
console.log(`Website content verified: two GUI downloads, two locales, ${images.size} product screenshots.`)
