import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CartAside } from './components/cart/CartAside'
import { ContactStrip } from './components/layout/ContactStrip'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { blogPosts } from './data/siteData'
import { allProducts } from './data/siteData'
import { useAuth } from './hooks/useAuth'
import { useCart } from './hooks/useCart'
import { AppRoutes } from './routes/AppRoutes'
import { PATHS, buildBlogPostPath, buildCategoryPath } from './routes/paths'
import './App.css'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const { cartLines, cartCount, cartSubtotal, addToCart, removeFromCart, changeCartQuantity } = useCart(allProducts)
  const {
    isAuthenticated,
    currentUser,
    registerAccount,
    loginAccount,
    updateAccountData,
    verifyCurrentUserData,
    logoutAccount,
  } = useAuth()

  useEffect(() => {
    if (!isCartOpen) return

    const previousOverflow = document.body.style.overflow
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCartOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isCartOpen])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const openHome = () => {
    navigate(PATHS.home)
  }

  const openCategory = (categoryName: string) => {
    navigate(buildCategoryPath(categoryName))
  }

  const openDefaultCategory = () => {
    navigate(PATHS.products)
  }

  const openBlog = () => {
    navigate(PATHS.blog)
  }

  const openPost = (postId: string) => {
    navigate(buildBlogPostPath(postId))
  }

  const openContact = () => {
    navigate(PATHS.contact)
  }

  const openAccount = () => {
    navigate(PATHS.account)
  }

  const openCartPage = () => {
    navigate(PATHS.cart)
    setIsCartOpen(false)
  }

  const toggleCartAside = () => {
    setIsCartOpen((current) => !current)
  }

  const closeCartAside = () => {
    setIsCartOpen(false)
  }

  const handleAddToCart = (productId: string) => {
    addToCart(productId)
    setIsCartOpen(true)
  }

  const goToCheckout = () => {
    navigate(PATHS.checkout)
    setIsCartOpen(false)
  }

  return (
    <div className="page">
      <Header
        pathname={location.pathname}
        cartSubtotal={cartSubtotal}
        cartCount={cartCount}
        onGoHome={openHome}
        onGoProducts={openDefaultCategory}
        onGoBlog={openBlog}
        onGoContact={openContact}
        onGoAccount={openAccount}
        onToggleCart={toggleCartAside}
      />

      <AppRoutes
        blogPosts={blogPosts}
        cartLines={cartLines}
        cartSubtotal={cartSubtotal}
        onOpenCategory={openCategory}
        onAddToCart={handleAddToCart}
        onOpenPost={openPost}
        onBackToBlog={openBlog}
        onChangeQty={changeCartQuantity}
        onRemoveItem={removeFromCart}
        onGoProducts={openDefaultCategory}
        onGoCheckout={goToCheckout}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onRegisterAccount={registerAccount}
        onLoginAccount={loginAccount}
        onUpdateAccountData={updateAccountData}
        onVerifyCurrentUserData={verifyCurrentUserData}
        onLogoutAccount={logoutAccount}
      />

      <ContactStrip />
      <Footer />

      <CartAside
        isOpen={isCartOpen}
        lines={cartLines}
        subtotal={cartSubtotal}
        onClose={closeCartAside}
        onRemoveItem={removeFromCart}
        onChangeQty={changeCartQuantity}
        onGoCart={openCartPage}
        onCheckout={goToCheckout}
      />
    </div>
  )
}

export default App
