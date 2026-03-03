import { Navigate, Route, Routes } from 'react-router-dom'
import type { AuthUser, AuthVerifyResult, BlogPost, CartLine } from '../types'
import { BlogPage } from '../pages/blog/BlogPage'
import { PostRoutePage } from '../pages/blog/PostPage'
import { AboutPage } from '../pages/about/AboutPage'
import { CartPage } from '../pages/cart/CartPage'
import { CheckoutPage } from '../pages/checkout/CheckoutPage'
import { ContactPage } from '../pages/contact/ContactPage'
import { HomePage } from '../pages/home/HomePage'
import { CategoryRoutePage } from '../pages/products/CategoryPage'
import { AccountPage } from '../pages/account/AccountPage'
import { PATHS } from './paths'

type AppRoutesProps = {
  blogPosts: BlogPost[]
  cartLines: CartLine[]
  cartSubtotal: number
  onOpenCategory: (categoryName: string) => void
  onAddToCart: (productId: string) => void
  onOpenPost: (postId: string) => void
  onBackToBlog: () => void
  onChangeQty: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onGoProducts: () => void
  onGoCheckout: () => void
  isAuthenticated: boolean
  currentUser: AuthUser | null
  onRegisterAccount: (payload: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
  }) => { ok: boolean; message: string }
  onLoginAccount: (payload: { email: string; password: string }) => { ok: boolean; message: string }
  onUpdateAccountData: (payload: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }) => { ok: boolean; message: string }
  onVerifyCurrentUserData: () => AuthVerifyResult
  onLogoutAccount: () => void
}

export function AppRoutes({
  blogPosts,
  cartLines,
  cartSubtotal,
  onOpenCategory,
  onAddToCart,
  onOpenPost,
  onBackToBlog,
  onChangeQty,
  onRemoveItem,
  onGoProducts,
  onGoCheckout,
  isAuthenticated,
  currentUser,
  onRegisterAccount,
  onLoginAccount,
  onUpdateAccountData,
  onVerifyCurrentUserData,
  onLogoutAccount,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route path={PATHS.root} element={<Navigate to={PATHS.home} replace />} />
      <Route path={PATHS.home} element={<HomePage onOpenCategory={onOpenCategory} />} />
      <Route path={PATHS.about} element={<AboutPage />} />
      <Route path={PATHS.products} element={<CategoryRoutePage onAddToCart={onAddToCart} />} />
      <Route path={`${PATHS.products}/:categorySlug`} element={<CategoryRoutePage onAddToCart={onAddToCart} />} />
      <Route path={PATHS.blog} element={<BlogPage posts={blogPosts} onOpenPost={onOpenPost} />} />
      <Route
        path={`${PATHS.blog}/:postId`}
        element={<PostRoutePage posts={blogPosts} onBackToBlog={onBackToBlog} onOpenPost={onOpenPost} />}
      />
      <Route path={PATHS.contact} element={<ContactPage />} />
      <Route
        path={PATHS.cart}
        element={
          <CartPage
            lines={cartLines}
            subtotal={cartSubtotal}
            onChangeQty={onChangeQty}
            onRemoveItem={onRemoveItem}
            onGoProducts={onGoProducts}
            onGoCheckout={onGoCheckout}
          />
        }
      />
      <Route
        path={PATHS.checkout}
        element={<CheckoutPage lines={cartLines} subtotal={cartSubtotal} onGoProducts={onGoProducts} />}
      />
      <Route
        path={PATHS.account}
        element={
          <AccountPage
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            onRegisterAccount={onRegisterAccount}
            onLoginAccount={onLoginAccount}
            onUpdateAccountData={onUpdateAccountData}
            onVerifyCurrentUserData={onVerifyCurrentUserData}
            onLogoutAccount={onLogoutAccount}
          />
        }
      />
      <Route path="/produtos" element={<Navigate to={PATHS.products} replace />} />
      <Route path="/sobre" element={<Navigate to={PATHS.about} replace />} />
      <Route path="/sobre-a-enjoy" element={<Navigate to={PATHS.about} replace />} />
      <Route path="/fale-conosco" element={<Navigate to={PATHS.contact} replace />} />
      <Route path="/minha-conta" element={<Navigate to={PATHS.account} replace />} />
      <Route path="/carrinho" element={<Navigate to={PATHS.cart} replace />} />
      <Route path="/finalizar-compra" element={<Navigate to={PATHS.checkout} replace />} />
      <Route path="*" element={<Navigate to={PATHS.home} replace />} />
    </Routes>
  )
}
