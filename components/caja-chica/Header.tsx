'use client'

import { useState } from 'react'
import Image from 'next/image'

const WA_HREF =
  'https://wa.me/56912345678?text=Hola%2C+quiero+simular+una+operaci%C3%B3n'
const WA_NUMBER = '+56 9 1234 5678'

export function CajaChicaHeader() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Simulador', href: '#calculadora' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[#043D35]/10 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/logos/caja-chica-logo.png"
              alt="La Caja Chica"
              width={180}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#043D35]"
            >
              {WA_NUMBER}
            </a>
            <a
              href="#calculadora"
              className="rounded-lg bg-[#0A6B5A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#043D35]"
            >
              Simular ahora
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-[#043D35] md:hidden"
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
        <div className="border-t border-[#043D35]/10 bg-white px-4 py-4 space-y-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B7280] hover:bg-[#F5F6F8] hover:text-[#1A1A1A]"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#043D35]/10">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-center text-sm text-[#6B7280]"
            >
              {WA_NUMBER}
            </a>
            <a
              href="#calculadora"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-[#0A6B5A] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Simular ahora
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
