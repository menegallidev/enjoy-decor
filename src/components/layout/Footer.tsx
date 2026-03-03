import { Link } from 'react-router-dom'
import { helpLinks, paymentMethods } from '../../data/siteData'
import { PATHS } from '../../routes/paths'

export function Footer() {
  const helpLinkTargets: Record<string, string> = {
    Home: PATHS.home,
    'Sobre a Enjoy': PATHS.about,
    'Fale Conosco': PATHS.contact,
  }

  return (
    <footer className="site-footer reveal delay-8">
      <div className="container footer-grid">
        <article className="footer-brand">
          <span className="brand-icon" aria-hidden="true">
            E
          </span>
          <div className="brand-text">
            <span className="brand-name">ENJOY</span>
            <span className="brand-tagline">HOME & WEAR</span>
          </div>
        </article>

        <article className="footer-column">
          <h3>AJUDA</h3>
          <ul>
            {helpLinks.map((item) => (
              <li key={item}>
                {helpLinkTargets[item] ? <Link to={helpLinkTargets[item]}>{item}</Link> : <a href="#">{item}</a>}
              </li>
            ))}
          </ul>
        </article>

        <article className="footer-column">
          <h3>CERTIFICAÇÕES</h3>
          <div className="badge-list">
            <span className="badge">ABRAPA</span>
            <span className="badge">Sou de Algodão</span>
          </div>
        </article>

        <article className="footer-column">
          <h3>FORMAS DE PAGAMENTO</h3>
          <div className="payments-list">
            {paymentMethods.map((item) => (
              <span className="payment-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>
    </footer>
  )
}
