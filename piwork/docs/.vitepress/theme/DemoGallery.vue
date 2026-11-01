<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import DemoCard from './DemoCard.vue'
import { catalog, type DemoLocale, filterStorageKey } from './demo-data'
import { filterDemos } from './demo-search.mjs'
const { lang } = useData()
const locale = computed<DemoLocale>(() => lang.value.startsWith('zh') ? 'zh' : 'en')
const chinese = computed(() => locale.value === 'zh')
const query = ref('')
const category = ref('all')
const selectedTags = ref<string[]>([])
const filtered = computed(() => filterDemos(catalog, { query: query.value, category: category.value, tags: selectedTags.value }))
const hasFilters = computed(() => Boolean(query.value || category.value !== 'all' || selectedTags.value.length))
let hydrated = false
function toggleTag(id: string) { selectedTags.value = selectedTags.value.includes(id) ? selectedTags.value.filter(tag => tag !== id) : [...selectedTags.value, id] }
function reset() { query.value = ''; category.value = 'all'; selectedTags.value = [] }
function save() {
  if (!hydrated) return
  const params = new URLSearchParams()
  if (query.value.trim()) params.set('q', query.value.trim())
  if (category.value !== 'all') params.set('category', category.value)
  selectedTags.value.forEach(tag => params.append('tag', tag))
  const search = params.size ? `?${params}` : ''
  history.replaceState(history.state, '', location.pathname + search + location.hash)
  try { sessionStorage.setItem(filterStorageKey, search) } catch { /* Browsing works without storage. */ }
}
onMounted(() => {
  const params = new URLSearchParams(location.search)
  query.value = (params.get('q') || '').slice(0, 200)
  const candidate = params.get('category')
  category.value = catalog.categories.some(item => item.id === candidate) ? candidate! : 'all'
  selectedTags.value = [...new Set(params.getAll('tag'))].filter(id => catalog.tags.some(tag => tag.id === id))
  hydrated = true
  save()
})
watch([query, category, selectedTags], save)
</script>

<template>
  <main class="demo-library">
    <header class="library-intro"><p class="eyebrow">PIWORK / DEMOS</p><h1>{{ chinese ? '找到你的下一个工具。' : 'Find your next tool.' }}</h1><p>{{ chinese ? '从真实应用里找灵感。挑一个 Work，下载体验，再和 Pi 一起把它变成自己的工具。' : 'Get inspired by real apps. Find a Work, try it out, then make it your own with Pi.' }}</p></header>
    <section class="library-filters" :aria-label="chinese ? '搜索与筛选 Demo' : 'Search and filter demos'">
      <label class="demo-search"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m12.5 12.5 4.5 4.5"/></svg><input v-model="query" type="search" maxlength="200" :placeholder="chinese ? '搜索 Demo 名称、介绍或 Tag…' : 'Search demo names, descriptions or tags…'" :aria-label="chinese ? '搜索 Demo 或 Tag' : 'Search demos or tags'" /><kbd aria-hidden="true">⌕</kbd></label>
      <div class="category-row" :aria-label="chinese ? '分类' : 'Categories'"><button type="button" :aria-pressed="category === 'all'" @click="category = 'all'">{{ chinese ? '全部' : 'All demos' }} <span>{{ catalog.demos.length }}</span></button><button v-for="item in catalog.categories" :key="item.id" type="button" :aria-pressed="category === item.id" @click="category = item.id">{{ item.label[locale] }} <span>{{ catalog.demos.filter(demo => demo.category === item.id).length }}</span></button></div>
      <div class="filter-tag-row"><span class="tag-label">{{ chinese ? '标签' : 'Tags' }}</span><div class="tag-options"><button v-for="tag in catalog.tags" :key="tag.id" type="button" :aria-pressed="selectedTags.includes(tag.id)" @click="toggleTag(tag.id)">#{{ tag.label[locale] }}</button></div></div>
    </section>
    <div class="result-bar"><p role="status" aria-live="polite">{{ chinese ? `${filtered.length} 个 Demo` : `${filtered.length} ${filtered.length === 1 ? 'demo' : 'demos'}` }}</p><button v-if="hasFilters" type="button" @click="reset">{{ chinese ? '清除筛选' : 'Clear filters' }} <span aria-hidden="true">×</span></button><span v-else>{{ chinese ? '中英文 Work · 下载后可继续修改' : 'English & Chinese Works · Yours to keep shaping' }}</span></div>
    <div v-if="filtered.length" class="demo-grid"><DemoCard v-for="demo in filtered" :key="demo.id" :demo="demo" :locale="locale" filter-tags :selected-tags="selectedTags" @tag="toggleTag" /></div>
    <div v-else class="demo-empty"><span aria-hidden="true">⌕</span><h2>{{ chinese ? '还没有找到匹配的 Demo' : 'No matching demos yet' }}</h2><p>{{ chinese ? '试试其他名称、介绍关键词或 Tag，也可以清除当前筛选。' : 'Try another name, description or tag, or clear your current filters.' }}</p><button type="button" @click="reset">{{ chinese ? '查看全部 Demo' : 'Show all demos' }}</button></div>
  </main>
</template>

<style scoped>
.demo-library{max-width:1160px;margin:0 auto;padding:68px 36px 90px;color:var(--vp-c-text-1)}.eyebrow{font-size:10px;letter-spacing:.18em;font-weight:600;color:var(--vp-c-brand-1);margin:0 0 16px}.library-intro h1{font-size:clamp(33px,4vw,49px);line-height:1.17;letter-spacing:-.045em;font-weight:650;margin:0}.library-intro>p:last-child{max-width:650px;font-size:15px;line-height:1.9;color:var(--vp-c-text-2);margin:20px 0 0}
.library-filters{margin-top:34px}.demo-search{display:flex;align-items:center;gap:12px;padding:13px 16px;border:1px solid var(--vp-c-divider);border-radius:9px;background:var(--vp-c-bg);box-shadow:0 2px 6px #18314903}.demo-search:focus-within{border-color:var(--vp-c-brand-1);box-shadow:0 0 0 3px var(--vp-c-brand-soft)}.demo-search svg{width:19px;height:19px;flex-shrink:0;color:var(--vp-c-text-3)}.demo-search input{flex:1;min-width:0;outline:none;font-size:14px;background:transparent;color:var(--vp-c-text-1)}.demo-search input::placeholder{color:var(--vp-c-text-3)}.demo-search kbd{font-family:inherit;color:var(--vp-c-text-3);font-size:19px}
.category-row{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0 0}.category-row button{font-size:12px;font-weight:500;padding:7px 12px;border-radius:7px;color:var(--vp-c-text-2);cursor:pointer;background:var(--vp-c-bg-soft);border:1px solid transparent}.category-row button[aria-pressed=true]{background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);border-color:var(--vp-c-brand-1)}.category-row span{margin-left:8px;font-size:10px;opacity:.65;font-variant-numeric:tabular-nums}
.filter-tag-row{display:flex;align-items:flex-start;gap:14px;margin-top:17px}.tag-label{font-size:10px;color:var(--vp-c-text-3);line-height:26px;flex-shrink:0}.tag-options{display:flex;flex-wrap:wrap;gap:5px 7px}.tag-options button{font-size:10px;line-height:1.6;padding:4px 7px;border:1px solid var(--vp-c-divider);border-radius:5px;color:var(--vp-c-text-2);cursor:pointer}.tag-options button:hover,.tag-options button[aria-pressed=true]{border-color:var(--vp-c-brand-1);color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft)}
.result-bar{display:flex;justify-content:space-between;align-items:center;gap:20px;margin:27px 0 18px;padding-top:19px;border-top:1px solid var(--vp-c-divider)}.result-bar p{font-size:12px;font-weight:500;margin:0}.result-bar>span{font-size:10px;color:var(--vp-c-text-3)}.result-bar button{font-size:11px;color:var(--vp-c-brand-1);cursor:pointer}.result-bar button span{margin-left:5px}.demo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.demo-empty{text-align:center;padding:65px 20px;border:1px dashed var(--vp-c-divider);border-radius:12px}.demo-empty>span{font-size:32px;color:var(--vp-c-text-3)}.demo-empty h2{font-size:20px;font-weight:550;margin:13px 0}.demo-empty p{font-size:13px;color:var(--vp-c-text-2);line-height:1.8}.demo-empty button{font-size:12px;color:var(--vp-c-brand-1);margin-top:18px;cursor:pointer}
@media(max-width:680px){.demo-library{padding:42px 20px 60px}.demo-grid{grid-template-columns:1fr;gap:20px}.library-intro>p:last-child{font-size:14px}.result-bar>span{max-width:160px;text-align:right;line-height:1.6}.category-row button{font-size:11px;padding:6px 10px}.demo-search input{font-size:12px}.tag-options{gap:6px}.filter-tag-row{gap:10px}}
</style>
