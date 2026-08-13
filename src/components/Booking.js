import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Copy, MessageCircleMore, Phone, TriangleAlert } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_LINK, serviceOptions } from '../content';

const initialForm = { name: '', phone: '', service: '', date: '', note: '', consent: false, website: '' };

const createRequestId = () => {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    return (character === 'x' ? random : (random & 3) | 8).toString(16);
  });
};

export default function Booking({ lang, t }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const requestId = useRef(createRequestId());

  const selectedService = serviceOptions.find((option) => option.id === form.service)?.[lang] || form.service;
  const requestText = useMemo(() => t.smsTemplate({ ...form, service: selectedService }), [form, selectedService, t]);
  const smsUrl = `sms:${PHONE_LINK}?body=${encodeURIComponent(requestText)}`;
  const whatsappUrl = `https://wa.me/8801912521615?text=${encodeURIComponent(requestText)}`;

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setStatus('idle');
    setError('');
    setCopied(false);
  };

  const saveRequest = async (event) => {
    event.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.name.trim() || phoneDigits.length < 10 || !form.service || !form.consent) {
      setError(t.required);
      setStatus('idle');
      return;
    }

    setStatus('saving');
    setError('');
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: requestId.current,
          name: form.name.trim(),
          phone: form.phone.trim(),
          service: form.service,
          preferredDate: form.date || null,
          note: form.note.trim(),
          language: lang,
          consent: form.consent,
          website: form.website
        })
      });
      if (!response.ok) throw new Error('save-failed');
      const result = await response.json();
      if (!result.ok) throw new Error('save-failed');
      setStatus('saved');
    } catch {
      setStatus('failed');
      setError(t.saveError);
    }
  };

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      setCopied(true);
    } catch {
      setError(t.copyRequest);
    }
  };

  const showActions = status === 'saved' || status === 'failed';

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

        <form className="request-form" onSubmit={saveRequest} noValidate>
          <div className="field">
            <label htmlFor="patient-name">{t.name}</label>
            <input id="patient-name" name="name" value={form.name} onChange={updateField} autoComplete="name" maxLength="100" required />
          </div>
          <div className="field">
            <label htmlFor="patient-phone">{t.phoneLabel}</label>
            <input id="patient-phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={updateField} autoComplete="tel" maxLength="24" placeholder="01XXX-XXXXXX" required />
          </div>
          <div className="field full">
            <label htmlFor="patient-service">{t.service}</label>
            <select id="patient-service" name="service" value={form.service} onChange={updateField} required>
              <option value="">{t.choose}</option>
              {serviceOptions.map((option) => <option value={option.id} key={option.id}>{option[lang]}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="patient-date">{t.date}</label>
            <input id="patient-date" name="date" type="date" value={form.date} onChange={updateField} />
          </div>
          <div className="field">
            <label htmlFor="patient-note">{t.note}</label>
            <input id="patient-note" name="note" value={form.note} onChange={updateField} maxLength="500" />
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="patient-website">Website</label>
            <input id="patient-website" name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" />
          </div>
          <label className="consent-field full">
            <input name="consent" type="checkbox" checked={form.consent} onChange={updateField} required />
            <span>{t.consent}</span>
          </label>
          {error && <p className="form-error full" role="alert">{error}</p>}
          <button className="button submit" type="submit" disabled={status === 'saving'}>{status === 'saving' ? t.saving : t.prepare}<ArrowRight aria-hidden="true" /></button>

          {showActions && (
            <div className={`request-ready full ${status}`} aria-live="polite">
              <div>{status === 'saved' ? <Check aria-hidden="true" /> : <TriangleAlert aria-hidden="true" />}<span><strong>{status === 'saved' ? t.ready : t.notSaved}</strong><small>{status === 'saved' ? t.readyText : t.saveError}</small></span></div>
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
