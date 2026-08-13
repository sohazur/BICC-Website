import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

let host;
let root;

const setFieldValue = (field, value) => {
  const prototype = field instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  act(() => {
    setter.call(field, value);
    field.dispatchEvent(new Event('change', { bubbles: true }));
  });
};

const click = (element) => act(() => element.dispatchEvent(new MouseEvent('click', { bubbles: true })));

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
});

beforeEach(() => {
  localStorage.clear();
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

test('renders verified patient actions and real social destinations', () => {
  act(() => root.render(<App />));
  expect(host.textContent).toContain('01912-521615');
  expect(host.textContent).toContain('Request a visit');
  expect(host.querySelector('a[href="tel:+8801912521615"]')).toBeTruthy();
  expect(host.querySelector('a[href="#contact"]')).toBeTruthy();
  expect(host.querySelector('a[href="https://www.facebook.com/biswasicc/"]')).toBeTruthy();
  expect(host.querySelector('a[href="https://www.instagram.com/biswas_clinic_khulna/"]')).toBeTruthy();
});

test('uses semantic language controls, translates the interface and persists the choice', () => {
  act(() => root.render(<App />));
  const banglaButton = [...host.querySelectorAll('.language-switch button')].find((button) => button.textContent === 'বাংলা');
  expect(banglaButton.getAttribute('aria-pressed')).toBe('false');
  click(banglaButton);
  expect(host.textContent).toContain('প্রয়োজনীয় পরীক্ষাটি খুঁজুন।');
  expect(document.documentElement.lang).toBe('bn');
  expect(localStorage.getItem('bicc-language')).toBe('bn');
  expect(banglaButton.getAttribute('aria-pressed')).toBe('true');
});

test('publishes all 156 tests behind searchable expandable categories', () => {
  act(() => root.render(<App />));
  expect(host.querySelector('#test-search').parentElement.textContent).toContain('156 tests');
  const xrayButton = [...host.querySelectorAll('.directory-card-toggle')].find((button) => button.textContent.includes('X-ray'));
  expect(xrayButton.textContent).toContain('21 tests');
  click(xrayButton);
  expect(host.textContent).toContain('DIGITAL X-RAY PNS');
});

test('publishes the 60-doctor bilingual directory with useful specialty filters', () => {
  act(() => root.render(<App />));
  expect(host.querySelector('#doctor-search').parentElement.textContent).toContain('60 doctors');
  const gynaeButton = [...host.querySelectorAll('.filter-pills button')].find((button) => button.textContent.includes('Gynaecology'));
  click(gynaeButton);
  expect(host.textContent).toContain('Dr. Shamima Jahan Sathi');
  expect(host.textContent).toContain('Call to confirm schedule');
  const entButton = [...host.querySelectorAll('.filter-pills button')].find((button) => button.textContent.includes('ENT & head-neck care'));
  expect(entButton.textContent).not.toContain('28');
});

test('validates and prepares a request without claiming it is booked', () => {
  act(() => root.render(<App />));
  const form = host.querySelector('.request-form');
  setFieldValue(form.elements.name, 'Rahim Uddin');
  setFieldValue(form.elements.phone, '01700000000');
  setFieldValue(form.elements.service, 'Diagnostic test');
  act(() => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(host.textContent).toContain('Your request is ready');
  expect(host.textContent).toContain('Rahim Uddin');
  expect(host.textContent).toContain('does not book automatically');
  expect(host.querySelector('.request-ready a[href^="https://wa.me/8801912521615?text="]')).toBeTruthy();
  expect(host.querySelector('.request-ready a[href^="sms:+8801912521615?body="]')).toBeTruthy();
});

test('exposes a keyboard-controlled mobile navigation menu', () => {
  act(() => root.render(<App />));
  const menuButton = host.querySelector('.menu-button');
  expect(menuButton.getAttribute('aria-controls')).toBe('primary-navigation');
  click(menuButton);
  expect(menuButton.getAttribute('aria-expanded')).toBe('true');
  expect(host.querySelector('#primary-navigation').classList.contains('open')).toBe(true);
  act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  expect(menuButton.getAttribute('aria-expanded')).toBe('false');
});
