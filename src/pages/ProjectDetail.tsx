import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarkdownProjects } from '../hooks/useMarkdownProjects';
import { useMarkdownPosts } from '../hooks/useMarkdownPosts';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import Sidebar from '../components/shared/Sidebar';

type Tab = 'description' | 'userstories' | 'contribute';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useMarkdownProjects();
  const posts = useMarkdownPosts();
  const project = projects.find(p => p.id === slug);
  const [activeTab, setActiveTab] = useState<Tab>('description');

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

  const hasUserStories = project.userStories && project.userStories.length > 0;
  const hasTodos = project.todos && project.todos.length > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <article className="flex-1 min-w-0">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <p className="text-base-content/70">{project.description}</p>
        </header>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-box mb-6">
          <input
            type="radio"
            name="project_tabs"
            role="tab"
            className="tab"
            aria-label="Beschreibung"
            checked={activeTab === 'description'}
            onChange={() => setActiveTab('description')}
          />
          {hasUserStories && (
            <input
              type="radio"
              name="project_tabs"
              role="tab"
              className="tab"
              aria-label="User Stories"
              checked={activeTab === 'userstories'}
              onChange={() => setActiveTab('userstories')}
            />
          )}
          {hasTodos && (
            <input
              type="radio"
              name="project_tabs"
              role="tab"
              className="tab"
              aria-label="Mitmachen"
              checked={activeTab === 'contribute'}
              onChange={() => setActiveTab('contribute')}
            />
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && project.content && project.content.trim() && (
          <div className="prose max-w-none">
            <MarkdownRenderer content={project.content} />
          </div>
        )}

        {activeTab === 'userstories' && hasUserStories && (
          <div className="space-y-4">
            <p className="text-base-content/70 mb-4">
              Was soll dieses Projekt ermöglichen?
            </p>
            <ul className="space-y-3">
              {project.userStories!.map((story, i) => (
                <li key={i} className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                  <span className="text-primary text-lg">•</span>
                  <span>{story}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'contribute' && hasTodos && (
          <div className="space-y-4">
            <p className="text-base-content/70 mb-4">
              Diese Aufgaben stehen an - hilf mit!
            </p>
            <ul className="space-y-3">
              {project.todos!.map((todo, i) => (
                <li key={i} className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                  <span className="text-base-content/40 text-lg">○</span>
                  <span>{todo}</span>
                </li>
              ))}
            </ul>
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
          status={project.status}
          team={project.team}
          technologies={project.technologies}
        />
      </div>
    </div>
  );
}
