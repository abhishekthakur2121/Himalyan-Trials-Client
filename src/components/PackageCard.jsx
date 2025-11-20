import React, { useState } from 'react';

export default function PackageCard({ item, onSelect, onViewDetails }) {
  const [src, setSrc] = useState(item.image);

  const handleError = () => {
    // Fallback to a local image if the remote URL (e.g., Unsplash) cannot be loaded
    setSrc('/images/default-trip.jpg');
  };

  const handleCardClick = () => {
    if (onSelect) onSelect();
  };

  return (
    <div
      className="h-full flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald/40 transition cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={src}
          onError={handleError}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-orange text-navy text-xs font-bold px-2 py-1 rounded shadow">
            Most Popular
          </span>
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div className="space-y-1 min-h-[112px]">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{item.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-3">{item.shortDesc}</p>
        </div>
        <div className="flex items-end justify-between pt-2 gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-emerald font-bold">
              ₹{item.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500">{item.duration}</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1 text-[11px] font-semibold rounded-full border border-emerald/60 text-emerald hover:bg-emerald/10 whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails();
            }}
          >
            View detail
          </button>
        </div>
      </div>
    </div>
  );
}
