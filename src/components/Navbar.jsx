import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../images/logo.jpg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const linkCls = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive ? 'bg-emerald/10 text-emerald-800' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
    }`;

  const closeMenu = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="w-full px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={logo} alt="Himalayan Trails logo" className="w-9 h-9 rounded-full object-cover shadow-sm" />
          <span className="font-extrabold tracking-tight text-sm md:text-base">Himalayan Trails</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkCls} end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/packages" className={linkCls} onClick={closeMenu}>
            Packages
          </NavLink>
          <NavLink to="/destinations" className={linkCls} onClick={closeMenu}>
            Destinations
          </NavLink>
          <NavLink to="/reviews" className={linkCls} onClick={closeMenu}>
            Reviews
          </NavLink>
          <NavLink to="/contact" className={linkCls} onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/admin/login" className={linkCls} onClick={closeMenu}>
            Admin
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          {location.pathname === '/' ? (
            <a
              href="#contact"
              className="hidden sm:inline-flex px-3 py-2 rounded-md bg-emerald text-navy text-sm font-semibold hover:bg-emerald/90 shadow-sm"
            >
              Plan Trip
            </a>
          ) : (
            <NavLink
              to="/contact"
              className="hidden sm:inline-flex px-3 py-2 rounded-md bg-emerald text-navy text-sm font-semibold hover:bg-emerald/90 shadow-sm"
            >
              Plan Trip
            </NavLink>
          )}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 bg-white hover:bg-slate-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-5 h-5 text-slate-700"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            <NavLink to="/" className={linkCls} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/packages" className={linkCls} onClick={closeMenu}>
              Packages
            </NavLink>
            <NavLink to="/destinations" className={linkCls} onClick={closeMenu}>
              Destinations
            </NavLink>
            <NavLink to="/reviews" className={linkCls} onClick={closeMenu}>
              Reviews
            </NavLink>
            <NavLink to="/contact" className={linkCls} onClick={closeMenu}>
              Contact
            </NavLink>
            <NavLink to="/admin/login" className={linkCls} onClick={closeMenu}>
              Admin
            </NavLink>
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-1 inline-flex w-full justify-center px-3 py-2 rounded-md bg-emerald text-navy text-sm font-semibold hover:bg-emerald/90"
            >
              Plan Trip
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
