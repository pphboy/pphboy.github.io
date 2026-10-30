<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import release from './download-release.json'
const { lang } = useData()
const chinese = computed(() => lang.value.startsWith('zh'))
</script>

<template>
  <p class="launcher-version"><a :href="release.releaseUrl" target="_blank" rel="noopener noreferrer">{{ chinese ? '一键启动版' : 'One-click launcher' }} v{{ release.version }}</a><span> · {{ chinese ? '内含 Piwork' : 'Includes Piwork' }} {{ release.piworkVersion }}</span></p>
</template>

<style scoped>
.launcher-version { color: var(--vp-c-text-2); font-size: 13px; line-height: 1.8; }
</style>
