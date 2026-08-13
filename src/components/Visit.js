import React, { useState } from 'react';
import { Check, Clock3, Copy, MapPin, PersonStanding } from 'lucide-react';
import { clinicAddress, MAP_URL } from '../content';

export default function Visit({ lang, t }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(clinicAddress[lang]);
    setCopied(true);
  };

  return (
    <section className="visit section-pad" id="visit" aria-labelledby="visit-title">
      <div className="shell visit-grid">
        <a className="map-wrap" href={MAP_URL} target="_blank" rel="noreferrer" aria-label={t.openMaps}>
          <svg className="map-lines" viewBox="0 0 620 570" aria-hidden="true">
            <path d="M-30 115c110 70 185 42 259-45 82-96 177-83 250-20 55 48 105 47 175 11" />
            <path d="M115-20c-3 119 20 192 73 257 58 71 63 171 12 350" />
            <path d="M420-20c-47 118-47 223-2 315 41 83 40 170-17 296" />
            <path className="minor" d="M-20 360c154-34 253-15 359 56 84 57 166 70 297 40M292-20v610" />
          </svg>
          <span className="map-coords">22.8269° N<br />89.5390° E</span>
          <span className="map-pin"><MapPin aria-hidden="true" /><b>BICC</b><small>EX-2, Choto Boyra</small></span>
          <span className="map-open">{t.openMaps}</span>
        </a>

        <div className="visit-copy">
          <p className="eyebrow">{t.visitEyebrow}</p>
          <h2 id="visit-title">{t.visitTitle}</h2>
          <address>{t.address}</address>
          <div className="visit-actions">
            <a className="button primary" href={MAP_URL} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" />{t.openMaps}</a>
            <button className="button light" type="button" onClick={copyAddress}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? t.copied : t.copyAddress}</button>
          </div>
          <dl>
            <div><dt><MapPin aria-hidden="true" />{t.landmark}</dt><dd>{t.landmarkText}</dd></div>
            <div><dt><Clock3 aria-hidden="true" />{t.hours}</dt><dd>{t.hoursText}</dd></div>
            <div><dt><PersonStanding aria-hidden="true" />{t.access}</dt><dd>{t.accessText}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
