export const normalizeSearch = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase().trim()
const words = value => normalizeSearch(value).split(/[\s,#，]+/u).filter(Boolean)
const textOf = value => typeof value === 'string' ? value : Object.values(value ?? {}).flatMap(textOf).join(' ')

export function filterDemos(catalog, { query = '', category = 'all', tags = [] } = {}) {
  const terms = words(query)
  return catalog.demos.filter(demo => {
    if (category !== 'all' && demo.category !== category) return false
    if (!tags.every(tag => demo.tags.includes(tag))) return false
    const categoryData = catalog.categories.find(item => item.id === demo.category)
    const tagData = catalog.tags.filter(item => demo.tags.includes(item.id))
    const haystack = normalizeSearch([demo.id, textOf(demo.title), textOf(demo.subtitle), textOf(demo.description), textOf(demo.features), textOf(categoryData), textOf(tagData)].join(' '))
    return terms.every(term => haystack.includes(term))
  })
}

export function relatedDemos(catalog, id, limit = 3) {
  const current = catalog.demos.find(demo => demo.id === id)
  if (!current) return []
  return catalog.demos.filter(demo => demo.id !== id)
    .map(demo => ({ demo, score: (demo.category === current.category ? 4 : 0) + demo.tags.filter(tag => current.tags.includes(tag)).length }))
    .filter(item => item.score > 0).sort((a, b) => b.score - a.score)
    .slice(0, limit).map(item => item.demo)
}
