'use client'

import { useRef, useState } from 'react'
import { Calculator, type SimulationData } from '@/components/shared/Calculator'
import { PreApproval } from '@/components/shared/PreApproval'

const BULLETS = [
  'Liquidez el mismo día',
  'Proceso 100% digital',
  'Tasas competitivas y transparentes',
  'Atención personalizada',
]

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1A56DB]/10">
      <svg className="h-3 w-3 text-[#1A56DB]" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  )
}

export function HeroWithCalculator() {
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null)
  const preApprovalRef = useRef<HTMLDivElement>(null)

  const handleSimulate = (data: SimulationData) => {
    setSimulationData(data)
    setTimeout(() => {
      preApprovalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle blue gradient decoration — top-right corner only */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at top right, #EEF4FF 0%, transparent 70%)',
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 lg:items-center">

            {/* Text column — second on mobile, left on desktop */}
            <div className="order-2 py-14 pr-0 lg:order-1 lg:py-28 lg:pr-14">

              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#1A56DB]/20 bg-[#EEF4FF] px-4 py-2 text-sm font-medium text-[#0F2D6B]">
                <span aria-hidden>🏦</span>
                Plataforma de liquidez financiera
              </div>

              {/* H1 */}
              <h1 className="mb-5 text-[34px] font-bold leading-[40px] tracking-tight text-[#0D1117] sm:text-[48px] sm:leading-[56px]">
                Convierte tu capacidad de crédito en{' '}
                <span style={{ color: '#1A56DB' }}>liquidez inmediata</span>
              </h1>

              {/* Subtitle */}
              <p className="mb-8 text-[16px] leading-[26px] text-[#6B7280] sm:text-[18px] sm:leading-[28px]">
                Soluciones financieras digitales, rápidas y seguras para personas y empresas en LATAM.
              </p>

              {/* Bullets */}
              <ul className="mb-10 space-y-3.5">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm font-medium text-[#374151]">
                    <CheckIcon />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#calculadora"
                  style={{
                    background: '#1A56DB',
                    borderRadius: '14px',
                    boxShadow: '0 4px 12px rgba(26,86,219,0.30)',
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#1447C0' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#1A56DB' }}
                >
                  Comenzar operación
                </a>
                <a
                  href="#contacto"
                  style={{
                    border: '1.5px solid #1A56DB',
                    borderRadius: '14px',
                    color: '#1A56DB',
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold transition-all duration-200 hover:bg-[#1A56DB] hover:text-white active:scale-[0.98]"
                >
                  Hablar con un asesor
                </a>
              </div>

              {/* Microcopy */}
              <p className="mt-5 flex items-center gap-1.5 text-sm text-[#9CA3AF]">
                <span aria-hidden>🔒</span>
                +25.000 operaciones · Sin compromiso
              </p>
            </div>

            {/* Calculator column — first on mobile (protagonist), right on desktop */}
            <div className="order-1 lg:order-2">
              <Calculator
                brand="proflow-latam"
                primaryColor="#0F2D6B"
                accentColor="#1A56DB"
                minAmount={200}
                maxAmount={15000}
                onSimulate={handleSimulate}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Pre-Approval (appears after simulation) ───────────────────── */}
      <div ref={preApprovalRef}>
        {simulationData && (
          <PreApproval
            brand="proflow-latam"
            simulationData={simulationData}
            primaryColor="#0F2D6B"
            accentColor="#1A56DB"
            whatsappNumber="56988617795"
          />
        )}
      </div>
    </>
  )
}
