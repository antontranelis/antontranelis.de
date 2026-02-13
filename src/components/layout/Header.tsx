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
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-base-100/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with seed-of-life ornament */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="relative w-7 h-7">
              <svg viewBox="0 0 28 28" className="w-full h-full text-primary/40 group-hover:text-primary/70 transition-colors duration-500" fill="none" stroke="currentColor" strokeLinecap="butt">
                <path strokeWidth="1.25" d="M4.88,9.12 C5.66,7.43 6.92,5.93 8.51,4.85" />
                <path d="M8.16,4.33 A0.625,0.625 0 0 1 8.86,5.37" fill="currentColor" stroke="none" />
                <path strokeWidth="1.21" d="M4.0,14.49 C3.8,12.7 4.1,10.82 4.88,9.12" />
                <path strokeWidth="1.17" d="M5.95,19.38 C4.89,17.99 4.19,16.29 4.0,14.49" />
                <path strokeWidth="1.14" d="M10.0,22.46 C8.43,21.84 7.0,20.77 5.95,19.38" />
                <path strokeWidth="1.1" d="M14.89,22.99 C13.28,23.26 11.57,23.08 10.0,22.46" />
                <path strokeWidth="1.07" d="M19.18,20.99 C17.99,22.01 16.49,22.72 14.89,22.99" />
                <path strokeWidth="1.03" d="M21.74,17.2 C21.26,18.64 20.38,19.97 19.18,20.99" />
                <path strokeWidth="0.99" d="M21.96,12.82 C22.28,14.24 22.21,15.77 21.74,17.2" />
                <path strokeWidth="0.96" d="M19.97,9.1 C20.93,10.11 21.64,11.4 21.96,12.82" />
                <path strokeWidth="0.92" d="M16.49,7.04 C17.78,7.39 19.0,8.1 19.97,9.1" />
                <path strokeWidth="0.89" d="M12.62,7.07 C13.85,6.72 15.2,6.7 16.49,7.04" />
                <path strokeWidth="0.85" d="M9.48,9.01 C10.3,8.12 11.4,7.43 12.62,7.07" />
                <path strokeWidth="0.81" d="M7.87,12.14 C8.1,11.01 8.65,9.91 9.48,9.01" />
                <path strokeWidth="0.78" d="M8.1,15.48 C7.73,14.44 7.64,13.28 7.87,12.14" />
                <path strokeWidth="0.74" d="M9.93,18.07 C9.12,17.41 8.48,16.51 8.1,15.48" />
                <path strokeWidth="0.71" d="M12.68,19.26 C11.71,19.13 10.74,18.72 9.93,18.07" />
                <path strokeWidth="0.67" d="M15.48,18.87 C14.63,19.25 13.66,19.39 12.68,19.26" />
                <path strokeWidth="0.64" d="M17.53,17.2 C17.04,17.91 16.32,18.5 15.48,18.87" />
                <path strokeWidth="0.6" d="M18.35,14.87 C18.3,15.67 18.03,16.49 17.53,17.2" />
                <path strokeWidth="0.56" d="M17.87,12.62 C18.22,13.28 18.4,14.06 18.35,14.87" />
                <path strokeWidth="0.53" d="M16.4,11.08 C16.99,11.42 17.52,11.96 17.87,12.62" />
                <path strokeWidth="0.49" d="M14.51,10.58 C15.14,10.57 15.8,10.73 16.4,11.08" />
                <path strokeWidth="0.46" d="M12.8,11.11 C13.28,10.8 13.88,10.6 14.51,10.58" />
                <path strokeWidth="0.42" d="M11.75,12.33 C11.97,11.86 12.33,11.43 12.8,11.11" />
                <path strokeWidth="0.38" d="M11.54,13.76 C11.48,13.31 11.54,12.8 11.75,12.33" />
                <path strokeWidth="0.35" d="M12.06,14.92 C11.8,14.61 11.61,14.21 11.54,13.76" />
                <path strokeWidth="0.31" d="M12.99,15.51 C12.66,15.42 12.33,15.22 12.06,14.92" />
                <path strokeWidth="0.28" d="M13.93,15.48 C13.65,15.58 13.33,15.6 12.99,15.51" />
                <path strokeWidth="0.24" d="M14.55,15.02 C14.41,15.21 14.2,15.39 13.93,15.48" />
                <path strokeWidth="0.2" d="M14.71,14.43 C14.73,14.61 14.68,14.83 14.55,15.02" />
                <path strokeWidth="0.17" d="M14.5,14.0 C14.61,14.09 14.69,14.24 14.71,14.43" />
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
