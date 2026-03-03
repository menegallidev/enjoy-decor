import { ArrowLeft } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { PATHS } from '../../routes/paths'
import type { BlogPost } from '../../types'

type PostPageProps = {
  post: BlogPost
  morePosts: BlogPost[]
  onBackToBlog: () => void
  onOpenPost: (postId: string) => void
}

export function PostPage({ post, morePosts, onBackToBlog, onOpenPost }: PostPageProps) {
  return (
    <main className="main-content post-page">
      <section className="container post-head reveal delay-1">
        <button type="button" className="back-button" onClick={onBackToBlog}>
          <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true" />
          <span>Voltar para o blog</span>
        </button>
        <p className="blog-meta">
          {post.category} - {post.date} - {post.readTime} - por {post.author}
        </p>
        <h1>{post.title}</h1>
        <p className="post-excerpt">{post.excerpt}</p>
      </section>

      <section className="container post-layout reveal delay-2">
        <article className="post-main">
          <div className="placeholder-media post-cover" role="img" aria-label={`Placeholder da capa de ${post.title}`}>
            CAPA DO POST
          </div>

          <div className="post-article">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="post-side">
          <div className="post-side-card">
            <h3>Mais no blog</h3>
            <div className="post-side-list">
              {morePosts.map((item) => (
                <button key={item.id} type="button" className="post-side-link" onClick={() => onOpenPost(item.id)}>
                  <span>{item.title}</span>
                  <small>
                    {item.category} - {item.readTime}
                  </small>
                </button>
              ))}
            </div>
          </div>

          <div className="post-side-card">
            <h3>Newsletter Enjoy</h3>
            <p>Receba novas postagens e ideias para mesa posta direto no seu e-mail.</p>
            <button type="button" className="blog-link-button">
              Quero receber
            </button>
          </div>
        </aside>
      </section>
    </main>
  )
}

type PostRoutePageProps = {
  posts: BlogPost[]
  onBackToBlog: () => void
  onOpenPost: (postId: string) => void
}

export function PostRoutePage({ posts, onBackToBlog, onOpenPost }: PostRoutePageProps) {
  const { postId } = useParams()
  const selectedPost = posts.find((post) => post.id === postId) ?? posts[0]

  if (!selectedPost) {
    return <Navigate to={PATHS.blog} replace />
  }

  const morePosts = posts.filter((post) => post.id !== selectedPost.id).slice(0, 4)
  return <PostPage post={selectedPost} morePosts={morePosts} onBackToBlog={onBackToBlog} onOpenPost={onOpenPost} />
}
