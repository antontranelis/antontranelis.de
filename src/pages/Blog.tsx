import { useSearchParams, Link } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';

export default function Blog() {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  return (
    <div>
      {/* Header */}
      <header className="py-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {activeTag ? `Artikel zu "${activeTag}"` : 'Alle Artikel'}
        </h1>
        <p className="text-base-content/60 text-lg">
          Gedanken und Erfahrungen zu dezentralen Systemen und Local-First Entwicklung.
        </p>
        {activeTag && (
          <Link to="/blog" className="btn btn-sm btn-outline mt-4">
            ← Alle Artikel anzeigen
          </Link>
        )}
      </header>

      {/* Articles Grid */}
      <BlogList filterTag={activeTag || undefined} />
    </div>
  );
}
