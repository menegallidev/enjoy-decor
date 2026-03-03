import { ChevronLeft, ChevronRight, CreditCard, Headset, Play, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { benefits, categoryItems, workshopItems } from '../../data/siteData'

type HomePageProps = {
  onOpenCategory: (categoryName: string) => void
}

const benefitIcons = [Truck, CreditCard, Headset]

type HeroSlide = {
  title: string
  subtitle: string
  leftLines: string[]
  rightLines: string[]
  imageLabel: string
}

const heroSlides: HeroSlide[] = [
  {
    title: 'Porta Guardanapos',
    subtitle: '{a cereja do bolo}',
    leftLines: ['São milhares de motivos,', 'de FLORES ou de TEMAS'],
    rightLines: [
      'feitos pela equipe',
      'de artesãos Enjoy,',
      'para acertar a mensagem',
      'de cada MOMENTO a',
      'mesa.',
    ],
    imageLabel: 'Placeholder de imagem principal de porta guardanapos',
  },
  {
    title: 'Jogos Americanos',
    subtitle: '{design e praticidade}',
    leftLines: ['Estampas exclusivas', 'para transformar sua mesa'],
    rightLines: ['cada peça é pensada', 'para levar beleza,', 'conforto e identidade', 'para o seu dia a dia.'],
    imageLabel: 'Placeholder de imagem principal de jogos americanos',
  },
  {
    title: 'Guardanapos',
    subtitle: '{detalhes que encantam}',
    leftLines: ['Acabamento premium', 'em algodão e linho'],
    rightLines: ['combinações sofisticadas', 'para almoços, jantares', 'e momentos especiais', 'com quem você ama.'],
    imageLabel: 'Placeholder de imagem principal de guardanapos',
  },
  {
    title: 'Kits Enjoy',
    subtitle: '{mesa pronta com estilo}',
    leftLines: ['Selecionamos composições', 'para facilitar sua escolha'],
    rightLines: ['uma experiência completa', 'com peças que conversam', 'entre si e valorizam', 'cada ocasião.'],
    imageLabel: 'Placeholder de imagem principal de kits Enjoy',
  },
]

export function HomePage({ onOpenCategory }: HomePageProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((current) => (current + 1) % heroSlides.length)
    }, 6000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const activeSlide = heroSlides[activeSlideIndex] ?? heroSlides[0]

  const goToPreviousSlide = () => {
    setActiveSlideIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToNextSlide = () => {
    setActiveSlideIndex((current) => (current + 1) % heroSlides.length)
  }

  return (
    <main className="main-content">
      <section className="container hero-section reveal delay-1">
        <div className="hero-shell">
          <button className="arrow-btn" type="button" aria-label="Slide anterior" onClick={goToPreviousSlide}>
            <ChevronLeft size={24} strokeWidth={2.4} aria-hidden="true" />
          </button>

          <div className="hero-content">
            <article className="hero-copy hero-copy-left">
              <h1>{activeSlide.title}</h1>
              <p className="hero-subtitle">{activeSlide.subtitle}</p>
              <p>
                {activeSlide.leftLines.map((line, index) => (
                  <span key={`${activeSlide.title}-left-${index}`}>
                    {line}
                    {index < activeSlide.leftLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </article>

            <div className="placeholder-media hero-image" role="img" aria-label={activeSlide.imageLabel}>
              PLACEHOLDER DE IMAGEM
            </div>

            <article className="hero-copy hero-copy-right">
              <p>
                {activeSlide.rightLines.map((line, index) => (
                  <span key={`${activeSlide.title}-right-${index}`}>
                    {line}
                    {index < activeSlide.rightLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
              <div className="hero-mini-logo">
                <span className="brand-icon small" aria-hidden="true">
                  E
                </span>
                <span>
                  <strong>ENJOY</strong>
                  <small>HOME & WEAR</small>
                </span>
              </div>
            </article>
          </div>

          <button className="arrow-btn" type="button" aria-label="Próximo slide" onClick={goToNextSlide}>
            <ChevronRight size={24} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>

        <div className="hero-dots" role="tablist" aria-label="Navegação do carrossel da home">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              aria-selected={activeSlideIndex === index}
              aria-label={`Ir para slide ${index + 1}: ${slide.title}`}
              className={activeSlideIndex === index ? 'is-active' : ''}
              onClick={() => setActiveSlideIndex(index)}
            />
          ))}
        </div>
      </section>

      <section className="container benefits-section reveal delay-2">
        <div className="benefits-grid">
          {benefits.map((item, index) => {
            const BenefitIcon = benefitIcons[index] ?? Truck
            return (
              <article className="benefit-card" key={item.title}>
                <span className="benefit-icon" aria-hidden="true">
                  <BenefitIcon size={16} strokeWidth={2.2} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="container about-section reveal delay-3">
        <h2 className="section-title">Conheça a Enjoy</h2>

        <div className="about-grid">
          <article className="about-copy">
            <p>{'{ ENJOY QUER ENTRAR NA SUA CASA E ALEGRAR SUA FAMÍLIA }'}</p>
            <p>
              A marca ENJOY HOMEWEAR tem o conceito de vestir sua mesa e outros cantos da sua casa com o mesmo
              comportamento da moda.
            </p>
            <p>Montar uma mesa vai além do conceito de servir um almoço ou um jantar.</p>
            <p>
              Montar uma mesa para a ENJOY é a reunião com quem amamos, com cuidado de bem-estar e conforto para todos.
            </p>
            <p>- Jogos Americanos com estampas digitais, sublimação e foil.</p>
            <p>- Guardanapos de algodão e linho com acabamento premium.</p>
            <p>- Porta guardanapos exclusivos.</p>
            <p>- Almofadas e texturas com visual sofisticado.</p>
            <p>- Sousplat em crochê feito à mão, 100% algodão.</p>
          </article>

          <article className="video-card">
            <div className="placeholder-media video-image" role="img" aria-label="Placeholder do vídeo Mundo Enjoy">
              PLACEHOLDER DE VIDEO
            </div>
            <button type="button" className="play-button" aria-label="Reproduzir vídeo">
              <Play size={20} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
            </button>
            <h3>Mundo Enjoy</h3>
          </article>
        </div>
      </section>

      <section className="container sustainability-section reveal delay-4">
        <p className="sustainability-line">
          <span className="seal" aria-hidden="true">
            E
          </span>
          POR UM MUNDO MAIS <strong>ENJOY E SUSTENTÁVEL</strong>
        </p>
      </section>

      <section className="container categories-section reveal delay-5">
        <h2 className="section-title">Categorias</h2>
        <div className="category-grid">
          {categoryItems.map((item) => (
            <button
              type="button"
              className="category-card category-card-button"
              key={item}
              onClick={() => onOpenCategory(item)}
              aria-label={`Abrir categoria ${item}`}
            >
              <div className="placeholder-media category-image" role="img" aria-label={`Placeholder de ${item}`}>
                PLACEHOLDER
              </div>
              <h3>{item}</h3>
            </button>
          ))}
        </div>
      </section>

      <section className="container workshops-section reveal delay-6">
        <div className="workshop-grid">
          {workshopItems.map((item) => (
            <article className="workshop-card" key={item}>
              <div className="placeholder-media workshop-image" role="img" aria-label={`Placeholder de ${item}`}>
                PLACEHOLDER
              </div>
              <span className="workshop-play" aria-hidden="true">
                <Play size={18} strokeWidth={2.2} fill="currentColor" />
              </span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
