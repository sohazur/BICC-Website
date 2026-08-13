import React from 'react';
import { ArrowRight, ClipboardList, HeartPulse, MapPin, MapPinned, MessageCircleMore, Phone, PhoneCall } from 'lucide-react';
import { MAP_URL, PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL } from '../content';

const journeyIcons = [ClipboardList, PhoneCall, MapPinned];
const journeyLinks = ['#diagnostics', `tel:${PHONE_LINK}`, MAP_URL];

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
          <div className="journey-track">
            <div className="route-line" aria-hidden="true">
              <svg className="route-desktop" viewBox="0 0 900 56" preserveAspectRatio="none"><path d="M0 30h128l17-18 22 37 22-34 17 15h694" /></svg>
              <svg className="route-mobile" viewBox="0 0 54 260" preserveAspectRatio="none"><path d="M27 0v74l-12 8 24 12-24 12 12 8v32l-12 8 24 12-24 12 12 8v74" /></svg>
            </div>
            <ol className="journey-grid">
              {t.journey.map(([title, description], index) => {
                const Icon = journeyIcons[index];
                return (
                  <li key={title}>
                    <span className="journey-node"><Icon aria-hidden="true" /><small>0{index + 1}</small></span>
                    <div><h3>{title}</h3><p>{description}</p><a href={journeyLinks[index]} target={index === 2 ? '_blank' : undefined} rel={index === 2 ? 'noreferrer' : undefined}>{t.journeyActions[index]}<ArrowRight aria-hidden="true" /></a></div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
