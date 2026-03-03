import { ArrowRight, Minus, Plus, ShoppingCart, X } from 'lucide-react'
import type { CartLine } from '../../types'
import { formatPrice } from '../../utils/format'

type CartAsideProps = {
  isOpen: boolean
  lines: CartLine[]
  subtotal: number
  onClose: () => void
  onRemoveItem: (productId: string) => void
  onChangeQty: (productId: string, quantity: number) => void
  onGoCart: () => void
  onCheckout: () => void
}

export function CartAside({ isOpen, lines, subtotal, onClose, onRemoveItem, onChangeQty, onGoCart, onCheckout }: CartAsideProps) {
  return (
    <div className={`cart-aside-overlay ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <button type="button" className="cart-aside-backdrop" onClick={onClose} aria-label="Fechar carrinho lateral" />

      <aside className="cart-aside-panel" aria-label="Carrinho lateral">
        <header className="cart-aside-header">
          <h2>Seu carrinho</h2>
          <button type="button" className="cart-aside-close" onClick={onClose} aria-label="Fechar carrinho">
            <X size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-aside-empty">
            <p>Nenhum item no carrinho.</p>
            <p>Adicione produtos para continuar.</p>
          </div>
        ) : (
          <>
            <div className="cart-aside-list">
              {lines.map((line) => (
                <article className="cart-aside-item" key={line.id}>
                  <div className="placeholder-media cart-aside-thumb" role="img" aria-label={`Placeholder de ${line.name}`}>
                    IMG
                  </div>
                  <div className="cart-aside-item-content">
                    <h3>{line.name}</h3>
                    <p>
                      {line.quantity} x {formatPrice(line.price)}
                    </p>
                    <div className="cart-aside-qty">
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => onChangeQty(line.id, line.quantity - 1)}
                        aria-label={`Diminuir quantidade de ${line.name}`}
                      >
                        <Minus size={14} strokeWidth={2.2} aria-hidden="true" />
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => onChangeQty(line.id, line.quantity + 1)}
                        aria-label={`Aumentar quantidade de ${line.name}`}
                      >
                        <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-aside-remove"
                    onClick={() => onRemoveItem(line.id)}
                    aria-label={`Remover ${line.name}`}
                  >
                    <X size={14} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>

            <footer className="cart-aside-footer">
              <p>
                Subtotal: <strong>{formatPrice(subtotal)}</strong>
              </p>
              <div className="cart-aside-actions">
                <button type="button" className="cart-aside-action secondary" onClick={onGoCart}>
                  <ShoppingCart size={15} strokeWidth={2.2} aria-hidden="true" />
                  <span>VER CARRINHO</span>
                </button>
                <button type="button" className="cart-aside-action primary" onClick={onCheckout}>
                  <span>FINALIZAÇÃO DE COMPRA</span>
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
