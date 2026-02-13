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
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-rise">
        <h1 className="font-heading text-3xl mb-4">Artikel nicht gefunden</h1>
        <p className="text-base-content/55 mb-8">Der gesuchte Artikel existiert nicht.</p>
        <Link to="/blog" className="btn btn-primary rounded-lg px-6">Zurück zum Blog</Link>
      </div>
    );
  }

  const relatedProjects = post.relatedProjects
    ?.map(slug => projects.find(p => p.id === slug))
    .filter(Boolean)
    .map(p => ({ slug: p!.id, title: p!.title }));

  const relatedArticles = post.relatedArticles
    ?.map(slug => posts.find(p => p.slug === slug))
    .filter(Boolean)
    .map(p => ({ slug: p!.slug, title: p!.title }));

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-rise">
      <article className="flex-1 min-w-0">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map(tag => (
              <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="leaf-tag text-[10px]">
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl leading-tight mb-3">
            {post.title}
          </h1>

          <time dateTime={post.date} className="text-sm text-base-content/45">
            {format(new Date(post.date), 'd. MMMM yyyy', { locale: de })}
          </time>
        </header>

        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>

      <aside className="lg:w-64 shrink-0">
        <div className="lg:sticky lg:top-24">
          <Sidebar
            relatedProjects={relatedProjects}
            relatedArticles={relatedArticles}
          />
        </div>
      </aside>
    </div>
  );
}
