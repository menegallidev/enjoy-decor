import { ChevronRight } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { categoryProducts, listingTitleByCategory } from '../../data/siteData'
import { resolveCategoryFromSlug } from '../../utils/category'
import { formatPrice } from '../../utils/format'

type CategoryPageProps = {
  categoryName: string
  categoryTitle: string
  onAddToCart: (productId: string) => void
}

export function CategoryPage({ categoryName, categoryTitle, onAddToCart }: CategoryPageProps) {
  return (
    <main className="main-content category-page">
      <section className="category-hero reveal delay-1">
        <div className="container category-hero-inner">
          <p className="category-kicker">Categoria</p>
          <h1>{categoryTitle}</h1>
          <p className="category-breadcrumb">Home / Produtos / {categoryName}</p>
        </div>
      </section>

      <section className="container listing-section reveal delay-2">
        <div className="listing-toolbar">
          <p>Exibindo 1-16 de 78 resultados em {categoryName}</p>
          <label className="sort-select">
            <span className="sr-only">Ordenar produtos</span>
            <select defaultValue="padrao">
              <option value="padrao">Ordenação padrão</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
              <option value="nome">Nome A-Z</option>
            </select>
          </label>
        </div>

        <div className="product-grid">
          {categoryProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="placeholder-media product-image" role="img" aria-label={`Placeholder de ${product.name}`}>
                PLACEHOLDER
              </div>

              <div className="product-content">
                <h3>{product.name}</h3>
                <p className="product-price">{formatPrice(product.price)}</p>
                <button type="button" className="product-button" onClick={() => onAddToCart(product.id)}>
                  ADICIONAR AO CARRINHO
                </button>
              </div>
            </article>
          ))}
        </div>

        <nav className="pagination" aria-label="Paginação">
          <button type="button" className="is-active" aria-current="page">
            1
          </button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">4</button>
          <button type="button">5</button>
          <button type="button" aria-label="Próxima página">
            <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </nav>
      </section>
    </main>
  )
}

type CategoryRoutePageProps = {
  onAddToCart: (productId: string) => void
}

export function CategoryRoutePage({ onAddToCart }: CategoryRoutePageProps) {
  const { categorySlug } = useParams()
  const categoryName = resolveCategoryFromSlug(categorySlug)
  const categoryTitle = listingTitleByCategory[categoryName] ?? categoryName

  return <CategoryPage categoryName={categoryName} categoryTitle={categoryTitle} onAddToCart={onAddToCart} />
}
