import { type ReactNode } from 'react'

interface Step {
  number?: string
  icon?: ReactNode
  title: string
  description: string
}

interface StepCardProps {
  steps: Step[]
  accentColor?: string
  className?: string
}

export function StepCard({ steps, accentColor = '#1A56DB', className = '' }: StepCardProps) {
  return (
    <div className={`relative grid gap-8 md:grid-cols-${steps.length} ${className}`}>
      {/* Connector line (desktop only) */}
      <div
        className="absolute hidden h-px md:block"
        style={{
          background: '#E5E7EB',
          top: '1.25rem',
          left: `calc(100% / (${steps.length} * 2))`,
          right: `calc(100% / (${steps.length} * 2))`,
        }}
      />

      {steps.map((step, i) => (
        <div key={i} className="relative flex flex-col items-start gap-4 md:items-center md:text-center">
          {/* Circle indicator */}
          <div
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white font-mono text-sm font-extrabold"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {step.icon ?? step.number ?? String(i + 1).padStart(2, '0')}
          </div>

          <div>
            <h3 className="text-[18px] font-bold leading-[26px] text-[#111827]">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
