<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import ProductDemo from './ProductDemo.vue'
import WorkShot from './WorkShot.vue'

const { lang } = useData()
const chinese = computed(() => lang.value.startsWith('zh'))
const downloads = computed(() => withBase(`${chinese.value ? '/zh' : ''}/guide/downloads.html`))
const quickStart = computed(() => withBase(`${chinese.value ? '/zh' : ''}/guide/quick-start.html`))
const c = computed(() => chinese.value ? {
  eyebrow: 'PIWORK / 可迁移的 AI 工作空间',
  title: ['创造。演进。', '随处带走。'],
  intro: '用 AI 做出能用的应用。让对话、文件、数据和运行环境保存在同一个 Work 中，持续改进，也能整体迁移。',
  download: '下载 Piwork', how: '看看它如何工作', platform: 'Windows · Linux / 本地一键启动',
  heroAlt: 'Piwork Workspace 空状态，包含 Services、Files、Chat 导航、Agent 欢迎页和消息输入区',
  heroCaption: '从一个空的 Piwork Workspace 开始：与 AI 对话，处理文件，创建和使用应用。点击截图查看大图。',
  flowTitle: '一个 Work，从想法到下一站。',
  flowIntro: '跟着同一个内容工作室，看看它如何被创造、持续演进，再被完整带走。',
  create: '创造', evolve: '演进', take: '带走',
  createTitle: '在 Chat 里，\n创建一个内容工作室。',
  createBody: '在一个空 Work 里，向 Chat 提出创建 My Creative Studio 的需求：准备 6 条示例灵感，支持分类、搜索和详情。发送后，Agent 开始调用工具执行任务，进度直接显示在 Chat 中。',
  createPrompt: '帮我做一个整理灵感的内容工作室。',
  createCaption: '创造 / 原始创建请求已发送，下面显示 Agent 的回复、工具活动和正在运行的任务。',
  evolveTitle: '继续对话，\n加一个发布日历。',
  evolveBody: '接着在同一个 Work 中要求：加一个发布日历，保留已有灵感。应用增加了 2026 年 10 月的月历，The Creative Process 安排在 20 日，另外两条原始灵感也有了发布日期。',
  evolvePrompt: '加一个发布日历。保留我已有的灵感。',
  evolveCaption: '演进 / 左侧为实际的发布日历；右侧是“添加日历并保留已有灵感”的原始 Chat 请求。',
  takeTitle: '迁移后，\n打开原来的灵感。',
  takeBody: '先停止 Work，导出 .work，再导入另一套 Piwork 并手动启动。从日历打开 The Creative Process，原有描述、10 月 20 日的发布日期，以及提出日历需求的 Chat 都还在。',
  packageTitle: '一个文件，带走整个 Work', packageItems: ['应用与环境', '数据与文件', '对话与配置'],
  takeNote: '接收方配置自己的模型凭据。导入后，由你显式启动 Work。',
  takeCaption: '继续 / 导入后的原灵感详情保留标题、内容与 2026-10-20 日期；右侧保留当时的 Chat 请求。',
  videoEyebrow: '亲眼看看 / 五个真实演示', videoTitle: '一个工作空间，\n不止一种可能。',
  videoBody: '学习、文件、音乐、视频和游戏。看看五个不同的 Work，如何把想法变成可以使用的成果。',
  finalEyebrow: '下一个 Work，属于你。', finalTitle: '让想法，\n有个能继续生长的地方。',
  finalBody: '下载并打开，点击启动。完成首次账号和模型设置，就可以开始。',
  quick: '快速开始',
} : {
  eyebrow: 'PIWORK / A PORTABLE AI WORKSPACE',
  title: ['Create. Evolve.', 'Take it anywhere.'],
  intro: 'Build useful apps with AI. Keep conversations, files, data, and a running environment together in a Work. Keep improving it. Take the whole thing with you.',
  download: 'Download Piwork', how: 'See how it works', platform: 'Windows · Linux / One-click local launch',
  heroAlt: 'An empty Piwork Workspace with Services, Files and Chat navigation, the Agent welcome screen, and message composer',
  heroCaption: 'Start with an empty Piwork Workspace: chat with AI, work with files, and build and use apps. Select the screenshot for a closer look.',
  flowTitle: 'One Work. From an idea to what’s next.',
  flowIntro: 'Follow one content studio as it is created, improved, and carried to another Piwork installation.',
  create: 'Create', evolve: 'Evolve', take: 'Take it with you',
  createTitle: 'Build a content studio.\nStart in Chat.',
  createBody: 'Start with an empty Work and ask Chat to build My Creative Studio, with six sample ideas, categories, search, and detail views. After the request is accepted, the Agent starts using tools. Follow its progress in Chat.',
  createPrompt: 'Build me a content studio to organize my ideas.',
  createCaption: 'Create / The original request has been sent. The Agent reply, tool activity, and running task appear below it.',
  evolveTitle: 'Keep the conversation.\nAdd a publishing calendar.',
  evolveBody: 'Continue in the same Work: add a publishing calendar and keep the existing ideas. The app gains an October 2026 calendar, with The Creative Process on the 20th and publication dates for two other original ideas.',
  evolvePrompt: 'Add a publishing calendar. Keep all my existing ideas.',
  evolveCaption: 'Evolve / The actual publishing calendar is on the left. The original request to add it and keep the existing ideas is visible in Chat on the right.',
  takeTitle: 'After the move,\nopen the original idea.',
  takeBody: 'Stop the Work, export its .work file, import it into another Piwork installation, and explicitly start it. Open The Creative Process from the calendar: its description, October 20 publication date, and original calendar request in Chat are all still there.',
  packageTitle: 'One file. Your whole Work.', packageItems: ['Apps & environment', 'Data & files', 'Conversations & settings'],
  takeNote: 'The recipient supplies their own model credentials. You explicitly start the imported Work.',
  takeCaption: 'Continue / After import, the original idea still has its title, content, and 2026-10-20 date. Its original Chat request remains alongside it.',
  videoEyebrow: 'SEE IT HAPPEN / FIVE REAL DEMOS', videoTitle: 'One workspace.\nMore possibilities.',
  videoBody: 'Learning, files, music, video, and games. See five different Works turn ideas into results you can use.',
  finalEyebrow: 'YOUR NEXT WORK STARTS HERE.', finalTitle: 'Give your ideas\nroom to keep growing.',
  finalBody: 'Download, open, and click Start. Set up your account and AI model, then begin.',
  quick: 'Quick Start',
})
</script>

<template>
  <main class="home-story">
    <section class="story-hero" aria-labelledby="core-promise">
      <p class="eyebrow"><span class="brand-line" />{{ c.eyebrow }}</p>
      <div class="hero-intro">
        <h1 id="core-promise"><span>{{ c.title[0] }}</span><span class="accent">{{ c.title[1] }}</span></h1>
        <div class="hero-aside">
          <p class="hero-description">{{ c.intro }}</p>
          <a class="pi-button" :href="downloads">{{ c.download }}<span aria-hidden="true">↗</span></a>
          <p class="platform-note">{{ c.platform }}</p>
          <a class="text-link" href="#how-it-works">{{ c.how }}<span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <WorkShot class="hero-shot" src="/screenshots/product/workspace-with-chat.png" :alt="c.heroAlt" :caption="c.heroCaption" eager />
    </section>

    <section id="product-demo" class="story-video" aria-labelledby="video-title"><div><p class="eyebrow">{{ c.videoEyebrow }}</p><h2 id="video-title">{{ c.videoTitle }}</h2><p>{{ c.videoBody }}</p></div><ProductDemo /></section>

    <section id="how-it-works" class="flow-intro" aria-labelledby="flow-title">
      <div><p class="eyebrow">THE WORK FLOW</p><h2 id="flow-title">{{ c.flowTitle }}</h2><p>{{ c.flowIntro }}</p></div>
      <nav class="flow-steps" :aria-label="chinese ? 'Work 的完整流程' : 'The Work lifecycle'">
        <a href="#create"><span>01</span>{{ c.create }}<span aria-hidden="true">↗</span></a>
        <a href="#evolve"><span>02</span>{{ c.evolve }}<span aria-hidden="true">↗</span></a>
        <a href="#take-it-anywhere"><span>03</span>{{ c.take }}<span aria-hidden="true">↗</span></a>
      </nav>
    </section>

    <section id="create" class="story-chapter" aria-labelledby="create-title">
      <div class="chapter-copy"><div class="chapter-heading"><p class="eyebrow"><span class="chapter-number">01</span>{{ c.create }}</p><h2 id="create-title">{{ c.createTitle }}</h2></div><div class="chapter-detail"><p>{{ c.createBody }}</p><blockquote><span aria-hidden="true">✦</span>{{ c.createPrompt }}</blockquote></div></div>
      <WorkShot src="/screenshots/product/studio-create-request.png" :alt="c.createCaption" :caption="c.createCaption" />
    </section>

    <section id="evolve" class="story-chapter" aria-labelledby="evolve-title">
      <div class="chapter-copy"><div class="chapter-heading"><p class="eyebrow"><span class="chapter-number">02</span>{{ c.evolve }}</p><h2 id="evolve-title">{{ c.evolveTitle }}</h2></div><div class="chapter-detail"><p>{{ c.evolveBody }}</p><blockquote><span aria-hidden="true">✦</span>{{ c.evolvePrompt }}</blockquote></div></div>
      <WorkShot src="/screenshots/product/studio-calendar-chat.png" :alt="c.evolveCaption" :caption="c.evolveCaption" />
    </section>

    <section id="take-it-anywhere" class="story-chapter" aria-labelledby="take-title">
      <div class="chapter-copy"><div class="chapter-heading"><p class="eyebrow"><span class="chapter-number">03</span>{{ c.take }}</p><h2 id="take-title">{{ c.takeTitle }}</h2></div><div class="chapter-detail"><p>{{ c.takeBody }}</p>
        <div class="work-package"><svg aria-hidden="true" viewBox="0 0 36 44" fill="none"><path d="M3 1h20l10 10v30H3zM23 1v11h10" stroke="currentColor" stroke-width="1.5"/><path d="M11 23h14M11 29h10" stroke="currentColor" stroke-width="1.5"/></svg><div><strong>.work</strong><span>{{ c.packageTitle }}</span></div></div>
        <ul class="package-contents"><li v-for="item in c.packageItems" :key="item">{{ item }}</li></ul><p class="chapter-note">{{ c.takeNote }}</p>
      </div></div>
      <WorkShot src="/screenshots/product/studio-imported-record-chat.png" :alt="c.takeCaption" :caption="c.takeCaption" />
    </section>

    <section class="story-end" aria-labelledby="start-title"><p class="eyebrow">{{ c.finalEyebrow }}</p><h2 id="start-title">{{ c.finalTitle }}</h2><p>{{ c.finalBody }}</p><div class="end-actions"><a class="pi-button" :href="downloads">{{ c.download }}<span aria-hidden="true">↗</span></a><a class="text-link" :href="quickStart">{{ c.quick }}<span aria-hidden="true">→</span></a></div></section>
  </main>
</template>

<style scoped>
.home-story { --story-accent: #0768d1; max-width: 1344px; margin: 0 auto; padding: 58px 32px 80px; }
:global(.dark) .home-story { --story-accent: #78d9ee; }
.eyebrow { display: flex; align-items: center; gap: 12px; margin: 0 0 26px; color: var(--vp-c-text-2); font-size: 11px; font-weight: 600; line-height: 1.6; letter-spacing: .14em; }
.brand-line { width: 28px; height: 2px; background: var(--story-accent); }
.hero-intro { display: grid; grid-template-columns: minmax(0,1.55fr) minmax(0,1fr); align-items: end; gap: 64px; margin-bottom: 40px; }
h1 { font-size: clamp(48px,5.5vw,80px); font-weight: 650; line-height: 1.13; letter-spacing: -.065em; }
h1 span { display: block; }
.accent { color: var(--story-accent); }
.hero-description { max-width: 440px; margin: 0 0 22px; font-size: 17px; line-height: 1.85; color: var(--vp-c-text-2); }
.pi-button { display: inline-flex; justify-content: center; align-items: center; gap: 32px; min-height: 48px; padding: 13px 24px; border: 1px solid transparent; border-radius: 7px; background: #0869d6; color: #fff; font-size: 14px; font-weight: 600; line-height: 1.5; transition: background .15s; }
.pi-button:hover { background: #0559ba; }
.pi-button span { font-size: 19px; }
a:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 5px; }
.platform-note { margin: 10px 0 18px; color: var(--vp-c-text-2); font-size: 11px; letter-spacing: .03em; }
.text-link { display: inline-flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 500; color: var(--vp-c-text-1); }
.text-link:hover { color: var(--story-accent); }
.hero-shot :deep(a) { border-radius: 14px; box-shadow: 0 24px 72px -40px #0a254070; }
.hero-shot :deep(figcaption) { margin: 14px 0 0; box-shadow: none; }
.flow-intro { display: grid; grid-template-columns: 1.1fr 1fr; align-items: start; gap: 80px; padding: 90px 0 62px; border-bottom: 1px solid var(--vp-c-divider); scroll-margin-top: 96px; }
.flow-intro h2 { margin-bottom: 18px; font-size: clamp(24px,2.4vw,34px); line-height: 1.35; font-weight: 600; letter-spacing: -.045em; }
.flow-intro p:not(.eyebrow) { max-width: 510px; font-size: 15px; line-height: 1.9; color: var(--vp-c-text-2); }
.flow-steps { padding-top: 8px; }
.flow-steps a { display: flex; gap: 22px; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--vp-c-divider); font-size: 17px; font-weight: 500; }
.flow-steps a:first-child { padding-top: 0; }
.flow-steps a:last-child { border-bottom: 0; }
.flow-steps a span:first-child { color: var(--story-accent); font-size: 11px; font-variant-numeric: tabular-nums; }
.flow-steps a span:last-child { margin-left: auto; color: var(--vp-c-text-2); }
.flow-steps a:hover { color: var(--story-accent); }
.story-chapter { padding: 82px 0; border-bottom: 1px solid var(--vp-c-divider); scroll-margin-top: 64px; }
.chapter-copy { display: grid; grid-template-columns: minmax(0,.78fr) minmax(0,1.35fr); align-items: start; gap: 70px; margin-bottom: 36px; }
.chapter-number { display: inline-grid; place-items: center; width: 28px; height: 28px; border: 1px solid var(--vp-c-divider); border-radius: 50%; color: var(--story-accent); font-size: 10px; letter-spacing: 0; }
.chapter-copy h2,.story-video h2 { margin-bottom: 24px; font-size: clamp(28px,3.1vw,43px); font-weight: 600; line-height: 1.3; letter-spacing: -.05em; white-space: pre-line; }
.chapter-detail>p:not(.eyebrow),.story-video>div>p:not(.eyebrow) { color: var(--vp-c-text-2); font-size: 15px; line-height: 1.95; }
.chapter-copy blockquote { display: flex; align-items: start; gap: 14px; margin-top: 28px; padding: 18px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); font-size: 13px; line-height: 1.8; }
blockquote span { color: var(--story-accent); }
.work-package { display: flex; align-items: center; gap: 18px; margin-top: 25px; padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); }
.work-package svg { width: 32px; height: 40px; flex-shrink: 0; color: var(--story-accent); }
.work-package strong { display: block; font-size: 24px; font-weight: 500; letter-spacing: -.04em; }
.work-package span { color: var(--vp-c-text-2); font-size: 12px; }
.package-contents { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 16px; list-style: none; color: var(--vp-c-text-2); font-size: 11px; }
.package-contents li::before { content: '↗'; margin-right: 6px; color: var(--story-accent); }
.chapter-copy p.chapter-note { margin-top: 12px; font-size: 11px; }
.story-video { display: grid; grid-template-columns: minmax(0,.7fr) minmax(0,1.3fr); align-items: center; gap: 80px; padding: 82px 0; }
.story-video :deep(.product-demo) { min-width: 0; margin: 0; }
.story-end { position: relative; overflow: hidden; padding: 70px 60px; border: 1px solid var(--vp-c-divider); border-radius: 14px; background: radial-gradient(ellipse at 100% 100%,#6edcf32b,transparent 65%),var(--vp-c-bg-soft); }
.story-end h2 { max-width: 780px; margin-bottom: 22px; font-size: clamp(32px,4vw,54px); font-weight: 600; line-height: 1.3; letter-spacing: -.055em; white-space: pre-line; }
.story-end>p:not(.eyebrow) { max-width: 650px; color: var(--vp-c-text-2); font-size: 15px; line-height: 1.9; }
.end-actions { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin-top: 28px; }
@media(min-width:1440px) { .home-story { padding-top: 68px; } }
@media(max-width:1023px) { .home-story { padding-top: 42px; } .hero-intro { gap: 40px; } h1 { font-size: 55px; } .hero-description { font-size: 15px; } .flow-intro { gap: 44px; } .story-chapter,.story-video { gap: 32px; padding: 64px 0; } .chapter-copy { gap: 32px; } .chapter-copy h2,.story-video h2 { font-size: 30px; } }
@media(max-width:767px) { .home-story { padding: 30px 24px 48px; } .eyebrow { font-size: 10px; margin-bottom: 20px; letter-spacing: .1em; } .hero-intro { grid-template-columns: 1fr; gap: 24px; margin-bottom: 28px; } h1 { font-size: clamp(42px,9vw,64px); line-height: 1.12; } .hero-description { max-width: 560px; font-size: 15px; margin-bottom: 18px; } .hero-aside .text-link { margin-left: 0; } .hero-shot :deep(a) { border-radius: 8px; } .flow-intro { grid-template-columns: 1fr; gap: 28px; padding: 56px 0 36px; } .flow-intro h2 { font-size: 28px; } .story-chapter,.story-video { grid-template-columns: 1fr; gap: 28px; padding: 48px 0; } .chapter-copy { grid-template-columns: 1fr; gap: 0; margin-bottom: 24px; } .chapter-copy h2,.story-video h2 { font-size: 34px; } .chapter-copy blockquote { margin-top: 20px; } .story-end { padding: 36px 26px; } .story-end h2 { font-size: 34px; } }
@media(prefers-reduced-motion:reduce) { .pi-button { transition: none; } }
</style>
