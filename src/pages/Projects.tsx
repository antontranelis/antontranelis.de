import ProjectGrid from '../components/projects/ProjectGrid';

export default function Projects() {
  return (
    <div>
      <header className="py-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Projekte</h1>
      </header>
      <ProjectGrid />
    </div>
  );
}
