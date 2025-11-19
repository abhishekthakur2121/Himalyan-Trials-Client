import React, { useState } from 'react';

export default function PackageCard({ item }) {
  const [src, setSrc] = useState(item.image);

  const handleError = () => {
    // Fallback to a local image if the remote URL (e.g., Unsplash) cannot be loaded
    setSrc('/images/default-trip.jpg');
  };

  return (
    <div className="h-full flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald/40 transition">
      <div className="relative">
        <img
          src={src}
          onError={handleError}
          alt={item.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-orange text-navy text-xs font-bold px-2 py-1 rounded shadow">
            Most Popular
          </span>
        )}
      </div>
      <div className="flex-1 p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
        <p className="text-sm text-slate-600">{item.shortDesc}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-emerald font-bold">
            ₹{item.price.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500">{item.duration}</span>
        </div>
      </div>
    </div>
  );
}
