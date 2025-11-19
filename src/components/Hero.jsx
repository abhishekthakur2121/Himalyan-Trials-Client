import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import logo from '../images/logo.jpg';
import bg from '../images/bg.avif';

export default function Hero() {
  return (
    <section className="relative h-[90vh] md:h-[100vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})`, transform: 'translateZ(0)' }}
      >
        <div className="absolute inset-0 bg-slate-900/35" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/80 shadow-sm mb-4">
            <img src={logo} alt="Himalayan Trails logo" className="w-6 h-6 rounded-full object-cover" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-700">Himalayans</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.65)]"
          >
            Himalayan Trails Expeditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 md:mt-5 text-base md:text-xl text-slate-50 max-w-2xl leading-relaxed drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
          >
            Curated Himachal journeys across Manali, Spiti, Shimla, Dharamshala, Kasol, Bir Billing, Triund, and Kheerganga.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <a
              href="#packages"
              className="px-5 py-3 rounded-md bg-emerald text-navy font-semibold hover:bg-emerald/90 shadow-lg shadow-emerald/30"
            >
              Explore Packages
            </a>
            <a
              href="#contact"
              className="px-5 py-3 rounded-md border border-white/60 bg-white/10 text-sm md:text-base text-slate-50 hover:bg-white/20"
            >
              Talk to a trip specialist
            </a>
            <div className="flex items-center gap-3 text-xs md:text-sm text-slate-50">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-orange">
                  <CountUp end={20147} duration={2} separator="," />+ 
                </span>
                <span>happy clients</span>
              </div>
              <span className="hidden md:inline-block w-px h-4 bg-white/30" />
              <span className="text-gray-200/90">6 curated Himalayan routes • 24/7 on-ground support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
