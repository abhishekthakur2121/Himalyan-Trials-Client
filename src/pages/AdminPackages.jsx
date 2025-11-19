import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    price: '',
    duration: '',
    image: '',
    shortDesc: '',
    popular: false
  });
  const navigate = useNavigate();

  const token = typeof window !== 'undefined' ? window.localStorage.getItem('ht_admin_token') : null;

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchPackages = async () => {
      setStatus('loading');
      setError('');
      try {
        const res = await fetch('/api/admin/packages', {
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
          throw new Error(body.message || 'Failed to load packages');
        }
        const data = await res.json();
        setPackages(data || []);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err.message || 'Failed to load packages');
      }
    };

    fetchPackages();
  }, [navigate, token]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: '', price: '', duration: '', image: '', shortDesc: '', popular: false });
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
        price: Number(form.price)
      };
      const url = editingId ? `/api/admin/packages/${editingId}` : '/api/admin/packages';
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
        throw new Error(body.message || 'Failed to save package');
      }
      const saved = await res.json();
      setPackages((prev) => {
        if (editingId) {
          return prev.map((p) => (p._id === saved._id ? saved : p));
        }
        return [...prev, saved];
      });
      resetForm();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to save package');
    }
  };

  const onEdit = (pkg) => {
    setEditingId(pkg._id);
    setForm({
      title: pkg.title || '',
      price: pkg.price != null ? String(pkg.price) : '',
      duration: pkg.duration || '',
      image: pkg.image || '',
      shortDesc: pkg.shortDesc || '',
      popular: Boolean(pkg.popular)
    });
  };

  const onDelete = async (id) => {
    if (!token) return;
    const confirmed = window.confirm('Delete this package? This cannot be undone.');
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok && res.status !== 204) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to delete package');
      }
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete package');
    }
  };

  return (
    <main className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Manage Packages</h1>
            <p className="text-gray-300 max-w-2xl text-xs md:text-sm">
              Create, edit, or remove Himachal tour packages. Changes here will immediately reflect on the public packages
              page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="self-start md:self-auto px-3 py-2 rounded-md bg-slate-800 border border-white/10 text-xs md:text-sm hover:bg-slate-700"
          >
            Back to dashboard
          </button>
        </section>

        <section className="grid gap-6 md:grid-cols-[2fr,3fr] items-start text-xs md:text-sm">
          <form onSubmit={onSubmit} className="bg-navy/60 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="font-semibold text-sm md:text-base">
                {editingId ? 'Edit package' : 'Add new package'}
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
              <label className="block text-gray-200">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-gray-200">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={onChange}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-gray-200">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={onChange}
                  placeholder="e.g. 4D/3N"
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                  required
                />
              </div>
              <div className="flex items-center gap-2 mt-5 sm:mt-7">
                <input
                  id="popular"
                  type="checkbox"
                  name="popular"
                  checked={form.popular}
                  onChange={onChange}
                  className="w-4 h-4 accent-emerald"
                />
                <label htmlFor="popular" className="text-gray-200 text-xs md:text-sm">
                  Mark as popular
                </label>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-gray-200">Image URL</label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-200">Short description</label>
              <textarea
                name="shortDesc"
                value={form.shortDesc}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 rounded-md bg-slate-900 border border-white/10 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full px-4 py-2 rounded-md bg-emerald text-navy font-semibold hover:bg-emerald/90"
            >
              {status === 'saving' ? 'Saving…' : editingId ? 'Update package' : 'Create package'}
            </button>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </form>

          <section className="bg-navy/60 border border-white/10 rounded-xl p-5 space-y-3 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-sm md:text-base">Existing packages</h2>
              <span className="text-[11px] text-gray-400">{packages.length} total</span>
            </div>
            {status === 'loading' && <p className="text-xs text-gray-400">Loading packages…</p>}
            {packages.length === 0 && status === 'success' && (
              <p className="text-xs text-gray-300">No packages found. Start by creating one on the left.</p>
            )}
            {packages.length > 0 && (
              <div className="space-y-2">
                {packages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="border border-white/10 rounded-lg p-3 bg-slate-900/70 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm md:text-base">{pkg.title}</p>
                      <p className="text-[11px] text-gray-400">
                        {pkg.duration} • From ₹{pkg.price?.toLocaleString('en-IN')} {pkg.popular ? '• Popular' : ''}
                      </p>
                      <p className="text-[11px] text-gray-300 line-clamp-2">{pkg.shortDesc}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(pkg)}
                        className="px-2 py-1 rounded-md bg-emerald text-navy text-[11px] font-semibold hover:bg-emerald/90"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(pkg._id)}
                        className="px-2 py-1 rounded-md bg-red-600/80 text-white text-[11px] font-semibold hover:bg-red-500/90"
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
