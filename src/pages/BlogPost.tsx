import { useParams, Link } from 'react-router-dom';
import { useMarkdownPosts } from '../hooks/useMarkdownPosts';
import { useMarkdownProjects } from '../hooks/useMarkdownProjects';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import Sidebar from '../components/shared/Sidebar';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const posts = useMarkdownPosts();
  const projects = useMarkdownProjects();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Artikel nicht gefunden</h1>
        <p className="mb-8">Der gesuchte Artikel existiert nicht.</p>
        <Link to="/blog" className="btn btn-primary">Zurück zum Blog</Link>
      </div>
    );
  }

  // Resolve related items
  const relatedProjects = post.relatedProjects
    ?.map(slug => projects.find(p => p.id === slug))
    .filter(Boolean)
    .map(p => ({ slug: p!.id, title: p!.title }));

  const relatedArticles = post.relatedArticles
    ?.map(slug => posts.find(p => p.slug === slug))
    .filter(Boolean)
    .map(p => ({ slug: p!.slug, title: p!.title }));

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <article className="flex-1 min-w-0">
        <Link to="/blog" className="btn btn-ghost btn-sm mb-6">← Alle Artikel</Link>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-2 items-center text-base-content/70 text-sm">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'd. MMMM yyyy', { locale: de })}
            </time>
            <span>•</span>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="badge badge-outline badge-sm hover:badge-primary"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </header>
        <div className="prose prose-sm max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>

      <div className="lg:w-64 shrink-0">
        <Sidebar
          links={{
            npm: post.npmUrl,
            opencollective: post.opencollectiveUrl,
          }}
          relatedProjects={relatedProjects}
          relatedArticles={relatedArticles}
          partners={post.partners}
          todos={post.todos}
        />
      </div>
    </div>
  );
}
