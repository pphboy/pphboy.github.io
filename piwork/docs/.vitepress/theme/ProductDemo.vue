<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const chinese = computed(() => lang.value.startsWith('zh'))
const playing = ref(false)
const videoUrl = 'https://www.youtube.com/watch?v=ll1MS091gPU'
const title = computed(() => chinese.value
  ? 'Piwork 产品演示：创造、进化、迁移整个工作空间'
  : 'Piwork product demo: Create. Evolve. Take it anywhere.')
</script>

<template>
  <div class="product-demo">
    <div class="product-demo-player">
      <iframe
        v-if="playing"
        src="https://www.youtube-nocookie.com/embed/ll1MS091gPU?autoplay=1&amp;rel=0"
        :title="title"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      <button
        v-else
        type="button"
        class="product-demo-poster"
        :aria-label="chinese ? '播放 Piwork 产品演示' : 'Play the Piwork product demo'"
        @click="playing = true"
      >
        <img :src="withBase('/demo/piwork-product-demo.jpg')" :alt="title" width="1280" height="720" loading="lazy" />
        <span class="product-demo-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </button>
    </div>
    <p class="product-demo-link">
      <a :href="videoUrl" target="_blank" rel="noopener noreferrer">{{ chinese ? '在 YouTube 观看 · 70 秒' : 'Watch on YouTube · 70 seconds' }}</a>
    </p>
  </div>
</template>

<style scoped>
.product-demo { margin: 24px 0; }
.product-demo-player { aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: #11141d; }
.product-demo-player iframe, .product-demo-poster { display: block; width: 100%; height: 100%; border: 0; }
.product-demo-poster { position: relative; padding: 0; cursor: pointer; background: #11141d; }
.product-demo-poster img { display: block; width: 100%; height: 100%; object-fit: cover; }
.product-demo-play { position: absolute; top: 50%; left: 50%; display: grid; place-items: center; width: 72px; height: 72px; border: 1px solid #ffffff55; border-radius: 50%; color: #fff; background: #11141de6; transform: translate(-50%, -50%); transition: background .15s ease; }
.product-demo-poster:hover .product-demo-play { background: var(--vp-c-brand-1); }
.product-demo-poster:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: -4px; }
.product-demo-link { margin: 12px 0 0; font-size: 14px; }
</style>
