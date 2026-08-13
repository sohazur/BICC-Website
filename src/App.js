import React, { useEffect, useState } from 'react';
import Booking from './components/Booking';
import { Clinic, Pharmacy } from './components/CareSections';
import Diagnostics from './components/Diagnostics';
import Doctors from './components/Doctors';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import MobileDock from './components/MobileDock';
import Visit from './components/Visit';
import { copy, PHONE_LINK } from './content';

const getInitialLanguage = () => {
  try {
    const stored = window.localStorage.getItem('bicc-language');
    if (stored === 'en' || stored === 'bn') return stored;
  } catch {
    // Storage can be unavailable in strict privacy modes; English remains the safe default.
  }
  return 'en';
};

export default function App() {
  const [lang, setLang] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    try {
      window.localStorage.setItem('bicc-language', lang);
    } catch {
      // The language still works for the current visit when storage is unavailable.
    }
  }, [lang]);

  return (
    <>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <Header lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} t={t} />
      <main id="main-content">
        <Hero lang={lang} t={t} />
        <Diagnostics lang={lang} t={t} />
        <Doctors lang={lang} t={t} />
        <Clinic lang={lang} t={t} phoneLink={PHONE_LINK} />
        <Pharmacy t={t} />
        <Booking lang={lang} t={t} />
        <Visit lang={lang} t={t} />
      </main>
      <Footer t={t} />
      <MobileDock t={t} />
    </>
  );
}
