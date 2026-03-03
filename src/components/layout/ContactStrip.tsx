import { Mail, MessageCircle } from 'lucide-react'

export function ContactStrip() {
  return (
    <section className="contact-strip reveal delay-7" id="contato">
      <div className="container contact-grid">
        <article className="contact-card">
          <h3>
            <MessageCircle size={20} strokeWidth={2.2} aria-hidden="true" />
            <span>WHATSAPP:</span>
          </h3>
          <p>(19) 98418-8604</p>
        </article>
        <article className="contact-card">
          <h3>
            <Mail size={20} strokeWidth={2.2} aria-hidden="true" />
            <span>E-MAIL:</span>
          </h3>
          <p>CONTATO@ENJOYDECOR.COM.BR</p>
        </article>
      </div>
    </section>
  )
}
