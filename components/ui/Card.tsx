'use client'

import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

const paddingClasses = {
  sm: 'p-5 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
}

export function Card({ children, className = '', hoverable = false, padding = 'md', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderRadius: '18px' }}
      className={[
        'bg-white border border-[#E5E7EB] transition-all duration-300',
        paddingClasses[padding],
        hoverable ? 'cursor-pointer hover:scale-[1.01]' : '',
        className,
      ].join(' ')}
      onMouseEnter={hoverable ? (e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.10)'
      } : undefined}
      onMouseLeave={hoverable ? (e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'
      } : undefined}
    >
      {children}
    </div>
  )
}
