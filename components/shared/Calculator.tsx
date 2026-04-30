'use client'

import { useState } from 'react'
import { formatCLP, formatUSD } from '@/lib/formatters'

const TASA_CAMBIO = 930
const COMISION = 0.035
const CARD_TYPES = ['Visa', 'Mastercard', 'Amex'] as const
type CardType = (typeof CARD_TYPES)[number]

export interface SimulationData {
  montoUSD: number
  montoFinalCLP: number
  tasaCambio: number
  comision: number
  tipoTarjeta: string
}

interface CalculatorProps {
  brand: 'caja-chica' | 'proflow-latam'
  primaryColor: string
  accentColor: string
  minAmount?: number
  maxAmount?: number
  onSimulate?: (data: SimulationData) => void
}

const SECTION_BG: Record<CalculatorProps['brand'], string> = {
  'caja-chica': '#F5F6F8',
  'proflow-latam': '#F8FAFF',
}

function calcular(montoUSD: number) {
  const montoBase = montoUSD * TASA_CAMBIO
  const comision = montoBase * COMISION
  const montoFinal = montoBase - comision
  return { montoBase, comision, montoFinal }
}

export function Calculator({
  brand,
  primaryColor,
  accentColor,
  minAmount = 100,
  maxAmount = 10000,
  onSimulate,
}: CalculatorProps) {
  const [amount, setAmount] = useState(minAmount)
  const [card, setCard] = useState<CardType>('Visa')
  const [showBreakdown, setShowBreakdown] = useState(false)

  const { montoBase, comision, montoFinal } = calcular(amount)

  const simulationData: SimulationData = {
    montoUSD: amount,
    montoFinalCLP: montoFinal,
    tasaCambio: TASA_CAMBIO,
    comision,
    tipoTarjeta: card,
  }

  const handleCTA = () => {
    onSimulate?.(simulationData)
  }

  const waText = encodeURIComponent(
    `Hola, quiero operar ${formatUSD(amount)} con tarjeta ${card}. Recibiría ${formatCLP(montoFinal)} aproximadamente.`,
  )
  const waHref = `https://wa.me/56912345678?text=${waText}`

  const inputBase =
    'w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0D1117] outline-none transition-colors focus:border-[#9CA3AF]'

  return (
    <section id="calculadora" style={{ backgroundColor: SECTION_BG[brand] }} className="py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: primaryColor }}
          >
            Simulador de operación
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Calcula cuánto recibes en pesos. Operaciones desde{' '}
            <span className="font-semibold text-[#0D1117]">{formatUSD(minAmount)}</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
          {/* 1. Monto USD */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-[#0D1117]">Monto en USD</label>
              <span className="font-mono text-xl font-extrabold" style={{ color: primaryColor }}>
                {formatUSD(amount)}
              </span>
            </div>
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={minAmount >= 1000 ? 1000 : 50}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{ accentColor }}
            />
            <div className="mt-2 flex justify-between text-xs text-[#6B7280]">
              <span>{formatUSD(minAmount)}</span>
              <span>{formatUSD(maxAmount)}</span>
            </div>

            <div className="mt-4">
              <input
                type="number"
                min={minAmount}
                max={maxAmount}
                value={amount}
                onChange={(e) => {
                  const v = Math.min(maxAmount, Math.max(minAmount, Number(e.target.value)))
                  setAmount(v)
                }}
                className={inputBase}
                placeholder="Ingresa un monto"
              />
            </div>
          </div>

          {/* 2. Tipo de tarjeta */}
          <div className="mb-8">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Tipo de tarjeta
            </label>
            <div className="grid grid-cols-3 gap-3">
              {CARD_TYPES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCard(c)}
                  className="rounded-full border py-2.5 text-sm font-semibold transition-all"
                  style={
                    card === c
                      ? { borderColor: accentColor, backgroundColor: accentColor, color: '#fff' }
                      : { borderColor: '#E5E7EB', color: '#6B7280' }
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Resultado */}
          <div className="mb-4 rounded-xl px-6 py-5" style={{ backgroundColor: primaryColor }}>
            <p className="mb-1 text-xs text-white/50">Recibes aproximadamente</p>
            <p className="font-mono text-3xl font-extrabold text-white">{formatCLP(montoFinal)}</p>
            <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/60">Tasa referencial: $930 por USD</p>
              <p className="text-xs text-white/60">Incluye comisión del 3,5%</p>
            </div>
          </div>

          {/* 4. Desglose colapsable */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F8FAFF]"
            >
              <span>Ver desglose</span>
              <svg
                className={`h-4 w-4 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showBreakdown && (
              <div className="mt-2 rounded-lg border border-[#E5E7EB] px-4 py-4 text-sm">
                <div className="flex justify-between py-1.5">
                  <span className="text-[#6B7280]">Monto bruto</span>
                  <span className="font-mono font-semibold text-[#0D1117]">
                    {formatCLP(montoBase)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E5E7EB] py-1.5">
                  <span className="text-[#6B7280]">Comisión (3,5%)</span>
                  <span className="font-mono font-semibold text-red-500">
                    -{formatCLP(comision)}
                  </span>
                </div>
                <div
                  className="flex justify-between border-t border-[#E5E7EB] py-1.5"
                  style={{ borderColor: `${primaryColor}20` }}
                >
                  <span className="font-semibold" style={{ color: primaryColor }}>
                    Monto que recibes
                  </span>
                  <span className="font-mono font-extrabold" style={{ color: primaryColor }}>
                    {formatCLP(montoFinal)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 5. CTA */}
          {brand === 'caja-chica' ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCTA}
              className="block w-full rounded-xl py-4 text-center text-sm font-bold text-white transition-colors"
              style={{ backgroundColor: accentColor }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = primaryColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = accentColor)
              }
            >
              Quiero esta operación →
            </a>
          ) : (
            <a
              href="#contacto"
              onClick={handleCTA}
              className="block w-full rounded-xl py-4 text-center text-sm font-bold text-white transition-colors"
              style={{ backgroundColor: accentColor }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = primaryColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = accentColor)
              }
            >
              Solicitar operación →
            </a>
          )}

          {/* Legal */}
          <p className="mt-4 text-center text-xs text-[#6B7280]">
            * Valores referenciales. La tasa final se confirma al momento de la operación.
          </p>
        </div>
      </div>
    </section>
  )
}
