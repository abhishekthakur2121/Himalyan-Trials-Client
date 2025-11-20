import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout({ title, subtitle, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('ht_admin_token');
    }
    navigate('/');
  };

  const linkCls = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald/20 text-emerald-200'
        : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
    }`;

  return (
    <main className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-8 flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar */}
        <aside className="md:w-56 lg:w-64 bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-lg shadow-black/40">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-emerald/80">Admin</p>
            <h1 className="text-base md:text-lg font-extrabold tracking-tight">Himalayan Console</h1>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Manage inquiries, packages, and reviews from a single place.
            </p>
          </div>

          <nav className="flex-1 space-y-1 text-xs md:text-sm">
            <NavLink to="/admin" end className={linkCls}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald/70" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/packages" className={linkCls}>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400/70" />
              <span>Packages</span>
            </NavLink>
            <NavLink to="/admin/reviews" className={linkCls}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/70" />
              <span>Reviews</span>
            </NavLink>
            <NavLink to="/admin/change-password" className={linkCls}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400/70" />
              <span>Change password</span>
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={onLogout}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-white/15 bg-slate-900/60 text-[11px] md:text-xs font-semibold text-slate-200 hover:bg-slate-800/90 hover:text-white"
          >
            Log out
          </button>
        </aside>

        {/* Main content */}
        <section className="flex-1 min-w-0 space-y-4">
          <header className="space-y-1">
            {title && (
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                {title}
                {location.pathname !== '/admin' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/80 border border-white/10 text-slate-300">
                    Admin
                  </span>
                )}
              </h2>
            )}
            {subtitle && <p className="text-xs md:text-sm text-slate-300 max-w-2xl">{subtitle}</p>}
          </header>

          <div className="bg-navy/70 border border-white/10 rounded-2xl p-4 md:p-5 shadow-xl shadow-black/40">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
