import React from 'react';

const sampleReviews = [
  {
    name: 'Rohit Mehta',
    trip: 'Manali & Solang snow escape',
    text:
      'Super smooth coordination and no last-minute surprises. Hotels were exactly as promised and the driver knew all the good chai stops.',
    rating: 5
  },
  {
    name: 'Ankita & Saurabh',
    trip: 'Spiti honeymoon circuit',
    text:
      'They helped us plan a slow Spiti route with cozy homestays. We felt safe throughout and never had to chase anyone for updates.',
    rating: 5
  },
  {
    name: 'Priya Nair',
    trip: 'Kasol & Tirthan workation',
    text:
      'Wi‑Fi was solid, stays were clean, and the team checked in regularly. Perfect blend of work and mountain time.',
    rating: 4.8
  }
];

export default function UserDashboard() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold">Traveler Dashboard</h1>
        <p className="text-slate-600 max-w-2xl text-base md:text-lg">
          View your upcoming trips, payment status, and personalized recommendations once authentication is wired to the
          backend.
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold mb-2">Upcoming Trips</h2>
          <p className="text-slate-700">No trips assigned yet. This section will show your confirmed itineraries.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold mb-2">Payments</h2>
          <p className="text-slate-700">Track advance payments and due balances once payment integration is added.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold mb-2">Support</h2>
          <p className="text-slate-700">Get direct WhatsApp support for live trips and pre-departure questions.</p>
        </div>
      </section>

      <section className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold">What other guests are saying</h2>
          <span className="text-[11px] text-slate-500">Recent Himalayan Trails travelers</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          {sampleReviews.map((r) => (
            <div
              key={r.name + r.trip}
              className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm"
            >
              <div>
                <p className="font-semibold text-sm text-slate-900">{r.name}</p>
                <p className="text-[11px] text-slate-500">{r.trip}</p>
              </div>
              <p className="text-slate-700 leading-relaxed">{r.text}</p>
              <p className="text-[11px] text-yellow-400">Rating: {r.rating} / 5</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
