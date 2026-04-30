import { type ReactNode } from 'react'

type SectionVariant = 'default' | 'compact' | 'hero' | 'dark'

interface SectionProps {
  children: ReactNode
  variant?: SectionVariant
  id?: string
  className?: string
}

const variantClasses: Record<SectionVariant, string> = {
  default: 'py-12 sm:py-20 bg-white',
  compact: 'py-8 sm:py-12 bg-white',
  hero:    'py-16 sm:py-24 bg-gradient-to-b from-[#F5F6F8] to-white',
  dark:    'py-12 sm:py-20 bg-[#111827]',
}

export function Section({ children, variant = 'default', id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`${variantClasses[variant]} ${className}`}>
      {children}
    </section>
  )
}
