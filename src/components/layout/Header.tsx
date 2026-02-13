import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projekte' },
  { to: '/blog', label: 'Artikel' },
  { to: '/ziele', label: 'Ziele' },
  { to: '/faehigkeiten', label: 'Fähigkeiten' },
];

export default function Header() {
  const [theme, setTheme] = useState<'terra' | 'terradark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'terra' || stored === 'terradark') return stored;
    }
    return 'terra';
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'terra' ? 'terradark' : 'terra'));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-base-100/85 backdrop-blur-xl border-b border-base-content/4'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with seed-of-life ornament */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="relative w-7 h-7">
              <svg viewBox="0 0 28 28" className="w-full h-full text-primary/40 group-hover:text-primary/70 transition-colors duration-500">
                <circle cx="14" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="0.7" />
                <circle cx="14" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                <circle cx="14" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                <circle cx="8.8" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <circle cx="19.2" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <circle cx="8.8" cy="17" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <circle cx="19.2" cy="17" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              </svg>
            </div>
            <span className="font-heading text-lg tracking-wide text-base-content/80 group-hover:text-base-content transition-colors duration-500">
              Anton Tranelis
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-[13px] tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'text-base-content/55 hover:text-base-content/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Leaf divider */}
            <span className="mx-2 text-base-content/15">|</span>

            <button
              onClick={toggleTheme}
              className="p-2 text-base-content/45 hover:text-base-content/70 transition-colors duration-300"
              aria-label="Theme umschalten"
            >
              {theme === 'terra' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-base-content/45 hover:text-base-content/70 transition-colors duration-300"
              aria-label="Theme umschalten"
            >
              {theme === 'terra' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="p-2 text-base-content/55 hover:text-base-content/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 bg-base-100/95 backdrop-blur-lg rounded-xl w-52 border border-base-content/5">
                {navLinks.map(link => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `rounded-lg text-sm tracking-wide ${isActive ? 'text-primary font-medium' : 'text-base-content/60'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
