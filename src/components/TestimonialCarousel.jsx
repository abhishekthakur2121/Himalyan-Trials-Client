import { useEffect, useRef } from 'react';

export default function TestimonialCarousel({ items = [] }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let anim;
    let start;
    const speed = 40; // px per second

    const step = (ts) => {
      if (!start) start = ts;
      const delta = (ts - start) / 1000;
      start = ts;
      el.scrollLeft += speed * delta;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, []);

  const renderCard = (t, idx) => (
    <div key={idx} className="min-w-[260px] max-w-[260px] bg-white border border-slate-200 rounded-xl p-4 mr-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
        <div>
          <div className="font-semibold text-sm text-slate-900">{t.name}</div>
          <div className="text-xs text-slate-500">{t.location}</div>
        </div>
      </div>
      <div className="mt-3 text-yellow-400 text-sm">{'★'.repeat(Math.round(t.rating))}</div>
      <p className="mt-2 text-sm text-slate-700">{t.comment}</p>
    </div>
  );

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden" ref={trackRef}>
      <div className="flex w-max py-2">
        {doubled.map(renderCard)}
      </div>
    </div>
  );
}
