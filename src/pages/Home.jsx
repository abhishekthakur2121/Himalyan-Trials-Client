import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero.jsx';
import PackageCard from '../components/PackageCard.jsx';
import TestimonialCarousel from '../components/TestimonialCarousel.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({ clients: 20147, rating: 4.9, reviews: 352 });
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    (async () => {
      try {
        const [p, t, s] = await Promise.all([
          fetch(`${apiBase}/api/packages`).then(r => r.json()),
          fetch(`${apiBase}/api/testimonials`).then(r => r.json()),
          fetch(`${apiBase}/api/stats`).then(r => r.json())
        ]);
        setPackages(p);
        setTestimonials(t);
        setStats(s);
      } catch (e) {
        // fail silently in UI, could add toast
      }
    })();
  }, []);

  const trendingPackages = packages.filter((p) => p.popular);
  const homePackages = (trendingPackages.length ? trendingPackages : packages).slice(0, 6);

  return (
    <main>
      <Hero />

      <section id="stats" className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          <div className="md:col-span-2 bg-slate/10 border border-slate/20 rounded-xl p-5 flex flex-col justify-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald mb-1">Trusted by travelers</p>
            <p className="text-sm md:text-base text-slate-600">Small-group Himalayan departures, safety-first operations, and handpicked homestays.</p>
            <p className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.18em] text-slate-500">Trusted by teams at</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-600">
              <span className="px-3 py-1 rounded-full border border-emerald/20 bg-slate/5">SnowPeak Finance</span>
              <span className="px-3 py-1 rounded-full border border-emerald/20 bg-slate/5">Cloud9 Studios</span>
              <span className="px-3 py-1 rounded-full border border-emerald/20 bg-slate/5">Himaluxe Retreats</span>
              <span className="px-3 py-1 rounded-full border border-emerald/20 bg-slate/5">Evergreen IT Park</span>
            </div>
          </div>
          <div className="bg-slate/5 border border-slate/20 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-orange">{stats.clients.toLocaleString('en-IN')}+</div>
            <div className="text-sm text-slate-600">Happy Himalayan travelers</div>
          </div>
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
              <div className="text-xl font-extrabold text-emerald">{stats.rating}</div>
              <div className="text-xs text-slate-700">Average trip rating</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
              <div className="text-xl font-extrabold">{stats.reviews}</div>
              <div className="text-xs text-slate-700">Verified Google reviews</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 text-xs md:text-sm text-slate-700">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="italic">“Flawless planning for our Spiti road trip. Every homestay felt carefully picked.”</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">Vansh • UNA</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="italic">“Super smooth Manali & Kasol circuit. Great drivers and cozy stays for our group.”</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">Apurav• Chandigarh</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="italic">“Loved their local recommendations in Dharamshala and Bir. Felt like traveling with insiders.”</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">Vishal • Delhi</p>
          </div>
        </div>
      </section>

      <section id="packages" className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Trending Himalayan Itineraries</h2>
          <p className="text-sm md:text-base text-slate-600 mb-4">Curated trips that are currently most in-demand with our repeat travelers – perfect if you want something tried and tested.</p>

          <div className="mb-6 overflow-x-auto">
            <div className="flex gap-4 min-w-full pb-1">
              <div className="min-w-[240px] max-w-[260px] bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 shadow-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-emerald mb-1">Spiti Winter Odyssey • 6D/5N</div>
                <p className="text-xs text-slate-500 mb-2">Kaza • Kibber • Langza • Chandratal (seasonal)</p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li><span className="font-semibold">Day 1–2:</span> Shimla / Narkanda acclimatisation, Sutlej valley drive.</li>
                  <li><span className="font-semibold">Day 3–4:</span> Kaza town, Key monastery, Hikkim & Langza villages.</li>
                  <li><span className="font-semibold">Day 5–6:</span> Pin Valley viewpoints, local homestay, return via Kinnaur.</li>
                </ul>
              </div>

              <div className="min-w-[240px] max-w-[260px] bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 shadow-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-emerald mb-1">Classic Manali Escape • 4D/3N</div>
                <p className="text-xs text-slate-500 mb-2">Manali • Solang • Atal Tunnel</p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li><span className="font-semibold">Day 1:</span> Old Manali cafes, Hadimba temple, riverside walk.</li>
                  <li><span className="font-semibold">Day 2:</span> Solang Valley cable-car / snow activities.</li>
                  <li><span className="font-semibold">Day 3–4:</span> Atal Tunnel drive, local shopping, departure.</li>
                </ul>
              </div>

              <div className="min-w-[240px] max-w-[260px] bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 shadow-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-emerald mb-1">Kasol & Parvati Getaway • 3D/2N</div>
                <p className="text-xs text-slate-500 mb-2">Kasol • Chalal • Riverside</p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li><span className="font-semibold">Day 1:</span> Arrival, riverside cafe-hopping, sunset bonfire.</li>
                  <li><span className="font-semibold">Day 2:</span> Chalal forest walk, Israeli food trail in Kasol.</li>
                  <li><span className="font-semibold">Day 3:</span> Short hike / local market, depart after brunch.</li>
                </ul>
              </div>

              <div className="min-w-[240px] max-w-[260px] bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 hidden md:block shadow-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-emerald mb-1">Dharamshala & McLeod Ganj • 4D/3N</div>
                <p className="text-xs text-slate-500 mb-2">Dharamshala • McLeod Ganj • Naddi</p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li><span className="font-semibold">Day 1:</span> St. John church, evening at Naddi sunset point.</li>
                  <li><span className="font-semibold">Day 2:</span> Dalai Lama temple complex, Tibetan market.</li>
                  <li><span className="font-semibold">Day 3–4:</span> Bhagsu waterfall, cafes, optional Triund hike.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {homePackages.map((p) => (
              <PackageCard key={p._id || p.title} item={p} />
            ))}
          </div>
        </div>

        <div className="pt-6 text-center text-xs md:text-sm text-slate-600">
          <a href="/packages" className="inline-flex items-center gap-1 text-emerald hover:text-emerald/80">
            <span>View all detailed itineraries</span>
            <span>→</span>
          </a>
        </div>
      </section>

      <section id="testimonials" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">What Travelers Say</h2>
        <p className="text-xs md:text-sm text-slate-600 mb-4">
          Rated <span className="font-semibold text-emerald">{stats.rating}★</span> based on
          {' '}
          <span className="font-semibold">{stats.reviews}+</span> verified Google reviews.
        </p>
        <TestimonialCarousel items={testimonials} />
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Plan Your Trip</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-base font-medium text-slate-900">Tell us how you like to travel and we’ll design a custom Himalayan plan for you.</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>No spam – only handcrafted trip ideas.</li>
              <li>Personalized itinerary within 24 hours.</li>
              <li>Dedicated trip specialist on WhatsApp.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-600">
              <span className="px-3 py-1 rounded-full border border-emerald/20 bg-emerald/5">Secure payments</span>
              <span className="px-3 py-1 rounded-full border border-emerald/20 bg-emerald/5">GST invoice available</span>
              <span className="px-3 py-1 rounded-full border border-emerald/20 bg-emerald/5">Licensed operator</span>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
