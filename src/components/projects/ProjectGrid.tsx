import { useMarkdownProjects } from '../../hooks/useMarkdownProjects';
import ProjectCard from './ProjectCard';

interface Props {
  limit?: number;
  featured?: boolean;
}

export default function ProjectGrid({ limit, featured }: Props) {
  const projects = useMarkdownProjects();
  let displayProjects = projects;

  if (featured) {
    displayProjects = displayProjects.filter(p => p.featured);
  }

  if (limit) {
    displayProjects = displayProjects.slice(0, limit);
  }

  if (displayProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-base-content/60">
          Noch keine Projekte vorhanden.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
