import type { BrandConfig } from '@/config/brands'
import type { ProcessStep } from '@/types'

interface ProcessStepsProps {
  brand: BrandConfig
  steps: ProcessStep[]
  title?: string
  subtitle?: string
}

export function ProcessSteps({
  brand,
  steps,
  title = '¿Cómo funciona?',
  subtitle,
}: ProcessStepsProps) {
  return (
    <section id="proceso" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: brand.primaryColor }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-8 left-0 right-0 hidden h-0.5 lg:block"
            style={{ backgroundColor: `${brand.primaryColor}20` }}
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-extrabold text-white shadow-lg mb-4"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {step.icon || step.step}
                </div>
                <h3
                  className="text-base font-bold"
                  style={{ color: brand.primaryColor }}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
