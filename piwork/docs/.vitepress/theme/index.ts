import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ProductDemo from './ProductDemo.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProductDemo', ProductDemo)
  }
} satisfies Theme
