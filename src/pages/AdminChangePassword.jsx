import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminChangePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const token = typeof window !== 'undefined' ? window.localStorage.getItem('ht_admin_token') : null;
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate, token]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    setError('');
    setSuccess('');

    if (!form.currentPassword || !form.newPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('New password should be at least 6 characters.');
      return;
    }

    setStatus('saving');
    try {
      const res = await fetch(`${apiBase}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to change password');
      }
      setStatus('success');
      setSuccess('Password updated successfully.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to change password');
    }
  };

  return (
    <main className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-md mx-auto px-4 py-10">
        <section className="bg-navy/60 border border-white/10 rounded-2xl p-6 space-y-5 text-sm">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Change admin password</h1>
            <p className="text-gray-300 text-xs md:text-sm mt-1">
              Update the password for your admin account. You will use the new password the next time you log in.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-gray-200">Current password</label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-200">New password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-200">Confirm new password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 rounded-md bg-emerald text-navy font-semibold shadow-sm hover:bg-emerald/90 focus:outline-none focus:ring-2 focus:ring-emerald/70 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {status === 'saving' ? 'Updating…' : 'Update password'}
            </button>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
            {success && <p className="text-xs text-emerald-300 mt-1">{success}</p>}
          </form>

          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="w-full mt-3 px-4 py-2 rounded-md bg-slate-800/90 border border-white/15 text-xs md:text-sm text-slate-100 hover:bg-slate-700/90 hover:border-white/25"
          >
            Back to dashboard
          </button>
        </section>
      </div>
    </main>
  );
}
