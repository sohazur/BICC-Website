import React from 'react';
import { Activity, Check, Pill, Receipt, Smartphone } from 'lucide-react';

export function Clinic({ lang, t, phoneLink }) {
  return (
    <section className="clinic section-pad" id="clinic" aria-labelledby="clinic-title">
      <div className="shell clinic-grid">
        <div className="clinic-copy">
          <p className="eyebrow light-eye">{t.clinicEyebrow}</p>
          <h2 id="clinic-title">{t.clinicTitle}</h2>
          <p>{t.clinicText}</p>
          <div className="clinic-list">
            {t.clinicCards.map(([title, description], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
          <a className="button inverse" href={`tel:${phoneLink}`}>{t.talk}</a>
        </div>
        <figure className="clinic-image">
          <img src="/images/bicc-cabin.jpg" loading="lazy" width="1200" height="800" alt={lang === 'bn' ? 'একটি পরিচ্ছন্ন ক্লিনিক কেবিনে নার্স, রোগী ও পরিবারের সদস্য' : 'A nurse, patient and family member in a clean clinic cabin'} />
          <figcaption>{t.photoNote}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Pharmacy({ t }) {
  const icons = [Pill, Activity, Receipt, Smartphone];
  return (
    <section className="pharmacy section-pad" id="pharmacy" aria-labelledby="pharmacy-title">
      <div className="shell pharmacy-grid">
        <div className="pharmacy-mark" aria-hidden="true"><strong>24/7</strong><span>PHARMACY</span></div>
        <div className="pharmacy-copy">
          <p className="eyebrow">{t.pharmacyEyebrow}</p>
          <h2 id="pharmacy-title">{t.pharmacyTitle}</h2>
          <p>{t.pharmacyText}</p>
          <ul>
            {t.pharmacyFeatures.map((feature, index) => {
              const Icon = icons[index] || Check;
              return <li key={feature}><Icon aria-hidden="true" /><span>{feature}</span></li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
