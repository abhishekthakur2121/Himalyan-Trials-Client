import React from 'react';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold">Plan Your Himalayan Trip</h1>
        <p className="text-slate-600 max-w-2xl text-base md:text-lg">
          Share a few details and our team will craft a personalized Himachal itinerary for your dates, budget, and
          comfort level.
        </p>
      </section>
      <ContactForm />
    </main>
  );
}
