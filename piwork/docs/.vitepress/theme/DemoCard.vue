<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { type Demo, type DemoLocale, categoryLabel, tagLabel, packageFor, downloadAvailable, demoPath, galleryPath, imagePath, packageSize } from './demo-data'
const props = defineProps<{ demo: Demo; locale: DemoLocale; filterTags?: boolean; selectedTags?: string[] }>()
const emit = defineEmits<{ tag: [id: string] }>()
const chinese = computed(() => props.locale === 'zh')
const pkg = computed(() => packageFor(props.demo.id, props.locale))
</script>

<template>
  <article class="demo-card" :data-demo-id="demo.id" :id="demo.id">
    <a class="card-main" :href="withBase(demoPath(demo.id, locale))" :aria-label="chinese ? `查看${demo.title[locale]}详情` : `Explore ${demo.title[locale]}`">
      <div class="card-cover"><img :src="withBase(imagePath(demo.id, locale))" :alt="demo.coverAlt[locale]" width="1440" height="900" loading="lazy" /></div>
      <div class="card-copy"><span class="card-category">{{ categoryLabel(demo.category, locale) }}</span><h2>{{ demo.title[locale] }}</h2><p>{{ demo.subtitle[locale] }}</p></div>
    </a>
    <div class="card-tags" :aria-label="chinese ? '标签' : 'Tags'">
      <template v-for="tag in demo.tags" :key="tag">
        <button v-if="filterTags" type="button" :aria-pressed="selectedTags?.includes(tag) ?? false" @click="emit('tag', tag)">#{{ tagLabel(tag, locale) }}</button>
        <a v-else :href="withBase(`${galleryPath(locale)}?tag=${encodeURIComponent(tag)}`)">#{{ tagLabel(tag, locale) }}</a>
      </template>
    </div>
    <div class="card-footer"><a class="card-detail" :href="withBase(demoPath(demo.id, locale))">{{ chinese ? '查看详情' : 'View details' }} <span aria-hidden="true">↗</span></a><div class="card-download"><span>{{ packageSize(pkg.bytes) }} · ZIP</span><a v-if="downloadAvailable(demo.id, locale)" :href="pkg.url!" target="_blank" rel="noopener noreferrer" :aria-label="chinese ? `下载${demo.title[locale]}中文 ZIP` : `Download ${demo.title[locale]} English ZIP`">{{ chinese ? '下载' : 'Download' }} <span aria-hidden="true">↓</span></a><span v-else class="unavailable">{{ chinese ? '即将开放' : 'Coming soon' }}</span></div></div>
  </article>
</template>

<style scoped>
.demo-card{position:relative;overflow:hidden;border:1px solid var(--vp-c-divider);border-radius:13px;background:var(--vp-c-bg);transition:border-color .18s,box-shadow .18s,transform .18s;scroll-margin-top:100px}
.demo-card:hover{border-color:var(--vp-c-brand-1);box-shadow:0 9px 28px #19354c0b;transform:translateY(-2px)}.card-main{display:block;text-decoration:none;color:inherit}.card-main::after{content:'';position:absolute;inset:0;z-index:1;border-radius:13px}.card-main:focus-visible{outline:0}.card-main:focus-visible::after{outline:3px solid var(--vp-c-brand-1);outline-offset:-3px}
.card-cover{aspect-ratio:16/10;overflow:hidden;border-bottom:1px solid var(--vp-c-divider);background:#eef2ea}.card-cover img{display:block;width:100%;height:100%;object-fit:contain}
.card-copy{padding:23px 24px 0}.card-category{font-size:10px;letter-spacing:.06em;font-weight:500;color:var(--vp-c-text-3)}.card-copy h2{font-size:23px;line-height:1.3;letter-spacing:-.035em;font-weight:600;margin:8px 0}.card-copy p{font-size:13px;line-height:1.8;color:var(--vp-c-text-2);margin:0}
.card-tags{position:relative;z-index:2;display:flex;flex-wrap:wrap;gap:7px;margin:16px 24px 22px;pointer-events:none}.card-tags button,.card-tags a{pointer-events:auto;color:var(--vp-c-text-2);background:var(--vp-c-bg-soft);border:1px solid transparent;border-radius:5px;padding:3px 7px;font-size:10px;line-height:1.7;cursor:pointer}.card-tags button:hover,.card-tags a:hover,.card-tags button[aria-pressed=true]{border-color:var(--vp-c-brand-1);color:var(--vp-c-brand-1)}
.card-footer{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:16px;margin:0 24px;padding:16px 0 19px;border-top:1px solid var(--vp-c-divider)}.card-detail{font-size:12px;font-weight:500;color:var(--vp-c-text-2)}.card-detail:hover{color:var(--vp-c-brand-1)}.card-detail span{margin-left:7px}.card-download{display:flex;gap:12px;align-items:center}.card-download>span{font-size:10px;color:var(--vp-c-text-3)}.card-download>a{display:flex;align-items:center;gap:14px;padding:7px 12px;border-radius:6px;background:var(--vp-button-brand-bg);color:var(--vp-button-brand-text);font-size:12px;font-weight:500}.card-download>a:hover{background:var(--vp-button-brand-hover-bg)}.card-download .unavailable{font-size:11px}
@media(max-width:540px){.card-copy{padding:20px 18px 0}.card-tags{margin:14px 18px 18px}.card-footer{margin:0 18px}.card-download{gap:8px}.card-copy h2{font-size:22px}}
@media(prefers-reduced-motion:reduce){.demo-card{transition:none}.demo-card:hover{transform:none}}
</style>
