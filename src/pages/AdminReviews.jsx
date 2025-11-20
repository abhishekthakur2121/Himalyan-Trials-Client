import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    location: '',
    rating: '',
    comment: '',
    avatar: ''
  });

  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('ht_admin_token') : null;
  // const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const apiBase = "https://himalyan-trial-backend.onrender.com";

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchReviews = async () => {
      setStatus('loading');
      setError('');
      try {
        const res = await fetch(`${apiBase}/api/admin/testimonials`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 401) {
            window.localStorage.removeItem('ht_admin_token');
            navigate('/admin/login');
            return;
          }
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || 'Failed to load reviews');
        }
        const data = await res.json();
        setReviews(data || []);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err.message || 'Failed to load reviews');
      }
    };

    fetchReviews();
  }, [navigate, token]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: '', location: '', rating: '', comment: '', avatar: '' });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    setStatus('saving');
    setError('');
    try {
      const payload = {
        ...form,
        rating: Number(form.rating)
      };
      const url = editingId
        ? `${apiBase}/api/admin/testimonials/${editingId}`
        : `${apiBase}/api/admin/testimonials`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to save review');
      }
      const saved = await res.json();
      setReviews((prev) => {
        if (editingId) {
          return prev.map((r) => (r._id === saved._id ? saved : r));
        }
        return [...prev, saved];
      });
      resetForm();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to save review');
    }
  };

  const onEdit = (review) => {
    setEditingId(review._id);
    setForm({
      name: review.name || '',
      location: review.location || '',
      rating: review.rating != null ? String(review.rating) : '',
      comment: review.comment || '',
      avatar: review.avatar || ''
    });
  };

  const onDelete = async (id) => {
    if (!token) return;
    const confirmed = window.confirm('Delete this review? This cannot be undone.');
    if (!confirmed) return;
    try {
      const res = await fetch(`${apiBase}/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok && res.status !== 204) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to delete review');
      }
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete review');
    }
  };

  return (
    <main className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Manage Reviews</h1>
            <p className="text-gray-300 max-w-2xl text-xs md:text-sm">
              Add, edit, or remove customer reviews. Changes here will immediately reflect on the public reviews carousel.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="self-start md:self-auto px-3 py-2 rounded-md bg-slate-800/90 border border-white/15 text-xs md:text-sm text-slate-100 hover:bg-slate-700/90 hover:border-white/25"
          >
            Back to dashboard
          </button>
        </section>

        <section className="grid gap-6 md:grid-cols-[2fr,3fr] items-start text-xs md:text-sm">
          <form onSubmit={onSubmit} className="bg-navy/60 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="font-semibold text-sm md:text-base">
                {editingId ? 'Edit review' : 'Add new review'}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-2 py-1 rounded-md bg-slate-800 border border-white/20 text-[11px] font-semibold hover:bg-slate-700"
                >
                  Cancel edit
                </button>
              )}
            </div>
            <div className="space-y-1">
              <label className="block text-gray-200">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-200">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-gray-200">Rating (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  name="rating"
                  value={form.rating}
                  onChange={onChange}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-200">Avatar URL (optional)</label>
                <input
                  type="url"
                  name="avatar"
                  value={form.avatar}
                  onChange={onChange}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-gray-200">Comment</label>
              <textarea
                name="comment"
                value={form.comment}
                onChange={onChange}
                rows={4}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full px-4 py-2 rounded-md bg-emerald text-navy font-semibold shadow-sm hover:bg-emerald/90 focus:outline-none focus:ring-2 focus:ring-emerald/70 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {status === 'saving' ? 'Saving…' : editingId ? 'Update review' : 'Create review'}
            </button>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </form>

          <section className="bg-navy/60 border border-white/10 rounded-xl p-5 space-y-3 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-sm md:text-base">Existing reviews</h2>
              <span className="text-[11px] text-gray-400">{reviews.length} total</span>
            </div>
            {status === 'loading' && <p className="text-xs text-gray-400">Loading reviews…</p>}
            {reviews.length === 0 && status === 'success' && (
              <p className="text-xs text-gray-300">No reviews found. Start by creating one on the left.</p>
            )}
            {reviews.length > 0 && (
              <div className="space-y-2">
                {reviews.map((r) => (
                  <div
                    key={r._id}
                    className="border border-white/10 rounded-lg p-3 bg-slate-900/70 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm md:text-base">{r.name}</p>
                      <p className="text-[11px] text-gray-400">
                        {(r.location || '').trim()} {r.location ? '· ' : ''}Rating: {r.rating}
                      </p>
                      <p className="text-[11px] text-gray-300 line-clamp-3">{r.comment}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(r)}
                        className="px-2 py-1 rounded-md bg-emerald text-navy text-[11px] font-semibold shadow-sm hover:bg-emerald/90"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(r._id)}
                        className="px-2 py-1 rounded-md bg-red-600/90 text-white text-[11px] font-semibold hover:bg-red-500/90"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
