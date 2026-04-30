import type { BrandConfig } from '@/config/brands'

interface CTASectionProps {
  brand: BrandConfig
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

export function CTASection({
  brand,
  title,
  subtitle,
  ctaLabel = 'Solicitar ahora',
  ctaHref = '#solicitar',
}: CTASectionProps) {
  return (
    <section
      id="contacto"
      className="py-20"
      style={{ backgroundColor: brand.primaryColor }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-white/80">{subtitle}</p>
        )}
        <a
          href={ctaHref}
          className="mt-10 inline-block rounded-xl px-10 py-4 text-base font-bold text-white shadow-xl transition-transform hover:scale-105"
          style={{ backgroundColor: brand.accentColor }}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
