import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(readFileSync(resolve(root, 'docs/.vitepress/theme/demo-downloads.json'), 'utf8'))
assert.equal(data.releaseTag, 'piwork-demos-2026-11-01')
assert.equal(data.releaseUrl, `https://github.com/pphboy/pphboy.github.io/releases/tag/${data.releaseTag}`)
const catalog = JSON.parse(readFileSync(resolve(root, 'docs/.vitepress/theme/demo-catalog.json'), 'utf8'))
assert.deepEqual(catalog.demos.map(d => d.id).sort(), data.demos.map(d => d.id).sort())
for (const demo of catalog.demos) {
  assert(catalog.categories.some(category => category.id === demo.category))
  assert(demo.tags.length && demo.tags.every(id => catalog.tags.some(tag => tag.id === id)))
  for (const locale of ['zh', 'en']) {
    assert(demo.title[locale] && demo.description[locale])
    const cover = readFileSync(resolve(root, `docs/public/demos/${demo.id}/${locale}/cover_${locale}.png`))
    assert.equal(cover.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
    assert.equal(cover.readUInt32BE(16), 1440)
    assert.equal(cover.readUInt32BE(20), 900)
    assert(existsSync(resolve(root, `docs/${locale === 'zh' ? 'zh/' : ''}demos/${demo.id}.md`)))
  }
}
const shots = {
  'video-planner': ['01_projects', '02_storyboard', '03_overview', '04_focus', '05_workbench_chat'],
  kanban: ['01_board', '02_project', '03_task_details', '04_timeline', '05_labels']
}
assert.deepEqual(data.demos.map(d => d.id).sort(), Object.keys(shots).sort())
for (const demo of data.demos) for (const locale of ['zh', 'en']) {
  const pkg = demo[locale]
  assert.equal(pkg.file, `${demo.fileStem}_${locale}.work.zip`)
  assert(Number.isSafeInteger(pkg.bytes) && pkg.bytes > 0)
  assert.match(pkg.sha256, /^[a-f\d]{64}$/)
  assert.match(pkg.workSha256, /^[a-f\d]{64}$/)
  assert.equal(pkg.workFile, `${demo.fileStem}_${locale}.work`)
  if (locale === 'en') assert.equal(pkg.url, `https://github.com/pphboy/pphboy.github.io/releases/download/${data.releaseTag}/${pkg.file}`)
  if (locale === 'zh' && pkg.url) {
    const url = new URL(pkg.url)
    assert.equal(url.protocol, 'https:')
    assert(!url.username && !url.password)
    assert(!url.hostname.includes('webdav'), 'Publish a public share URL, never the authenticated WebDAV endpoint')
  }
  for (const file of shots[demo.id]) {
    const path = resolve(root, `docs/public/demos/${demo.id}/${locale}/${file}_${locale}.png`)
    assert(existsSync(path), path)
    const png = readFileSync(path)
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
    assert.equal(png.readUInt32BE(16), 1920)
    assert.equal(png.readUInt32BE(20), 1080)
  }
}
for (const locale of ['', 'zh/']) assert(existsSync(resolve(root, `docs/${locale}demos/index.md`)))
console.log('Demos verified: two Works, two language-specific sources, four application covers, four detail pages and twenty full-workbench screenshots.')
