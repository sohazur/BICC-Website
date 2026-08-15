import React, { useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Header({ lang, setLang, menuOpen, setMenuOpen, t }) {
  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen, setMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label={`${t.brand} home`} onClick={closeMenu}>
          <img src="/images/bicc-logo.png" alt="" width="132" height="42" />
          <span>{t.brand}</span>
        </a>

        <nav id="primary-navigation" className={menuOpen ? 'primary-nav open' : 'primary-nav'} aria-label="Primary navigation">
          {t.nav.map(([href, label]) => (
            <a href={href} onClick={closeMenu} key={href}>{label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            {t.request}<ArrowRight aria-hidden="true" size={15} />
          </a>
        </nav>

        <div className="header-tools">
          <div className="language-switch" role="group" aria-label={t.language}>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button type="button" aria-pressed={lang === 'bn'} onClick={() => setLang('bn')}>বাংলা</button>
          </div>
          <button
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? t.close : t.menu}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
