import { Link } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';
import ProjectGrid from '../components/projects/ProjectGrid';

const topics = [
  'KI-Automatisierung',
  'KI-App-Entwicklung',
  'Web of Trust',
  'Dezentrale Identitäten',
  'Ende-zu-Ende-Verschlüsselung',
  'Lokale Software',
  'Freies Geld',
];

export default function Home() {
  return (
    <div className="space-y-24">
      {/* ─── Hero ─── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Sacred geometry background */}
        <div className="absolute inset-0 seed-of-life pointer-events-none" />

        {/* Breathing circles */}
        <div className="absolute top-8 right-12 w-48 h-48 pointer-events-none hidden md:block">
          <div className="sacred-circle w-full h-full animate-breathe opacity-30" />
        </div>
        <div className="absolute bottom-12 left-8 w-32 h-32 pointer-events-none hidden md:block">
          <div className="sacred-circle w-full h-full animate-breathe opacity-20" style={{ animationDelay: '3s' }} />
        </div>

        {/* Slow-spinning geometry ornament */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-64 h-64 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow opacity-[0.04]">
            <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <polygon points="100,30 170,65 170,135 100,170 30,135 30,65" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-primary" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
          </svg>
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Photo with organic frame */}
          <div className="shrink-0 animate-rise">
            <div className="relative">
              {/* Outer organic ring */}
              <div className="absolute -inset-3 rounded-[2rem] border border-primary/8 animate-pulse-soft" />
              <div className="w-40 h-56 md:w-48 md:h-68 rounded-[1.5rem] overflow-hidden">
                <img
                  src="/Anton.png"
                  alt="Anton"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Small sacred dot */}
              <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full border border-primary/15 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/25" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <p className="text-base-content/45 text-xs tracking-[0.2em] uppercase mb-4 animate-rise">
              Beratung &middot; Forschung &middot; Entwicklung
            </p>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 animate-rise" style={{ animationDelay: '100ms' }}>
              Dezentrale Systeme die<br />
              <span className="text-primary">Menschen verbinden</span>
            </h1>

            <p className="text-base-content/60 text-base md:text-lg max-w-lg mb-8 leading-relaxed animate-rise" style={{ animationDelay: '200ms' }}>
              Ich baue mit euch Werkzeuge, die Menschen und Gemeinschaften im echten
              Leben verbinden — dezentral, verschl&uuml;sselt, ohne Abh&auml;ngigkeit
              von gro&szlig;en Plattformen.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8 stagger">
              {topics.map(topic => (
                <Link key={topic} to={`/blog?tag=${encodeURIComponent(topic)}`} className="leaf-tag">
                  {topic}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-rise" style={{ animationDelay: '400ms' }}>
              <Link to="/faehigkeiten" className="btn btn-primary rounded-lg px-6">
                Meine Dienste
              </Link>
              <a href="mailto:mail@antontranelis.de" className="btn btn-ghost rounded-lg px-6 text-base-content/55">
                E-Mail schreiben
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section className="animate-rise">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl">Projekte</h2>
          <Link to="/projects" className="text-sm text-primary/60 hover:text-primary transition-colors duration-300 group">
            Alle ansehen
            <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
        </div>
        <ProjectGrid limit={3} />
      </section>

      {/* ─── Articles ─── */}
      <section className="animate-rise">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl">Artikel</h2>
          <Link to="/blog" className="text-sm text-primary/60 hover:text-primary transition-colors duration-300 group">
            Alle lesen
            <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
        </div>
        <BlogList limit={3} />
      </section>
    </div>
  );
}
