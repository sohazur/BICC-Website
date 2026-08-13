import React from 'react';
import { ArrowRight, HeartPulse, MapPin, MessageCircleMore, Phone } from 'lucide-react';
import { MAP_URL, PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL } from '../content';

export default function Hero({ lang, t }) {
  return (
    <>
      <section className="hero section-pad" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />{t.eyebrow}</p>
            <h1>{t.heroA}<br />{t.heroB} <em>{t.heroC}</em></h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">{t.book}<ArrowRight aria-hidden="true" /></a>
              <a className="button light" href={`tel:${PHONE_LINK}`}><Phone aria-hidden="true" />{t.callNow}</a>
              <a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircleMore aria-hidden="true" />{t.whatsapp}</a>
              <a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" />{t.map}</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-frame">
              <img
                src="/images/bicc-care-hero.jpg"
                alt={lang === 'bn' ? 'একজন বাংলাদেশি চিকিৎসক একজন বয়স্ক রোগী ও তাঁর পরিবারের সঙ্গে কথা বলছেন' : 'A Bangladeshi doctor speaking calmly with an older patient and his family'}
                width="1200"
                height="800"
                fetchpriority="high"
              />
            </div>
            <a className="care-note" href={`tel:${PHONE_LINK}`}>
              <HeartPulse aria-hidden="true" />
              <span><small>{lang === 'bn' ? 'এক কলেই শুরু' : 'Start with one call'}</small><strong>{PHONE_DISPLAY}</strong></span>
            </a>
          </div>
        </div>
      </section>

      <section className="journey section-pad" aria-labelledby="journey-title">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">{t.journeyEyebrow}</p>
            <h2 id="journey-title">{t.journeyTitle}</h2>
          </div>
          <div className="route-line" aria-hidden="true">
            <svg viewBox="0 0 900 56" preserveAspectRatio="none"><path d="M0 30h135l18-19 22 38 21-33 18 14h686" /></svg>
          </div>
          <ol className="journey-grid">
            {t.journey.map(([title, description], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
