import { useEffect, useState } from 'react';
import type { ProjectData } from '../../types';

interface Props {
  project: ProjectData;
}

interface GitHubStats {
  stars: number;
  contributors: number;
}

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

const CACHE_TTL = 1000 * 60 * 30; // 30 min

function getCachedStats(key: string): GitHubStats | null {
  try {
    const raw = sessionStorage.getItem(`gh:${key}`);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function setCachedStats(key: string, data: GitHubStats) {
  try { sessionStorage.setItem(`gh:${key}`, JSON.stringify({ data, ts: Date.now() })); }
  catch { /* quota exceeded */ }
}

function useGitHubStats(repoUrl: string | undefined): GitHubStats | null {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    if (!repoUrl) return;
    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) return;

    const { owner, repo } = parsed;
    const cacheKey = `${owner}/${repo}`;

    const cached = getCachedStats(cacheKey);
    if (cached) { setStats(cached); return; }

    async function fetchStats() {
      try {
        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!repoRes.ok) return;
        const repoData = await repoRes.json();

        const contribRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&anon=true`
        );
        let contributors = 0;
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          contributors = Array.isArray(contribData) ? contribData.length : 0;
        }

        const result = {
          stars: repoData.stargazers_count || 0,
          contributors,
        };
        setCachedStats(cacheKey, result);
        setStats(result);
      } catch {
        // Ignore errors
      }
    }

    fetchStats();
  }, [repoUrl]);

  return stats;
}

// Project brand config: color + white-on-color icon
const projectBrands: Record<string, { color: string; icon: React.ReactNode }> = {
  'web-of-trust': {
    color: '#2563eb',
    icon: (
      <svg viewBox="0 1 23 22" className="w-full h-full" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18.72" cy="8.82" r="2.5" />
        <circle cx="5.28" cy="5.28" r="2.5" />
        <circle cx="8.82" cy="18.72" r="2.5" />
        <line x1="6.04" x2="8.06" y1="8.18" y2="15.82" />
        <line x1="15.81" x2="8.18" y1="8.05" y2="6.04" />
        <line x1="16.59" x2="10.94" y1="10.94" y2="16.59" />
      </svg>
    ),
  },
  'real-life-stack': {
    color: '#e87520',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
      </svg>
    ),
  },
  'money-printing': {
    color: '#2d5a3d',
    icon: (
      <svg viewBox="140 60 232 390" className="w-full h-full">
        <g transform="translate(176, 96) scale(0.625)">
          <path fill="white" d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z" />
        </g>
      </svg>
    ),
  },
  'utopia-map': {
    color: 'transparent',
    icon: (
      <img src="/3markers-globe.svg" alt="" className="w-8 h-8" />
    ),
  },
};

export default function ProjectCard({ project }: Props) {
  const githubStats = useGitHubStats(project.githubUrl);
  const externalUrl = project.liveUrl || project.githubUrl;
  const brand = projectBrands[project.id];

  const cardContent = (
    <div className="group h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2.5 mb-2">
        <h2 className="font-heading text-lg group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h2>
      </div>
      <p className="text-base-content/55 text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {(project.liveUrl || project.githubUrl) && (
        <div className="flex flex-col gap-1.5 mb-4">
          {project.liveUrl && (
            <span
              role="link"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center gap-2 text-xs text-base-content/45 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              {brand && brand.color !== 'transparent' ? (
                <span
                  className="size-3.5 shrink-0 rounded-sm flex items-center justify-center text-white p-0.5"
                  style={{ backgroundColor: brand.color }}
                >
                  {brand.icon}
                </span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              )}
              <span>{(() => { const url = new URL(project.liveUrl); return url.hostname.replace(/^www\./, '') + (url.pathname !== '/' ? url.pathname.replace(/\/$/, '') : ''); })()}</span>
            </span>
          )}
          {project.githubUrl && (
            <span
              role="link"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center gap-2 text-xs text-base-content/45 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>{parseGitHubUrl(project.githubUrl)?.owner}/{parseGitHubUrl(project.githubUrl)?.repo}</span>
            </span>
          )}
        </div>
      )}

      <div className="flex-grow" />

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          {githubStats && githubStats.stars > 0 && (
            <span
              role="link"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                window.open(`${project.githubUrl}/stargazers`, '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center gap-1 text-xs text-base-content/40 hover:text-primary transition-colors duration-300 cursor-pointer"
              title="Stars"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {githubStats.stars}
            </span>
          )}
          {githubStats && githubStats.contributors > 0 && (
            <span
              role="link"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                window.open(`${project.githubUrl}/graphs/contributors`, '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center gap-1 text-xs text-base-content/40 hover:text-primary transition-colors duration-300 cursor-pointer"
              title="Contributors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {githubStats.contributors}
            </span>
          )}
        </div>
        {externalUrl && (
          <span className="text-xs text-primary/55 group-hover:text-primary transition-colors duration-300">
            Ansehen &rarr;
          </span>
        )}
      </div>
    </div>
  );

  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}
