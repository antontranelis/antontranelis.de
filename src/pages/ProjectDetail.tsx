import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMdxProjects } from '../hooks/useMdxProjects';
import { useMarkdownPosts } from '../hooks/useMarkdownPosts';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import Sidebar from '../components/shared/Sidebar';
import type { ProjectData } from '../types';
import {
  Persona,
  PersonaSection,
  CriticalMoment,
  UserStory,
  UserStoryGrid,
  UserStoryTable,
  UserStoryRow,
  FlowDiagram,
  FlowStep,
  FlowArrow,
  ThreeColumnFlow,
  FlowColumn,
  FAQItem,
  FAQGroup,
  Callout,
  ComparisonTable,
  ComparisonRow,
  QROnboardingFlow,
  OnboardingFlowDiagram,
  AttestationFlowDiagram,
  Tabs,
  Tab,
} from '../components/mdx';

type TabType = 'description' | 'flows' | 'personas' | 'userstories' | 'faq' | 'contribute';

// MDX-Komponenten für den Provider
const mdxComponents = {
  Persona,
  PersonaSection,
  CriticalMoment,
  UserStory,
  UserStoryGrid,
  UserStoryTable,
  UserStoryRow,
  FlowDiagram,
  FlowStep,
  FlowArrow,
  ThreeColumnFlow,
  FlowColumn,
  FAQItem,
  FAQGroup,
  Callout,
  ComparisonTable,
  ComparisonRow,
  QROnboardingFlow,
  OnboardingFlowDiagram,
  AttestationFlowDiagram,
  Tabs,
  Tab,
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useMdxProjects();
  const posts = useMarkdownPosts();
  const project = projects.find((p: ProjectData) => p.id === slug);
  const [activeTab, setActiveTab] = useState<TabType>('description');

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
    ?.map((relSlug: string) => projects.find((p: ProjectData) => p.id === relSlug))
    .filter(Boolean)
    .map((p) => ({ slug: p!.id, title: p!.title }));

  const relatedArticles = project.relatedArticles
    ?.map((relSlug: string) => posts.find((p) => p.slug === relSlug))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, title: p!.title }));

  const hasTodos = project.todos && project.todos.length > 0;

  // Check if project has content (MD or MDX)
  const hasContent = project.isMdx || (!project.isMdx && project.content?.trim());

  // Check for MDX tab exports
  const hasFlowsTab = project.isMdx && project.FlowsTab;
  const hasPersonasTab = project.isMdx && project.PersonasTab;
  const hasUserStoriesTab = project.isMdx && project.UserStoriesTab;
  const hasFAQTab = project.isMdx && project.FAQTab;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <article className="flex-1 min-w-0">
        {project.image && (
          <figure className="mb-6 -mx-4 sm:mx-0 sm:rounded-xl overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </figure>
        )}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <p className="text-base-content/70">{project.description}</p>
        </header>

        {/* Tabs */}
        <div role="tablist" className="flex flex-wrap bg-base-200 rounded-xl p-1 mb-6 gap-1">
          <button
            role="tab"
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${activeTab === 'description' ? 'bg-primary text-primary-content shadow-md' : 'hover:bg-base-300'}`}
            onClick={() => setActiveTab('description')}
          >
            Übersicht
          </button>
          {hasFlowsTab && (
            <button
              role="tab"
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${activeTab === 'flows' ? 'bg-primary text-primary-content shadow-md' : 'hover:bg-base-300'}`}
              onClick={() => setActiveTab('flows')}
            >
              Flows
            </button>
          )}
          {hasPersonasTab && (
            <button
              role="tab"
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${activeTab === 'personas' ? 'bg-primary text-primary-content shadow-md' : 'hover:bg-base-300'}`}
              onClick={() => setActiveTab('personas')}
            >
              Personas
            </button>
          )}
          {hasUserStoriesTab && (
            <button
              role="tab"
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${activeTab === 'userstories' ? 'bg-primary text-primary-content shadow-md' : 'hover:bg-base-300'}`}
              onClick={() => setActiveTab('userstories')}
            >
              User Stories
            </button>
          )}
          {hasFAQTab && (
            <button
              role="tab"
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${activeTab === 'faq' ? 'bg-primary text-primary-content shadow-md' : 'hover:bg-base-300'}`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ
            </button>
          )}
          {hasTodos && (
            <button
              role="tab"
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${activeTab === 'contribute' ? 'bg-primary text-primary-content shadow-md' : 'hover:bg-base-300'}`}
              onClick={() => setActiveTab('contribute')}
            >
              Mitmachen
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && hasContent && (
          <div className="prose max-w-none">
            {project.isMdx ? (
              <project.MdxContent components={mdxComponents} />
            ) : (
              <MarkdownRenderer content={project.content} />
            )}
          </div>
        )}

        {activeTab === 'flows' && hasFlowsTab && project.FlowsTab && (
          <div className="prose max-w-none">
            {(() => { const FlowsTab = project.FlowsTab; return <FlowsTab />; })()}
          </div>
        )}

        {activeTab === 'personas' && hasPersonasTab && project.PersonasTab && (
          <div>
            {(() => { const PersonasTab = project.PersonasTab; return <PersonasTab />; })()}
          </div>
        )}

        {activeTab === 'userstories' && hasUserStoriesTab && project.UserStoriesTab && (
          <div>
            {(() => { const UserStoriesTab = project.UserStoriesTab; return <UserStoriesTab />; })()}
          </div>
        )}

        {activeTab === 'faq' && hasFAQTab && project.FAQTab && (
          <div>
            {(() => { const FAQTab = project.FAQTab; return <FAQTab />; })()}
          </div>
        )}

        {activeTab === 'contribute' && hasTodos && (
          <div className="space-y-4">
            <p className="text-base-content/70 mb-4">
              Diese Aufgaben stehen an - hilf mit!
            </p>
            <ul className="space-y-3">
              {project.todos!.map((todo: string, i: number) => (
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
