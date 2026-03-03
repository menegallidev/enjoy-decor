import { Clock3, Mail, MessageCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'

type ContactFormData = {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formError, setFormError] = useState<string>('')
  const [formSuccess, setFormSuccess] = useState<string>('')

  const handleFieldChange = (field: keyof ContactFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (formError) setFormError('')
    if (formSuccess) setFormSuccess('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const hasEmptyField = Object.values(formData).some((value) => value.trim().length === 0)
    if (hasEmptyField) {
      setFormError('Preencha todos os campos para enviar sua mensagem.')
      setFormSuccess('')
      return
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError('Informe um e-mail válido.')
      setFormSuccess('')
      return
    }

    setFormSuccess('Mensagem enviada com sucesso! Retornaremos em breve.')
    setFormError('')
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  return (
    <main className="main-content contact-page">
      <section className="container contact-page-head reveal delay-1">
        <h1>Contato</h1>
        {/* <div className="contact-banner">
          <h2>CONTATO</h2>
        </div> */}
      </section>

      <section className="container contact-page-content reveal delay-2">
        <aside className="contact-info-card">
          <ul className="contact-info-list">
            <li>
              <span className="contact-info-icon" aria-hidden="true">
                <Clock3 size={16} strokeWidth={2.2} />
              </span>
              <strong>Seg a Sex - 08:00 às 20:00</strong>
            </li>
            <li>
              <span className="contact-info-icon" aria-hidden="true">
                <MessageCircle size={16} strokeWidth={2.2} />
              </span>
              <strong>(19) 98418-8604</strong>
            </li>
            <li>
              <span className="contact-info-icon" aria-hidden="true">
                <Mail size={16} strokeWidth={2.2} />
              </span>
              <strong>contato@enjoydecor.com.br</strong>
            </li>
          </ul>
        </aside>

        <article className="contact-form-card">
          <h2>Preencha o formulário com sua dúvida</h2>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-name">Nome</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={(event) => handleFieldChange('name', event.target.value)}
              autoComplete="name"
              required
            />
            <label htmlFor="contact-email">E-mail</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(event) => handleFieldChange('email', event.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="contact-phone">Cel/Whats</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Cel/Whats"
              value={formData.phone}
              onChange={(event) => handleFieldChange('phone', event.target.value)}
              autoComplete="tel"
              required
            />

            <label htmlFor="contact-message">Mensagem</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Mensagem"
              rows={5}
              value={formData.message}
              onChange={(event) => handleFieldChange('message', event.target.value)}
              required
            />

            <button type="submit" className="contact-submit">
              Enviar
            </button>

            {formError ? (
              <p className="contact-feedback is-error" role="alert">
                {formError}
              </p>
            ) : null}
            {formSuccess ? <p className="contact-feedback is-success">{formSuccess}</p> : null}
          </form>
        </article>
      </section>
    </main>
  )
}
