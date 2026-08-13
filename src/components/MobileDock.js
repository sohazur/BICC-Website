import React from 'react';
import { CalendarDays, MapPin, MessageCircleMore, Phone } from 'lucide-react';
import { MAP_URL, PHONE_LINK, WHATSAPP_URL } from '../content';

export default function MobileDock({ t }) {
  const actions = [
    { label: t.mobileCall, href: `tel:${PHONE_LINK}`, icon: Phone },
    { label: t.mobileWhatsapp, href: WHATSAPP_URL, icon: MessageCircleMore, external: true },
    { label: t.mobileBook, href: '#contact', icon: CalendarDays },
    { label: t.mobileMap, href: MAP_URL, icon: MapPin, external: true }
  ];

  return (
    <nav className="mobile-dock" aria-label="Quick actions">
      {actions.map(({ label, href, icon: Icon, external }) => (
        <a href={href} key={label} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
          <Icon aria-hidden="true" /><span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
