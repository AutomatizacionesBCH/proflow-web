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
  whatsappHref?: string
  whatsappNumber?: string
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="#25D366" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
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
  whatsappHref,
  whatsappNumber,
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
        <a href="#" className="flex shrink-0 items-center">
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
        <nav className="hidden items-center gap-7 md:flex">
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

        {/* Desktop right actions */}
        <div className="hidden items-center gap-3 md:flex">
          {whatsappHref && whatsappNumber && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]"
            >
              <WhatsAppIcon />
              {whatsappNumber}
            </a>
          )}
          <a
            href={ctaHref}
            style={{
              background: ctaColor,
              borderRadius: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
            className="px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200"
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
        <div className="space-y-1 border-t border-[#E5E7EB] bg-white px-4 py-4 md:hidden">
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
          <div className="space-y-2 border-t border-[#E5E7EB] pt-3">
            {whatsappHref && whatsappNumber && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-4 py-3 text-sm font-medium text-[#6B7280]"
              >
                <WhatsAppIcon />
                {whatsappNumber}
              </a>
            )}
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
