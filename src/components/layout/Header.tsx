import { ChevronDown, Search, ShoppingCart, UserRound } from 'lucide-react'
import { navItems } from '../../data/siteData'
import { PATHS } from '../../routes/paths'
import { formatPrice } from '../../utils/format'

type HeaderProps = {
  pathname: string
  cartSubtotal: number
  cartCount: number
  onGoHome: () => void
  onGoProducts: () => void
  onGoBlog: () => void
  onGoContact: () => void
  onGoAccount: () => void
  onToggleCart: () => void
}

export function Header({
  pathname,
  cartSubtotal,
  cartCount,
  onGoHome,
  onGoProducts,
  onGoBlog,
  onGoContact,
  onGoAccount,
  onToggleCart,
}: HeaderProps) {
  const isHomePath = pathname === PATHS.home
  const isProductsPath = pathname === PATHS.products || pathname.startsWith(`${PATHS.products}/`)
  const isBlogPath = pathname === PATHS.blog || pathname.startsWith(`${PATHS.blog}/`)
  const isContactPath = pathname === PATHS.contact

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand brand-button" type="button" onClick={onGoHome} aria-label="Enjoy Home & Wear">
          <span className="brand-icon" aria-hidden="true">
            E
          </span>
          <span className="brand-text">
            <span className="brand-name">ENJOY</span>
            <span className="brand-tagline">HOME & WEAR</span>
          </span>
        </button>

        <nav className="main-nav" aria-label="Navegação principal">
          <ul>
            {navItems.map((item) => {
              const isHome = item === 'HOME' && isHomePath
              const isProducts = item === 'PRODUTOS' && isProductsPath
              const isBlog = item === 'BLOG' && isBlogPath
              const isContact = item === 'FALE CONOSCO' && isContactPath
              const isActive = isHome || isProducts || isBlog || isContact

              const onClick =
                item === 'HOME'
                  ? onGoHome
                  : item === 'PRODUTOS'
                    ? onGoProducts
                    : item === 'BLOG'
                      ? onGoBlog
                      : onGoContact

              return (
                <li key={item}>
                  <button type="button" className={`nav-link ${isActive ? 'is-active' : ''}`} onClick={onClick}>
                    <span>{item}</span>
                    {item === 'PRODUTOS' ? <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" /> : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <button type="button" className="account-button" onClick={onGoAccount}>
            <UserRound size={16} strokeWidth={2.2} aria-hidden="true" />
            <span>Minha Conta</span>
          </button>
          <button type="button" className="cart-button cart-header-button" onClick={onToggleCart}>
            <ShoppingCart size={16} strokeWidth={2.2} aria-hidden="true" />
            <span>{formatPrice(cartSubtotal)}</span>
            <span className="cart-count-badge" aria-label={`${cartCount} itens no carrinho`}>
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      <div className="search-strip">
        <div className="container search-row">
          <input type="search" placeholder="Pesquisar..." />
          <button type="button" aria-label="Pesquisar">
            <Search size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
