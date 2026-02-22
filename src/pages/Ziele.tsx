const targetGroups = [
  'Nachbarschaftsinitiativen',
  'Gemeinschaftsgärten',
  'Tauschnetzwerke',
  'Solidargemeinschaften',
  'Gemeinwohlprojekte',
  'Lokale Unternehmen',
];

const researchFields = [
  {
    title: 'Ende-zu-Ende-Verschlüsselung',
    description: 'Daten gehören den Menschen, nicht den Plattformen.',
  },
  {
    title: 'Dezentrale Identitäten',
    description: 'Identität ohne zentrale Autorität — selbstbestimmt und portabel.',
  },
  {
    title: 'Offline-fähige Software',
    description: 'CRDTs & Local-First — funktioniert auch ohne Internet und synchronisiert sich automatisch.',
  },
  {
    title: 'Dezentrale Autorisierung',
    description: 'Wer darf was sehen und bearbeiten — ohne Server der entscheidet.',
  },
];

export default function Ziele() {
  return (
    <div className="animate-rise">
      <header className="py-8 mb-10">
        <h1 className="font-heading text-3xl md:text-4xl">Ziele</h1>
      </header>

      <section className="max-w-3xl space-y-16">
        {/* Vision */}
        <p className="font-heading text-lg md:text-xl leading-relaxed text-base-content/60 italic">
          &bdquo;Ich will mit euch unser Schicksal wieder in unsere eigenen Hände legen,
          Gemeinschaft vor Ort wieder lebendig machen und die Zukunft bauen, die wir
          gerne unseren Kindern und Enkeln überlassen.&ldquo;
        </p>

        {/* Warum */}
        <div>
          <h2 className="font-heading text-2xl mb-4">Warum</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Während wir als Menschheit vor großen
              Herausforderungen stehen, machen sich immer mehr Menschen auf
              den Weg, neue Alternativen zu erproben.
            </p>
            <p>
              Gleichzeitig haben wir im 21. Jahrhundert alles, was wir brauchen — das Wissen, die
              Werkzeuge und die Vernetzung — um unser Zusammenleben grundlegend
              zu verändern. Was fehlt, ist nicht die Technologie, sondern dass
              wir anfangen.
            </p>
            <p>
              Lasst uns zusammenkommen, unsere Träume und Visionen teilen,
              uns gegenseitig unterstützen in unsere Kraft zu kommen und
              gemeinsam aktiv werden — lokal und überall auf der Welt.
            </p>
          </div>
        </div>

        {/* Mein Beitrag */}
        <div>
          <h2 className="font-heading text-2xl mb-4">Mein Beitrag</h2>
          <div className="space-y-3">
            {[
              { label: 'Web of Trust', text: 'als ein Netzwerk, das durch echte Begegnungen wächst.' },
              { label: 'Lokale Software', text: 'die deine Daten schützt und offline funktioniert.' },
              { label: 'Werkzeuge für Gemeinschaften', text: 'wie Karte, Kalender, Marktplatz oder Aufgabenplanung.' },
              { label: 'Persönliche Währungen', text: 'als Tauschmittel, Wertschätzung und Einladung zur Kooperation.' },
            ].map(item => (
              <p key={item.label} className="text-sm leading-relaxed">
                <span className="font-heading text-primary text-base">{item.label}</span>
                {' '}<span className="text-base-content/55">{item.text}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Für wen */}
        <div>
          <h2 className="font-heading text-2xl mb-4">Für wen</h2>
          <p className="text-base-content/60 text-lg leading-relaxed mb-5">
            Für alles die sich vernetzen um neue Strukturen aufzubauen —
            und dafür Werkzeuge brauchen, die uns unterstützen und uns gehören.
          </p>
          <div className="flex flex-wrap gap-2 stagger">
            {targetGroups.map(group => (
              <span key={group} className="leaf-tag">
                {group}
              </span>
            ))}
          </div>
        </div>

        {/* Forschung */}
        <div>
          <h2 className="font-heading text-2xl mb-5">Forschungsfelder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
            {researchFields.map(field => (
              <div key={field.title} className="organic-card p-5">
                <h3 className="font-heading mb-1.5">{field.title}</h3>
                <p className="text-sm text-base-content/50 leading-relaxed">{field.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
