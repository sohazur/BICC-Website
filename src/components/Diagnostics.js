import React, { useMemo, useState } from 'react';
import { Activity, ChevronDown, FlaskConical, Microscope, ScanLine, Search, Zap } from 'lucide-react';
import tests from '../data/tests.json';

const icons = {
  Pathology: FlaskConical,
  'X-ray': Zap,
  Ultrasonography: ScanLine,
  ECG: Activity,
  'Microbiology & Other Test': Microscope
};

const banglaLabels = {
  Pathology: 'প্যাথলজি',
  'X-ray': 'এক্স-রে',
  Ultrasonography: 'আলট্রাসনোগ্রাফি',
  ECG: 'ইসিজি',
  'Microbiology & Other Test': 'মাইক্রোবায়োলজি ও অন্যান্য'
};

export default function Diagnostics({ lang, t }) {
  const [query, setQuery] = useState('');
  const [openCategory, setOpenCategory] = useState(null);
  const normalizedQuery = query.trim().toLowerCase();

  const categories = useMemo(() => Object.entries(tests).map(([category, items]) => ({
    category,
    items: normalizedQuery ? items.filter((item) => item.toLowerCase().includes(normalizedQuery)) : items
  })).filter(({ items }) => !normalizedQuery || items.length), [normalizedQuery]);

  return (
    <section className="directory-section diagnostics section-pad" id="diagnostics" aria-labelledby="diagnostics-title">
      <div className="shell">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">{t.diagEyebrow}</p>
            <h2 id="diagnostics-title">{t.diagTitle}</h2>
          </div>
          <p>{t.diagText}</p>
        </div>

        <label className="directory-search" htmlFor="test-search">
          <Search aria-hidden="true" />
          <span className="sr-only">{t.testSearch}</span>
          <input
            id="test-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.testPlaceholder}
            autoComplete="off"
          />
          <small>{Object.values(tests).reduce((sum, items) => sum + items.length, 0)} {t.tests}</small>
        </label>

        <div className="category-grid" aria-live="polite">
          {categories.map(({ category, items }, index) => {
            const Icon = icons[category];
            const isOpen = Boolean(normalizedQuery) || openCategory === category;
            const label = lang === 'bn' ? banglaLabels[category] : category;
            const panelId = `test-panel-${index}`;
            return (
              <article className={`directory-card ${isOpen ? 'open' : ''}`} key={category}>
                <button
                  type="button"
                  className="directory-card-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenCategory(isOpen && !normalizedQuery ? null : category)}
                >
                  <span className="directory-icon"><Icon aria-hidden="true" /></span>
                  <span><strong>{label}</strong><small>{items.length} {items.length === 1 ? t.test : t.tests}</small></span>
                  <ChevronDown aria-hidden="true" />
                  <span className="sr-only">{isOpen ? t.closeCategory : t.openCategory}</span>
                </button>
                {isOpen && (
                  <div className="directory-panel" id={panelId}>
                    <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        {!categories.length && <p className="empty-state" role="status">{t.noTests}</p>}
      </div>
    </section>
  );
}
