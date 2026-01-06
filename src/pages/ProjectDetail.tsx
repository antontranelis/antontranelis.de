import { useParams, Link } from 'react-router-dom';
import { useMarkdownProjects } from '../hooks/useMarkdownProjects';
import { useMarkdownPosts } from '../hooks/useMarkdownPosts';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import Sidebar from '../components/shared/Sidebar';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useMarkdownProjects();
  const posts = useMarkdownPosts();
  const project = projects.find(p => p.id === slug);

  if (!project) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Projekt nicht gefunden</h1>
        <p className="mb-8">Das gesuchte Projekt existiert nicht.</p>
        <Link to="/projects" className="btn btn-primary">
          Zurück zu Projekten
        </Link>
      </div>
    );
  }

  // Resolve related items
  const relatedProjects = project.relatedProjects
    ?.map(slug => projects.find(p => p.id === slug))
    .filter(Boolean)
    .map(p => ({ slug: p!.id, title: p!.title }));

  const relatedArticles = project.relatedArticles
    ?.map(slug => posts.find(p => p.slug === slug))
    .filter(Boolean)
    .map(p => ({ slug: p!.slug, title: p!.title }));

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <article className="flex-1 min-w-0">
        <Link to="/projects" className="btn btn-ghost btn-sm mb-6">
          ← Alle Projekte
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <p className="text-base-content/70 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="badge badge-outline badge-sm">
                {tech}
              </span>
            ))}
          </div>
        </header>

        {project.content && project.content.trim() && (
          <div className="prose prose-sm max-w-none">
            <MarkdownRenderer content={project.content} />
          </div>
        )}
      </article>

      <div className="lg:w-64 shrink-0">
        <Sidebar
          links={{
            github: project.githubUrl,
            website: project.liveUrl,
            npm: project.npmUrl,
            opencollective: project.opencollectiveUrl,
          }}
          relatedProjects={relatedProjects}
          relatedArticles={relatedArticles}
          partners={project.partners}
          todos={project.todos}
        />
      </div>
    </div>
  );
}
