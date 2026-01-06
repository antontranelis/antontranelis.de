import { useEffect, useState } from 'react';

interface GitHubRepoStats {
  stars: number;
  forks: number;
  contributors: number;
  loading: boolean;
  rateLimited: boolean;
}

interface Props {
  repoUrl: string;
}

// Simple in-memory cache
const statsCache: Record<string, { data: GitHubRepoStats; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

export default function GitHubStats({ repoUrl }: Props) {
  const [stats, setStats] = useState<GitHubRepoStats>({
    stars: 0,
    forks: 0,
    contributors: 0,
    loading: true,
    rateLimited: false,
  });

  useEffect(() => {
    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      setStats(s => ({ ...s, loading: false }));
      return;
    }

    const cacheKey = `${parsed.owner}/${parsed.repo}`;
    const cached = statsCache[cacheKey];

    // Use cache if available and not expired
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setStats(cached.data);
      return;
    }

    const { owner, repo } = parsed;

    async function fetchStats() {
      try {
        // Fetch repo stats
        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );

        // Check for rate limiting
        if (repoRes.status === 403) {
          setStats(s => ({ ...s, loading: false, rateLimited: true }));
          return;
        }

        if (!repoRes.ok) {
          setStats(s => ({ ...s, loading: false }));
          return;
        }

        const repoData = await repoRes.json();

        // Fetch contributors count
        let contributors = 0;
        try {
          const contribRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&anon=true`
          );
          if (contribRes.ok) {
            const contribData = await contribRes.json();
            contributors = Array.isArray(contribData) ? contribData.length : 0;
          }
        } catch {
          // Contributors fetch failed, keep as 0
        }

        const newStats: GitHubRepoStats = {
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          contributors,
          loading: false,
          rateLimited: false,
        };

        // Cache the result
        statsCache[cacheKey] = { data: newStats, timestamp: Date.now() };
        setStats(newStats);
      } catch {
        setStats(s => ({ ...s, loading: false }));
      }
    }

    fetchStats();
  }, [repoUrl]);

  if (stats.loading) {
    return (
      <div className="flex gap-4 text-sm text-base-content/50">
        <span className="loading loading-dots loading-xs"></span>
      </div>
    );
  }

  // Don't show anything if rate limited or no data
  if (stats.rateLimited || (stats.stars === 0 && stats.forks === 0 && stats.contributors === 0)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <a
        href={`${repoUrl}/stargazers`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-primary transition-colors"
        title="Stars"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
        <span>{stats.stars}</span>
      </a>

      <a
        href={`${repoUrl}/forks`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-primary transition-colors"
        title="Forks"
      >
        {/* GitHub Octicon: repo-forked */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
        </svg>
        <span>{stats.forks}</span>
      </a>

      <a
        href={`${repoUrl}/graphs/contributors`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-primary transition-colors"
        title="Contributors"
      >
        {/* GitHub Octicon: people */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z" />
        </svg>
        <span>{stats.contributors}</span>
      </a>
    </div>
  );
}
