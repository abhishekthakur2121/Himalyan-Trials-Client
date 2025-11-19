import React from 'react';

export default function Destinations() {
  const regions = [
    {
      title: 'Manali & Solang',
      desc: 'Ski slopes, riverside cafes, and easy access to snow & Atal Tunnel drives.',
      tags: ['Snow', 'Family', 'Couples'],
      ideal: 'Dec – Mar & May – Jun',
      style: 'Comfortable hotels, short drives'
    },
    {
      title: 'Spiti Valley',
      desc: 'High-altitude desert, monasteries, and stark Trans-Himalayan landscapes.',
      tags: ['High altitude', 'Explorers'],
      ideal: 'Jun – Oct',
      style: 'Road trips, homestays'
    },
    {
      title: 'Shimla & Kufri',
      desc: 'Mall Road charm, pine forests, and kid-friendly hill-station getaways.',
      tags: ['Family', 'Short trips'],
      ideal: 'All year (best Mar – Jun, Oct – Dec)',
      style: 'Short drives, easy walks'
    },
    {
      title: 'Dharamshala & McLeodganj',
      desc: 'Monasteries, cafes, and easy access to Dhauladhar foothill treks.',
      tags: ['Cafes', 'Culture'],
      ideal: 'Feb – Jun & Sep – Nov',
      style: 'Slow travel, cafe hopping'
    },
    {
      title: 'Kasol & Parvati Valley',
      desc: 'Riverside stays, short forest walks, and relaxed backpacker vibes.',
      tags: ['Backpackers', 'Cafes'],
      ideal: 'Mar – Jun & Sep – Nov',
      style: 'Homestays, short hikes'
    },
    {
      title: 'Bir Billing & Barot',
      desc: 'Paragliding capital of India with quiet forested side valleys.',
      tags: ['Paragliding', 'Offbeat'],
      ideal: 'Oct – Nov & Mar – May',
      style: 'Adventure + quiet villages'
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Hero / intro */}
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald">Himachal geography</p>
        <h1 className="text-3xl md:text-4xl font-extrabold">Signature Destinations We Specialise In</h1>
        <p className="text-slate-600 max-w-3xl text-base md:text-lg">
          From high-altitude Spiti valleys to pine-covered Shimla ridges, every Himalayan Trails itinerary is designed
          around realistic drive times, seasonality, and your comfort level. Use this overview to choose the right base
          regions for your next trip.
        </p>
      </section>

      {/* Key destinations grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {regions.map((r) => (
          <article
            key={r.title}
            className="relative bg-white border border-slate-200 rounded-xl p-5 space-y-3 hover:border-emerald/50 hover:shadow-md shadow-sm transition"
          >
            <header className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">{r.title}</h2>
                <p className="mt-1 text-sm text-slate-700">{r.desc}</p>
              </div>
              <span className="shrink-0 inline-flex items-center rounded-full border border-emerald/40 bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald">
                Himachal focus
              </span>
            </header>

            <dl className="grid grid-cols-2 gap-3 text-[11px] md:text-xs text-slate-700">
              <div className="space-y-0.5">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Ideal season</dt>
                <dd className="font-medium">{r.ideal}</dd>
              </div>
              <div className="space-y-0.5">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Travel style</dt>
                <dd>{r.style}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-1 pt-1">
              {r.tags.map((tag) => (
                <span
                  key={`${r.title}-${tag}`}
                  className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Note / CTA */}
      <section className="bg-slate-100 border border-slate-200 rounded-xl p-5 text-xs md:text-sm text-slate-700 space-y-2">
        <p className="font-semibold text-slate-900">Not sure which destination fits your dates?</p>
        <p>
          Share your rough dates, group size, and budget on the contact page and our team will suggest 2–3 best-fit
          base regions (for example, Spiti vs Tirthan vs Dharamshala) along with sample day-wise plans.
        </p>
      </section>
    </main>
  );
}
