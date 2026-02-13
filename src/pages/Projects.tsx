import ProjectGrid from '../components/projects/ProjectGrid';

export default function Projects() {
  return (
    <div className="animate-rise">
      <header className="py-8 mb-8">
        <h1 className="font-heading text-3xl md:text-4xl">Projekte</h1>
      </header>
      <ProjectGrid />
    </div>
  );
}
