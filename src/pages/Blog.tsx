import { useSearchParams, Link } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';

export default function Blog() {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  return (
    <div className="animate-rise">
      <header className="py-8 mb-8">
        <h1 className="font-heading text-3xl md:text-4xl mb-3">
          {activeTag ? (
            <>Artikel zu <span className="text-primary">&bdquo;{activeTag}&ldquo;</span></>
          ) : (
            'Artikel'
          )}
        </h1>
        {activeTag && (
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 mt-3 text-sm text-base-content/50 hover:text-primary transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Alle Artikel anzeigen
          </Link>
        )}
      </header>

      <BlogList filterTag={activeTag || undefined} />
    </div>
  );
}
