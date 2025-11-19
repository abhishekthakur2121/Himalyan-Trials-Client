export default function Footer({ className = '' }) {
  return (
    <footer className={`bg-slate-950 text-slate-200 border-t border-slate-800 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 text-sm md:grid-cols-4">
        <div className="space-y-2">
          <div className="text-lg font-extrabold tracking-tight text-white">Himalayan Trails</div>
          <p className="text-slate-300 text-sm md:text-base">
            Curated Himachal journeys with verified stays, experienced local drivers, and 24/7 on-ground support.
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mt-3">Operating across</p>
          <p className="text-xs text-slate-300">Manali • Spiti • Shimla • Dharamshala • Kasol • Bir • Tirthan • Kinnaur</p>
        </div>

        <div>
          <div className="font-semibold mb-2 text-slate-100">Quick links</div>
          <ul className="space-y-1 text-slate-300 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/packages" className="hover:text-white">Packages</a></li>
            <li><a href="/destinations" className="hover:text-white">Destinations</a></li>
            <li><a href="/reviews" className="hover:text-white">Reviews</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-2 text-slate-100">Popular spots</div>
          <ul className="space-y-1 text-slate-300 text-sm">
            <li>Manali & Solang</li>
            <li>Spiti Valley loop</li>
            <li>Kasol & Parvati</li>
            <li>Bir Billing & Barot</li>
            <li>Shimla & Mashobra</li>
            <li>Dharamshala & McLeod</li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="font-semibold mb-2 text-slate-100">Contact</div>
          <p className="text-slate-300 text-sm">Email: sunilthakur2700@gmail.com</p>
          <p className="text-slate-300 text-sm">Phone/WhatsApp: +91 8219506413</p>
          <p className="text-xs text-slate-500 mt-3">Mon–Sat, 10:00 AM – 7:00 PM IST</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-200">
            <span className="px-3 py-1 rounded-full border border-emerald/30 bg-emerald/15">Secure payments</span>
            <span className="px-3 py-1 rounded-full border border-emerald/30 bg-emerald/15">GST invoice</span>
            <span className="px-3 py-1 rounded-full border border-emerald/30 bg-emerald/15">Licensed operator</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
