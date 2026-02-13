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
    <div className="group organic-card p-5 h-full flex flex-col">
      {post.image && (
        <div className="aspect-[16/10] bg-base-200 rounded-lg mb-4 overflow-hidden -mx-1 -mt-1">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        {post.tags.slice(0, 2).map(tag =>
          isExternal ? (
            <span key={tag} className="leaf-tag text-[10px]">{tag}</span>
          ) : (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              onClick={e => e.stopPropagation()}
              className="leaf-tag text-[10px]"
            >
              {tag}
            </Link>
          )
        )}
      </div>

      <h3 className="font-heading text-lg leading-snug group-hover:text-primary transition-colors duration-300 mb-2">
        {post.title}
        {isExternal && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 inline ml-1.5 opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </h3>

      <p className="text-base-content/55 text-sm leading-relaxed line-clamp-2 mb-3 flex-grow">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-base-content/5">
        <div className="flex items-center gap-2 text-xs text-base-content/40">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'd. MMM yyyy', { locale: de })}
          </time>
          <span className="w-0.5 h-0.5 rounded-full bg-base-content/15" />
          <span>{readingTime}</span>
        </div>
        <span className="text-xs text-primary/55 group-hover:text-primary transition-colors duration-300">
          Lesen &rarr;
        </span>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <article>
        <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </a>
      </article>
    );
  }

  return (
    <article>
      <Link to={`/article/${post.slug}`} className="block h-full">
        {cardContent}
      </Link>
    </article>
  );
}
