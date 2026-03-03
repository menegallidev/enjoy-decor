import { categoryItems, defaultCategoryName } from '../data/siteData'

export function slugifyCategory(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function resolveCategoryFromSlug(categorySlug?: string) {
  if (!categorySlug) return defaultCategoryName
  return categoryItems.find((item) => slugifyCategory(item) === categorySlug) ?? defaultCategoryName
}
