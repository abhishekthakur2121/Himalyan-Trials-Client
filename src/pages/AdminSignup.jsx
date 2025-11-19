import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminSignup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Sign-up failed');
      }
      const data = await res.json();
      window.localStorage.setItem('ht_admin_token', data.token);
      setStatus('success');
      navigate('/admin');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Sign-up failed');
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-slate-950 text-white">
      <div className="w-full max-w-md bg-navy/60 border border-white/10 rounded-2xl p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold">Admin Sign Up</h1>
          <p className="text-sm text-gray-300 mt-1">One-time setup for the admin console (internal use only).</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 text-sm" autoComplete="off">
          <div className="space-y-1">
            <label className="block text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="username"
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
              autoComplete="new-password"
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
            {status === 'loading' ? 'Creating account...' : 'Create account'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-400 mt-1">{error}</p>
          )}
        </form>
        <p className="text-xs text-gray-400 text-center">
          Already have an admin account?{' '}
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="text-emerald hover:underline font-semibold"
          >
            Log in
          </button>
        </p>
      </div>
    </main>
  );
}
