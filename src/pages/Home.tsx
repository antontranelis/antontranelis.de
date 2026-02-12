import { Link } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';
import ProjectGrid from '../components/projects/ProjectGrid';

const topics = [
  'KI-Automatisierung',
  'KI-App-Entwicklung',
  'Web of Trust',
  'E2E Verschlüsselung',
  'Dezentrale Identitäten',
  'Local-First',
  'Local Economy',
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Image with fade */}
          <div className="shrink-0">
            <div className="relative w-40 h-60 md:w-48 md:h-72">
              <img
                src="/Anton.png"
                alt="Anton"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-16" />
            </div>
          </div>

          {/* Intro Text */}
          <div className="text-center md:text-left">
            <p className="text-base-content/60 text-sm uppercase tracking-wider mb-2">
              Beratung · Forschung · Entwicklung
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Dezentrale Systeme die<br />
              <span className="text-primary">Menschen verbinden</span>
            </h1>
            <p className="text-base-content/70 text-lg max-w-xl mb-6">
              Ich baue Werkzeuge, die Menschen und Gemeinschaften im echten
              Leben verbinden — dezentral, verschlüsselt, ohne Abhängigkeit
              von großen Plattformen.
            </p>

            {/* Topic Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {topics.map(topic => (
                <Link
                  key={topic}
                  to={`/blog?tag=${encodeURIComponent(topic)}`}
                  className="badge badge-outline badge-lg hover:badge-primary transition-colors cursor-pointer"
                >
                  {topic}
                </Link>
              ))}
            </div>

            {/* Call to Action */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/faehigkeiten"
                className="btn btn-primary"
              >
                Meine Dienste
              </Link>
              {/* Matrix Button — kommt zurück wenn aktiv genutzt
              <a
                href="https://matrix.to/#/@ant0n:matrix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline gap-2"
              >
                Matrix
              </a>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Projekte</h2>
        <ProjectGrid limit={3} />
        <div className="text-center mt-8">
          <Link to="/projects" className="link link-primary text-sm font-medium">
            Alle Projekte →
          </Link>
        </div>
      </section>

      {/* Recent Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Artikel</h2>
        <BlogList limit={3} />
        <div className="text-center mt-8">
          <Link to="/blog" className="link link-primary text-sm font-medium">
            Alle Artikel →
          </Link>
        </div>
      </section>
    </div>
  );
}
