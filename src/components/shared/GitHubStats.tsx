import { useEffect, useState } from 'react';

interface GitHubRepoStats {
  stars: number;
  forks: number;
  contributors: number;
  loading: boolean;
  error: boolean;
}

interface Props {
  repoUrl: string;
}

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
    error: false,
  });

  useEffect(() => {
    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      setStats(s => ({ ...s, loading: false, error: true }));
      return;
    }

    const { owner, repo } = parsed;

    async function fetchStats() {
      try {
        // Fetch repo stats
        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!repoRes.ok) throw new Error('Repo not found');
        const repoData = await repoRes.json();

        // Fetch contributors count (limited to first page)
        const contribRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=true`,
          { method: 'HEAD' }
        );

        let contributors = 0;
        const linkHeader = contribRes.headers.get('Link');
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) contributors = parseInt(match[1], 10);
        } else {
          // Fallback: fetch and count
          const contribDataRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`
          );
          if (contribDataRes.ok) {
            const contribData = await contribDataRes.json();
            contributors = Array.isArray(contribData) ? contribData.length : 0;
          }
        }

        setStats({
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          contributors,
          loading: false,
          error: false,
        });
      } catch {
        setStats(s => ({ ...s, loading: false, error: true }));
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

  if (stats.error) {
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
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
        <span>{stats.forks}</span>
      </a>

      {stats.contributors > 0 && (
        <a
          href={`${repoUrl}/graphs/contributors`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-primary transition-colors"
          title="Contributors"
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>{stats.contributors}</span>
        </a>
      )}
    </div>
  );
}
