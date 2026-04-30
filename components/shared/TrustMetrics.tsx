import type { BrandConfig } from '@/config/brands'
import type { TrustMetric } from '@/types'

interface TrustMetricsProps {
  brand: BrandConfig
  metrics: TrustMetric[]
}

export function TrustMetrics({ brand, metrics }: TrustMetricsProps) {
  return (
    <section className="py-12" style={{ backgroundColor: brand.backgroundColor }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-2 gap-6 lg:grid-cols-${Math.min(metrics.length, 4)}`}>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center rounded-2xl p-6 text-center shadow-sm"
              style={{ backgroundColor: brand.cardColor }}
            >
              <span
                className="text-4xl font-extrabold tracking-tight"
                style={{ color: brand.primaryColor }}
              >
                {metric.value}
              </span>
              <span className="mt-1 text-sm font-semibold text-gray-700">{metric.label}</span>
              {metric.description && (
                <span className="mt-1 text-xs text-gray-500">{metric.description}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
