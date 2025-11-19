import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(251,146,60,0.08),transparent_55%)]">
      <Navbar />
      <Outlet />
      <Footer className={isAdminRoute ? 'mt-0' : 'mt-10'} />
    </div>
  );
}
