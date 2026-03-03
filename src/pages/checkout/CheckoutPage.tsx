import { CircleAlert, CreditCard } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { CartLine, FeedbackType } from '../../types'
import { formatPrice } from '../../utils/format'

type CheckoutFormData = {
  firstName: string
  lastName: string
  company: string
  country: string
  address1: string
  address2: string
  city: string
  state: string
  cep: string
  phone: string
  email: string
  shippingName: string
  shippingPhone: string
  orderNotes: string
}

type CheckoutPageProps = {
  lines: CartLine[]
  subtotal: number
  onGoProducts: () => void
}

export function CheckoutPage({ lines, subtotal, onGoProducts }: CheckoutPageProps) {
  const [showCouponField, setShowCouponField] = useState<boolean>(false)
  const [couponInput, setCouponInput] = useState<string>('')
  const [couponFeedback, setCouponFeedback] = useState<string>('')
  const [couponFeedbackType, setCouponFeedbackType] = useState<FeedbackType>('info')
  const [discountRate, setDiscountRate] = useState<number>(0)
  const [shipDifferentAddress, setShipDifferentAddress] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'pagseguro'>('bank')
  const [submitFeedback, setSubmitFeedback] = useState<string>('')
  const [submitFeedbackType, setSubmitFeedbackType] = useState<FeedbackType>('info')

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    company: '',
    country: 'Brasil',
    address1: '',
    address2: '',
    city: '',
    state: 'São Paulo',
    cep: '',
    phone: '',
    email: '',
    shippingName: '',
    shippingPhone: '',
    orderNotes: '',
  })

  const discountValue = subtotal * discountRate
  const total = Math.max(subtotal - discountValue, 0)

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (submitFeedback) setSubmitFeedback('')
  }

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase()

    if (!code) {
      setCouponFeedback('Digite um código de cupom para aplicar.')
      setCouponFeedbackType('error')
      return
    }

    if (code === 'ENJOY10') {
      setDiscountRate(0.1)
      setCouponFeedback('Cupom ENJOY10 aplicado: 10% de desconto.')
      setCouponFeedbackType('success')
      return
    }

    if (code === 'ENJOY15') {
      setDiscountRate(0.15)
      setCouponFeedback('Cupom ENJOY15 aplicado: 15% de desconto.')
      setCouponFeedbackType('success')
      return
    }

    setCouponFeedback('Cupom inválido. Tente ENJOY10 ou ENJOY15.')
    setCouponFeedbackType('error')
  }

  const handleSubmitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const requiredFields: Array<[keyof CheckoutFormData, string]> = [
      ['firstName', 'Nome'],
      ['lastName', 'Sobrenome'],
      ['country', 'País'],
      ['address1', 'Endereço'],
      ['city', 'Cidade'],
      ['state', 'Estado'],
      ['cep', 'CEP'],
      ['phone', 'Telefone'],
      ['email', 'Endereço de e-mail'],
    ]

    if (shipDifferentAddress) {
      requiredFields.push(['shippingName', 'Nome de quem recebe'])
      requiredFields.push(['shippingPhone', 'Celular do destinatário'])
    }

    const missingField = requiredFields.find(([field]) => formData[field].trim().length === 0)
    if (missingField) {
      setSubmitFeedback(`Preencha o campo obrigatório: ${missingField[1]}.`)
      setSubmitFeedbackType('error')
      return
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setSubmitFeedback('Informe um e-mail válido para concluir o pedido.')
      setSubmitFeedbackType('error')
      return
    }

    setSubmitFeedback('Pedido validado com sucesso! Prosseguimos com a confirmação de pagamento.')
    setSubmitFeedbackType('success')
  }

  if (lines.length === 0) {
    return (
      <main className="main-content checkout-page">
        <section className="container reveal delay-1">
          <h1>Finalizar compra</h1>
          <article className="checkout-empty-card">
            <h2>Nenhum item para finalizar</h2>
            <p>Adicione produtos ao carrinho para continuar com a finalização da compra.</p>
            <button type="button" className="checkout-empty-button" onClick={onGoProducts}>
              Ver produtos
            </button>
          </article>
        </section>
      </main>
    )
  }

  return (
    <main className="main-content checkout-page">
      <section className="container reveal delay-1">
        <h1>Finalizar compra</h1>

        <div className="checkout-coupon-toggle">
          <button type="button" onClick={() => setShowCouponField((current) => !current)}>
            <CircleAlert size={16} strokeWidth={2.2} aria-hidden="true" />
            <span>Você tem um cupom de desconto?</span>
            <strong>Clique aqui e informe o código do seu cupom de desconto</strong>
          </button>
        </div>

        {showCouponField ? (
          <div className="checkout-coupon-panel">
            <input
              type="text"
              placeholder="Código do cupom"
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
            />
            <button type="button" className="checkout-apply-button" onClick={handleApplyCoupon}>
              Aplicar cupom
            </button>
          </div>
        ) : null}
        {couponFeedback ? <p className={`checkout-feedback ${couponFeedbackType}`}>{couponFeedback}</p> : null}

        <form className="checkout-layout" onSubmit={handleSubmitOrder} noValidate>
          <section className="checkout-billing-card">
            <h2>Detalhes de cobrança</h2>

            <div className="checkout-grid-two">
              <label htmlFor="checkout-first-name">
                Nome <span>*</span>
              </label>
              <label htmlFor="checkout-last-name">
                Sobrenome <span>*</span>
              </label>
              <input
                id="checkout-first-name"
                type="text"
                value={formData.firstName}
                onChange={(event) => handleFieldChange('firstName', event.target.value)}
                autoComplete="given-name"
              />
              <input
                id="checkout-last-name"
                type="text"
                value={formData.lastName}
                onChange={(event) => handleFieldChange('lastName', event.target.value)}
                autoComplete="family-name"
              />
            </div>

            <label htmlFor="checkout-company">Nome da empresa (opcional)</label>
            <input
              id="checkout-company"
              type="text"
              value={formData.company}
              onChange={(event) => handleFieldChange('company', event.target.value)}
              autoComplete="organization"
            />

            <label htmlFor="checkout-country">
              País <span>*</span>
            </label>
            <select
              id="checkout-country"
              value={formData.country}
              onChange={(event) => handleFieldChange('country', event.target.value)}
            >
              <option>Brasil</option>
              <option>Argentina</option>
              <option>Chile</option>
              <option>Uruguai</option>
            </select>

            <label htmlFor="checkout-address1">
              Endereço <span>*</span>
            </label>
            <input
              id="checkout-address1"
              type="text"
              placeholder="Nome da rua e número da casa"
              value={formData.address1}
              onChange={(event) => handleFieldChange('address1', event.target.value)}
              autoComplete="address-line1"
            />

            <input
              id="checkout-address2"
              type="text"
              placeholder="Apartamento, suíte, sala, etc. (opcional)"
              value={formData.address2}
              onChange={(event) => handleFieldChange('address2', event.target.value)}
              autoComplete="address-line2"
            />

            <label htmlFor="checkout-city">
              Cidade <span>*</span>
            </label>
            <input
              id="checkout-city"
              type="text"
              value={formData.city}
              onChange={(event) => handleFieldChange('city', event.target.value)}
              autoComplete="address-level2"
            />

            <label htmlFor="checkout-state">
              Estado <span>*</span>
            </label>
            <select id="checkout-state" value={formData.state} onChange={(event) => handleFieldChange('state', event.target.value)}>
              <option>São Paulo</option>
              <option>Rio de Janeiro</option>
              <option>Minas Gerais</option>
              <option>Paraná</option>
              <option>Santa Catarina</option>
              <option>Rio Grande do Sul</option>
            </select>

            <label htmlFor="checkout-cep">
              CEP <span>*</span>
            </label>
            <input
              id="checkout-cep"
              type="text"
              value={formData.cep}
              onChange={(event) => handleFieldChange('cep', event.target.value)}
              autoComplete="postal-code"
            />

            <label htmlFor="checkout-phone">
              Telefone <span>*</span>
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={formData.phone}
              onChange={(event) => handleFieldChange('phone', event.target.value)}
              autoComplete="tel"
            />

            <label htmlFor="checkout-email">
              Endereço de e-mail <span>*</span>
            </label>
            <input
              id="checkout-email"
              type="email"
              value={formData.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
              autoComplete="email"
            />
          </section>

          <aside className="checkout-side-card">
            <label className="checkout-checkbox">
              <input
                type="checkbox"
                checked={shipDifferentAddress}
                onChange={(event) => setShipDifferentAddress(event.target.checked)}
              />
              <span>Entregar em um endereço diferente?</span>
            </label>

            {shipDifferentAddress ? (
              <div className="checkout-alt-address">
                <label htmlFor="checkout-shipping-name">
                  Nome de quem recebe <span>*</span>
                </label>
                <input
                  id="checkout-shipping-name"
                  type="text"
                  value={formData.shippingName}
                  onChange={(event) => handleFieldChange('shippingName', event.target.value)}
                />

                <label htmlFor="checkout-shipping-phone">
                  Celular do destinatário <span>*</span>
                </label>
                <input
                  id="checkout-shipping-phone"
                  type="tel"
                  value={formData.shippingPhone}
                  onChange={(event) => handleFieldChange('shippingPhone', event.target.value)}
                />
              </div>
            ) : null}

            <label htmlFor="checkout-order-notes">Observações do pedido (opcional)</label>
            <textarea
              id="checkout-order-notes"
              rows={5}
              placeholder="Observações sobre seu pedido, ex.: observações especiais sobre entrega."
              value={formData.orderNotes}
              onChange={(event) => handleFieldChange('orderNotes', event.target.value)}
            />
          </aside>

          <section className="checkout-order-card">
            <h2>Seu pedido</h2>
            <table className="checkout-order-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line) => (
                  <tr key={line.id}>
                    <td>
                      {line.name} x {line.quantity}
                    </td>
                    <td>{formatPrice(line.lineTotal)}</td>
                  </tr>
                ))}
                <tr className="checkout-summary-row">
                  <td>Subtotal</td>
                  <td>{formatPrice(subtotal)}</td>
                </tr>
                {discountRate > 0 ? (
                  <tr className="checkout-summary-row">
                    <td>Desconto</td>
                    <td>- {formatPrice(discountValue)}</td>
                  </tr>
                ) : null}
                <tr className="checkout-summary-row">
                  <td>Entrega</td>
                  <td>Digite seu endereço para ver as opções de entrega.</td>
                </tr>
                <tr className="checkout-summary-row total">
                  <td>Total</td>
                  <td>{formatPrice(total)}</td>
                </tr>
              </tbody>
            </table>

            <div className="checkout-payment-card">
              <label className={`checkout-payment-option ${paymentMethod === 'bank' ? 'is-active' : ''}`}>
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                />
                <span>Transferência bancária</span>
              </label>
              {paymentMethod === 'bank' ? (
                <p className="checkout-payment-note">
                  Faça seu pagamento diretamente para nossa conta bancária. Seu pedido será enviado após compensação.
                </p>
              ) : null}

              <label className={`checkout-payment-option ${paymentMethod === 'pagseguro' ? 'is-active' : ''}`}>
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === 'pagseguro'}
                  onChange={() => setPaymentMethod('pagseguro')}
                />
                <span>
                  <CreditCard size={15} strokeWidth={2.2} aria-hidden="true" />
                  PagSeguro
                </span>
              </label>
            </div>

            <p className="checkout-policy">
              Os seus dados pessoais serão utilizados para processar a sua compra e apoiar a sua experiência no site,
              conforme nossa <a href="#">política de privacidade</a>.
            </p>

            <button type="submit" className="checkout-submit-button">
              Finalizar pedido
            </button>

            {submitFeedback ? <p className={`checkout-feedback ${submitFeedbackType}`}>{submitFeedback}</p> : null}
          </section>
        </form>
      </section>
    </main>
  )
}
