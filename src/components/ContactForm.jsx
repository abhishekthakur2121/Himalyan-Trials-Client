import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ContactForm() {
  const location = useLocation();
  const prefillMessage = location.state?.prefillMessage || '';
  const prefillPackage = location.state?.prefillPackage || '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    package: prefillPackage,
    message: prefillMessage
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    // When navigating from a specific package with a prefilled plan, update the form fields accordingly
    if (prefillMessage || prefillPackage) {
      setForm((prev) => ({
        ...prev,
        package: prefillPackage || prev.package,
        message: prefillMessage || prev.message
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillMessage, prefillPackage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', package: '', message: '' });
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" className="px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/60" required />
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" className="px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/60" required />
        <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/60" required />
        <input name="package" value={form.package} onChange={onChange} placeholder="Interested Package" className="px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/60" required />
      </div>
      <textarea name="message" value={form.message} onChange={onChange} placeholder="Your Message" rows="4" className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/60" required />
      <button type="submit" className="px-5 py-2 rounded-md bg-emerald text-navy font-semibold hover:bg-emerald/90">
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>
      {status === 'success' && <p className="text-emerald text-sm">Thanks! We will contact you shortly.</p>}
      {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
    </form>
  );
}
