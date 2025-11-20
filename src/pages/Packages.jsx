import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PackageCard from '../components/PackageCard.jsx';

function getSamplePlan(pkg) {
  const title = (pkg?.title || '').toLowerCase();

  if (title.includes('spiti')) {
    return {
      highlight: 'High-altitude desert, monasteries, and starry skies.',
      days: [
        'Day 1–2 – Shimla / Narkanda acclimatisation and valley drive.',
        'Day 3–4 – Kaza town, Key monastery, Hikkim & Langza villages.',
        'Day 5–6 – Pin Valley viewpoints, local homestay, drive back via Kinnaur.'
      ]
    };
  }

  if (title.includes('manali')) {
    return {
      highlight: 'Perfect first-timer circuit for snow, cafes, and easy sightseeing.',
      days: [
        'Day 1 – Arrival, Old Manali cafes, Hadimba temple, riverside walk.',
        'Day 2 – Solang Valley cable car / snow activities as per season.',
        'Day 3–4 – Atal Tunnel drive, local markets, and departure.'
      ]
    };
  }

  if (title.includes('kasol') || title.includes('parvati')) {
    return {
      highlight: 'Slow, cafe-filled days by the Parvati river with light hikes.',
      days: [
        'Day 1 – Check-in, riverside cafes, sunset bonfire.',
        'Day 2 – Chalal / nearby forest walk, Israeli food trail in Kasol.',
        'Day 3 – Short hike / village visit, brunch, and depart.'
      ]
    };
  }

  if (title.includes('dharamshala') || title.includes('mcleod')) {
    return {
      highlight: 'Monasteries, cafes, and gentle walks around the Dhauladhar foothills.',
      days: [
        'Day 1 – St. John church, Naddi sunset point, and local cafes.',
        'Day 2 – Dalai Lama temple complex and Tibetan market.',
        'Day 3–4 – Bhagsu waterfall, optional Triund trek, departure.'
      ]
    };
  }

  return {
    highlight: 'Sample plan can be customised to your dates, group size, and pace.',
    days: [
      'Day 1 – Arrival, check-in, local orientation and sunset viewpoint.',
      'Day 2 – Guided sightseeing or hike as per comfort level.',
      'Day 3+ – Free time for cafes, markets, or add-on experiences.'
    ]
  };
}

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [sampleHighlight, setSampleHighlight] = useState(false);
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';
  const sampleRef = useRef(null);

  const handleViewDetails = (pkg) => {
    setSelected(pkg);
    if (sampleRef.current) {
      sampleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setSampleHighlight(true);
      window.setTimeout(() => setSampleHighlight(false), 700);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`${apiBase}/api/packages`).then((r) => r.json());
        setPackages(data);
        if (data.length) {
          const featured = data.find((p) => p.popular) || data[0];
          setSelected(featured);
        }
      } catch (e) {
        // ignore for now
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPackages = useMemo(() => {
    if (filter === 'popular') {
      return packages.filter((p) => p.popular);
    }
    return packages;
  }, [packages, filter]);

  const plan = selected ? getSamplePlan(selected) : null;
  const prefillMessage = selected
    ? [
        `Sample trip plan: ${selected.title} (${selected.duration}, from ₹${selected.price?.toLocaleString('en-IN')}).`,
        plan.highlight,
        plan.days.join(' '),
        'Exact day-wise plan, hotels, and transport can be customised for your group. Share your dates and group size and our team will send you a detailed PDF itinerary.'
      ]
        .join(' ')
        .trim()
    : '';

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold">Himachal Tour Packages</h1>
        <p className="text-slate-600 max-w-2xl text-base md:text-lg">
          Browse our full catalogue of Himachal trips – from quick weekend escapes to deep Spiti expeditions. All
          packages are customisable to your dates, group size, and comfort level.
        </p>
      </section>

      {packages.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm md:text-base font-semibold text-slate-900">Browse Himachal itineraries</h2>
          <p className="text-xs md:text-sm text-slate-600">
            Scroll through some of our most loved routes across Himachal Pradesh. Tap any card to see a sample day-wise
            plan on the right.
          </p>
          <div className="mt-3 overflow-x-auto">
            <div className="flex gap-4 min-w-full pb-2">
              {packages.slice(0, 40).map((pkg) => (
                <button
                  key={`carousel-${pkg._id || pkg.title}`}
                  type="button"
                  onClick={() => handleViewDetails(pkg)}
                  className={`min-w-[220px] max-w-[260px] rounded-xl p-4 text-left text-xs md:text-sm transition border ${
                    (selected && (selected._id || selected.title) === (pkg._id || pkg.title))
                      ? 'bg-white border-emerald/60 shadow-md'
                      : 'bg-white border-slate-200 hover:border-emerald/40 hover:shadow-sm'
                  }`}
                >
                  <div className="font-semibold text-sm md:text-base line-clamp-2 text-slate-900">{pkg.title}</div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {pkg.duration} • From ₹{pkg.price?.toLocaleString('en-IN')}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-600 line-clamp-3">{pkg.shortDesc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="flex items-center justify-between gap-3 text-xs md:text-sm">
        <div className="inline-flex rounded-full bg-white border border-slate-200 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full ${
              filter === 'all' ? 'bg-emerald text-navy font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All trips
          </button>
          <button
            type="button"
            onClick={() => setFilter('popular')}
            className={`px-3 py-1 rounded-full ${
              filter === 'popular' ? 'bg-emerald text-navy font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Most popular
          </button>
        </div>
        <p className="text-[11px] md:text-xs text-slate-500">
          Showing {filteredPackages.length || 0} of {packages.length || 0} itineraries
        </p>
      </section>

      <section
        ref={sampleRef}
        className={`bg-slate-100 border rounded-xl p-5 text-sm text-slate-700 space-y-3 transition-all duration-500 ease-out ${
          sampleHighlight
            ? 'border-emerald/70 shadow-lg shadow-emerald/30 bg-emerald/5 scale-[1.01]'
            : 'border-slate-200 shadow-sm'
        }`}
      >
        {selected ? (
          <>
            <p className="text-xs uppercase tracking-[0.18em] text-emerald mb-1">Sample trip plan</p>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">{selected.title}</h2>
            <p className="text-xs text-slate-600 mb-1">{selected.duration} • From ₹{selected.price?.toLocaleString('en-IN')}</p>
            <p className="text-sm text-slate-700">{plan.highlight}</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-xs md:text-sm">
              {plan.days.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Exact day-wise plan, hotels, and transport can be customised for your group. Share your dates on the
              contact page and our team will send you a detailed PDF.
            </p>
            <Link
              to="/contact"
              state={{ prefillMessage, prefillPackage: selected.title }}
              className="inline-flex items-center justify-center mt-4 px-4 py-2 rounded-md bg-emerald text-navy text-xs md:text-sm font-semibold hover:bg-emerald/90"
            >
              Plan this trip
            </Link>
          </>
        ) : (
          <div className="text-sm text-slate-700">
            <p className="font-semibold mb-1">Select a package to view a sample trip plan.</p>
            <p className="text-xs text-slate-500">
              You&apos;ll see a quick overview of how your days could look, plus an easy way to share your dates with our
              team for a customised version.
            </p>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
        {loading && (
          <div className="col-span-full text-sm text-slate-500">Loading itineraries…</div>
        )}
        {filteredPackages.length === 0 && (
          <div className="col-span-full bg-slate-100 border border-slate-200 rounded-xl p-6 text-sm text-slate-700">
            No trips found for this filter. Try switching back to "All trips".
          </div>
        )}
        {filteredPackages.map((pkg) => (
          <div
            key={pkg._id || pkg.title}
            className={`text-left rounded-xl focus-within:ring-2 focus-within:ring-emerald/70 transition ${
              selected && (selected._id || selected.title) === (pkg._id || pkg.title)
                ? 'ring-2 ring-emerald/70'
                : ''
            }`}
          >
            <PackageCard
              item={pkg}
              onSelect={() => setSelected(pkg)}
              onViewDetails={() => handleViewDetails(pkg)}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
