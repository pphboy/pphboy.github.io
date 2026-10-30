<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import release from './download-release.json'
import LauncherVersion from './LauncherVersion.vue'
const { lang } = useData()
const chinese = computed(() => lang.value.startsWith('zh'))
const asset = (file: string) => `https://github.com/pphboy/piwork-microvm/releases/download/v${release.version}/${file}`
const guide = computed(() => withBase(`${chinese.value ? '/zh' : ''}/guide/quick-start.html`))
</script>

<template>
  <div class="download-options">
    <LauncherVersion />
    <div class="download-grid">
      <section v-for="platform in release.platforms" :key="platform.id" class="download-card" :aria-labelledby="`download-${platform.id}`">
        <svg v-if="platform.id === 'windows'" class="platform-icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4.5 11 3v8H2zm10-1.7L22 1v10H12zM2 12h9v8L2 18.5zm10 0h10v11l-10-1.8z"/></svg>
        <svg v-else class="platform-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4M6 8l3 2-3 2m6 0h4"/></svg>
        <h2 :id="`download-${platform.id}`">{{ platform.label }}</h2>
        <p class="download-requirement">{{ platform.id === 'windows' ? 'Windows 11 · x86-64' : 'Linux · x86-64' }}</p>
        <a class="download-button" :href="asset(platform.file)">{{ chinese ? `下载 ${platform.label} 版` : `Download for ${platform.label}` }}<span aria-hidden="true">↓</span></a>
        <p class="download-size">{{ (platform.sizeBytes / 1000000).toFixed(0) }} MB · {{ chinese ? '桌面启动器' : 'Desktop launcher' }}</p>
        <a class="checksum-link" :href="asset(`${platform.file}.sha256`)">{{ chinese ? '下载 SHA256 校验文件' : 'Download SHA256 checksum' }} ↗</a>
      </section>
    </div>
    <p class="download-next">{{ chinese ? '下载后，打开启动器并点击 Start Piwork。' : 'After downloading, open the launcher and click Start Piwork.' }} <a :href="guide">{{ chinese ? '按照快速开始继续 →' : 'Continue with Quick Start →' }}</a></p>
    <details class="download-requirements"><summary>{{ chinese ? '下载前：确认系统要求' : 'Before downloading: check system requirements' }}</summary>
      <ul>
        <li>{{ chinese ? 'Windows：Windows 11 x86-64，固件虚拟化及 Windows Hypervisor Platform 已开启，已安装 WebView2 Runtime。' : 'Windows: Windows 11 x86-64, firmware virtualization and Windows Hypervisor Platform enabled, with WebView2 Runtime installed.' }}</li>
        <li>{{ chinese ? 'Linux：可读写 /dev/kvm，已安装 GTK 3、WebKitGTK 4.1 和系统浏览器启动工具。' : 'Linux: read/write access to /dev/kvm, GTK 3, WebKitGTK 4.1, and a system browser launcher.' }}</li>
        <li>{{ chinese ? '默认使用 2 vCPU、4 GiB 内存；安装目录至少有 4 GiB 可用空间，另留 1 GiB 解包空间。' : 'Defaults: 2 vCPU and 4 GiB RAM. Allow at least 4 GiB free in the installation directory plus 1 GiB for resource extraction.' }}</li>
        <li>{{ chinese ? '首次进入 Piwork 时，按页面提示创建管理员并配置自己的 AI 模型凭据。' : 'On first use, follow Piwork’s setup to create an administrator and configure your own AI model credentials.' }}</li>
      </ul>
    </details>
    <p class="release-links"><a :href="release.releaseUrl" target="_blank" rel="noopener noreferrer">{{ chinese ? '发行说明' : 'Release notes' }} ↗</a><a :href="release.checksumsUrl">SHA256SUMS ↗</a></p>
  </div>
</template>

<style scoped>
.download-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 20px; margin: 26px 0; }
.download-card { min-width: 0; padding: 30px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.platform-icon { width: 30px; height: 30px; margin-bottom: 20px; color: var(--vp-c-brand-1); }
.download-card h2 { margin: 0; padding: 0; border: 0; font-size: 26px; }
.download-card p.download-requirement { margin: 8px 0 26px; font-size: 13px; color: var(--vp-c-text-2); }
.download-button { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 16px; border-radius: 6px; background: #0869d6; color: #fff; font-size: 14px; text-decoration: none; }
.download-button:hover { background: #0559ba; color: #fff; }
.download-card p.download-size { margin: 12px 0 4px; color: var(--vp-c-text-2); font-size: 12px; }
.checksum-link { font-size: 11px; }
.download-next { font-size: 14px; line-height: 1.9; }
.download-requirements { margin: 28px 0; padding: 18px 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; font-size: 13px; }
summary { cursor: pointer; font-weight: 500; }
.release-links { display: flex; flex-wrap: wrap; gap: 20px; font-size: 12px; }
@media(max-width:640px) { .download-grid { grid-template-columns: 1fr; } .download-card { padding: 24px; } }
</style>
