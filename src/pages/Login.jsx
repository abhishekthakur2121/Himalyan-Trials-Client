import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Placeholder: integrate with real auth API later
      if (!form.email || !form.password) throw new Error('Invalid credentials');
      window.localStorage.setItem('ht_user_role', 'user');
      setStatus('success');
      navigate('/dashboard');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-navy/60 border border-white/10 rounded-2xl p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold">Traveler Login</h1>
          <p className="text-sm text-gray-300 mt-1">Access your itineraries and trip details.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 text-sm">
          <div className="space-y-1">
            <label className="block text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-emerald text-navy font-semibold hover:bg-emerald/90"
          >
            {status === 'loading' ? 'Signing in...' : 'Sign in'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-400 mt-1">Login failed. Replace this stub with real authentication.</p>
          )}
        </form>
        <p className="text-xs text-gray-400 text-center">
          New here? Use the sign-up page for travelers once backend auth is connected.
        </p>
      </div>
    </main>
  );
}
