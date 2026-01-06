const targetGroups = [
  'Nachbarschaftsinitiativen',
  'Gemeinschaftsgärten',
  'Tauschnetzwerke',
  'Solidargemeinschaften',
  'Lokale Unternehmen',
  'Kinderbetreuung',
  'Unterstützung von alten Menschen',
];

export default function Ziele() {
  return (
    <div className="py-8">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Ziele</h1>
        <p className="text-base-content/70 text-lg max-w-2xl">
          Was ich mit meiner Arbeit erreichen möchte.
        </p>
      </header>

      <section className="max-w-3xl space-y-12">
        <div className="prose prose-lg max-w-none">
          <ul>
            <li>
              Die Möglichkeiten erkennen, die sich für die Dezentralisierung
              durch Sync und Local-First Protokolle ergeben
            </li>
            <li>
              Innovationen so kombinieren, dass sie dem Wohle der Menschen vor
              Ort und der Erde dienen
            </li>
            <li>
              Menschen und Projekten minimalistische und spielerische
              Benutzeroberflächen bereitstellen
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Zielgruppen</h2>
          <div className="flex flex-wrap gap-2">
            {targetGroups.map(group => (
              <span key={group} className="badge badge-primary badge-lg">
                {group}
              </span>
            ))}
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-2xl">Forschung</h2>
            <ul className="list-disc list-inside space-y-2 text-base-content/80">
              <li>E2EE Encryption</li>
              <li>Dezentrale Identitätssysteme</li>
              <li>Decentralized Authorization</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
