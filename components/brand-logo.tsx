'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LOBO_LOGO_SRC, LOBO_LOGO_BASE64 } from '@/lib/logo-data';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'white';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({
  className = '',
  size = 'md',
}: BrandLogoProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(LOBO_LOGO_SRC);

  const sizeClasses = {
    sm: 'h-8 sm:h-9 max-w-[150px]',
    md: 'h-10 sm:h-12 max-w-[200px]',
    lg: 'h-12 sm:h-14 max-w-[240px]',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt="Lobo Travels"
        width={250}
        height={92}
        className={`w-auto object-contain object-left transition-transform duration-300 group-hover:scale-105 ${sizeClasses}`}
        loading="eager"
        decoding="sync"
        onError={() => {
          // If server path or URL fails to load, immediately switch to the embedded PNG data
          if (currentSrc !== LOBO_LOGO_BASE64) {
            setCurrentSrc(LOBO_LOGO_BASE64);
          }
        }}
      />
    </div>
  );
}

export function LogoLink({
  variant = 'white',
  size = 'md',
  className = '',
}: {
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <Link
      href="/"
      id="brand-logo-link"
      className={`inline-flex items-center transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${className}`}
      aria-label="Lobo Travels - Home"
    >
      <BrandLogo variant={variant} size={size} />
    </Link>
  );
}
