import React, { useState } from 'react';
import { Check, Clock3, Copy, MapPin, PersonStanding } from 'lucide-react';
import { clinicAddress, MAP_EMBED_URL, MAP_URL } from '../content';

export default function Visit({ lang, t }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(clinicAddress[lang]);
    setCopied(true);
  };

  return (
    <section className="visit section-pad" id="visit" aria-labelledby="visit-title">
      <div className="shell visit-grid">
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
        <div className="map-wrap">
          <iframe
            className="map-frame"
            src={`${MAP_EMBED_URL}&hl=${lang}`}
            title={t.mapFrameTitle}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
