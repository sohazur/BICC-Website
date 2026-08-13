'use strict';

const SERVICES = new Set(['diagnostic', 'doctor', 'admission', 'surgery', 'cabin', 'pharmacy', 'other']);
const cleanText = (value, maxLength) => typeof value === 'string' ? value.trim().replace(/[\u0000-\u001F\u007F]/g, '').slice(0, maxLength) : '';

const normalizeBangladeshPhone = value => {
  const digits = String(value || '').replace(/\D/g, '');
  const local = digits.startsWith('880') ? `0${digits.slice(3)}` : digits;
  return /^01[3-9]\d{8}$/.test(local) ? `+880${local.slice(1)}` : null;
};

const isUuid = value => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value || '');

const validatePreferredDate = value => {
  if (value == null || value === '') return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const requested = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(requested.getTime())) return undefined;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const latest = new Date(today);
  latest.setUTCFullYear(latest.getUTCFullYear() + 1);
  return requested >= today && requested <= latest ? value : undefined;
};

const validateRequest = data => {
  if (!data || typeof data !== 'object') return { error: 'invalid-payload' };
  if (cleanText(data.website, 200)) return { bot: true };
  if (!isUuid(data.requestId)) return { error: 'invalid-request-id' };
  const patientName = cleanText(data.name, 100);
  const phoneE164 = normalizeBangladeshPhone(data.phone);
  const serviceCode = cleanText(data.service, 30);
  const note = cleanText(data.note, 500);
  const language = data.language === 'bn' ? 'bn' : data.language === 'en' ? 'en' : null;
  const preferredDate = validatePreferredDate(data.preferredDate);
  if (!patientName || !phoneE164 || !SERVICES.has(serviceCode) || !language || preferredDate === undefined || data.consent !== true) return { error: 'invalid-fields' };
  return { requestId: data.requestId.toLowerCase(), patientName, phoneE164, serviceCode, preferredDate, note, language };
};

module.exports = { cleanText, isUuid, normalizeBangladeshPhone, validatePreferredDate, validateRequest };
