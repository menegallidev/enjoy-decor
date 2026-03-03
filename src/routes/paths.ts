import { slugifyCategory } from '../utils/category'

export const PATHS = {
  root: '/',
  home: '/home',
  about: '/about',
  products: '/products',
  blog: '/blog',
  contact: '/contact',
  account: '/account',
  cart: '/cart',
  checkout: '/checkout',
}

export function buildCategoryPath(categoryName: string) {
  return `${PATHS.products}/${slugifyCategory(categoryName)}`
}

export function buildBlogPostPath(postId: string) {
  return `${PATHS.blog}/${postId}`
}
