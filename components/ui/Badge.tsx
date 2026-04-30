import { type ReactNode } from 'react'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: '#D1FAE5', text: '#065F46' },
  warning: { bg: '#FEF3C7', text: '#92400E' },
  danger:  { bg: '#FEE2E2', text: '#991B1B' },
  info:    { bg: '#DBEAFE', text: '#1E40AF' },
  neutral: { bg: '#F3F4F6', text: '#374151' },
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  const { bg, text } = variantStyles[variant]
  return (
    <span
      style={{ background: bg, color: text, borderRadius: '999px', padding: '4px 12px' }}
      className={`inline-flex items-center text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  )
}
