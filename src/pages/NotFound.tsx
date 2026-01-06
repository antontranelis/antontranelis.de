import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="hero min-h-[60vh]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold mt-4">Seite nicht gefunden</h2>
          <p className="py-6">
            Die gesuchte Seite existiert leider nicht. Vielleicht wurde sie verschoben oder gelöscht.
          </p>
          <Link to="/" className="btn btn-primary">Zurück zur Startseite</Link>
        </div>
      </div>
    </div>
  );
}
