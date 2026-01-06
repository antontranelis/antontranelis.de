import { Link } from 'react-router-dom';
import GitHubStats from './GitHubStats';
import OpenCollectiveStats from './OpenCollectiveStats';
import type { TeamMember } from '../../types';

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

interface SidebarProps {
  links?: {
    github?: string;
    npm?: string;
    opencollective?: string;
    website?: string;
  };
  relatedProjects?: Array<{ slug: string; title: string }>;
  relatedArticles?: Array<{ slug: string; title: string }>;
  partners?: string[];
  dates?: Array<{ label: string; date: string }>;
  status?: string;
  team?: TeamMember[];
  technologies?: string[];
}

export default function Sidebar({
  links,
  relatedProjects,
  relatedArticles,
  partners,
  dates,
  status,
  team,
  technologies,
}: SidebarProps) {
  const hasContent =
    links?.github ||
    links?.npm ||
    links?.opencollective ||
    links?.website ||
    (relatedProjects && relatedProjects.length > 0) ||
    (relatedArticles && relatedArticles.length > 0) ||
    (partners && partners.length > 0) ||
    (dates && dates.length > 0) ||
    status ||
    (team && team.length > 0) ||
    (technologies && technologies.length > 0);

  if (!hasContent) return null;

  return (
    <aside className="space-y-4 md:sticky md:top-4 md:self-start">
      {/* Website */}
      {links?.website && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <a
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
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
              <span>{new URL(links.website).hostname.replace(/^www\./, '')}</span>
            </a>
          </div>
        </div>
      )}

      {/* GitHub */}
      {links?.github && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>
                {parseGitHubUrl(links.github)?.owner}/{parseGitHubUrl(links.github)?.repo}
              </span>
            </a>
            <GitHubStats repoUrl={links.github} />
          </div>
        </div>
      )}

      {/* Status */}
      {status && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Status
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-sm">{status}</span>
            </div>
          </div>
        </div>
      )}

      {/* Team */}
      {team && team.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Team
            </h3>
            <ul className="space-y-2">
              {team.map((member, i) => (
                <li key={i} className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{member.name}</span>
                    {member.github && (
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        title={`@${member.github}`}
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
                  </div>
                  {member.role && (
                    <span className="text-base-content/60 text-xs">{member.role}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Technologien
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map(tech => (
                <span key={tech} className="badge badge-outline badge-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OpenCollective Stats */}
      {links?.opencollective && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-3">
              Open Collective
            </h3>
            <OpenCollectiveStats collectiveUrl={links.opencollective} />
          </div>
        </div>
      )}

      {/* npm Link */}
      {links?.npm && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <a
              href={links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M0 0v24h24V0H0zm19.2 19.2h-2.4v-9.6H12v9.6H4.8V4.8h14.4v14.4z" />
              </svg>
              <span>npm</span>
            </a>
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Artikel
            </h3>
            <ul className="space-y-2">
              {relatedArticles.map(article => (
                <li key={article.slug}>
                  <Link
                    to={`/article/${article.slug}`}
                    className="link link-hover text-sm"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Projekte
            </h3>
            <ul className="space-y-2">
              {relatedProjects.map(project => (
                <li key={project.slug}>
                  <Link
                    to={`/project/${project.slug}`}
                    className="link link-hover text-sm"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Partners */}
      {partners && partners.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Partner
            </h3>
            <ul className="space-y-1">
              {partners.map(partner => (
                <li key={partner} className="text-sm">
                  {partner}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Dates */}
      {dates && dates.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Termine
            </h3>
            <ul className="space-y-2">
              {dates.map((item, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium">{item.date}</span>
                  <br />
                  <span className="text-base-content/70">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </aside>
  );
}
