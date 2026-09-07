'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({
  className = '',
  size = 'md',
}: BrandLogoProps) {
  const sizeClasses = {
    sm: 'h-8 sm:h-9 max-w-[150px]',
    md: 'h-10 sm:h-12 max-w-[200px]',
    lg: 'h-12 sm:h-14 max-w-[240px]',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/lobotravels-all-whitelogo.png"
        alt="Lobo Travels"
        width={250}
        height={92}
        className={`w-auto object-contain object-left transition-transform duration-300 group-hover:scale-105 ${sizeClasses}`}
        loading="eager"
        decoding="sync"
      />
    </div>
  );
}

export function LogoLink({
  size = 'md',
  className = '',
}: {
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
      <BrandLogo size={size} />
    </Link>
  );
}
