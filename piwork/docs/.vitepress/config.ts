import { defineConfig, type DefaultTheme } from 'vitepress'

const description = 'Create. Evolve. Take it anywhere. A portable AI workspace for conversations, files, data, and running apps.'
const repository = 'https://github.com/pphboy/piwork'

function navigation(chinese: boolean): DefaultTheme.Config {
  const prefix = chinese ? '/zh' : ''
  const link = (path: string) => `${prefix}${path}`
  return {
    nav: [
      { text: chinese ? '工作方式' : 'How it works', link: link('/#how-it-works') },
      { text: chinese ? '下载' : 'Download', link: link('/guide/downloads.html') },
      { text: chinese ? '文档' : 'Docs', link: link('/guide/'), activeMatch: `^${prefix}/(guide/(?!downloads)|concepts/)` },
      { text: chinese ? '应用演示' : 'Demos', link: link('/demos/'), activeMatch: `^${prefix}/demos/` },
      { text: chinese ? '演示视频' : 'Video', link: link('/demo/product-demo.html'), activeMatch: `^${prefix}/demo/` },
      { text: 'GitHub', link: repository },
      { text: chinese ? '讨论社区' : 'Discussions', link: `${repository}/discussions` }
    ],
    sidebar: [
      { text: chinese ? '首页' : 'Home', link: link('/') },
      {
        text: chinese ? '开始使用' : 'Getting Started',
        items: [
          { text: chinese ? '概览' : 'Overview', link: link('/guide/') },
          { text: chinese ? '下载' : 'Downloads', link: link('/guide/downloads') },
          { text: chinese ? '快速开始' : 'Quick Start', link: link('/guide/quick-start') },
          { text: chinese ? '第一个 Work' : 'Your First Work', link: link('/guide/first-work') },
        ]
      },
      {
        text: chinese ? '核心概念' : 'Concepts',
        items: [
          { text: chinese ? '概览' : 'Overview', link: link('/concepts/') },
          { text: 'Work', link: link('/concepts/work') },
          { text: 'Service', link: link('/concepts/service') },
          { text: 'Harness', link: link('/concepts/harness') }
        ]
      },
      { text: chinese ? '演示' : 'Demos', items: [
        { text: chinese ? '视频策划与看板' : 'Video Planner & Kanban', link: link('/demos/') },
        { text: chinese ? '产品演示视频' : 'Product demo video', link: link('/demo/product-demo.html') },
        { text: 'Kanban Work', link: link('/demo/kanban') }
      ] },
      {
        text: chinese ? '规范' : 'Spec',
        items: [
          { text: chinese ? '状态与来源' : 'Status and Sources', link: link('/spec/') },
          { text: 'Work', link: link('/spec/work') },
          { text: 'Service', link: link('/spec/service') },
          { text: 'Harness', link: link('/spec/harness') }
        ]
      }
    ],
    outline: { level: [2, 3], label: chinese ? '本页目录' : 'On this page' },
    editLink: {
      pattern: 'https://github.com/pphboy/pphboy.github.io/edit/main/piwork/docs/:path',
      text: chinese ? '在 GitHub 上编辑此页' : 'Edit this page on GitHub'
    },
    footer: { message: chinese ? '以 Apache License 2.0 开源。' : 'Open source under the Apache License 2.0.' }
  }
}

export default defineConfig({
  lang: 'en-US',
  title: 'Piwork',
  description,
  base: '/piwork/',
  // Keep .html links: GitHub Pages has no configurable rewrite rules.
  cleanUrls: false,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/piwork/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/piwork/logo.png' }],
    ['meta', { property: 'og:site_name', content: 'Piwork' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: 'https://pphboy.github.io/piwork/logo.png' }]
  ],
  sitemap: { hostname: 'https://pphboy.github.io/piwork/' },
  locales: {
    root: { label: 'English', lang: 'en-US', themeConfig: navigation(false) },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '创造、演进，随处带走。将对话、文件、数据和运行中的应用保存在同一个 AI 工作空间。',
      head: [['meta', { property: 'og:description', content: '创造、演进，随处带走。将对话、文件、数据和运行中的应用保存在同一个 AI 工作空间。' }]],
      themeConfig: {
        ...navigation(true),
        docFooter: { prev: '上一页', next: '下一页' },
        sidebarMenuLabel: '目录',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
        skipToContentLabel: '跳转到正文',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    }
  },
  themeConfig: {
    logo: { src: '/logo.png', alt: 'Piwork' },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清除搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: { selectText: '选择', selectKeyAriaLabel: '回车', navigateText: '切换', navigateUpKeyAriaLabel: '上箭头', navigateDownKeyAriaLabel: '下箭头', closeText: '关闭', closeKeyAriaLabel: 'Esc' }
              }
            }
          }
        }
      }
    }
  }
})
