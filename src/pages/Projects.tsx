import ProjectGrid from '../components/projects/ProjectGrid';

export default function Projects() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Projekte</h1>
      <p className="text-lg mb-8 text-base-content/70">
        Eine Auswahl meiner Projekte und Arbeiten.
      </p>
      <ProjectGrid />
    </div>
  );
}
