import React from 'react';

export default function WhatsAppButton() {
  const phone = '918219506413';
  const text = encodeURIComponent('Hi Himalayan Trails! I would like to know more about Himachal packages.');
  const href = `https://wa.me/${phone}?text=${text}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor">
        <path d="M19.11 17.32c-.29-.15-1.69-.83-1.95-.92-.26-.1-.45-.15-.64.15-.19.29-.73.92-.9 1.11-.17.19-.33.21-.62.08-.29-.15-1.2-.44-2.29-1.41-.84-.75-1.41-1.69-1.58-1.98-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.5.15-.17.19-.29.29-.48.1-.19.06-.36-.02-.52-.08-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.52.08-.79.36-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.06.15.19 2.11 3.22 5.11 4.51.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.69-.69 1.93-1.36.24-.67.24-1.25.17-1.36-.07-.11-.26-.18-.55-.33z"/>
        <path d="M27.27 4.73C24.36 1.82 20.36.22 16.15.22 7.52.22.52 7.22.52 15.85c0 2.71.71 5.35 2.06 7.67L.26 31.78l8.45-2.22c2.26 1.24 4.82 1.9 7.44 1.9 8.63 0 15.63-7 15.63-15.63 0-4.2-1.6-8.21-4.51-11.1zm-11.12 24.8c-2.4 0-4.75-.64-6.81-1.87l-.49-.29-5.01 1.31 1.33-4.88-.32-.5c-1.28-2.05-1.95-4.41-1.95-6.81 0-7.1 5.78-12.88 12.88-12.88 3.44 0 6.68 1.34 9.11 3.77s3.77 5.67 3.77 9.11c0 7.1-5.78 12.88-12.88 12.88z"/>
      </svg>
    </a>
  );
}
