'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  accentColor?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, accentColor = '#1A56DB', className = '', id, ...props },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[#111827]"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        style={
          {
            height: '52px',
            borderRadius: '12px',
            padding: '0 16px',
            border: error ? '1.5px solid #DC2626' : '1.5px solid #E5E7EB',
            fontSize: '16px',
            lineHeight: '24px',
            outline: 'none',
            background: '#fff',
            color: '#111827',
            width: '100%',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            '--accent': accentColor,
          } as React.CSSProperties
        }
        className={`focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)] placeholder:text-[#9CA3AF] ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-[#DC2626]">{error}</p>
      )}
    </div>
  )
})
