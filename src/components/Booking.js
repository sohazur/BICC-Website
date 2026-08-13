import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Copy, MessageCircleMore, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_LINK } from '../content';

const initialForm = { name: '', phone: '', service: '', date: '', note: '' };

export default function Booking({ t }) {
  const [form, setForm] = useState(initialForm);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const requestText = useMemo(() => t.smsTemplate(form), [form, t]);
  const smsUrl = `sms:${PHONE_LINK}?body=${encodeURIComponent(requestText)}`;
  const whatsappUrl = `https://wa.me/8801912521615?text=${encodeURIComponent(requestText)}`;

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setReady(false);
    setError('');
    setCopied(false);
  };

  const prepareRequest = (event) => {
    event.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.name.trim() || phoneDigits.length < 10 || !form.service) {
      setError(t.required);
      setReady(false);
      return;
    }
    setReady(true);
    setError('');
  };

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      setCopied(true);
    } catch {
      setError(t.copyRequest);
    }
  };

  return (
    <section className="booking section-pad" id="contact" aria-labelledby="booking-title">
      <div className="shell booking-grid">
        <div className="booking-copy">
          <p className="eyebrow light-eye">{t.bookingEyebrow}</p>
          <h2 id="booking-title">{t.bookingTitle}</h2>
          <p>{t.bookingText}</p>
          <a className="booking-phone" href={`tel:${PHONE_LINK}`}><Phone aria-hidden="true" /><span><small>{t.callNow}</small><strong>{PHONE_DISPLAY}</strong></span></a>
          <p className="safety">{t.safety}</p>
        </div>

        <form className="request-form" onSubmit={prepareRequest} noValidate>
          <div className="field">
            <label htmlFor="patient-name">{t.name}</label>
            <input id="patient-name" name="name" value={form.name} onChange={updateField} autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="patient-phone">{t.phoneLabel}</label>
            <input id="patient-phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={updateField} autoComplete="tel" placeholder="01XXX-XXXXXX" required />
          </div>
          <div className="field full">
            <label htmlFor="patient-service">{t.service}</label>
            <select id="patient-service" name="service" value={form.service} onChange={updateField} required>
              <option value="">{t.choose}</option>
              {t.options.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="patient-date">{t.date}</label>
            <input id="patient-date" name="date" type="date" value={form.date} onChange={updateField} />
          </div>
          <div className="field">
            <label htmlFor="patient-note">{t.note}</label>
            <input id="patient-note" name="note" value={form.note} onChange={updateField} />
          </div>
          {error && <p className="form-error full" role="alert">{error}</p>}
          <button className="button submit" type="submit">{t.prepare}<ArrowRight aria-hidden="true" /></button>

          {ready && (
            <div className="request-ready full" aria-live="polite">
              <div><Check aria-hidden="true" /><span><strong>{t.ready}</strong><small>{t.readyText}</small></span></div>
              <pre>{requestText}</pre>
              <div className="ready-actions">
                <a className="button whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircleMore aria-hidden="true" />{t.sendWhatsapp}</a>
                <a className="button secondary" href={smsUrl}>{t.sendSms}</a>
                <button className="button secondary" type="button" onClick={copyRequest}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? t.copied : t.copyRequest}</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
