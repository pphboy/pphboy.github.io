import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { filterDemos, relatedDemos } from '../docs/.vitepress/theme/demo-search.mjs'
const catalog = JSON.parse(readFileSync(new URL('../docs/.vitepress/theme/demo-catalog.json', import.meta.url)))
const ids = filters => filterDemos(catalog, filters).map(item => item.id)
test('find demos by Chinese or English names', () => {
  assert.deepEqual(ids({ query: '视频策划' }), ['video-planner'])
  assert.deepEqual(ids({ query: 'VIDEO PLANNER' }), ['video-planner'])
  assert.deepEqual(ids({ query: '看板' }), ['kanban'])
  assert.deepEqual(ids({ query: 'reference images' }), ['video-planner'])
})
test('search tag names and aliases, including hashtags', () => {
  assert.deepEqual(ids({ query: '#Gantt' }), ['kanban'])
  assert.deepEqual(ids({ query: '甘特图' }), ['kanban'])
  assert.deepEqual(ids({ query: 'storyboard' }), ['video-planner'])
  assert.deepEqual(ids({ query: '#AI' }), ['video-planner', 'kanban'])
})
test('categories and tags combine without broadening results', () => {
  assert.deepEqual(ids({ category: 'content', tags: ['ai'] }), ['video-planner'])
  assert.deepEqual(ids({ tags: ['ai', 'timeline'] }), ['kanban'])
  assert.deepEqual(ids({ category: 'content', tags: ['timeline'] }), [])
})
test('all query terms must match, and punctuation is safe', () => {
  assert.deepEqual(ids({ query: 'AI gantt' }), ['kanban'])
  assert.deepEqual(ids({ query: 'storyboard gantt' }), [])
  assert.deepEqual(ids({ query: '<script>alert(1)</script>' }), [])
  assert.deepEqual(ids({ query: '   ' }), ['video-planner', 'kanban'])
})
test('related demos share actual tags and never include themselves', () => {
  assert.deepEqual(relatedDemos(catalog, 'video-planner').map(x => x.id), ['kanban'])
  assert.deepEqual(relatedDemos(catalog, 'kanban').map(x => x.id), ['video-planner'])
  assert.deepEqual(relatedDemos(catalog, 'missing'), [])
})
