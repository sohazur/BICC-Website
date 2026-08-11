import React, { useEffect, useMemo, useState } from 'react';
import {
  Accessibility, Activity, ArrowRight, Building2, CalendarDays, Check,
  ChevronDown, Clock3, Copy, Facebook, FlaskConical, HeartPulse, Instagram,
  Linkedin, MapPin, Menu, MessageCircleMore, Microscope, Phone, ScanLine, ShieldCheck,
  Stethoscope, TestTube2, Twitter, X, Zap
} from 'lucide-react';

const PHONE_DISPLAY = '01912-521615';
const PHONE_LINK = '+8801912521615';
const MAP_URL = 'https://www.google.com/maps/place/Biswas+Investigation+Centre+%26+Clinic/@22.8269002,89.5389531,15z/data=!4m16!1m9!3m8!1s0x39ff9abb68f21e79:0x6a640ec4bf5dea9d!2sBiswas+Investigation+Centre+%26+Clinic!8m2!3d22.8269002!4d89.5389531!16s%2Fg%2F11g6wvfdj5';

const copy = {
  en: {
    skip: 'Skip to main content', open: 'Open 24/7', vary: 'Doctor & test schedules may vary', urgent: 'Need urgent guidance?', call: 'Call BICC', directions: 'Directions',
    nav: ['Services', 'Clinic', 'Patient guide', 'Visit'], request: 'Request appointment', menu: 'Open menu', close: 'Close menu',
    eyebrow: 'Diagnostics + clinic care · Choto Boyra, Khulna',
    heroA: 'Clear answers.', heroB: 'Care that feels', heroC: 'close to home.',
    heroText: 'From everyday tests to consultations, surgery support and comfortable cabins—find the next step without the runaround.',
    book: 'Request a visit', callNow: 'Call now', map: 'Get directions',
    facts: [['24/7', 'Facility open'], ['Since 1998', 'Serving Khulna'], ['2', 'Active DGHS records'], ['Accessible', 'Wheelchair entrance']],
    helpEyebrow: 'Start with what you need', helpTitle: 'How can we help today?', helpText: 'Choose one path. We will keep the next step simple.',
    needs: [
      ['Book a diagnostic test', 'X-ray, ultrasound, ECG, pathology and more.', 'See diagnostics'],
      ['See a doctor', 'Ask about current specialists and chamber schedules.', 'Request a visit'],
      ['Clinic & surgery care', 'Consultation, admission, surgery support and cabins.', 'Explore clinic care'],
      ['Urgent guidance', 'Call first so our team can guide your next step.', 'Call BICC']
    ],
    diagEyebrow: 'Diagnostics', diagTitle: 'The right test. A clearer next step.', diagText: 'Current availability, preparation and reporting time should be confirmed by phone before visiting.',
    services: [
      ['Pathology', 'Blood, urine and other laboratory testing.'], ['X-ray', 'Radiography services with trained technical support.'],
      ['Ultrasonography', 'Ultrasound imaging in a private, respectful setting.'], ['ECG', 'A quick recording of your heart’s electrical activity.'],
      ['Microbiology', 'Laboratory investigation for infection-related samples.'], ['Health checkups', 'Ask us to arrange the tests prescribed by your doctor.']
    ],
    askAvailability: 'Ask about availability', confirm: 'Please call to confirm preparation, price and report time.',
    preciseEyebrow: 'Precise care, human delivery', preciseTitle: 'Modern diagnostics without the intimidating experience.',
    preciseText: 'A calm explanation matters as much as a clean room. Our site is designed around the same idea: know where to go, what to bring and whom to call.',
    qualities: ['Privacy and dignity', 'Clear preparation guidance', 'Call-first schedule confirmation'],
    clinicEyebrow: 'Clinic & surgery', clinicTitle: 'Care before, during and after your procedure.',
    clinicText: 'BICC is registered in Khulna as both a private clinic and a diagnostic centre. Ask our team about current doctors, surgery support, admission and cabin options.',
    clinicCards: [['Consultation', 'Find the right department and ask for the current chamber schedule.'], ['Surgery support', 'Start with a clinical consultation; our team will explain the admission path.'], ['Cabins', 'Ask about current cabin availability, facilities and charges.']],
    talk: 'Talk to our team', photoNote: 'Illustrative image · real BICC facility photos will replace it',
    journeyEyebrow: 'A simpler patient journey', journeyTitle: 'Three steps. No guessing.',
    journey: [['Tell us what you need', 'Choose a test, doctor visit or clinic enquiry.'], ['Confirm by phone', 'We verify schedule, preparation and availability.'], ['Come to BICC', 'Open Maps and arrive at EX-2, Choto Boyra.']],
    bookingEyebrow: 'Appointment request', bookingTitle: 'Prepare your request in under a minute.',
    bookingText: 'This helper prepares an SMS for BICC. Sending the message or calling is required to confirm—no appointment is booked automatically.',
    name: 'Patient name', phoneLabel: 'Phone number', service: 'What do you need?', date: 'Preferred date', note: 'Anything we should know? (optional)',
    choose: 'Choose a service', options: ['Diagnostic test', 'Doctor consultation', 'Clinic / surgery enquiry', 'Cabin / admission enquiry', 'Other'],
    prepare: 'Prepare request', ready: 'Your request is ready', readyText: 'Send it by SMS or copy it, then call if you need a quick confirmation.', sendSms: 'Send by SMS', copyRequest: 'Copy request', copied: 'Copied',
    visitEyebrow: 'Visit BICC', visitTitle: 'Easy to find in Choto Boyra.', address: 'K.D.A. Plot & Holding No. EX-2, east side of Khulna Medical College, Choto Boyra, Sonadanga, Khulna 9000, Bangladesh.',
    openMaps: 'Open in Google Maps', copyAddress: 'Copy address', landmark: 'Landmark', landmarkText: 'East side of Khulna Medical College', hours: 'Opening hours', hoursText: 'Facility open 24/7. Call for doctor and test schedules.', access: 'Access', accessText: 'Wheelchair-accessible entrance listed on Google Maps.',
    guideEyebrow: 'Patient guide', guideTitle: 'A little preparation makes the visit easier.',
    faqs: [
      ['What should I bring?', 'Bring the doctor’s prescription, previous reports, a photo ID if available and a list of current medicines.'],
      ['Do I need an appointment for a test?', 'Some tests may be available without an appointment, but calling first helps confirm timing, preparation and price.'],
      ['Is BICC open at night?', 'The facility is listed as open 24 hours. Individual doctors, tests and services follow separate schedules, so please call first.'],
      ['Can I book surgery online?', 'Surgery starts with a clinical consultation. Use the request form or call so the team can guide you safely.'],
      ['How do I get my report?', 'Report collection and timing depend on the test. Ask at reception or call with your receipt details.']
    ],
    footerLine: 'Trusted care. Accurate results. Your health, our priority.', socials: 'Social channels', comingSoon: 'Coming soon',
    registry: 'Facility records', registryText: 'BICC’s clinic and diagnostic centre appear as active private facilities in the DGHS registry.',
    safety: 'For a life-threatening emergency, call Bangladesh emergency services at 999.', privacy: 'Privacy', terms: 'Terms', rights: 'Biswas Investigation Centre & Clinic. All rights reserved.',
    smsTemplate: ({name, phone, service, date, note}) => `BICC appointment request\nPatient: ${name}\nPhone: ${phone}\nNeed: ${service}\nPreferred date: ${date || 'Flexible'}${note ? `\nNote: ${note}` : ''}`
  },
  bn: {
    skip: 'মূল অংশে যান', open: '২৪ ঘণ্টা খোলা', vary: 'ডাক্তার ও পরীক্ষার সময়সূচি ভিন্ন হতে পারে', urgent: 'জরুরি পরামর্শ প্রয়োজন?', call: 'BICC-তে কল করুন', directions: 'দিকনির্দেশ',
    nav: ['সেবাসমূহ', 'ক্লিনিক', 'রোগীর নির্দেশিকা', 'ঠিকানা'], request: 'অ্যাপয়েন্টমেন্ট অনুরোধ', menu: 'মেনু খুলুন', close: 'মেনু বন্ধ করুন',
    eyebrow: 'ডায়াগনস্টিক + ক্লিনিক সেবা · ছোট বয়রা, খুলনা',
    heroA: 'পরিষ্কার উত্তর।', heroB: 'ঘরের কাছেই', heroC: 'ভরসার চিকিৎসা।',
    heroText: 'সাধারণ পরীক্ষা থেকে ডাক্তার দেখানো, সার্জারি সহায়তা ও আরামদায়ক কেবিন—সহজেই জেনে নিন আপনার পরবর্তী পদক্ষেপ।',
    book: 'ভিজিটের অনুরোধ করুন', callNow: 'এখনই কল করুন', map: 'দিকনির্দেশ নিন',
    facts: [['২৪/৭', 'প্রতিষ্ঠান খোলা'], ['১৯৯৮ থেকে', 'খুলনার সেবায়'], ['২টি', 'সক্রিয় DGHS রেকর্ড'], ['প্রবেশযোগ্য', 'হুইলচেয়ার প্রবেশপথ']],
    helpEyebrow: 'আপনার প্রয়োজন থেকে শুরু করুন', helpTitle: 'আজ কীভাবে সাহায্য করতে পারি?', helpText: 'একটি পথ বেছে নিন। পরবর্তী ধাপটি আমরা সহজ রাখব।',
    needs: [
      ['ডায়াগনস্টিক পরীক্ষা', 'এক্স-রে, আলট্রাসাউন্ড, ইসিজি, প্যাথলজি ও আরও সেবা।', 'পরীক্ষাগুলো দেখুন'],
      ['ডাক্তার দেখান', 'বর্তমান বিশেষজ্ঞ ও চেম্বারের সময় জেনে নিন।', 'ভিজিটের অনুরোধ'],
      ['ক্লিনিক ও সার্জারি', 'পরামর্শ, ভর্তি, সার্জারি সহায়তা ও কেবিন।', 'ক্লিনিক সেবা দেখুন'],
      ['জরুরি পরামর্শ', 'আমাদের দল যেন সঠিক পথ দেখাতে পারে, আগে কল করুন।', 'BICC-তে কল করুন']
    ],
    diagEyebrow: 'ডায়াগনস্টিক', diagTitle: 'সঠিক পরীক্ষা। পরবর্তী পদক্ষেপ আরও পরিষ্কার।', diagText: 'আসার আগে ফোনে বর্তমান সেবা, প্রস্তুতি ও রিপোর্টের সময় নিশ্চিত করুন।',
    services: [
      ['প্যাথলজি', 'রক্ত, প্রস্রাব ও অন্যান্য ল্যাবরেটরি পরীক্ষা।'], ['এক্স-রে', 'প্রশিক্ষিত কারিগরি সহায়তায় রেডিওগ্রাফি সেবা।'],
      ['আলট্রাসনোগ্রাফি', 'ব্যক্তিগত ও সম্মানজনক পরিবেশে আলট্রাসাউন্ড।'], ['ইসিজি', 'হৃদযন্ত্রের বৈদ্যুতিক কার্যকলাপের দ্রুত রেকর্ড।'],
      ['মাইক্রোবায়োলজি', 'সংক্রমণ-সম্পর্কিত নমুনার ল্যাব পরীক্ষা।'], ['হেলথ চেকআপ', 'ডাক্তারের পরামর্শের পরীক্ষাগুলো সাজাতে আমাদের বলুন।']
    ],
    askAvailability: 'সেবা সম্পর্কে জানুন', confirm: 'প্রস্তুতি, মূল্য ও রিপোর্টের সময় জানতে কল করুন।',
    preciseEyebrow: 'নির্ভুল পরীক্ষা, মানবিক সেবা', preciseTitle: 'ভয় নয়—স্বস্তিদায়ক আধুনিক ডায়াগনস্টিক অভিজ্ঞতা।',
    preciseText: 'পরিষ্কার কক্ষের মতো শান্তভাবে বুঝিয়ে বলাও জরুরি। তাই এই ওয়েবসাইটে কোথায় যাবেন, কী আনবেন ও কাকে কল করবেন—সবই সহজ করে দেওয়া হয়েছে।',
    qualities: ['ব্যক্তিগত গোপনীয়তা ও মর্যাদা', 'সহজ প্রস্তুতি নির্দেশনা', 'ফোনে সময় নিশ্চিতকরণ'],
    clinicEyebrow: 'ক্লিনিক ও সার্জারি', clinicTitle: 'প্রক্রিয়ার আগে, সময়ে ও পরে যত্ন।',
    clinicText: 'BICC খুলনায় একটি বেসরকারি ক্লিনিক ও ডায়াগনস্টিক সেন্টার হিসেবে নিবন্ধিত। বর্তমান ডাক্তার, সার্জারি সহায়তা, ভর্তি ও কেবিন সম্পর্কে আমাদের দলের সঙ্গে কথা বলুন।',
    clinicCards: [['ডাক্তার দেখানো', 'সঠিক বিভাগ ও বর্তমান চেম্বারের সময় জেনে নিন।'], ['সার্জারি সহায়তা', 'প্রথমে ক্লিনিক্যাল পরামর্শ নিন; আমাদের দল ভর্তি প্রক্রিয়া বুঝিয়ে দেবে।'], ['কেবিন', 'বর্তমান কেবিন, সুবিধা ও খরচ সম্পর্কে জেনে নিন।']],
    talk: 'আমাদের সঙ্গে কথা বলুন', photoNote: 'নমুনা ছবি · BICC-এর বাস্তব ছবি দিয়ে পরে বদলানো হবে',
    journeyEyebrow: 'সহজ রোগী যাত্রা', journeyTitle: 'তিন ধাপ। কোনো দ্বিধা নয়।',
    journey: [['প্রয়োজন বলুন', 'পরীক্ষা, ডাক্তার বা ক্লিনিক অনুসন্ধান বেছে নিন।'], ['ফোনে নিশ্চিত করুন', 'আমরা সময়, প্রস্তুতি ও সেবা নিশ্চিত করি।'], ['BICC-তে আসুন', 'ম্যাপ খুলে ছোট বয়রার EX-2 ঠিকানায় আসুন।']],
    bookingEyebrow: 'অ্যাপয়েন্টমেন্ট অনুরোধ', bookingTitle: 'এক মিনিটেরও কম সময়ে অনুরোধ তৈরি করুন।',
    bookingText: 'এই সহায়কটি BICC-তে পাঠানোর জন্য একটি SMS তৈরি করে। নিশ্চিত করতে SMS পাঠানো বা কল করা প্রয়োজন—স্বয়ংক্রিয়ভাবে বুকিং হয় না।',
    name: 'রোগীর নাম', phoneLabel: 'ফোন নম্বর', service: 'কী প্রয়োজন?', date: 'পছন্দের তারিখ', note: 'আর কিছু জানাতে চান? (ঐচ্ছিক)',
    choose: 'একটি সেবা বেছে নিন', options: ['ডায়াগনস্টিক পরীক্ষা', 'ডাক্তার দেখানো', 'ক্লিনিক / সার্জারি অনুসন্ধান', 'কেবিন / ভর্তি অনুসন্ধান', 'অন্যান্য'],
    prepare: 'অনুরোধ তৈরি করুন', ready: 'আপনার অনুরোধ প্রস্তুত', readyText: 'SMS-এ পাঠান বা কপি করুন। দ্রুত নিশ্চিত করতে কল করুন।', sendSms: 'SMS পাঠান', copyRequest: 'অনুরোধ কপি করুন', copied: 'কপি হয়েছে',
    visitEyebrow: 'BICC-তে আসুন', visitTitle: 'ছোট বয়রায় সহজেই খুঁজে পাবেন।', address: 'কে.ডি.এ. প্লট ও হোল্ডিং নং EX-2, খুলনা মেডিকেল কলেজের পূর্ব পাশে, ছোট বয়রা, সোনাডাঙ্গা, খুলনা ৯০০০, বাংলাদেশ।',
    openMaps: 'Google Maps-এ খুলুন', copyAddress: 'ঠিকানা কপি করুন', landmark: 'কাছের চিহ্ন', landmarkText: 'খুলনা মেডিকেল কলেজের পূর্ব পাশে', hours: 'খোলার সময়', hoursText: 'প্রতিষ্ঠান ২৪ ঘণ্টা খোলা। ডাক্তার ও পরীক্ষার সময় জানতে কল করুন।', access: 'প্রবেশ সুবিধা', accessText: 'Google Maps-এ হুইলচেয়ার প্রবেশপথ দেখানো হয়েছে।',
    guideEyebrow: 'রোগীর নির্দেশিকা', guideTitle: 'একটু প্রস্তুতি ভিজিটকে সহজ করে।',
    faqs: [
      ['সঙ্গে কী আনব?', 'ডাক্তারের প্রেসক্রিপশন, আগের রিপোর্ট, সম্ভব হলে ছবি-সহ পরিচয়পত্র এবং চলমান ওষুধের তালিকা আনুন।'],
      ['পরীক্ষার জন্য অ্যাপয়েন্টমেন্ট লাগবে?', 'কিছু পরীক্ষা সরাসরি করা যেতে পারে, তবে সময়, প্রস্তুতি ও মূল্য জানতে আগে কল করাই ভালো।'],
      ['BICC কি রাতে খোলা?', 'প্রতিষ্ঠানটি ২৪ ঘণ্টা খোলা হিসেবে তালিকাভুক্ত। ডাক্তার, পরীক্ষা ও সেবার আলাদা সময়সূচি আছে, তাই আগে কল করুন।'],
      ['অনলাইনে সার্জারি বুক করা যাবে?', 'সার্জারি শুরু হয় ক্লিনিক্যাল পরামর্শ দিয়ে। নিরাপদ নির্দেশনার জন্য ফর্ম ব্যবহার করুন বা কল করুন।'],
      ['রিপোর্ট কীভাবে পাব?', 'রিপোর্টের সময় ও সংগ্রহ পদ্ধতি পরীক্ষাভেদে আলাদা। রিসেপশনে জিজ্ঞেস করুন বা রসিদের তথ্য দিয়ে কল করুন।']
    ],
    footerLine: 'বিশ্বস্ত সেবা। নির্ভুল ফলাফল। আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার।', socials: 'সামাজিক মাধ্যম', comingSoon: 'শীঘ্রই আসছে',
    registry: 'প্রতিষ্ঠানের রেকর্ড', registryText: 'DGHS রেজিস্ট্রিতে BICC-এর ক্লিনিক ও ডায়াগনস্টিক সেন্টার দুটি সক্রিয় বেসরকারি প্রতিষ্ঠান হিসেবে আছে।',
    safety: 'জীবন-ঝুঁকিপূর্ণ জরুরি অবস্থায় বাংলাদেশের জরুরি সেবা ৯৯৯-এ কল করুন।', privacy: 'গোপনীয়তা', terms: 'শর্তাবলি', rights: 'বিশ্বাস ইনভেস্টিগেশন সেন্টার এন্ড ক্লিনিক। সর্বস্বত্ব সংরক্ষিত।',
    smsTemplate: ({name, phone, service, date, note}) => `BICC অ্যাপয়েন্টমেন্ট অনুরোধ\nরোগী: ${name}\nফোন: ${phone}\nপ্রয়োজন: ${service}\nপছন্দের তারিখ: ${date || 'যেকোনো দিন'}${note ? `\nনোট: ${note}` : ''}`
  }
};

const serviceIcons = [FlaskConical, Zap, ScanLine, Activity, Microscope, TestTube2];
const needIcons = [TestTube2, Stethoscope, Building2, HeartPulse];

function Logo() {
  return <a className="brand" href="#top" aria-label="BICC home"><svg viewBox="0 0 58 38" aria-hidden="true"><path d="M2 21h9l4-10 6 21 6-16 4 5h8"/><circle cx="44" cy="21" r="11"/><path d="M44 15v12M38 21h12"/></svg><span><b>BICC</b><small>Biswas Investigation<br/>Centre & Clinic</small></span></a>;
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('bicc-language') || 'en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [prepared, setPrepared] = useState('');
  const [copied, setCopied] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
    document.body.dataset.lang = lang;
    localStorage.setItem('bicc-language', lang);
  }, [lang]);

  const links = useMemo(() => [['#services', t.nav[0]], ['#clinic', t.nav[1]], ['#guide', t.nav[2]], ['#visit', t.nav[3]]], [t]);

  function prepareRequest(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const message = t.smsTemplate(data);
    setPrepared(message);
    window.setTimeout(() => document.getElementById('request-ready')?.focus(), 0);
  }

  async function copyText(text) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const scrollAndClose = () => setMenuOpen(false);

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="utility" id="top">
      <div className="shell utility-inner">
        <div className="utility-status"><Clock3 size={15}/><strong>{t.open}</strong><span>{t.vary}</span></div>
        <div className="utility-actions"><span>{t.urgent}</span><a href={`tel:${PHONE_LINK}`}><Phone size={14}/>{t.call}</a><a href={MAP_URL} target="_blank" rel="noreferrer"><MapPin size={14}/>{t.directions}</a></div>
      </div>
    </div>
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          {links.map(([href, label]) => <a href={href} onClick={scrollAndClose} key={href}>{label}</a>)}
          <a className="nav-cta" href="#booking" onClick={scrollAndClose}>{t.request}<ArrowRight size={16}/></a>
        </nav>
        <div className="header-tools">
          <div className="language" aria-label="Language">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
            <span>/</span>
            <button className={lang === 'bn' ? 'active' : ''} onClick={() => setLang('bn')} aria-pressed={lang === 'bn'}>বাংলা</button>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.menu}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>

    <main id="main">
      <section className="hero section-pad">
        <div className="shell hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span></span>{t.eyebrow}</p>
            <h1>{t.heroA}<br/>{t.heroB} <em>{t.heroC}</em></h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions"><a className="button primary" href="#booking">{t.book}<ArrowRight/></a><a className="button light" href={`tel:${PHONE_LINK}`}><Phone/>{t.callNow}</a><a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer"><MapPin/>{t.map}</a></div>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-frame"><img src="/images/bicc-care-hero.jpg" alt={lang === 'bn' ? 'একজন বাংলাদেশি চিকিৎসক একজন বয়স্ক রোগী ও তাঁর পরিবারের সঙ্গে কথা বলছেন' : 'A Bangladeshi doctor speaking calmly with an older patient and his family'} fetchpriority="high" /></div>
            <div className="care-note"><HeartPulse/><span><small>{lang === 'bn' ? 'এক কলেই শুরু' : 'Start with one call'}</small><strong>{PHONE_DISPLAY}</strong></span></div>
          </div>
        </div>
        <div className="shell fact-bar">{t.facts.map(([big, small], index) => <div key={small}><span>{index === 2 ? <ShieldCheck/> : index === 3 ? <Accessibility/> : null}</span><strong>{big}</strong><small>{small}</small></div>)}</div>
      </section>

      <section className="section-pad help" aria-labelledby="help-title">
        <div className="shell"><div className="section-heading"><p className="eyebrow">{t.helpEyebrow}</p><h2 id="help-title">{t.helpTitle}</h2><p>{t.helpText}</p></div>
          <div className="need-grid">{t.needs.map(([title, desc, action], index) => { const Icon = needIcons[index]; const href = index === 0 ? '#services' : index === 1 ? '#booking' : index === 2 ? '#clinic' : `tel:${PHONE_LINK}`; return <a className="need-card" href={href} key={title}><span className="icon-box"><Icon/></span><span><b>{title}</b><small>{desc}</small></span><span className="card-action">{action}<ArrowRight/></span></a>; })}</div>
        </div>
      </section>

      <section className="section-pad diagnostics" id="services" aria-labelledby="services-title">
        <div className="shell"><div className="section-heading split"><div><p className="eyebrow">{t.diagEyebrow}</p><h2 id="services-title">{t.diagTitle}</h2></div><p>{t.diagText}</p></div>
          <div className="services-grid">{t.services.map(([title, desc], index) => { const Icon = serviceIcons[index]; return <article className="service-card" key={title}><span className="service-no">0{index + 1}</span><Icon/><h3>{title}</h3><p>{desc}</p><a href="#booking">{t.askAvailability}<ArrowRight/></a></article>; })}</div>
          <div className="confirm-note"><MessageCircleMore/><span>{t.confirm}</span><a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a></div>
        </div>
      </section>

      <section className="feature section-pad">
        <div className="shell feature-grid"><div className="feature-image"><img src="/images/bicc-ultrasound.jpg" loading="lazy" width="1200" height="900" alt={lang === 'bn' ? 'একজন বাংলাদেশি সনোগ্রাফার রোগীর আলট্রাসাউন্ড করছেন' : 'A Bangladeshi sonographer performing an ultrasound examination'} /><span>{t.photoNote}</span></div><div className="feature-copy"><p className="eyebrow">{t.preciseEyebrow}</p><h2>{t.preciseTitle}</h2><p>{t.preciseText}</p><ul>{t.qualities.map(item => <li key={item}><Check/>{item}</li>)}</ul><a className="button primary" href="#booking">{t.book}<ArrowRight/></a></div></div>
      </section>

      <section className="clinic section-pad" id="clinic" aria-labelledby="clinic-title">
        <div className="shell clinic-grid"><div className="clinic-copy"><p className="eyebrow light-eye">{t.clinicEyebrow}</p><h2 id="clinic-title">{t.clinicTitle}</h2><p>{t.clinicText}</p><div className="clinic-list">{t.clinicCards.map(([title, desc], index) => <div key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div><a className="button inverse" href={`tel:${PHONE_LINK}`}><Phone/>{t.talk}</a></div><div className="clinic-image"><img src="/images/bicc-cabin.jpg" loading="lazy" width="1200" height="800" alt={lang === 'bn' ? 'একটি পরিষ্কার ক্লিনিক কেবিনে নার্স, রোগী ও পরিবারের সদস্য' : 'A nurse, patient and family member in a clean clinic cabin'} /><span>{t.photoNote}</span></div></div>
      </section>

      <section className="journey section-pad"><div className="shell"><div className="section-heading centered"><p className="eyebrow">{t.journeyEyebrow}</p><h2>{t.journeyTitle}</h2></div><div className="route-line" aria-hidden="true"><svg viewBox="0 0 900 56" preserveAspectRatio="none"><path d="M0 30h135l18-19 22 38 21-33 18 14h686"/></svg></div><ol className="journey-grid">{t.journey.map(([title, desc], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol></div></section>

      <section className="booking section-pad" id="booking" aria-labelledby="booking-title"><div className="shell booking-grid"><div className="booking-copy"><p className="eyebrow light-eye">{t.bookingEyebrow}</p><h2 id="booking-title">{t.bookingTitle}</h2><p>{t.bookingText}</p><div className="booking-call"><Phone/><span><small>{t.callNow}</small><a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a></span></div><p className="safety">{t.safety}</p></div>
        <form className="request-form" onSubmit={prepareRequest}><div className="field"><label htmlFor="patient-name">{t.name}</label><input id="patient-name" name="name" required autoComplete="name" /></div><div className="field"><label htmlFor="patient-phone">{t.phoneLabel}</label><input id="patient-phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" /></div><div className="field full"><label htmlFor="patient-service">{t.service}</label><select id="patient-service" name="service" required defaultValue=""><option value="" disabled>{t.choose}</option>{t.options.map(option => <option key={option}>{option}</option>)}</select><ChevronDown aria-hidden="true"/></div><div className="field"><label htmlFor="patient-date">{t.date}</label><input id="patient-date" name="date" type="date" /></div><div className="field"><label htmlFor="patient-note">{t.note}</label><input id="patient-note" name="note" /></div><button className="button submit" type="submit">{t.prepare}<ArrowRight/></button>
          {prepared && <div className="request-ready full" id="request-ready" tabIndex="-1" role="status"><div><Check/><span><strong>{t.ready}</strong><small>{t.readyText}</small></span></div><pre>{prepared}</pre><div className="ready-actions"><a className="button primary" href={`sms:${PHONE_LINK}?body=${encodeURIComponent(prepared)}`}>{t.sendSms}<MessageCircleMore/></a><button type="button" className="button light" onClick={() => copyText(prepared)}>{copied ? <Check/> : <Copy/>}{copied ? t.copied : t.copyRequest}</button></div></div>}
        </form></div></section>

      <section className="visit section-pad" id="visit" aria-labelledby="visit-title"><div className="shell visit-grid"><a className="map-wrap" href={MAP_URL} target="_blank" rel="noreferrer" aria-label={t.openMaps}><svg className="map-lines" viewBox="0 0 640 570" aria-hidden="true"><path d="M-30 107C95 78 161 176 284 140S461 39 686 80M-18 402C119 340 169 431 311 391s229-133 371-85M172-30c12 95-18 164 20 245s26 153-20 375M472-20c-18 112 24 177-5 254s-11 192 37 361"/><path className="minor" d="M34 260h572M312 0v570M62 42l520 486M590 22L46 536"/></svg><span className="map-pin"><MapPin/><b>BICC</b><small>EX-2 · Choto Boyra</small></span><span className="map-coords">22.8269° N<br/>89.5390° E</span><span className="map-open">{t.openMaps}<ArrowRight/></span></a><div className="visit-copy"><p className="eyebrow">{t.visitEyebrow}</p><h2 id="visit-title">{t.visitTitle}</h2><address>{t.address}</address><div className="visit-actions"><a className="button primary" href={MAP_URL} target="_blank" rel="noreferrer"><MapPin/>{t.openMaps}</a><button className="button light" onClick={() => copyText(t.address)}><Copy/>{t.copyAddress}</button></div><dl><div><dt><MapPin/>{t.landmark}</dt><dd>{t.landmarkText}</dd></div><div><dt><Clock3/>{t.hours}</dt><dd>{t.hoursText}</dd></div><div><dt><Accessibility/>{t.access}</dt><dd>{t.accessText}</dd></div></dl></div></div></section>

      <section className="guide section-pad" id="guide" aria-labelledby="guide-title"><div className="shell guide-grid"><div><p className="eyebrow">{t.guideEyebrow}</p><h2 id="guide-title">{t.guideTitle}</h2><div className="registry-card"><ShieldCheck/><span><strong>{t.registry}</strong><small>{t.registryText}</small></span></div></div><div className="faq-list">{t.faqs.map(([q, a]) => <details key={q}><summary>{q}<span><ChevronDown/></span></summary><p>{a}</p></details>)}</div></div></section>
    </main>

    <footer><div className="shell footer-grid"><div><Logo/><p>{t.footerLine}</p></div><div><h3>{t.visitEyebrow}</h3><address>{t.address}</address><a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a></div><div><h3>{t.socials}</h3><div className="socials">{[[Facebook,'Facebook'],[Instagram,'Instagram'],[Linkedin,'LinkedIn'],[Twitter,'X']].map(([Icon,label]) => <button key={label} disabled title={t.comingSoon} aria-label={`${label}: ${t.comingSoon}`}><Icon/></button>)}</div><small>{t.comingSoon}</small></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} {t.rights}</span><span><span>{t.privacy}</span><span>{t.terms}</span></span></div></footer>

    <nav className="mobile-dock" aria-label="Quick actions"><a href={`tel:${PHONE_LINK}`}><Phone/><span>{t.callNow}</span></a><a href="#booking"><CalendarDays/><span>{t.request}</span></a><a href={MAP_URL} target="_blank" rel="noreferrer"><MapPin/><span>{t.directions}</span></a></nav>
  </>;
}

export default App;
