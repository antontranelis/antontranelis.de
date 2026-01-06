import { Link } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';
import ProjectGrid from '../components/projects/ProjectGrid';

const topics = [
  'App Entwicklung',
  'Web of Trust',
  'E2E Verschlüsselung',
  'Dezentrale Identitäten',
  'Local-First',
  'Attestations',
  'Local Economy',
  'Geographische Maps',
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Image with fade */}
          <div className="shrink-0">
            <div className="relative w-40 h-60 md:w-48 md:h-72">
              <img
                src="/Anton.png"
                alt="Anton"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-16" />
            </div>
          </div>

          {/* Intro Text */}
          <div className="text-center md:text-left">
            <p className="text-base-content/60 text-sm uppercase tracking-wider mb-2">
              Beratung · Forschung · Entwicklung
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Dezentrale Systeme die<br />
              <span className="text-primary">Menschen verbinden</span>
            </h1>
            <p className="text-base-content/70 text-lg max-w-xl mb-6">
              Ich erforsche und designe Werkzeuge, Strukturen und Systeme,
              die Menschen und Gemeinschaften dezentral vernetzen.
            </p>

            {/* Topic Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
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

            {/* Call to Action */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="https://kolektiva.social/@ant0n"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.668 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z" />
                </svg>
                Folge mir auf Mastodon
              </a>
              <a
                href="https://matrix.to/#/@ant0n:matrix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline gap-2"
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
                Schreibe mir bei Matrix
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Projekte</h2>
        <ProjectGrid limit={3} />
        <div className="text-center mt-8">
          <Link to="/projects" className="link link-primary text-sm font-medium">
            Alle Projekte →
          </Link>
        </div>
      </section>

      {/* Recent Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Artikel</h2>
        <BlogList limit={3} />
        <div className="text-center mt-8">
          <Link to="/blog" className="link link-primary text-sm font-medium">
            Alle Artikel →
          </Link>
        </div>
      </section>
    </div>
  );
}
