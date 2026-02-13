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
        <div className="organic-card p-6 md:p-8 bg-primary/3 border-primary/8">
          <p className="font-heading text-lg md:text-xl leading-relaxed text-base-content/60 italic">
            &bdquo;Ich will mit euch unser Schicksal wieder in unsere eigenen Hände legen,
            Gemeinschaft im echten Leben leben und die Zukunft bauen, die wir
            gerne unseren Kinder und Enkel überlassen.&ldquo;
          </p>
        </div>

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
              { label: 'Web of Trust', text: 'Ein Netzwerk, das auf echten Begegnungen basiert.' },
              { label: 'Lokale Software', text: 'Deine Daten gehören dir, funktioniert auch offline.' },
              { label: 'Werkzeuge für Gemeinschaften', text: 'Karte, Kalender, Marktplatz, sichere Kommunikation.' },
            ].map(item => (
              <div key={item.label} className="organic-card p-4 flex gap-4 items-baseline">
                <span className="font-heading text-primary shrink-0">{item.label}</span>
                <span className="text-base-content/55 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Für wen */}
        <div>
          <h2 className="font-heading text-2xl mb-4">Für wen</h2>
          <p className="text-base-content/60 text-lg leading-relaxed mb-5">
            Für Menschen die spüren, dass es anders gehen muss. Die bereits
            anfangen, sich lokal zu vernetzen und neue Strukturen aufzubauen —
            und dafür Werkzeuge brauchen, die ihnen gehören.
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
