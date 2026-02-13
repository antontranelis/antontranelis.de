import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-rise">
      <div className="relative mb-8">
        {/* Sacred geometry ornament behind 404 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 sacred-circle animate-breathe opacity-20" />
        </div>
        <p className="relative font-heading text-[8rem] md:text-[10rem] leading-none text-primary/8">
          404
        </p>
      </div>
      <h2 className="font-heading text-2xl md:text-3xl -mt-6 mb-3">
        Seite nicht gefunden
      </h2>
      <p className="text-base-content/55 max-w-sm mb-8 leading-relaxed">
        Die gesuchte Seite existiert leider nicht. Vielleicht wurde sie verschoben oder gelöscht.
      </p>
      <Link to="/" className="btn btn-primary rounded-lg px-6">
        Zurück zur Startseite
      </Link>
    </div>
  );
}
