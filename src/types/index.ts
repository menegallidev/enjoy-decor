export type Product = {
  id: string
  name: string
  price: number
}

export type CartItem = {
  productId: string
  quantity: number
}

export type CartLine = Product & {
  quantity: number
  lineTotal: number
}

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  content: string[]
}

export type FeedbackType = 'error' | 'success' | 'info'

export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
}

export type AuthStoredUser = AuthUser & {
  password: string
}

export type AuthCheck = {
  label: string
  valid: boolean
}

export type AuthVerifyResult = {
  valid: boolean
  checks: AuthCheck[]
}
