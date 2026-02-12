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
    <div className="py-8">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Ziele</h1>
      </header>

      <section className="max-w-3xl space-y-12">
        {/* Vision */}
      <p className="prose prose-lg max-w-none">
                Ich will mit euch unser Schicksal in die eigenen Hände nehmen,
                Gemeinschaft im echten Leben leben und die Zukunft bauen, die wir
                uns für unsere Kinder und Enkel wünschen.
              </p>



        {/* Warum */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Warum</h2>
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
          <h2 className="text-2xl font-bold mb-4">Mein Beitrag</h2>
          <div className="prose prose-lg max-w-none">
            <ul>
              <li>
                <strong>Web of Trust</strong> — ein Netzwerk, das auf
                echten Begegnungen basiert
              </li>
              <li>
                <strong>Lokale Software</strong> — deine Daten gehören dir,
                funktioniert auch offline
              </li>
              <li>
                <strong>Werkzeuge für Gemeinschaften</strong> — Karte, Kalender,
                Marktplatz, sichere Kommunikation
              </li>
            </ul>
          </div>
        </div>

        {/* Für wen */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Für wen</h2>
          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Für Menschen die spüren, dass es anders gehen muss. Die bereits
              anfangen, sich lokal zu vernetzen und neue Strukturen aufzubauen —
              und dafür Werkzeuge brauchen, die ihnen gehören.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {targetGroups.map(group => (
              <span key={group} className="badge badge-primary badge-lg">
                {group}
              </span>
            ))}
          </div>
        </div>

        {/* Forschung */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Forschungsfelder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {researchFields.map(field => (
              <div key={field.title} className="card bg-base-200">
                <div className="card-body p-4">
                  <h3 className="font-semibold">{field.title}</h3>
                  <p className="text-sm text-base-content/60">{field.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
