'use strict';

const crypto = require('node:crypto');
const { initializeApp } = require('firebase-admin/app');
const { FieldValue, Timestamp, getFirestore } = require('firebase-admin/firestore');
const { onRequest } = require('firebase-functions/v2/https');
const { validateRequest } = require('./requestValidation');

initializeApp();
const db = getFirestore('bicc-public');
const allowedOrigins = new Set([
  'https://biswasclinic.com',
  'https://www.biswasclinic.com',
  'https://bicc-health-khulna.web.app',
  'http://127.0.0.1:4173',
  'http://localhost:4173'
]);
const clientAddress = request => String(request.headers['x-forwarded-for'] || request.ip || '').split(',')[0].trim();
const rateKey = request => crypto.createHash('sha256').update(`${new Date().toISOString().slice(0, 13)}:${clientAddress(request)}`).digest('hex');

exports.submitPublicWebsiteRequest = onRequest({ region: 'asia-south1', cors: false, timeoutSeconds: 10, memory: '256MiB', maxInstances: 3 }, async (request, response) => {
  response.set('Cache-Control', 'no-store');
  if (request.method !== 'POST') return response.status(405).json({ ok: false, error: 'method-not-allowed' });
  if (!allowedOrigins.has(request.get('origin'))) return response.status(403).json({ ok: false, error: 'origin-not-allowed' });
  if (!request.is('application/json')) return response.status(415).json({ ok: false, error: 'json-required' });
  if (Number(request.get('content-length') || 0) > 12000) return response.status(413).json({ ok: false, error: 'payload-too-large' });

  const validated = validateRequest(request.body);
  if (validated.bot) return response.status(200).json({ ok: true });
  if (validated.error) return response.status(400).json({ ok: false, error: validated.error });

  const submissionRef = db.collection('submissions').doc(validated.requestId);
  const limiterRef = db.collection('rate_limits').doc(rateKey(request));
  try {
    await db.runTransaction(async transaction => {
      const [existing, limiter] = await Promise.all([transaction.get(submissionRef), transaction.get(limiterRef)]);
      if (existing.exists) return;
      const attempts = limiter.exists ? Number(limiter.data().attempts || 0) : 0;
      if (attempts >= 8) throw new Error('rate-limit');
      transaction.set(submissionRef, {
        schemaVersion: 1,
        type: 'appointment_request',
        patientName: validated.patientName,
        phoneE164: validated.phoneE164,
        serviceCode: validated.serviceCode,
        preferredDate: validated.preferredDate,
        note: validated.note,
        language: validated.language,
        consent: true,
        status: 'new',
        source: 'biswasclinic.com',
        createdAt: FieldValue.serverTimestamp(),
        expireAt: Timestamp.fromMillis(Date.now() + 90 * 24 * 60 * 60 * 1000)
      });
      transaction.set(limiterRef, {
        attempts: attempts + 1,
        updatedAt: FieldValue.serverTimestamp(),
        expireAt: Timestamp.fromMillis(Date.now() + 48 * 60 * 60 * 1000)
      }, { merge: true });
    });
    return response.status(200).json({ ok: true, requestId: validated.requestId });
  } catch (error) {
    if (error.message === 'rate-limit') return response.status(429).json({ ok: false, error: 'too-many-requests' });
    console.error('Unable to save public website enquiry', { requestId: validated.requestId, code: error.code || 'unknown' });
    return response.status(500).json({ ok: false, error: 'save-failed' });
  }
});
