import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChevronsDown, Search, Stethoscope } from 'lucide-react';
import doctorsEn from '../data/doctors_en.json';
import doctorsBn from '../data/doctors_bn.json';
import { doctorGroups, PHONE_LINK } from '../content';

const flatten = (directory) => Object.entries(directory).flatMap(([specialty, doctors]) => doctors.map((doctor) => ({ ...doctor, specialty })));

const classifyDoctor = (doctor) => {
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

export default function Doctors({ lang, t }) {
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('medicine');
  const [canScroll, setCanScroll] = useState(false);
  const resultsRef = useRef(null);
  const directory = useMemo(() => {
    const englishDirectory = flatten(doctorsEn);
    const localizedDirectory = lang === 'bn' ? flatten(doctorsBn) : englishDirectory;
    return localizedDirectory.map((doctor, index) => ({ ...doctor, group: classifyDoctor(englishDirectory[index]) }));
  }, [lang]);
  const normalizedQuery = query.trim().toLowerCase();

  const counts = useMemo(() => directory.reduce((result, doctor) => ({ ...result, [doctor.group]: (result[doctor.group] || 0) + 1 }), {}), [directory]);
  const visibleDoctors = useMemo(() => directory.filter((doctor) => {
    const matchesGroup = normalizedQuery || activeGroup === 'all' || doctor.group === activeGroup;
    const searchable = `${doctor.name} ${doctor.qualifications} ${doctor.specialty} ${doctor.position} ${doctor.institute}`.toLowerCase();
    return matchesGroup && (!normalizedQuery || searchable.includes(normalizedQuery));
  }), [activeGroup, directory, normalizedQuery]);

  useEffect(() => {
    if (resultsRef.current) resultsRef.current.scrollTop = 0;
  }, [activeGroup, lang, normalizedQuery]);

  useLayoutEffect(() => {
    const region = resultsRef.current;
    if (!region) return undefined;
    const measure = () => setCanScroll(region.scrollHeight > region.clientHeight + 2);
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(region);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [visibleDoctors]);

  return (
    <section className="directory-section doctors section-pad" id="doctors" aria-labelledby="doctors-title">
      <div className="shell">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">{t.doctorEyebrow}</p>
            <h2 id="doctors-title">{t.doctorTitle}</h2>
          </div>
          <p>{t.doctorText}</p>
        </div>

        <label className="directory-search" htmlFor="doctor-search">
          <Search aria-hidden="true" />
          <span className="sr-only">{t.doctorSearch}</span>
          <input id="doctor-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.doctorPlaceholder} autoComplete="off" />
          <small>{directory.length} {t.doctors}</small>
        </label>

        {!normalizedQuery && (
          <div className="filter-pills" aria-label={t.doctorEyebrow}>
            <button type="button" aria-pressed={activeGroup === 'all'} onClick={() => setActiveGroup('all')}>{t.allDoctors}<span>{directory.length}</span></button>
            {doctorGroups.filter((group) => counts[group.id]).map((group) => (
              <button type="button" aria-pressed={activeGroup === group.id} onClick={() => setActiveGroup(group.id)} key={group.id}>
                {group[lang]}<span>{counts[group.id]}</span>
              </button>
            ))}
          </div>
        )}

        <div className="directory-result-heading" aria-live="polite">
          <span id="doctor-results-label"><Stethoscope aria-hidden="true" />{visibleDoctors.length} {visibleDoctors.length === 1 ? t.doctor : t.doctors}</span>
          <small>{t.sourceNote}</small>
        </div>

        {visibleDoctors.length ? (
          <div className="doctor-results-frame">
            {canScroll && <p className="doctor-scroll-cue" id="doctor-scroll-instructions"><ChevronsDown aria-hidden="true" />{t.doctorScroll}</p>}
            <a className="skip-doctors" href="#clinic">{lang === 'bn' ? 'ডাক্তারের তালিকা এড়িয়ে ক্লিনিক সেবায় যান' : 'Skip doctor list and continue to clinic care'}</a>
            <div className="doctor-scroll" ref={resultsRef} tabIndex="0" role="region" aria-labelledby="doctor-results-label" aria-describedby={canScroll ? 'doctor-scroll-instructions' : undefined}>
              <div className="doctor-grid">
                {visibleDoctors.map((doctor) => (
                  <article className="doctor-card" key={`${doctor.name}-${doctor.qualifications}`}>
                    <p className="doctor-specialty">{doctor.specialty === '—' ? doctorGroups.find((group) => group.id === doctor.group)?.[lang] : doctor.specialty}</p>
                    <h3>{doctor.name}</h3>
                    <p className="doctor-qualifications">{doctor.qualifications}</p>
                    {doctor.position && doctor.position !== '—' && <p className="doctor-position">{doctor.position}</p>}
                    {doctor.institute && <p className="doctor-institute">{doctor.institute}</p>}
                    <a href={`tel:${PHONE_LINK}`}>{lang === 'bn' ? 'সময়সূচি জানতে কল করুন' : 'Call to confirm schedule'}</a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : <p className="empty-state" role="status">{t.noDoctors}</p>}
      </div>
    </section>
  );
}
