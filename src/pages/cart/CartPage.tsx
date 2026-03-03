import { CircleAlert, Minus, Plus, ShoppingBag, Truck, X } from 'lucide-react'
import { useState } from 'react'
import type { CartLine, FeedbackType } from '../../types'
import { formatPrice } from '../../utils/format'

type CartPageProps = {
  lines: CartLine[]
  subtotal: number
  onChangeQty: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onGoProducts: () => void
  onGoCheckout: () => void
}

export function CartPage({ lines, subtotal, onChangeQty, onRemoveItem, onGoProducts, onGoCheckout }: CartPageProps) {
  const [couponInput, setCouponInput] = useState<string>('')
  const [discountRate, setDiscountRate] = useState<number>(0)
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('info')

  const discountValue = subtotal * discountRate
  const total = Math.max(subtotal - discountValue + (shippingCost ?? 0), 0)

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase()

    if (!code) {
      setFeedbackMessage('Digite um código de cupom para aplicar.')
      setFeedbackType('error')
      return
    }

    if (code === 'ENJOY10') {
      setDiscountRate(0.1)
      setFeedbackMessage('Cupom ENJOY10 aplicado: 10% de desconto.')
      setFeedbackType('success')
      return
    }

    if (code === 'ENJOY15') {
      setDiscountRate(0.15)
      setFeedbackMessage('Cupom ENJOY15 aplicado: 15% de desconto.')
      setFeedbackType('success')
      return
    }

    if (code === 'FRETEGRATIS') {
      setShippingCost(0)
      setFeedbackMessage('Cupom FRETEGRATIS aplicado: frete zerado.')
      setFeedbackType('success')
      return
    }

    setFeedbackMessage('Cupom inválido. Tente ENJOY10, ENJOY15 ou FRETEGRATIS.')
    setFeedbackType('error')
  }

  const handleUpdateCart = () => {
    setFeedbackMessage('Carrinho atualizado com sucesso.')
    setFeedbackType('info')
  }

  const handleCalculateShipping = () => {
    setShippingCost(18)
    setFeedbackMessage('Entrega calculada para sua região.')
    setFeedbackType('info')
  }

  if (lines.length === 0) {
    return (
      <main className="main-content cart-page">
        <section className="container reveal delay-1">
          <h1>Carrinho</h1>
          <article className="cart-empty-card">
            <span className="cart-empty-icon" aria-hidden="true">
              <ShoppingBag size={30} strokeWidth={2.1} />
            </span>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos para visualizar subtotal e finalizar sua compra.</p>
            <button type="button" className="cart-empty-button" onClick={onGoProducts}>
              Ver produtos
            </button>
          </article>
        </section>
      </main>
    )
  }

  return (
    <main className="main-content cart-page">
      <section className="container reveal delay-1">
        <h1>Carrinho</h1>

        <div className="cart-gift-banner">GRÁTIS, CAIXA DE PRESENTE</div>

        <p className="cart-warning">
          <CircleAlert size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>Um item que não está mais disponível foi removido de seu carrinho.</span>
        </p>

        <div className="cart-page-layout">
          <section className="cart-main-card">
            <table className="cart-table">
              <thead>
                <tr>
                  <th aria-label="Remover item" />
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line) => (
                  <tr key={line.id}>
                    <td>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => onRemoveItem(line.id)}
                        aria-label={`Remover ${line.name}`}
                      >
                        <X size={16} strokeWidth={2.2} aria-hidden="true" />
                      </button>
                    </td>
                    <td className="cart-product-cell">
                      <div className="placeholder-media cart-thumb" role="img" aria-label={`Placeholder de ${line.name}`}>
                        IMG
                      </div>
                      <strong>{line.name}</strong>
                    </td>
                    <td>{formatPrice(line.price)}</td>
                    <td>
                      <div className="cart-qty-control">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => onChangeQty(line.id, line.quantity - 1)}
                          aria-label={`Diminuir quantidade de ${line.name}`}
                        >
                          <Minus size={14} strokeWidth={2.2} aria-hidden="true" />
                        </button>
                        <input
                          className="cart-row-input"
                          type="number"
                          min={1}
                          value={line.quantity}
                          onChange={(event) => onChangeQty(line.id, Number(event.target.value))}
                          aria-label={`Quantidade de ${line.name}`}
                        />
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => onChangeQty(line.id, line.quantity + 1)}
                          aria-label={`Aumentar quantidade de ${line.name}`}
                        >
                          <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                    <td>{formatPrice(line.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-actions-row">
              <input
                type="text"
                className="cart-coupon-input"
                placeholder="Código do cupom"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
              />
              <button type="button" className="cart-coupon-button" onClick={handleApplyCoupon}>
                Aplicar cupom
              </button>
              <button type="button" className="cart-update-button" onClick={handleUpdateCart}>
                Atualizar carrinho
              </button>
            </div>

            {feedbackMessage ? <p className={`cart-feedback ${feedbackType}`}>{feedbackMessage}</p> : null}
          </section>
          <aside className="cart-summary-card">
            <h2>Total no carrinho</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            {discountRate > 0 ? (
              <div className="cart-summary-row">
                <span>Desconto</span>
                <strong>- {formatPrice(discountValue)}</strong>
              </div>
            ) : null}
            <div className="cart-summary-row delivery-row">
              <span>Entrega</span>
              <div>
                {shippingCost === null ? <p>Digite seu endereço para ver as opções de entrega.</p> : null}
                {shippingCost !== null ? <p>Frete estimado: {formatPrice(shippingCost)}</p> : null}
                <button type="button" className="cart-ship-link" onClick={handleCalculateShipping}>
                  <Truck size={15} strokeWidth={2.2} aria-hidden="true" />
                  <span>Calcular entrega</span>
                </button>
              </div>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button type="button" className="cart-checkout-button" onClick={onGoCheckout}>
              Continuar para Finalização
            </button>
          </aside>
        </div>
      </section>
    </main>
  )
}
