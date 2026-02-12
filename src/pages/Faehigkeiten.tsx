const skillCategories = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'SQLite'],
  },
  {
    label: 'Dezentral',
    skills: ['E2EE', 'DIDs', 'CRDTs', 'Local-First', 'Automerge', 'WebSocket'],
  },
  {
    label: 'KI',
    skills: ['KI-Integration', 'Automatisierung', 'Agentische Systeme', 'MCP Server', 'Claude API'],
  },
  {
    label: 'DevOps',
    skills: ['Docker', 'Linux', 'Git', 'CI/CD', 'Vite'],
  },
];

const services = [
  {
    title: 'KI-Automatisierung',
    description: 'Wiederkehrende Aufgaben automatisieren, Arbeitsabläufe beschleunigen, KI sinnvoll in bestehende Systeme integrieren.',
    items: [
      'Geschäftsprozesse mit KI automatisieren',
      'Chatbots & intelligente Assistenten',
      'Datenanalyse & Reporting',
      'Integration in bestehende Systeme',
    ],
  },
  {
    title: 'KI-App-Entwicklung',
    description: 'Moderne Web-Apps mit KI-Funktionen — von der Idee bis zur fertigen Anwendung.',
    items: [
      'Web-Apps mit KI-Integration',
      'Local-First & offline-fähig',
      'Dezentrale Architekturen',
      'Von Prototyp bis Produktion',
    ],
  },
];

export default function Faehigkeiten() {
  return (
    <div className="py-8">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Fähigkeiten</h1>
      </header>

      <section className="max-w-4xl space-y-12">
        {/* Wer ich bin */}
        <div>
          <div className="prose prose-lg max-w-none">
            <p>
              Ich bin Full-Stack-Entwickler und Systemdenker. Seit über sieben Jahren
              arbeite ich zusammen mit einer wachsenden Community an derselben Vision:
              Werkzeuge bauen, die Menschen im echten Leben verbinden — dezentral,
              verschlüsselt, ohne Abhängigkeit von großen Plattformen.
            </p>
            <p>
              Technik ist für mich Mittel zum Zweck — sie soll Menschen dienen,
              ihre Daten schützen und auch ohne ständige Internetverbindung
              funktionieren.
            </p>
            <p>
              KI ist ein fester Bestandteil meiner Arbeit — nicht um schneller zu sein,
              sondern um tiefer zu gehen. Dabei lerne ich ständig neue Wege, wie KI
              Menschen und Organisationen stärken kann. Dieses Wissen gebe ich an
              Unternehmen und Teams weiter.
            </p>
          </div>
        </div>

        {/* Technologien */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Technologien</h2>
          <div className="space-y-4">
            {skillCategories.map(category => (
              <div key={category.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-sm font-semibold text-base-content/60 uppercase tracking-wider w-24 shrink-0">
                  {category.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span key={skill} className="badge badge-outline badge-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dienste */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Was ich anbiete</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(service => (
              <div key={service.title} className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-xl">{service.title}</h3>
                  <p className="text-base-content/70 text-sm mb-3">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-base-content/80">
                        <span className="text-primary mt-0.5">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kontakt CTA */}
        <div className="card bg-base-200">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-xl">Interesse?</h2>
            <p className="text-base-content/70 max-w-md">
              Schreib mir — ich freue mich über Anfragen zu Automatisierung,
              App-Entwicklung oder gemeinsame Projekte.
            </p>
            <div className="card-actions mt-4">
              <a
                href="mailto:mail@antontranelis.de"
                className="btn btn-primary gap-2"
              >
                E-Mail schreiben
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
