import React from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import Reviews from './pages/Reviews.jsx';
import Destinations from './pages/Destinations.jsx';
import Contact from './pages/Contact.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminSignup from './pages/AdminSignup.jsx';
import AdminPackages from './pages/AdminPackages.jsx';
import AdminReviews from './pages/AdminReviews.jsx';
import AdminChangePassword from './pages/AdminChangePassword.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/change-password" element={<AdminChangePassword />} />
        </Route>
      </Routes>
      <WhatsAppButton />
    </>
  );
}
