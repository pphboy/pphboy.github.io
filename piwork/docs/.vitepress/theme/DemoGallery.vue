<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import DemoPlayer from './DemoPlayer.vue'
import downloads from './demo-downloads.json'

const { lang } = useData()
const chinese = computed(() => lang.value.startsWith('zh'))
const locale = computed(() => chinese.value ? 'zh' : 'en')
const guide = computed(() => withBase(`${chinese.value ? '/zh' : ''}/guide/first-work.html`))
const demos = computed(() => [
  {
    id: 'video-planner', number: '01', title: chinese.value ? '视频策划' : 'Video Planner',
    subtitle: chinese.value ? '让灵感有条理，让故事有节奏。' : 'A little structure. A better story.',
    description: chinese.value ? '把想法整理成分镜，逐张打磨脚本、画面和节奏。在全片总览中看清故事的顺序，再切换聚焦阅读，专心预演下一条视频。' : 'Turn an idea into scenes, refine the script and visual direction, then review the whole story. Switch to focus reading when it is time to rehearse.',
    tags: chinese.value ? ['故事板', '脚本与留言', '聚焦阅读'] : ['Storyboard', 'Scripts & notes', 'Focus reading'],
    slides: [
      { file: '01_projects', title: chinese.value ? '视频库' : 'Projects', description: chinese.value ? '所有策划集中在一起，从一个故事开始。' : 'Your plans in one place. Choose a story to begin.' },
      { file: '02_storyboard', title: chinese.value ? '故事板' : 'Storyboard', description: chinese.value ? '拖动分镜安排顺序，在同一张卡片里修改脚本和拍摄备注。' : 'Arrange scenes, refine the script and keep production notes together.' },
      { file: '03_overview', title: chinese.value ? '全片总览' : 'Overview', description: chinese.value ? '从开场到收尾，看清整条视频的顺序与节奏。' : 'See the running order and pacing from the hook to the final scene.' },
      { file: '04_focus', title: chinese.value ? '聚焦阅读' : 'Focus reading', description: chinese.value ? '一次只看当前一幕，保留右侧 Agent 对话，随时继续打磨。' : 'Rehearse one scene at a time, with Agent Chat still by your side.' },
      { file: '05_workbench_chat', title: chinese.value ? '与 Pi 一起创作' : 'Create with Pi', description: chinese.value ? '应用与助手在同一个 Work 中，围绕同一个故事继续工作。' : 'Keep the app and the conversation in the same Work, ready for your next idea.' }
    ]
  },
  {
    id: 'kanban', number: '02', title: chinese.value ? '看板' : 'Kanban',
    subtitle: chinese.value ? '把下一步，看得更清楚。' : 'Make the next step clear.',
    description: chinese.value ? '把工作放进待办、进行中和已完成。按项目与标签聚焦任务，在详情里保留讨论，用甘特图安排开始与截止日期。' : 'Move work through To do, In progress and Done. Focus by project or label, keep discussion on each task, and plan start and due dates in Timeline.',
    tags: chinese.value ? ['拖拽看板', '项目与标签', '甘特图排期'] : ['Drag & drop', 'Projects & labels', 'Timeline'],
    slides: [
      { file: '01_board', title: chinese.value ? '全局看板' : 'Board', description: chinese.value ? '三列状态、一份清晰的任务进度，拖动卡片即可推进工作。' : 'Three columns and one clear view of progress. Drag a card to move work forward.' },
      { file: '02_project', title: chinese.value ? '项目聚焦' : 'Project focus', description: chinese.value ? '选择 Piwork 发布项目，专注这一轮要完成的任务。' : 'Select the Piwork launch project to focus on the work for this release.' },
      { file: '03_task_details', title: chinese.value ? '任务详情与讨论' : 'Task details & notes', description: chinese.value ? '描述、优先级、日期、标签和讨论，都留在任务上。' : 'Keep the description, priority, dates, labels and discussion attached to the task.' },
      { file: '04_timeline', title: chinese.value ? '甘特图排期' : 'Timeline', description: chinese.value ? '查看任务的起止时间，拖动色条调整排期。' : 'Review start and due dates, then drag task bars to adjust the schedule.' },
      { file: '05_labels', title: chinese.value ? '标签筛选' : 'Label filters', description: chinese.value ? '按设计、调研等标签筛选，把注意力放在当前这类工作上。' : 'Filter by Design, Research or another label to focus on related work.' }
    ]
  }
])
function pkg(id: string) { return downloads.demos.find(item => item.id === id)![locale.value] }
function available(id: string) { return Boolean(pkg(id).url) && pkg(id).ready }
function size(bytes: number) { return `${(bytes / 1000000).toFixed(0)} MB` }
</script>

<template>
  <main class="demo-gallery">
    <header class="gallery-intro">
      <p class="gallery-eyebrow">PIWORK / DEMOS</p>
      <h1>{{ chinese ? '看看它能做什么。' : 'See what you can make.' }}</h1>
      <p class="gallery-lead">{{ chinese ? '两个真实运行的应用，一份可以带走的 Work。播放演示、下载体验，再让 Pi 把它变成适合你的工具。' : 'Two real apps. A Work you can take with you. Play the walkthrough, download a demo, then shape it into a tool of your own with Pi.' }}</p>
      <div class="gallery-jump"><a href="#video-planner">{{ chinese ? '视频策划' : 'Video Planner' }} <span aria-hidden="true">↘</span></a><a href="#kanban">{{ chinese ? '看板' : 'Kanban' }} <span aria-hidden="true">↘</span></a></div>
    </header>

    <section v-for="demo in demos" :id="demo.id" :key="demo.id" class="demo-section" :aria-labelledby="`${demo.id}-title`">
      <div class="demo-heading">
        <div><span class="demo-index">{{ demo.number }} / {{ chinese ? '可下载的 Work' : 'DOWNLOADABLE WORK' }}</span><h2 :id="`${demo.id}-title`">{{ demo.title }}</h2><p class="demo-subtitle">{{ demo.subtitle }}</p></div>
        <div class="demo-summary"><p>{{ demo.description }}</p><ul class="demo-tags"><li v-for="tag in demo.tags" :key="tag">{{ tag }}</li></ul></div>
      </div>
      <DemoPlayer :id="demo.id" :title="demo.title" :locale="locale" :chinese="chinese" :slides="demo.slides" />
      <div class="demo-download-row">
        <div class="demo-download-copy"><strong>{{ chinese ? '把这个 Work 带走' : 'Make this Work yours' }}</strong><p>{{ chinese ? '包含应用、示例数据和中文 Agent 对话。' : 'Includes the app, example data and English Agent Chat.' }}</p><span>{{ pkg(demo.id).file }} · {{ size(pkg(demo.id).bytes) }} · {{ pkg(demo.id).source }}</span></div>
        <div class="demo-download-actions">
          <a v-if="available(demo.id)" class="demo-download" :href="pkg(demo.id).url!" target="_blank" rel="noopener noreferrer">{{ chinese ? '下载中文 Work（ZIP）' : 'Download English Work (ZIP)' }} <span aria-hidden="true">↓</span></a>
          <span v-else class="demo-download disabled" aria-disabled="true">{{ chinese ? (pkg(demo.id).url ? '中文版正在上传' : '中文分享链接待补充') : 'English download uploading' }}</span>
          <a v-if="!chinese && available(demo.id)" class="demo-checksum" :href="`${pkg(demo.id).url}.sha256`">SHA-256 ↗</a>
          <span v-else class="demo-checksum">{{ chinese ? (pkg(demo.id).url ? '123云盘分享下载' : '123云盘 · 分享链接即将补充') : 'GitHub Releases · Upload in progress' }}</span>
        </div>
      </div>
      <details class="demo-integrity"><summary>{{ chinese ? '文件完整性' : 'File integrity' }}</summary><p>ZIP · SHA-256</p><code>{{ pkg(demo.id).sha256 }}</code><p>.work · SHA-256</p><code>{{ pkg(demo.id).workSha256 }}</code></details>
    </section>

    <section class="demo-start" aria-labelledby="import-demo"><div><p class="gallery-eyebrow">{{ chinese ? '下载之后' : 'AFTER DOWNLOADING' }}</p><h2 id="import-demo">{{ chinese ? '导入，然后继续做。' : 'Import it. Keep going.' }}</h2></div><ol><li>{{ chinese ? '解压下载的 ZIP，在 Piwork 中导入其中的 .work 文件。' : 'Extract the ZIP, then choose Import in Piwork and open the .work file inside.' }}</li><li>{{ chinese ? '点击启动，等待应用就绪，打开 Service。' : 'Click Start, wait for the app to become ready, and open Services.' }}</li><li>{{ chinese ? '切到 Agent 的 Session 3，查看对应语言的简短演示对话。' : 'Choose Agent Session 3 for the short English demo conversation.' }}</li></ol><p>{{ chinese ? '需要兼容的 Piwork 环境，并配置自己的 AI 模型凭据。同名 Work 已存在时，导入时换一个名称。' : 'Use a compatible Piwork installation and configure your own model credentials. Choose another name if the Work already exists.' }} <a :href="guide">{{ chinese ? '查看导入说明 →' : 'Import guide →' }}</a></p></section>
  </main>
</template>

<style scoped>
.demo-gallery{max-width:1160px;margin:0 auto;padding:82px 36px 88px;color:var(--vp-c-text-1)}
.gallery-eyebrow{margin:0 0 18px;font-size:11px;font-weight:600;letter-spacing:.18em;color:var(--vp-c-brand-1)}
.gallery-intro h1{margin:0;font-size:clamp(34px,4.5vw,58px);line-height:1.14;letter-spacing:-.045em;font-weight:650}
.gallery-lead{max-width:640px;margin:24px 0 0;font-size:17px;line-height:1.9;color:var(--vp-c-text-2)}
.gallery-jump{display:flex;gap:28px;margin:28px 0 0}.gallery-jump a{display:flex;gap:24px;font-size:13px;font-weight:500;color:var(--vp-c-brand-1)}
.demo-section{padding-top:86px;scroll-margin-top:30px}.demo-heading{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:end;margin-bottom:26px}
.demo-index{font-size:10px;letter-spacing:.13em;color:var(--vp-c-text-3)}.demo-heading h2{margin:12px 0 7px;font-size:34px;line-height:1.2;letter-spacing:-.035em;font-weight:600}.demo-subtitle{font-size:15px;color:var(--vp-c-text-2);margin:0}
.demo-summary>p{font-size:13px;line-height:1.9;color:var(--vp-c-text-2);margin:0}.demo-tags{display:flex;flex-wrap:wrap;gap:7px;list-style:none;margin:14px 0 0;padding:0}.demo-tags li{padding:3px 9px;border:1px solid var(--vp-c-divider);border-radius:5px;font-size:10px;color:var(--vp-c-text-3)}
.demo-download-row{display:flex;align-items:center;justify-content:space-between;gap:30px;padding:25px 0 0}.demo-download-copy strong{font-size:15px;font-weight:600}.demo-download-copy p{font-size:13px;color:var(--vp-c-text-2);margin:5px 0}.demo-download-copy>span{font-size:11px;font-variant-numeric:tabular-nums;color:var(--vp-c-text-3)}
.demo-download-actions{display:flex;align-items:flex-end;flex-direction:column;gap:7px}.demo-download{display:flex;justify-content:space-between;gap:28px;align-items:center;padding:12px 18px;border-radius:7px;background:var(--vp-button-brand-bg);color:var(--vp-button-brand-text);font-size:13px;font-weight:500;white-space:nowrap}.demo-download:hover{background:var(--vp-button-brand-hover-bg)}.demo-download.disabled{background:var(--vp-c-bg-soft);color:var(--vp-c-text-3);border:1px solid var(--vp-c-divider);cursor:default}
.demo-checksum{font-size:10px;color:var(--vp-c-text-3)}.demo-integrity{margin-top:16px;padding-bottom:25px;border-bottom:1px solid var(--vp-c-divider);font-size:10px;color:var(--vp-c-text-3)}.demo-integrity summary{cursor:pointer}.demo-integrity code{display:block;overflow-wrap:anywhere;font-size:10px;margin-top:9px;line-height:1.8}
.demo-start{margin-top:72px;padding:32px;background:var(--vp-c-bg-soft);border-radius:12px;display:grid;grid-template-columns:1fr 1.2fr;column-gap:50px}.demo-start .gallery-eyebrow{margin:0 0 12px}.demo-start h2{font-size:25px;letter-spacing:-.035em;line-height:1.25;font-weight:600;margin:0}.demo-start ol{padding-left:18px;font-size:13px;color:var(--vp-c-text-2);line-height:1.9;margin:0}.demo-start li+li{margin-top:7px}.demo-start>p{grid-column:1/-1;margin:24px 0 0;font-size:11px;color:var(--vp-c-text-3);line-height:1.9}.demo-start a{color:var(--vp-c-brand-1);white-space:nowrap}
@media(max-width:760px){.demo-gallery{padding:48px 22px 60px}.gallery-lead{font-size:15px}.demo-section{padding-top:56px}.demo-heading{grid-template-columns:1fr;gap:16px}.demo-heading h2{font-size:29px}.demo-download-row{align-items:flex-start;gap:20px;flex-direction:column}.demo-download-actions{align-items:flex-start}.demo-start{grid-template-columns:1fr;padding:24px;gap:23px}.demo-start>p{margin:0}.gallery-jump{gap:22px}.gallery-jump a{gap:14px}}
</style>
