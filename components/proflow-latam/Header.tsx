'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProflowLatamHeader() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Empresas', href: '#empresas' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/logos/proflow-latam-logo.png"
              alt="ProFlow LATAM"
              width={180}
              height={40}
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
                className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0D1117]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#contacto"
              className="rounded-lg bg-[#1A56DB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F2D6B]"
            >
              Comenzar operación
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-[#0F2D6B] md:hidden"
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#E5E7EB] bg-white px-4 py-4 space-y-1 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B7280] hover:bg-[#F8FAFF] hover:text-[#0D1117]"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E5E7EB]">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-[#1A56DB] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Comenzar operación
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
