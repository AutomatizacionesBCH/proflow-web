import type { BrandConfig } from '@/config/brands'
import type { Testimonial } from '@/types'

interface TestimonialsProps {
  brand: BrandConfig
  testimonials: Testimonial[]
  title?: string
}

function StarRating({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          fill={i < rating ? color : 'none'}
          stroke={color}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials({
  brand,
  testimonials,
  title = 'Lo que dicen nuestros clientes',
}: TestimonialsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-12 text-center text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{ color: brand.primaryColor }}
        >
          {title}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-2xl border p-6 shadow-sm"
              style={{
                borderColor: `${brand.primaryColor}15`,
                backgroundColor: brand.cardColor,
              }}
            >
              <StarRating rating={t.rating} color={brand.accentColor} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
