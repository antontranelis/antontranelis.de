import { Link } from 'react-router-dom';

const topics = [
  'Local-First',
  'Web of Trust',
  'E2EE',
  'Dezentrale Identität',
  'Sync-Protokolle',
  'Offline-First',
];

export default function Faehigkeiten() {
  return (
    <div className="py-8">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Fähigkeiten</h1>
        <p className="text-base-content/70 text-lg max-w-2xl">
          Beratung, Softwareentwicklung und Forschung für dezentrale Systeme.
        </p>
      </header>

      <section className="max-w-3xl space-y-12">
        {/* Themen */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Themen</h2>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Beratung */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              Beratung: Dezentrale Informationssysteme
            </h2>
            <ul className="list-disc list-inside space-y-2 text-base-content/80">
              <li>Strategien entwickeln für lokale Unabhängigkeit</li>
              <li>Verteilte Datenbanksysteme</li>
            </ul>
          </div>
        </div>

        {/* Softwareentwicklung */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              Softwareentwicklung: Web of Trust Apps
            </h2>
            <p className="text-base-content/70 mb-4">
              Dienen dem Aufbau von Vertrauensnetzwerken
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-base-100 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Verifizieren</h3>
                <p className="text-sm text-base-content/60">Online und offline</p>
              </div>
              <div className="bg-base-100 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Kollaborieren</h3>
                <p className="text-sm text-base-content/60">Gemeinsam arbeiten</p>
              </div>
              <div className="bg-base-100 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Attestieren</h3>
                <p className="text-sm text-base-content/60">
                  Vertrauenswürdig · Beitrag · Guthaben
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kontakt */}
        <div className="prose prose-lg max-w-none">
          <h2>Kontakt</h2>
          <p>
            Du kannst mich über die Social-Media-Links im Footer erreichen. Ich
            freue mich über Anfragen zu Beratung, Entwicklung oder
            Forschungskooperationen.
          </p>
        </div>
      </section>
    </div>
  );
}
