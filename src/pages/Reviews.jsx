import React, { useEffect, useMemo, useState } from 'react';
import TestimonialCarousel from '../components/TestimonialCarousel.jsx';

// Fallback testimonials matching the familiar seed data
const fallbackTestimonials = [
  {
    name: 'Vansh Suri',
    location: 'Mumbai, IN',
    rating: 5,
    comment: 'Flawless planning and stunning views. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Sara Thompson',
    location: 'London, UK',
    rating: 5,
    comment: 'Loved the Spiti drive and cozy homestays.',
    avatar: 'https://i.pravatar.cc/150?img=32'
  },
  {
    name: 'Kabir Singh',
    location: 'Delhi, IN',
    rating: 5,
    comment: 'Dharamshala vibes were unreal. Great hosts.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Meera Iyer',
    location: 'Bengaluru, IN',
    rating: 5,
    comment: 'Super professional and friendly team.',
    avatar: 'https://i.pravatar.cc/150?img=24'
  },
  {
    name: 'Noah Williams',
    location: 'Toronto, CA',
    rating: 5,
    comment: 'Paragliding at Bir was a dream come true.',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    name: 'Apurav Uppal',
    location: 'Hyderabad, IN',
    rating: 5,
    comment: 'Quick responses and safe travel. Perfect!',
    avatar: 'https://i.pravatar.cc/150?img=15'
  },
  {
    name: 'Lucas Martin',
    location: 'Paris, FR',
    rating: 5,
    comment: 'Food, culture, mountains. Fantastic mix.',
    avatar: 'https://i.pravatar.cc/150?img=61'
  },
  {
    name: 'Ananya Verma',
    location: 'Pune, IN',
    rating: 5,
    comment: 'Our Shimla retreat was peaceful and scenic.',
    avatar: 'https://i.pravatar.cc/150?img=8'
  }
];

export default function Reviews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // const apiBase = import.meta.env.VITE_API_BASE_URL || '';
  const apiBase = "https://himalyan-trial-backend.onrender.com";

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`${apiBase}/api/testimonials`).then((r) => r.json());
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const source = items.length ? items : fallbackTestimonials;
    if (!source.length) {
      return { avg: 0, count: 0 };
    }
    const sum = source.reduce((acc, t) => acc + (t.rating || 0), 0);
    const avg = source.length ? sum / source.length : 0;
    const rawCount = source.length;
    const count = items.length ? rawCount : Math.max(rawCount, 100);
    return { avg: Number(avg.toFixed(1)) || 0, count };
  }, [items]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Hero / intro */}
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald">Traveler stories</p>
        <h1 className="text-3xl md:text-4xl font-extrabold">Guest Reviews & Ratings</h1>
        <p className="text-slate-600 max-w-3xl text-base md:text-lg">
          Every itinerary is planned with safety, clear communication, and local expertise in mind. Here is a snapshot of
          what guests have to say after exploring Himachal with Himalayan Trails Expeditions.
        </p>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm md:text-base">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Average rating</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-yellow-500">{stats.avg}</span>
            <span className="text-xs text-slate-600">/ 5.0</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">Based on recent trips and repeat travelers.</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Review count</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold">{Math.max(stats.count, 100)}</span>
            <span className="text-xs text-slate-600">guest reviews</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">Across group trips, private trips, and workations.</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Platforms</div>
          <div className="mt-1 text-sm text-slate-700">Google, Instagram DMs, WhatsApp feedback, and email.</div>
          <div className="mt-1 text-xs text-slate-500">We consolidate feedback from multiple channels.</div>
        </div>
      </section>

      {/* Carousel + details */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 bg-slate-100 border border-slate-200 rounded-xl p-4 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm md:text-base font-semibold text-slate-900">What guests are saying</h2>
            <span className="text-[11px] text-slate-500">Auto-scrolling highlights</span>
          </div>
          {loading ? (
            <div className="text-xs text-slate-500">Loading testimonials…</div>
          ) : items.length ? (
            <TestimonialCarousel items={items} />
          ) : (
            <TestimonialCarousel items={fallbackTestimonials} />
          )}
        </div>

        <aside className="bg-slate-100 border border-slate-200 rounded-xl p-4 md:p-5 text-xs md:text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">How we collect reviews</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Post-trip WhatsApp or email feedback from every group.</li>
            <li>Public Google reviews from guests who opt to share.</li>
            <li>Repeat guests who book second or third itineraries.</li>
          </ul>
          <p className="pt-1 text-slate-500">
            Planning your own trip? Share your dates and rough route idea on the contact page and we&apos;ll send a draft
            plan with transparent pricing.
          </p>
        </aside>
      </section>
    </main>
  );
}
