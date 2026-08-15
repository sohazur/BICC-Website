import doctorsEn from '../data/doctors_en.json';
import doctorsBn from '../data/doctors_bn.json';

export const flattenDoctors = (directory) => Object.entries(directory)
  .flatMap(([specialty, doctors]) => doctors.map((doctor) => ({ ...doctor, specialty })));

export const classifyDoctor = (doctor) => {
  const text = `${doctor.specialty} ${doctor.position} ${doctor.qualifications}`.toLowerCase();
  if (/gyn|obstetric|women|গাইন|প্রসূতি|স্ত্রী রোগ/.test(text)) return 'gynae';
  if (/paediatric|pediatric|neonatal|child|শিশু|নবজাতক/.test(text)) return 'child';
  if (/ophthal|eye|চক্ষু/.test(text)) return 'eye';
  if (/dermat|venereo|skin|allergy|চর্ম|অ্যালার্জি/.test(text)) return 'skin';
  if (/\bent\b|ear,? nose|nose & throat|nose and throat|head.?neck|নাক|কান|গলা|হেড/.test(text)) return 'ent';
  if (/urolog|nephro|kidney|urinary|prostate|কিডনি|মূত্র|ইউরোলজি/.test(text)) return 'kidney';
  if (/orthop|অর্থোপেডিক/.test(text)) return 'ortho';
  if (/oncolog|cancer|haemat|hemat|transfusion|ক্যান্সার|রক্তরোগ|অনকোলজি/.test(text)) return 'cancer';
  if (/psychi|mental|neuro|brain|nerve|মস্তিষ্ক|স্নায়ু|স্নায়ু|মানসিক/.test(text)) return 'neuro';
  if (/patholog|biochem|প্যাথলজি|বায়োকেম|জৈব/.test(text)) return 'pathology';
  if (/surgery|surgeon|laparoscopic|সার্জারি/.test(text)) return 'surgery';
  if (/medicine|cardio|rheumat|chest|diabetes|liver|মেডিসিন|হৃদরোগ|বক্ষ|ডায়াবেটিস/.test(text)) return 'medicine';
  return 'other';
};

const english = flattenDoctors(doctorsEn);
const bangla = flattenDoctors(doctorsBn);

export const getDoctors = (lang = 'en') => {
  const localized = lang === 'bn' ? bangla : english;
  return localized.map((doctor, index) => ({
    ...doctor,
    group: classifyDoctor(english[index])
  }));
};

export const getDoctorsByGroup = (lang, group) => getDoctors(lang).filter((doctor) => doctor.group === group);

export const specialtyPages = [
  {
    slug: 'medicine-heart-specialists-khulna', group: 'medicine',
    title: { en: 'Medicine and heart specialists in Khulna', bn: 'খুলনায় মেডিসিন ও হৃদরোগ বিশেষজ্ঞ' },
    meta: {
      en: 'See BICC’s owner-provided medicine, chest and cardiology specialist listings in Sonadanga, Khulna. Call to confirm the current chamber schedule.',
      bn: 'সোনাডাঙ্গা, খুলনায় BICC-এর প্রতিষ্ঠান-প্রদত্ত মেডিসিন, বক্ষ ও হৃদরোগ বিশেষজ্ঞ তালিকা দেখুন। বর্তমান চেম্বারের সময় ফোনে নিশ্চিত করুন।'
    },
    intro: {
      en: 'Use the directory to compare the listed qualifications and institutions, then call BICC with the patient’s main concern so the team can confirm the appropriate current chamber.',
      bn: 'তালিকায় ডিগ্রি ও প্রতিষ্ঠান দেখুন, তারপর রোগীর প্রধান প্রয়োজন জানিয়ে BICC-তে কল করুন—দলটি উপযুক্ত বর্তমান চেম্বার নিশ্চিত করবে।'
    }
  },
  {
    slug: 'gynaecology-obstetrics-specialists-khulna', group: 'gynae',
    title: { en: 'Gynaecology and obstetrics specialists in Khulna', bn: 'খুলনায় গাইনি ও প্রসূতি বিশেষজ্ঞ' },
    meta: {
      en: 'See BICC’s owner-provided gynaecology and obstetrics specialist listings in Sonadanga, Khulna. Call before visiting to confirm schedule and service.',
      bn: 'সোনাডাঙ্গা, খুলনায় BICC-এর প্রতিষ্ঠান-প্রদত্ত গাইনি ও প্রসূতি বিশেষজ্ঞ তালিকা দেখুন। সময় ও সেবা নিশ্চিত করে আসুন।'
    },
    intro: {
      en: 'This page helps patients find listed women’s health, gynaecology and obstetrics consultants. It does not claim that every pregnancy, delivery or procedure is available at BICC; confirm the clinician and care plan directly.',
      bn: 'এই পৃষ্ঠায় তালিকাভুক্ত নারী স্বাস্থ্য, গাইনি ও প্রসূতি বিশেষজ্ঞ খুঁজে পাওয়া যায়। BICC-তে সব ধরনের গর্ভাবস্থা, প্রসব বা প্রক্রিয়া পাওয়া যায়—এমন দাবি করা হয়নি; চিকিৎসক ও সেবা পরিকল্পনা সরাসরি নিশ্চিত করুন।'
    }
  },
  {
    slug: 'general-laparoscopic-surgeons-khulna', group: 'surgery',
    title: { en: 'General and laparoscopic surgeons in Khulna', bn: 'খুলনায় জেনারেল ও ল্যাপারোস্কোপিক সার্জন' },
    meta: {
      en: 'See BICC’s owner-provided general and laparoscopic surgery specialist listings in Khulna. Confirm consultation, procedure and OT availability by phone.',
      bn: 'খুলনায় BICC-এর প্রতিষ্ঠান-প্রদত্ত জেনারেল ও ল্যাপারোস্কোপিক সার্জারি বিশেষজ্ঞ তালিকা দেখুন। পরামর্শ, প্রক্রিয়া ও OT প্রাপ্যতা ফোনে জানুন।'
    },
    intro: {
      en: 'Start with a surgeon consultation. The responsible clinician determines whether surgery is appropriate; BICC must separately confirm the operation theatre, team, tests, date, cabin and charges.',
      bn: 'প্রথমে সার্জনের পরামর্শ নিন। সার্জারি উপযুক্ত কি না দায়িত্বপ্রাপ্ত চিকিৎসক নির্ধারণ করবেন; অপারেশন থিয়েটার, দল, পরীক্ষা, তারিখ, কেবিন ও খরচ BICC-এর সঙ্গে আলাদাভাবে নিশ্চিত করতে হবে।'
    }
  },
  {
    slug: 'orthopaedic-specialists-khulna', group: 'ortho',
    title: { en: 'Orthopaedic specialists in Khulna', bn: 'খুলনায় অর্থোপেডিক বিশেষজ্ঞ' },
    meta: {
      en: 'See BICC’s owner-provided orthopaedic specialist listings in Sonadanga, Khulna. Call to confirm today’s chamber time and what records to bring.',
      bn: 'সোনাডাঙ্গা, খুলনায় BICC-এর প্রতিষ্ঠান-প্রদত্ত অর্থোপেডিক বিশেষজ্ঞ তালিকা দেখুন। আজকের চেম্বার ও প্রয়োজনীয় রিপোর্ট ফোনে জানুন।'
    },
    intro: {
      en: 'Bring relevant prescriptions, previous imaging and reports. Call first because chamber schedules change and the clinician—not the website—decides which examination or treatment is appropriate.',
      bn: 'প্রাসঙ্গিক প্রেসক্রিপশন, আগের ইমেজিং ও রিপোর্ট সঙ্গে আনুন। চেম্বারের সময় বদলায়, আর কোন পরীক্ষা বা চিকিৎসা প্রয়োজন তা ওয়েবসাইট নয়—চিকিৎসক নির্ধারণ করেন; তাই আগে ফোন করুন।'
    }
  },
  {
    slug: 'kidney-urology-specialists-khulna', group: 'kidney',
    title: { en: 'Kidney and urology specialists in Khulna', bn: 'খুলনায় কিডনি ও ইউরোলজি বিশেষজ্ঞ' },
    meta: {
      en: 'See BICC’s owner-provided kidney, nephrology and urology specialist listings in Sonadanga, Khulna. Confirm chamber schedule by phone.',
      bn: 'সোনাডাঙ্গা, খুলনায় BICC-এর প্রতিষ্ঠান-প্রদত্ত কিডনি, নেফ্রোলজি ও ইউরোলজি বিশেষজ্ঞ তালিকা দেখুন। চেম্বারের সময় ফোনে জানুন।'
    },
    intro: {
      en: 'Use the qualifications and specialty labels to identify a relevant listing, then call BICC. Bring previous prescriptions, lab reports and imaging that the treating clinician asked to review.',
      bn: 'ডিগ্রি ও বিশেষজ্ঞতার তথ্য দেখে প্রাসঙ্গিক চিকিৎসক খুঁজে BICC-তে কল করুন। চিকিৎসক দেখতে বলেছেন এমন আগের প্রেসক্রিপশন, ল্যাব রিপোর্ট ও ইমেজিং সঙ্গে আনুন।'
    }
  },
  {
    slug: 'child-health-specialists-khulna', group: 'child',
    title: { en: 'Child health specialists in Khulna', bn: 'খুলনায় শিশু স্বাস্থ্য বিশেষজ্ঞ' },
    meta: {
      en: 'See BICC’s owner-provided child health and paediatric surgery specialist listings in Sonadanga, Khulna. Call to confirm the current chamber.',
      bn: 'সোনাডাঙ্গা, খুলনায় BICC-এর প্রতিষ্ঠান-প্রদত্ত শিশু স্বাস্থ্য ও শিশু সার্জারি বিশেষজ্ঞ তালিকা দেখুন। বর্তমান চেম্বার ফোনে নিশ্চিত করুন।'
    },
    intro: {
      en: 'Tell BICC the child’s age and whether the request is for general child health or a surgical consultation. For urgent breathing difficulty, severe injury or another life-threatening emergency, call 999 or use an appropriate emergency service.',
      bn: 'শিশুর বয়স এবং সাধারণ শিশু স্বাস্থ্য নাকি সার্জারি পরামর্শ প্রয়োজন—BICC-কে জানান। শ্বাসকষ্ট, গুরুতর আঘাত বা জীবন-ঝুঁকিপূর্ণ জরুরি অবস্থায় ৯৯৯-এ কল করুন বা উপযুক্ত জরুরি সেবা নিন।'
    }
  }
];

export const specialtyBySlug = (slug) => specialtyPages.find((specialty) => specialty.slug === slug);
