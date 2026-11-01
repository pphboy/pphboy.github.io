<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import DemoPlayer from './DemoPlayer.vue'
import DemoCard from './DemoCard.vue'
import { catalog, downloads, type DemoLocale, demoById, categoryLabel, tagLabel, packageFor, downloadAvailable, galleryPath, imagePath, packageSize, filterStorageKey } from './demo-data'
import { relatedDemos } from './demo-search.mjs'
const props = defineProps<{ demoId: string }>()
const { lang } = useData()
const locale = computed<DemoLocale>(() => lang.value.startsWith('zh') ? 'zh' : 'en')
const chinese = computed(() => locale.value === 'zh')
const demo = computed(() => demoById(props.demoId)!)
const pkg = computed(() => packageFor(props.demoId, locale.value))
const slides = computed(() => demo.value.slides.map(slide => ({ file: slide.file, title: slide.title[locale.value], description: slide.description[locale.value] })))
const related = computed(() => relatedDemos(catalog, props.demoId))
const previewOpen = ref(false)
const preview = ref<HTMLElement>()
const backSearch = ref('')
const guide = computed(() => withBase(`${chinese.value ? '/zh' : ''}/guide/first-work.html`))
async function openPreview() {
  previewOpen.value = true
  await nextTick()
  preview.value?.querySelector<HTMLElement>('.demo-player')?.focus({ preventScroll: true })
}
onMounted(() => {
  try { const saved = sessionStorage.getItem(filterStorageKey); if (saved?.startsWith('?') && saved.length < 1500) backSearch.value = saved } catch { /* The back link also works without storage. */ }
  if (location.hash === '#preview') openPreview()
})
</script>

<template>
  <main class="demo-detail">
    <a class="back-link" :href="withBase(galleryPath(locale) + backSearch)">← {{ chinese ? '返回 Demos' : 'All demos' }}</a>
    <header class="detail-heading"><a class="detail-category" :href="withBase(`${galleryPath(locale)}?category=${demo.category}`)">{{ categoryLabel(demo.category, locale) }}</a><h1>{{ demo.title[locale] }}</h1><p class="detail-subtitle">{{ demo.subtitle[locale] }}</p><div class="detail-tags"><a v-for="tag in demo.tags" :key="tag" :href="withBase(`${galleryPath(locale)}?tag=${encodeURIComponent(tag)}`)">#{{ tagLabel(tag, locale) }}</a></div></header>
    <div class="detail-hero">
      <div id="preview" ref="preview" class="detail-visual">
        <DemoPlayer v-if="previewOpen" :id="demo.id" :title="demo.title[locale]" :locale="locale" :chinese="chinese" :slides="slides" />
        <button v-else type="button" class="cover-preview" :aria-label="chinese ? `预览${demo.title[locale]}界面` : `Preview ${demo.title[locale]}`" aria-controls="preview" @click="openPreview"><img :src="withBase(imagePath(demo.id, locale))" :alt="demo.coverAlt[locale]" width="1440" height="900" /><span class="preview-cta"><span aria-hidden="true">▶</span> {{ chinese ? '预览实际界面' : 'Preview the app' }} <small>{{ chinese ? '5 个画面 · 保留 Piwork + Chat' : '5 scenes · Piwork + Chat included' }}</small></span></button>
      </div>
      <aside class="detail-download" :aria-label="chinese ? '下载此 Demo' : 'Download this demo'">
        <p class="detail-description">{{ demo.description[locale] }}</p>
        <dl class="download-facts"><div><dt>{{ chinese ? '版本语言' : 'Language' }}</dt><dd>{{ chinese ? '简体中文' : 'English' }}</dd></div><div><dt>{{ chinese ? '下载来源' : 'Download from' }}</dt><dd>{{ pkg.source }}</dd></div><div><dt>{{ chinese ? '文件大小' : 'Archive size' }}</dt><dd>{{ packageSize(pkg.bytes) }} · ZIP</dd></div></dl>
        <a v-if="downloadAvailable(demo.id, locale)" class="detail-download-button" :href="pkg.url!" target="_blank" rel="noopener noreferrer">{{ chinese ? '下载中文 Work（ZIP）' : 'Download English Work (ZIP)' }} <span aria-hidden="true">↓</span></a>
        <span v-else class="detail-download-button disabled">{{ chinese ? '下载即将开放' : 'Download coming soon' }}</span>
        <button class="detail-preview-button" type="button" :aria-expanded="previewOpen" aria-controls="preview" @click="openPreview">{{ chinese ? '预览界面' : 'Preview screenshots' }} <span aria-hidden="true">↗</span></button>
        <p class="archive-name">{{ pkg.file }}</p>
        <p class="import-note">{{ chinese ? '解压 ZIP 后，将其中的 .work 文件导入 Piwork。' : 'Extract the ZIP and import the .work file into Piwork.' }}</p>
        <div v-if="!chinese" class="extra-downloads"><a :href="`https://github.com/pphboy/pphboy.github.io/releases/download/${downloads.releaseTag}/${pkg.workFile}`">Original .work ↗</a><a :href="`${pkg.url}.sha256`">ZIP SHA-256 ↗</a></div>
      </aside>
    </div>
    <section class="detail-features"><div><p class="eyebrow">{{ chinese ? '关于这个 DEMO' : 'ABOUT THIS DEMO' }}</p><h2>{{ chinese ? '从这里开始，继续做。' : 'A starting point for your own work.' }}</h2></div><ul><li v-for="feature in demo.features[locale]" :key="feature">{{ feature }}</li></ul></section>
    <section class="detail-included"><h2>{{ chinese ? '下载包含什么' : 'What is included' }}</h2><p>{{ chinese ? '完整应用、示例数据以及对应语言的 Agent 演示对话。导入后点击启动，等待 Service 就绪；切到 Session 3 可以查看简短的使用介绍。' : 'The app, example data and an English Agent demo conversation. After importing, click Start and wait for Services to become ready. Choose Session 3 for a short introduction.' }}</p><p>{{ chinese ? '需要兼容的 Piwork 环境，并配置自己的 AI 模型凭据。已有同名 Work 时，请在导入时换一个名称。' : 'Use a compatible Piwork installation and configure your own model credentials. Choose another name if the Work already exists.' }} <a :href="guide">{{ chinese ? '查看导入说明 →' : 'Import guide →' }}</a></p><details class="detail-integrity"><summary>{{ chinese ? '查看文件校验信息' : 'File integrity' }}</summary><p>ZIP · SHA-256</p><code>{{ pkg.sha256 }}</code><p>.work · SHA-256</p><code>{{ pkg.workSha256 }}</code></details></section>
    <section v-if="related.length" class="related-demos"><div class="related-heading"><div><p class="eyebrow">{{ chinese ? '继续探索' : 'KEEP EXPLORING' }}</p><h2>{{ chinese ? '也可以试试' : 'You may also like' }}</h2></div><a :href="withBase(galleryPath(locale))">{{ chinese ? '全部 Demo' : 'All demos' }} ↗</a></div><div class="related-grid"><DemoCard v-for="item in related" :key="item.id" :demo="item" :locale="locale" /></div></section>
  </main>
</template>

<style scoped>
.demo-detail{max-width:1160px;margin:0 auto;padding:42px 36px 84px;color:var(--vp-c-text-1)}.back-link{display:inline-block;font-size:12px;color:var(--vp-c-text-2);margin-bottom:31px}.back-link:hover{color:var(--vp-c-brand-1)}.detail-heading{margin-bottom:29px}.detail-category{font-size:11px;color:var(--vp-c-brand-1)}.detail-heading h1{font-size:clamp(33px,4vw,45px);font-weight:650;letter-spacing:-.045em;line-height:1.2;margin:10px 0}.detail-subtitle{font-size:16px;line-height:1.8;color:var(--vp-c-text-2);margin:0}.detail-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:17px}.detail-tags a{font-size:10px;border:1px solid var(--vp-c-divider);border-radius:5px;padding:3px 8px;color:var(--vp-c-text-2)}.detail-tags a:hover{color:var(--vp-c-brand-1);border-color:var(--vp-c-brand-1)}
.detail-hero{display:grid;grid-template-columns:minmax(0,1.9fr) minmax(270px,1fr);gap:30px;align-items:start}.detail-visual{min-width:0;scroll-margin-top:95px}.cover-preview{position:relative;display:block;width:100%;border:1px solid var(--vp-c-divider);border-radius:12px;overflow:hidden;cursor:pointer;text-align:left;background:#edf1e9}.cover-preview>img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:contain}.preview-cta{position:absolute;inset:auto 0 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px;padding:31px 20px 17px;color:white;background:linear-gradient(transparent,#152b20df);font-size:12px}.preview-cta>span{font-size:10px}.preview-cta small{font-size:10px;margin-left:auto;opacity:.77}.cover-preview:hover .preview-cta{background:linear-gradient(transparent,#152b20f2)}
.detail-description{font-size:13px;line-height:1.9;color:var(--vp-c-text-2);margin:0}.download-facts{margin:20px 0;padding:16px 0;border-top:1px solid var(--vp-c-divider);border-bottom:1px solid var(--vp-c-divider)}.download-facts>div{display:flex;justify-content:space-between;gap:15px;font-size:11px;line-height:1.9}.download-facts>div+div{margin-top:5px}.download-facts dt{color:var(--vp-c-text-3)}.download-facts dd{margin:0;font-weight:500}.detail-download-button,.detail-preview-button{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 14px;border-radius:7px;font-size:12px;font-weight:500;width:100%}.detail-download-button{background:var(--vp-button-brand-bg);color:var(--vp-button-brand-text)}.detail-download-button:hover{background:var(--vp-button-brand-hover-bg)}.detail-download-button.disabled{background:var(--vp-c-bg-soft);color:var(--vp-c-text-3)}.detail-preview-button{margin-top:9px;border:1px solid var(--vp-c-divider);color:var(--vp-c-text-2);cursor:pointer}.detail-preview-button:hover{border-color:var(--vp-c-brand-1);color:var(--vp-c-brand-1)}.archive-name{font-size:10px;overflow-wrap:anywhere;color:var(--vp-c-text-3);margin:12px 0 0}.import-note{font-size:11px;line-height:1.8;color:var(--vp-c-text-2);margin:6px 0 0}.extra-downloads{display:flex;flex-wrap:wrap;gap:12px;font-size:10px;color:var(--vp-c-brand-1);margin-top:11px}
.eyebrow{font-size:10px;letter-spacing:.13em;color:var(--vp-c-text-3);margin:0 0 10px}.detail-features{display:grid;grid-template-columns:1fr 1.2fr;gap:45px;margin-top:45px;padding:29px 0;border-top:1px solid var(--vp-c-divider);border-bottom:1px solid var(--vp-c-divider)}.detail-features h2{font-size:23px;font-weight:550;letter-spacing:-.025em;line-height:1.4;margin:0}.detail-features ul{font-size:13px;line-height:1.9;color:var(--vp-c-text-2);padding:0 0 0 17px;margin:0}.detail-features li+li{margin-top:10px}
.detail-included{max-width:800px;margin-top:29px}.detail-included h2{font-size:17px;font-weight:550;margin:0 0 12px}.detail-included>p{font-size:12px;line-height:1.9;color:var(--vp-c-text-2);margin:9px 0}.detail-included a{color:var(--vp-c-brand-1)}.detail-integrity{font-size:10px;color:var(--vp-c-text-3);margin-top:15px}.detail-integrity summary{cursor:pointer}.detail-integrity code{display:block;font-size:10px;overflow-wrap:anywhere;margin:6px 0 10px}.detail-integrity p{margin:10px 0 0}
.related-demos{margin-top:57px}.related-heading{display:flex;align-items:end;justify-content:space-between;margin-bottom:20px}.related-heading h2{font-size:25px;letter-spacing:-.03em;font-weight:550;margin:0}.related-heading>a{font-size:12px;color:var(--vp-c-text-2)}.related-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
@media(max-width:850px){.detail-hero{grid-template-columns:1fr;gap:24px}.detail-download{max-width:620px}.detail-features{grid-template-columns:1fr;gap:17px}.preview-cta small{font-size:9px}}
@media(max-width:600px){.demo-detail{padding:30px 20px 60px}.detail-heading{margin-bottom:24px}.back-link{margin-bottom:23px}.related-grid{grid-template-columns:1fr}.preview-cta{padding:25px 13px 13px;font-size:11px;gap:7px}.preview-cta small{max-width:155px;text-align:right}.detail-heading h1{font-size:34px}}
</style>
