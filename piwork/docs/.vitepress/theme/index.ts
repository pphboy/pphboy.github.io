import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ProductDemo from './ProductDemo.vue'
import HomeStory from './HomeStory.vue'
import WorkShot from './WorkShot.vue'
import DownloadOptions from './DownloadOptions.vue'
import LauncherVersion from './LauncherVersion.vue'
import DemoGallery from './DemoGallery.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProductDemo', ProductDemo)
    app.component('HomeStory', HomeStory)
    app.component('WorkShot', WorkShot)
    app.component('DownloadOptions', DownloadOptions)
    app.component('LauncherVersion', LauncherVersion)
    app.component('DemoGallery', DemoGallery)
  }
} satisfies Theme
