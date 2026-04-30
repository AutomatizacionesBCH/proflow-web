'use client'

import { useState } from 'react'
import type { BrandConfig } from '@/config/brands'

interface BrandHeaderProps {
  brand: BrandConfig
}

export function BrandHeader({ brand }: BrandHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Inicio', href: '#' },
    { label: 'Cómo funciona', href: '#proceso' },
    { label: 'Calculadora', href: '#calculadora' },
    { label: 'Preguntas frecuentes', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/95 backdrop-blur-sm shadow-sm"
      style={{ borderBottomColor: `${brand.primaryColor}15` }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo placeholder */}
          <a href="#" className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: brand.primaryColor }}
            >
              {brand.name.charAt(0)}
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: brand.primaryColor }}
            >
              {brand.name}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#solicitar"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: brand.primaryColor }}
            >
              Solicitar ahora
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden rounded-md p-2 text-gray-600 hover:text-gray-900"
            aria-label="Abrir menú"
          >
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#solicitar"
            className="block rounded-lg px-4 py-2 text-center text-sm font-semibold text-white"
            style={{ backgroundColor: brand.primaryColor }}
          >
            Solicitar ahora
          </a>
        </div>
      )}
    </header>
  )
}
