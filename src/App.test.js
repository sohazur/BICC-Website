import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

let host;
let root;

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

test('renders the verified phone and main patient actions', () => {
  act(() => root.render(<App />));
  expect(host.textContent).toContain('01912-521615');
  expect(host.textContent).toContain('Request a visit');
  expect(host.querySelector('a[href="tel:+8801912521615"]')).toBeTruthy();
  expect(host.querySelector('a[href="#booking"]')).toBeTruthy();
});

test('switches the whole interface to Bangla and remembers the choice', () => {
  act(() => root.render(<App />));
  const banglaButton = [...host.querySelectorAll('.language button')].find(button => button.textContent === 'বাংলা');
  act(() => banglaButton.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  expect(host.textContent).toContain('আজ কীভাবে সাহায্য করতে পারি?');
  expect(document.documentElement.lang).toBe('bn');
  expect(localStorage.getItem('bicc-language')).toBe('bn');
});

test('prepares an appointment request without claiming it was submitted', () => {
  act(() => root.render(<App />));
  const form = host.querySelector('.request-form');
  form.elements.name.value = 'Rahim Uddin';
  form.elements.phone.value = '01700000000';
  form.elements.service.value = 'Diagnostic test';
  act(() => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(host.textContent).toContain('Your request is ready');
  expect(host.textContent).toContain('Rahim Uddin');
  expect(host.textContent).toContain('no appointment is booked automatically');
});
