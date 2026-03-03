import { ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { BlogPost } from '../../types'

type BlogPageProps = {
  posts: BlogPost[]
  onOpenPost: (postId: string) => void
}

export function BlogPage({ posts, onOpenPost }: BlogPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('Todos')
  const filters = useMemo(() => ['Todos', ...new Set(posts.map((post) => post.category))], [posts])
  const filteredPosts = activeFilter === 'Todos' ? posts : posts.filter((post) => post.category === activeFilter)
  const featuredPost = filteredPosts[0] ?? posts[0]
  const gridPosts = filteredPosts.slice(1)

  return (
    <main className="main-content blog-page">
      <section className="container blog-hero reveal delay-1">
        <div className="blog-hero-card">
          <div className="blog-hero-copy">
            <p className="blog-kicker">BLOG ENJOY</p>
            <h1>Inspirações, dicas e conteúdo para transformar a sua mesa</h1>
            <p>Explore tendências e ideias práticas para o dia a dia, com foco em beleza e funcionalidade.</p>
          </div>
          <div className="placeholder-media blog-hero-image" role="img" aria-label="Placeholder de destaque do blog">
            DESTAQUE DO BLOG
          </div>
        </div>
      </section>
      <section className="container blog-section reveal delay-2">
        <div className="blog-toolbar">
          <div className="blog-filters" aria-label="Filtro de categorias do blog">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`blog-filter ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p>{filteredPosts.length} postagens encontradas</p>
        </div>

        {featuredPost ? (
          <article className="blog-featured">
            <div className="placeholder-media blog-featured-image" role="img" aria-label={`Placeholder de ${featuredPost.title}`}>
              PLACEHOLDER
            </div>
            <div className="blog-featured-content">
              <p className="blog-meta">
                {featuredPost.category} - {featuredPost.date} - {featuredPost.readTime}
              </p>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <button type="button" className="blog-link-button" onClick={() => onOpenPost(featuredPost.id)}>
                Ler postagem completa
              </button>
            </div>
          </article>
        ) : null}

        <div className="blog-grid">
          {gridPosts.map((post) => (
            <article className="blog-card" key={post.id}>
              <button
                type="button"
                className="blog-card-hitbox"
                onClick={() => onOpenPost(post.id)}
                aria-label={`Abrir postagem ${post.title}`}
              >
                <div className="placeholder-media blog-card-image" role="img" aria-label={`Placeholder de ${post.title}`}>
                  PLACEHOLDER
                </div>
                <div className="blog-card-content">
                  <p className="blog-meta">
                    {post.category} - {post.date}
                  </p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-readmore">
                    Ler postagem completa
                    <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
