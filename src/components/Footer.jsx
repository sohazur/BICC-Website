import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircleMore, Phone, Twitter } from 'lucide-react';
import {
  FACEBOOK_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL
} from '../content';

export default function Footer({ t }) {
  return (
    <footer>
      <div className="shell footer-grid">
        <div className="footer-story">
          <a className="brand footer-brand" href="#top" aria-label={`${t.brand} home`}>
            <img src="/images/bicc-logo.png" alt="" width="132" height="42" />
            <span>{t.brand}</span>
          </a>
          <p>{t.footerStory}</p>
        </div>

        <div>
          <h2>{t.mission}</h2>
          <p>{t.missionText}</p>
          <h2>{t.contact}</h2>
          <a className="footer-contact" href={`tel:${PHONE_LINK}`}><Phone aria-hidden="true" />{PHONE_DISPLAY}</a>
          <a className="footer-contact" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircleMore aria-hidden="true" />WhatsApp</a>
        </div>

        <div>
          <h2>{t.social}</h2>
          <div className="social-links">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label={t.facebook}><Facebook aria-hidden="true" /></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label={t.instagram}><Instagram aria-hidden="true" /></a>
            <span aria-label={t.linkedin} title={t.linkedin}><Linkedin aria-hidden="true" /></span>
            <span aria-label={t.twitter} title={t.twitter}><Twitter aria-hidden="true" /></span>
          </div>
          <small>{t.linkedin}<br />{t.twitter}</small>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {t.rights}</span>
        <span>{t.safety}</span>
      </div>
    </footer>
  );
}
