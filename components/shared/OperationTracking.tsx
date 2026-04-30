import type { BrandConfig } from '@/config/brands'

interface TrackingStep {
  label: string
  status: 'completed' | 'active' | 'pending'
  timestamp?: string
}

interface OperationTrackingProps {
  brand: BrandConfig
  operationId?: string
  steps: TrackingStep[]
  title?: string
}

export function OperationTracking({
  brand,
  operationId,
  steps,
  title = 'Estado de tu operación',
}: OperationTrackingProps) {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl border p-8 shadow-sm"
          style={{ borderColor: `${brand.primaryColor}20` }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3
              className="text-lg font-bold"
              style={{ color: brand.primaryColor }}
            >
              {title}
            </h3>
            {operationId && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-mono text-gray-600">
                #{operationId}
              </span>
            )}
          </div>

          <ol className="relative space-y-6 border-l-2" style={{ borderColor: `${brand.primaryColor}20` }}>
            {steps.map((step, index) => (
              <li key={index} className="ml-6">
                <span
                  className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      step.status === 'completed'
                        ? brand.accentColor
                        : step.status === 'active'
                        ? brand.primaryColor
                        : '#E5E7EB',
                  }}
                >
                  {step.status === 'completed' && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {step.status === 'active' && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        step.status === 'pending' ? '#9CA3AF' : brand.primaryColor,
                    }}
                  >
                    {step.label}
                  </p>
                  {step.timestamp && (
                    <p className="text-xs text-gray-400 mt-0.5">{step.timestamp}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
