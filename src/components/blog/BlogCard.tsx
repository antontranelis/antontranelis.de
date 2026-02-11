import { Link } from 'react-router-dom';
import type { PostMeta } from '../../types';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface Props {
  post: PostMeta;
}

export default function BlogCard({ post }: Props) {
  const readingTime = '3 min';
  const isExternal = !!post.externalUrl;

  const cardContent = (
    <>
      {/* Thumbnail Placeholder */}
      <div className="aspect-video bg-base-200 rounded-xl mb-4 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-base-content/30 group-hover:scale-105 transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Tags */}
        <div className="flex items-center gap-2">
          {post.tags.slice(0, 2).map(tag =>
            isExternal ? (
              <span
                key={tag}
                className="text-xs font-medium text-primary uppercase tracking-wider"
              >
                {tag}
              </span>
            ) : (
              <Link
                key={tag}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                onClick={e => e.stopPropagation()}
                className="text-xs font-medium text-primary uppercase tracking-wider hover:underline"
              >
                {tag}
              </Link>
            )
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
          {post.title}
          {isExternal && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'd. MMM yyyy', { locale: de })}
          </time>
          <span>·</span>
          <span>{readingTime} Lesezeit</span>
        </div>

        {/* Excerpt */}
        <p className="text-base-content/70 text-sm line-clamp-2">
          {post.excerpt}
        </p>

        {/* Read more link */}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-2">
          Artikel lesen
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <article className="group">
        <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
          {cardContent}
        </a>
      </article>
    );
  }

  return (
    <article className="group">
      <Link to={`/article/${post.slug}`} className="block">
        {cardContent}
      </Link>
    </article>
  );
}
