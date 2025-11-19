import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');
  const [search, setSearch] = useState(''); // applied search term
  const [searchInput, setSearchInput] = useState(''); // value currently in the input
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('ht_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchInquiries = async () => {
      setStatus('loading');
      setError('');
      try {
        const res = await fetch('/api/admin/inquiries', {
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
          throw new Error(body.message || 'Failed to load inquiries');
        }
        const data = await res.json();
        setInquiries(data || []);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err.message || 'Failed to load inquiries');
      }
    };

    fetchInquiries();
  }, [navigate]);

  const onLogout = () => {
    window.localStorage.removeItem('ht_admin_token');
    navigate('/');
  };

  const token = typeof window !== 'undefined' ? window.localStorage.getItem('ht_admin_token') : null;

  const updateStatus = async (id, nextStatus) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to update status');
      }
      const updated = await res.json();
      setInquiries((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
    } catch (err) {
      // For now just log; could surface a toast/snackbar later
      console.error(err);
    }
  };

  const applySearch = () => {
    const term = searchInput.trim();
    setSearch(term);
    setSearchInput('');
  };

  const clearSearch = () => {
    setSearch('');
    setSearchInput('');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const s = inq.status || 'pending';
    if (filter !== 'all' && s !== filter) return false;

    if (!search.trim()) return true;
    const term = search.toLowerCase();
    const haystack = [
      inq.name,
      inq.email,
      inq.phone,
      inq.package,
      inq.message
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(term);
  });

  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter((i) => (i.status || 'pending') === 'pending').length;
  const completedCount = inquiries.filter((i) => i.status === 'completed').length;

  const deleteInquiry = async (id) => {
    if (!token) return;
    const confirmed = window.confirm('Delete this inquiry? This cannot be undone.');
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok && res.status !== 204) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to delete inquiry');
      }
      setInquiries((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Admin Console</h1>
            <p className="text-gray-300 max-w-2xl text-xs md:text-sm">
              Overview of all trip inquiries from the website. Use the filters to focus on pending or completed follow-ups.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => navigate('/admin/packages')}
              className="px-3 py-2 rounded-md bg-emerald text-navy text-xs md:text-sm font-semibold hover:bg-emerald/90"
            >
              Manage packages
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-2 rounded-md bg-slate-800 border border-white/10 text-xs md:text-sm hover:bg-slate-700"
            >
              Log out
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm">
          <div className="bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-gray-400">Total inquiries</span>
            <span className="text-xl font-semibold">{totalCount}</span>
          </div>
          <div className="bg-slate-900/70 border border-emerald/40 rounded-xl px-4 py-3 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-gray-400">Pending follow-up</span>
            <span className="text-xl font-semibold text-amber-300">{pendingCount}</span>
          </div>
          <div className="bg-slate-900/70 border border-emerald/40 rounded-xl px-4 py-3 flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-gray-400">Completed</span>
            <span className="text-xl font-semibold text-emerald">{completedCount}</span>
          </div>
        </section>

        <section className="bg-navy/60 border border-white/10 rounded-xl p-5 text-sm shadow-lg shadow-black/30">
          <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-sm md:text-base">Inquiry queue</h2>
              <span className="text-[11px] text-gray-400">{filteredInquiries.length} shown</span>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <div className="inline-flex rounded-lg border border-white/10 overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setFilter('pending')}
                  className={`px-3 py-1 ${
                    filter === 'pending' ? 'bg-emerald text-navy' : 'bg-slate-900/80 text-gray-200'
                  }`}
                >
                  Pending
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1 border-l border-white/10 ${
                    filter === 'completed' ? 'bg-emerald text-navy' : 'bg-slate-900/80 text-gray-200'
                  }`}
                >
                  Completed
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 border-l border-white/10 ${
                    filter === 'all' ? 'bg-emerald text-navy' : 'bg-slate-900/80 text-gray-200'
                  }`}
                >
                  All
                </button>
              </div>
              <form
                className="flex items-center gap-2 text-xs md:text-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  applySearch();
                }}
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by name, email, package..."
                  className="w-full md:w-64 pl-3 pr-3 py-1.5 rounded-md bg-slate-900/70 border border-white/15 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald/60"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-emerald text-navy text-[11px] font-semibold hover:bg-emerald/90"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-3 py-1.5 rounded-md bg-slate-800 border border-white/20 text-[11px] font-semibold hover:bg-slate-700"
                >
                  Clear
                </button>
              </form>
            </div>
            {status === 'loading' && <span className="text-xs text-gray-400">Loading...</span>}
          </div>
          {status === 'error' && <p className="text-xs text-red-400 mb-3">{error}</p>}
          {filteredInquiries.length === 0 && status === 'success' && (
            <p className="text-gray-300 text-sm">No inquiries in this view.</p>
          )}
          {filteredInquiries.length > 0 && (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq._id}
                  className="border border-white/10 rounded-lg p-4 bg-slate-900/70 flex flex-col gap-2 text-xs md:text-sm"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm md:text-base">{inq.name}</p>
                      <p className="text-gray-300 text-[11px] md:text-xs">{inq.email} · {inq.phone}</p>
                    </div>
                    <p className="text-[11px] text-gray-400 whitespace-nowrap">
                      {inq.date ? new Date(inq.date).toLocaleString() : ''}
                    </p>
                  </div>
                  <div className="flex items-start justify-between gap-3 mt-1">
                    <div>
                      <p className="text-emerald text-[11px] uppercase tracking-wide">Package: {inq.package}</p>
                      {inq.message && (
                        <p className="text-gray-200 mt-1 whitespace-pre-wrap text-xs leading-relaxed">
                          {inq.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                          (inq.status || 'pending') === 'completed'
                            ? 'bg-emerald/20 text-emerald'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {(inq.status || 'pending')}
                      </span>
                      <div className="flex gap-2">
                        {(inq.status || 'pending') === 'pending' ? (
                          <button
                            type="button"
                            onClick={() => updateStatus(inq._id, 'completed')}
                            className="px-2 py-1 rounded-md bg-emerald text-navy text-[11px] font-semibold hover:bg-emerald/90"
                          >
                            Completed
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updateStatus(inq._id, 'pending')}
                            className="px-2 py-1 rounded-md bg-slate-800 border border-white/20 text-[11px] font-semibold hover:bg-slate-700"
                          >
                            Pending
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteInquiry(inq._id)}
                          className="px-2 py-1 rounded-md bg-red-600/80 text-white text-[11px] font-semibold hover:bg-red-500/90"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
