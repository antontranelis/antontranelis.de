import { useMarkdownPosts } from '../../hooks/useMarkdownPosts';
import BlogCard from './BlogCard';

interface Props {
  limit?: number;
  filterTag?: string;
}

export default function BlogList({ limit, filterTag }: Props) {
  const posts = useMarkdownPosts();

  let displayPosts = filterTag
    ? posts.filter(post => post.tags.includes(filterTag))
    : posts;

  if (limit) {
    displayPosts = displayPosts.slice(0, limit);
  }

  if (displayPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-base-content/30 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
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
        <p className="text-lg text-base-content/60">Noch keine Artikel vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayPosts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
