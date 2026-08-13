'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeBangladeshPhone, validatePreferredDate, validateRequest } = require('./requestValidation');

const valid = { requestId: '123e4567-e89b-42d3-a456-426614174000', name: 'Rahim Uddin', phone: '01700-000000', service: 'diagnostic', preferredDate: null, note: '', language: 'en', consent: true, website: '' };

test('normalizes Bangladesh mobile numbers', () => {
  assert.equal(normalizeBangladeshPhone('01700-000000'), '+8801700000000');
  assert.equal(normalizeBangladeshPhone('+880 1700 000000'), '+8801700000000');
  assert.equal(normalizeBangladeshPhone('01200000000'), null);
});

test('validates and canonicalizes a request', () => {
  assert.deepEqual(validateRequest(valid), { requestId: valid.requestId, patientName: valid.name, phoneE164: '+8801700000000', serviceCode: 'diagnostic', preferredDate: null, note: '', language: 'en' });
});

test('rejects missing consent, unknown service and malformed request IDs', () => {
  assert.equal(validateRequest({ ...valid, consent: false }).error, 'invalid-fields');
  assert.equal(validateRequest({ ...valid, service: 'admin' }).error, 'invalid-fields');
  assert.equal(validateRequest({ ...valid, requestId: 'not-a-uuid' }).error, 'invalid-request-id');
});

test('silently accepts honeypot submissions without returning data', () => {
  assert.deepEqual(validateRequest({ ...valid, website: 'spam.example' }), { bot: true });
});

test('rejects past, malformed and more-than-one-year dates', () => {
  assert.equal(validatePreferredDate('2020-01-01'), undefined);
  assert.equal(validatePreferredDate('bad'), undefined);
  const distant = new Date();
  distant.setUTCFullYear(distant.getUTCFullYear() + 2);
  assert.equal(validatePreferredDate(distant.toISOString().slice(0, 10)), undefined);
});
