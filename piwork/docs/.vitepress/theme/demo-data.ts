import catalog from './demo-catalog.json'
import downloads from './demo-downloads.json'
export type DemoLocale = 'zh' | 'en'
export type Demo = typeof catalog.demos[number]
export { catalog, downloads }
export const filterStorageKey = 'piwork.demo.filters'
export const categoryLabel = (id: string, locale: DemoLocale) => catalog.categories.find(item => item.id === id)?.label[locale] ?? id
export const tagLabel = (id: string, locale: DemoLocale) => catalog.tags.find(item => item.id === id)?.label[locale] ?? id
export const demoById = (id: string) => catalog.demos.find(item => item.id === id)
export const packageFor = (id: string, locale: DemoLocale) => downloads.demos.find(item => item.id === id)![locale]
export const downloadAvailable = (id: string, locale: DemoLocale) => Boolean(packageFor(id, locale).url) && packageFor(id, locale).ready
export const demoPath = (id: string, locale: DemoLocale) => `${locale === 'zh' ? '/zh' : ''}/demos/${id}.html`
export const galleryPath = (locale: DemoLocale) => `${locale === 'zh' ? '/zh' : ''}/demos/`
export const imagePath = (id: string, locale: DemoLocale, name = 'cover') => `/demos/${id}/${locale}/${name}_${locale}.png`
export const packageSize = (bytes: number) => `${(bytes / 1000000).toFixed(0)} MB`
