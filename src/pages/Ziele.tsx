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
    title: 'Dezentrale Identitäten (DIDs)',
    description: 'Identität ohne zentrale Autorität — selbstbestimmt und portabel.',
  },
  {
    title: 'CRDTs & Local-First',
    description: 'Software die auch ohne Internet funktioniert und sich automatisch synchronisiert.',
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
        <p className="text-base-content/70 text-lg max-w-2xl">
          Warum ich das hier mache — und wohin die Reise geht.
        </p>
      </header>

      <section className="max-w-3xl space-y-12">
        {/* Vision */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Vision</h2>
          <blockquote className="border-l-4 border-primary pl-4 text-lg text-base-content/80 italic">
            Menschen bei der Selbstermächtigung unterstützen, dezentrale Systeme
            aufbauen und Gemeinschaften im echten Leben vernetzen.
          </blockquote>
        </div>

        {/* Warum */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Warum</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Ich glaube, dass sich gerade grundlegend etwas verändert.
              Immer mehr Menschen spüren, dass die Art wie wir zusammenleben
              nicht mehr funktioniert — und suchen nach Alternativen.
            </p>
            <p>
              Gleichzeitig entstehen Technologien, die zum ersten Mal echte
              Dezentralisierung ermöglichen: Software die ohne zentrale Server
              funktioniert, Verschlüsselung die Privatsphäre schützt,
              Identitätssysteme die keiner Firma gehören.
            </p>
            <p>
              Ich will diese Werkzeuge so bauen, dass sie den Menschen dienen,
              die bereits neue Wege gehen — in ihren Nachbarschaften, Gärten
              und Gemeinschaften. Nicht als nächstes Social Network, sondern
              als Infrastruktur die der Gemeinschaft gehört.
            </p>
          </div>
        </div>

        {/* Was ich baue */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Was ich baue</h2>
          <div className="prose prose-lg max-w-none">
            <ul>
              <li>
                <strong>Vertrauensnetzwerke</strong> die auf echten Begegnungen
                basieren — nicht auf Algorithmen oder Sternebewertungen
              </li>
              <li>
                <strong>Local-First Software</strong> — deine Daten gehören dir,
                funktionieren offline und synchronisieren sich wenn du willst
              </li>
              <li>
                <strong>Modulare Bausteine</strong> für Gemeinschaften — Kalender,
                Karten, Profile, verschlüsselte Kommunikation
              </li>
            </ul>
          </div>
        </div>

        {/* Für wen */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Für wen</h2>
          <p className="text-base-content/70 mb-4">
            Für Menschen die spüren, dass es anders gehen muss. Die bereits
            anfangen, sich lokal zu vernetzen und neue Strukturen aufzubauen —
            und dafür Werkzeuge brauchen, die ihnen gehören.
          </p>
          <div className="flex flex-wrap gap-2">
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
