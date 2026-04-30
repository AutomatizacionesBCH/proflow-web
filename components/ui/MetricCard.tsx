import { type ReactNode } from 'react'

interface MetricCardProps {
  value: string
  label: string
  icon?: ReactNode
  iconPosition?: 'top' | 'left'
  className?: string
}

export function MetricCard({ value, label, icon, iconPosition = 'top', className = '' }: MetricCardProps) {
  if (iconPosition === 'left') {
    return (
      <div
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderRadius: '18px' }}
        className={`flex items-center gap-4 bg-white border border-[#E5E7EB] p-6 ${className}`}
      >
        {icon && (
          <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F6F8]">
            {icon}
          </div>
        )}
        <div>
          <p className="text-[36px] font-bold leading-none tracking-tight text-[#111827]">{value}</p>
          <p className="mt-1 text-sm text-[#6B7280]">{label}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderRadius: '18px' }}
      className={`flex flex-col bg-white border border-[#E5E7EB] p-6 ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F6F8]">
          {icon}
        </div>
      )}
      <p className="text-[36px] font-bold leading-none tracking-tight text-[#111827]">{value}</p>
      <p className="mt-2 text-sm text-[#6B7280]">{label}</p>
    </div>
  )
}
