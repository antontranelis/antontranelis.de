import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Project } from '../../types';

interface Props {
  project: Project & { content?: string };
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

function useGitHubStats(repoUrl: string | undefined): GitHubStats | null {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    if (!repoUrl) return;
    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) return;

    const { owner, repo } = parsed;

    async function fetchStats() {
      try {
        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!repoRes.ok) return;
        const repoData = await repoRes.json();

        // Fetch contributors count
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
          contributors,
        });
      } catch {
        // Ignore errors
      }
    }

    fetchStats();
  }, [repoUrl]);

  return stats;
}

export default function ProjectCard({ project }: Props) {
  const hasContent = project.content && project.content.trim().length > 0;
  const githubStats = useGitHubStats(project.githubUrl);

  const cardContent = (
    <>
      {project.image && (
        <figure>
          <img
            src={project.image}
            alt={project.title}
            className="h-48 w-full object-cover"
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title group-hover:text-primary transition-colors">
          {project.title}
        </h2>
        <p className="text-base-content/80 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 my-2">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="badge badge-outline badge-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-base-content/60 hover:text-primary transition-colors"
                title="Website"
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-base-content/60 hover:text-primary transition-colors"
                title="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {githubStats && githubStats.stars > 0 && (
              <a
                href={`${project.githubUrl}/stargazers`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-base-content/60 hover:text-primary transition-colors"
                title="Stars"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
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
                <span>{githubStats.stars}</span>
              </a>
            )}
            {githubStats && githubStats.contributors > 0 && (
              <a
                href={`${project.githubUrl}/graphs/contributors`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-base-content/60 hover:text-primary transition-colors"
                title="Contributors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
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
                <span>{githubStats.contributors}</span>
              </a>
            )}
          </div>
          {hasContent && (
            <span className="text-sm font-medium text-primary">
              Mehr erfahren →
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (hasContent) {
    return (
      <Link
        to={`/project/${project.id}`}
        className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow group"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow group">
      {cardContent}
    </div>
  );
}
