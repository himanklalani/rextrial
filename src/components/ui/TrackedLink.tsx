'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  eventType: 'phone_click' | 'email_click' | 'navigation_click';
  eventLabel: string;
  children: React.ReactNode;
}

export function TrackedLink({
  href,
  eventType,
  eventLabel,
  children,
  className = '',
  ...props
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventType, { label: eventLabel, target: href });
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
