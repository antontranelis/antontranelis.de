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
    <div className="animate-rise">
      <header className="py-8 mb-10">
        <h1 className="font-heading text-3xl md:text-4xl">Fähigkeiten</h1>
      </header>

      <section className="max-w-4xl space-y-16">
        {/* Wer ich bin */}
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

        {/* Technologien */}
        <div>
          <h2 className="font-heading text-2xl mb-6">Technologien</h2>
          <div className="space-y-4">
            {skillCategories.map(category => (
              <div key={category.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                <span className="text-xs text-base-content/40 uppercase tracking-[0.15em] w-24 shrink-0">
                  {category.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span key={skill} className="leaf-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dienste */}
        <div>
          <h2 className="font-heading text-2xl mb-6">Was ich anbiete</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map(service => (
              <div key={service.title} className="organic-card p-6">
                <h3 className="font-heading text-xl mb-2">{service.title}</h3>
                <p className="text-base-content/50 text-sm mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-base-content/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Kontakt CTA */}
        <div className="organic-card p-8 md:p-10 text-center bg-primary/3 border-primary/8">
          <h2 className="font-heading text-2xl mb-2">Interesse?</h2>
          <p className="text-base-content/55 max-w-md mx-auto mb-6 leading-relaxed">
            Schreib mir — ich freue mich über Anfragen zu Automatisierung,
            App-Entwicklung oder gemeinsame Projekte.
          </p>
          <a
            href="mailto:mail@antontranelis.de"
            className="btn btn-primary rounded-lg px-8"
          >
            E-Mail schreiben
          </a>
        </div>
      </section>
    </div>
  );
}
