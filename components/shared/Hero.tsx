'use client'

import type { BrandConfig } from '@/config/brands'

interface HeroProps {
  brand: BrandConfig
  headline: string
  subheadline: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  badge?: string
}

export function Hero({
  brand,
  headline,
  subheadline,
  ctaLabel = 'Solicitar ahora',
  ctaHref = '#solicitar',
  secondaryCtaLabel,
  secondaryCtaHref,
  badge,
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ backgroundColor: brand.primaryColor }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${brand.accentColor} 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, white 0%, transparent 50%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <span
              className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
              style={{ backgroundColor: `${brand.accentColor}30`, border: `1px solid ${brand.accentColor}50` }}
            >
              {badge}
            </span>
          )}

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
            {subheadline}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={ctaHref}
              className="w-full sm:w-auto rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: brand.accentColor }}
            >
              {ctaLabel}
            </a>
            {secondaryCtaLabel && (
              <a
                href={secondaryCtaHref ?? '#'}
                className="w-full sm:w-auto rounded-xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
