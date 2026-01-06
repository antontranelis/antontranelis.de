import { Link } from 'react-router-dom';
import GitHubStats from './GitHubStats';
import OpenCollectiveStats from './OpenCollectiveStats';

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
  todos?: string[];
  dates?: Array<{ label: string; date: string }>;
}

export default function Sidebar({
  links,
  relatedProjects,
  relatedArticles,
  partners,
  todos,
  dates,
}: SidebarProps) {
  const hasContent =
    links?.github ||
    links?.npm ||
    links?.opencollective ||
    links?.website ||
    (relatedProjects && relatedProjects.length > 0) ||
    (relatedArticles && relatedArticles.length > 0) ||
    (partners && partners.length > 0) ||
    (todos && todos.length > 0) ||
    (dates && dates.length > 0);

  if (!hasContent) return null;

  return (
    <aside className="space-y-4 md:sticky md:top-4 md:self-start">
      {/* GitHub Stats */}
      {links?.github && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60">
                GitHub
              </h3>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/40 hover:text-primary"
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
            </div>
            <GitHubStats repoUrl={links.github} />
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

      {/* Other Links */}
      {(links?.npm || links?.website) && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              Links
            </h3>
            <ul className="space-y-2">
              {links?.website && (
                <li>
                  <a
                    href={links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover text-sm flex items-center gap-2"
                  >
                    Website
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              )}
              {links?.npm && (
                <li>
                  <a
                    href={links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover text-sm flex items-center gap-2"
                  >
                    npm
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              )}
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

      {/* TODOs */}
      {todos && todos.length > 0 && (
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-base-content/60 mb-2">
              ToDos
            </h3>
            <ul className="space-y-1">
              {todos.map((todo, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-base-content/40">○</span>
                  {todo}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}
