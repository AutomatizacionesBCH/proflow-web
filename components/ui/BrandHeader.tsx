'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface NavLink {
  label: string
  href: string
}

interface BrandHeaderProps {
  logoSrc: string
  logoAlt: string
  logoWidth?: number
  logoHeight?: number
  links: NavLink[]
  ctaLabel: string
  ctaHref: string
  ctaColor: string
  ctaColorHover: string
}

export function BrandHeader({
  logoSrc,
  logoAlt,
  logoWidth = 180,
  logoHeight = 40,
  links,
  ctaLabel,
  ctaHref,
  ctaColor,
  ctaColorHover,
}: BrandHeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[#E5E7EB] bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-sm',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            className="h-10 w-auto"
            priority
            unoptimized
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a
            href={ctaHref}
            style={{
              background: ctaColor,
              borderRadius: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
            className="px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = ctaColorHover }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ctaColor }}
          >
            {ctaLabel}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#111827] transition-colors hover:bg-[#F5F6F8] md:hidden"
          aria-label="Abrir menú"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#E5E7EB] bg-white px-4 py-4 space-y-1 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F5F6F8] hover:text-[#111827]"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E5E7EB]">
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              style={{ background: ctaColor, borderRadius: '14px' }}
              className="block px-4 py-3 text-center text-sm font-bold text-white"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
