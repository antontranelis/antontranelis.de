const skillCategories = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Python', 'SQLite', 'PostgreSQL'],
  },
  {
    label: 'Dezentral',
    skills: ['E2EE', 'DIDs', 'CRDTs', 'Automerge', 'Local-First', 'WebSocket'],
  },
  {
    label: 'KI',
    skills: ['LLM-Integration', 'Claude API', 'MCP Server', 'Agentische Systeme', 'Automatisierung'],
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
        <p className="text-base-content/70 text-lg max-w-2xl">
          Was ich mitbringe — und was ich für dich tun kann.
        </p>
      </header>

      <section className="max-w-4xl space-y-12">
        {/* Wer ich bin */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Wer ich bin</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Ich bin Full-Stack-Entwickler und Systemdenker. Seit über sieben Jahren
              arbeite ich an derselben Vision: Werkzeuge bauen, die Menschen im echten
              Leben verbinden — dezentral, verschlüsselt, ohne Abhängigkeit von
              großen Plattformen.
            </p>
            <p>
              Was mich ausmacht ist nicht eine bestimmte Technologie, sondern wie
              ich sie einsetze. Ich denke von den Menschen her, nicht vom Code.
              Jede technische Entscheidung frage ich: Dient das der Gemeinschaft?
              Schützt das die Privatsphäre? Funktioniert das auch ohne Internet?
            </p>
            <p>
              Ich arbeite eng mit KI zusammen — nicht um schneller zu sein, sondern
              um tiefer zu gehen. Dabei lerne ich ständig neue Wege, wie KI Menschen
              und Organisationen stärken kann. Dieses Wissen gebe ich weiter.
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
              App-Entwicklung oder Forschungskooperationen.
            </p>
            <div className="card-actions mt-4">
              <a
                href="https://matrix.to/#/@ant0n:matrix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M76,216a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V40A12,12,0,0,1,40,28H64a12,12,0,0,1,0,24H52V204H64A12,12,0,0,1,76,216ZM216,28H192a12,12,0,0,0,0,24h12V204H192a12,12,0,0,0,0,24h24a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM188,160V120a36,36,0,0,0-60-26.8,35.91,35.91,0,0,0-39.51-5.68A12,12,0,0,0,68,96v64a12,12,0,0,0,24,0V120a12,12,0,0,1,24,0v40a12,12,0,0,0,24,0V120a12,12,0,0,1,24,0v40a12,12,0,0,0,24,0Z" />
                </svg>
                Schreib mir bei Matrix
              </a>
              <a
                href="mailto:anton@antontraenlis.de"
                className="btn btn-outline gap-2"
              >
                E-Mail
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
