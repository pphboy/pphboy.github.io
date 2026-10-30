<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

withDefaults(defineProps<{ src: string; alt: string; caption?: string; eager?: boolean; width?: number; height?: number }>(), { eager: false, width: 1920, height: 1080 })
const { lang } = useData()
const zoom = computed(() => lang.value.startsWith('zh') ? '查看完整截图' : 'View full screenshot')
</script>

<template>
  <figure class="work-shot">
    <a :href="withBase(src)" target="_blank" rel="noopener noreferrer" :aria-label="`${zoom}: ${alt}`">
      <img :src="withBase(src)" :alt="alt" :width="width" :height="height" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : 'auto'" decoding="async" />
      <span class="shot-zoom" aria-hidden="true">↗</span>
    </a>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.work-shot { min-width: 0; margin: 0; }
.work-shot a { position: relative; display: block; overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: #11141d; }
.work-shot img { display: block; width: 100%; height: auto; }
.work-shot a:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 5px; }
.shot-zoom { position: absolute; bottom: 12px; right: 12px; display: grid; place-items: center; width: 32px; height: 32px; border: 1px solid #ffffff50; border-radius: 50%; color: white; background: #11141dcc; font-size: 18px; }
figcaption { margin-top: 14px; color: var(--vp-c-text-2); font-size: 13px; line-height: 1.7; }
</style>
