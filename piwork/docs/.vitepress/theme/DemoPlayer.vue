<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{ id: string; title: string; locale: string; slides: { file: string; title: string; description: string }[]; chinese: boolean }>()
const current = ref(0)
const playing = ref(false)
const viewer = ref<HTMLElement>()
const expanded = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
const slide = computed(() => props.slides[current.value])
const src = (file: string) => withBase(`/demos/${props.id}/${props.locale}/${file}_${props.locale}.png`)
function stop() { playing.value = false; if (timer) clearInterval(timer); timer = undefined }
function go(index: number) { current.value = (index + props.slides.length) % props.slides.length }
function step(delta: number) { stop(); go(current.value + delta) }
function togglePlay() {
  if (playing.value) return stop()
  playing.value = true
  timer = setInterval(() => go(current.value + 1), 4500)
}
async function fullscreen() {
  if (document.fullscreenElement === viewer.value) await document.exitFullscreen()
  else if (viewer.value?.requestFullscreen) await viewer.value.requestFullscreen().catch(() => { expanded.value = true })
  else expanded.value = !expanded.value
}
function keydown(event: KeyboardEvent) {
  if (event.key === 'Escape') { expanded.value = false; stop(); return }
  if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) return
  if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
  if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
  if (event.key === ' ') { event.preventDefault(); togglePlay() }
}
watch(() => props.locale, () => { stop(); current.value = 0 })
onBeforeUnmount(stop)
</script>

<template>
  <div ref="viewer" class="demo-player" :class="{ expanded }" tabindex="0" role="region" aria-roledescription="carousel" :aria-label="title" @keydown="keydown">
    <div class="demo-screen">
      <Transition name="demo-slide" mode="out-in">
        <img :key="`${locale}-${current}`" :src="src(slide.file)" :alt="`${title} — ${slide.title}. ${slide.description}`" width="1920" height="1080" :loading="current === 0 ? 'eager' : 'lazy'" decoding="async" />
      </Transition>
      <button class="expand" type="button" :aria-label="chinese ? '全屏查看截图' : 'View screenshots fullscreen'" @click="fullscreen">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4" /></svg>
      </button>
    </div>
    <div class="demo-playbar">
      <div class="demo-caption" :aria-live="playing ? 'off' : 'polite'"><span class="slide-number">{{ String(current + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</span><strong>{{ slide.title }}</strong><p>{{ slide.description }}</p></div>
      <div class="demo-controls">
        <button type="button" :aria-label="chinese ? '上一张' : 'Previous slide'" @click="step(-1)">←</button>
        <button type="button" class="play" :aria-pressed="playing" @click="togglePlay"><span aria-hidden="true">{{ playing ? 'Ⅱ' : '▶' }}</span> {{ playing ? (chinese ? '暂停' : 'Pause') : (chinese ? '播放演示' : 'Play demo') }}</button>
        <button type="button" :aria-label="chinese ? '下一张' : 'Next slide'" @click="step(1)">→</button>
      </div>
    </div>
    <div class="demo-thumbnails" :aria-label="chinese ? '选择展示画面' : 'Choose a scene'">
      <button v-for="(item, index) in slides" :key="item.file" type="button" :class="{ selected: current === index }" :aria-current="current === index ? 'step' : undefined" @click="stop(); go(index)"><img :src="src(item.file)" alt="" width="192" height="108" loading="lazy" /><span>{{ item.title }}</span></button>
    </div>
    <button v-if="expanded" class="close-expanded" type="button" @click="expanded = false">{{ chinese ? '关闭' : 'Close' }} ×</button>
  </div>
</template>

<style scoped>
.demo-player{border:1px solid var(--vp-c-divider);border-radius:14px;background:var(--vp-c-bg);overflow:hidden;outline-offset:5px}
.demo-screen{position:relative;aspect-ratio:16/9;background:#eaf0eb;overflow:hidden}
.demo-screen>img{display:block;width:100%;height:100%;object-fit:contain}
.expand{position:absolute;right:14px;bottom:14px;display:grid;place-items:center;width:36px;height:36px;border:1px solid #ffffff80;border-radius:8px;background:#1b3029dd;color:white;cursor:pointer;box-shadow:0 2px 10px #0002}
.expand svg{width:20px;height:20px}
.demo-playbar{display:flex;justify-content:space-between;align-items:center;gap:24px;padding:20px 24px;border-top:1px solid var(--vp-c-divider)}
.demo-caption{min-width:0}.slide-number{font-size:11px;font-variant-numeric:tabular-nums;letter-spacing:.08em;color:var(--vp-c-text-3);margin-right:12px}
.demo-caption strong{font-size:14px;font-weight:600}.demo-caption p{margin:5px 0 0;font-size:12px;line-height:1.7;color:var(--vp-c-text-2)}
.demo-controls{display:flex;align-items:center;gap:6px;flex-shrink:0}.demo-controls button{height:34px;min-width:34px;border:1px solid var(--vp-c-divider);border-radius:7px;background:var(--vp-c-bg);font-size:14px;cursor:pointer}
.demo-controls button:hover{border-color:var(--vp-c-brand-1);color:var(--vp-c-brand-1)}.demo-controls .play{padding:0 13px;font-size:12px;white-space:nowrap}.play span{font-size:10px;margin-right:5px}
.demo-thumbnails{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;padding:0 24px 20px}.demo-thumbnails button{min-width:0;text-align:left;cursor:pointer;border:1px solid var(--vp-c-divider);border-radius:7px;overflow:hidden;background:var(--vp-c-bg-soft);opacity:.64;transition:opacity .15s,border-color .15s}
.demo-thumbnails button.selected,.demo-thumbnails button:hover{opacity:1;border-color:var(--vp-c-brand-1)}.demo-thumbnails img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:contain}.demo-thumbnails span{display:block;padding:6px 8px;font-size:10px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;color:var(--vp-c-text-2)}
.demo-player:fullscreen,.demo-player.expanded{background:var(--vp-c-bg);display:flex;flex-direction:column;border-radius:0;justify-content:center;padding:16px}.demo-player:fullscreen .demo-screen,.expanded .demo-screen{height:calc(100dvh - 130px);aspect-ratio:auto;flex:1;min-height:0}.demo-player:fullscreen .demo-thumbnails,.expanded .demo-thumbnails{display:none}.demo-player:fullscreen .demo-playbar,.expanded .demo-playbar{border:0}.expanded{position:fixed;inset:0;z-index:1000}.close-expanded{position:absolute;top:15px;right:20px;background:#1b3029;color:#fff;padding:8px 14px;border-radius:7px}
.demo-slide-enter-active,.demo-slide-leave-active{transition:opacity .14s ease,transform .14s ease}.demo-slide-enter-from{opacity:0;transform:translateX(10px)}.demo-slide-leave-to{opacity:0;transform:translateX(-10px)}
@media(prefers-reduced-motion:reduce){.demo-slide-enter-active,.demo-slide-leave-active{transition:none}}
@media(max-width:640px){.demo-playbar{padding:14px;gap:12px;align-items:flex-start;flex-direction:column}.demo-controls{width:100%;justify-content:flex-end}.demo-thumbnails{padding:0 14px 14px;gap:6px}.demo-thumbnails span{font-size:9px;padding:4px}.demo-caption p{font-size:11px}.slide-number{font-size:10px}}
</style>
