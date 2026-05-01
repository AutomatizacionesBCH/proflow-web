'use client'

import { useState, useEffect } from 'react'
import { formatCLP, formatUSD } from '@/lib/formatters'

const FALLBACK_DOLAR = 930
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

const CTA_LABEL: Record<CalculatorProps['brand'], string> = {
  'caja-chica': 'Quiero esta operación',
  'proflow-latam': 'Solicitar operación',
}

const getFactor = (amount: number): number => {
  if (amount < 200) return 0
  if (amount < 1000) return 0.78
  if (amount < 2500) return 0.79
  if (amount < 5000) return 0.80
  return 0.81
}

function fmtThousands(n: number) {
  return n.toLocaleString('es-CL')
}

function VisaIcon({ selected }: { selected: boolean }) {
  return (
    <span
      className="font-black italic text-base leading-none tracking-tight"
      style={{ color: selected ? 'white' : '#1434CB', fontFamily: 'Arial, sans-serif' }}
    >
      VISA
    </span>
  )
}

function MastercardIcon({ selected }: { selected: boolean }) {
  return (
    <span className="relative flex h-5 w-8 items-center">
      <span
        className="absolute left-0 h-5 w-5 rounded-full"
        style={{ backgroundColor: selected ? 'rgba(255,255,255,0.85)' : '#EB001B' }}
      />
      <span
        className="absolute left-3 h-5 w-5 rounded-full"
        style={{
          backgroundColor: selected ? 'rgba(255,255,255,0.65)' : '#F79E1B',
          opacity: 0.9,
        }}
      />
    </span>
  )
}

function AmexIcon({ selected }: { selected: boolean }) {
  return (
    <span
      className="text-xs font-black tracking-widest"
      style={{ color: selected ? 'white' : '#2E77BC', fontFamily: 'Arial, sans-serif' }}
    >
      AMEX
    </span>
  )
}

const CARD_ICON_MAP: Record<CardType, (selected: boolean) => React.ReactElement> = {
  Visa: (s) => <VisaIcon selected={s} />,
  Mastercard: (s) => <MastercardIcon selected={s} />,
  Amex: (s) => <AmexIcon selected={s} />,
}

export function Calculator({
  brand,
  primaryColor,
  accentColor,
  minAmount = 200,
  maxAmount = 15000,
  onSimulate,
}: CalculatorProps) {
  const [amount, setAmount] = useState(minAmount)
  const [inputText, setInputText] = useState(fmtThousands(minAmount))
  const [card, setCard] = useState<CardType>('Visa')
  const [valorDolar, setValorDolar] = useState<number | null>(null)
  const [dolarError, setDolarError] = useState(false)

  useEffect(() => {
    fetch('https://mindicador.cl/api/dolar')
      .then((res) => res.json())
      .then((data) => {
        const valor =
          (Array.isArray(data) ? data[0]?.valor : null) ??
          data?.serie?.[0]?.valor
        if (typeof valor === 'number') {
          setValorDolar(valor)
        } else {
          throw new Error('Formato inesperado')
        }
      })
      .catch(() => {
        setDolarError(true)
        setValorDolar(FALLBACK_DOLAR)
      })
  }, [])

  const dolarActual = valorDolar ?? FALLBACK_DOLAR
  const factor = getFactor(amount)
  const montoFinal = amount * factor * dolarActual

  const simulationData: SimulationData = {
    montoUSD: amount,
    montoFinalCLP: montoFinal,
    tasaCambio: dolarActual,
    comision: 0,
    tipoTarjeta: card,
  }

  const handleCTA = () => {
    onSimulate?.(simulationData)
  }

  const handleAmountFocus = () => {
    setInputText(String(amount))
  }

  const handleAmountChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '')
    setInputText(digits)
    const n = Number(digits)
    if (n > 0) setAmount(n)
  }

  const handleAmountBlur = () => {
    const clamped = Math.min(maxAmount, Math.max(minAmount, amount))
    setAmount(clamped)
    setInputText(fmtThousands(clamped))
  }

  const handleSlider = (v: number) => {
    setAmount(v)
    setInputText(fmtThousands(v))
  }

  const waText = encodeURIComponent(
    `Hola, quiero operar ${formatUSD(amount)} con tarjeta ${card}. Recibiría ${formatCLP(montoFinal)} aproximadamente.`,
  )
  const waHref = `https://wa.me/56912345678?text=${waText}`

  const sliderPct = Math.round(((amount - minAmount) / (maxAmount - minAmount)) * 100)

  const sliderStyle = `
    .calc-range-${brand} {
      -webkit-appearance: none;
      appearance: none;
      height: 6px;
      border-radius: 9999px;
      outline: none;
      cursor: pointer;
      width: 100%;
    }
    .calc-range-${brand}::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 22px;
      width: 22px;
      border-radius: 50%;
      background: ${accentColor};
      cursor: pointer;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
      margin-top: -8px;
      transition: transform 0.15s;
    }
    .calc-range-${brand}::-webkit-slider-thumb:hover {
      transform: scale(1.15);
    }
    .calc-range-${brand}::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 9999px;
    }
    .calc-range-${brand}::-moz-range-thumb {
      height: 22px;
      width: 22px;
      border-radius: 50%;
      background: ${accentColor};
      cursor: pointer;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    }
  `

  const tasaLabel = valorDolar === null && !dolarError
    ? 'Cargando tasa...'
    : `Tasa referencial: $${fmtThousands(Math.round(dolarActual))} por USD`

  return (
    <>
      <style>{sliderStyle}</style>

      <section id="calculadora" style={{ backgroundColor: SECTION_BG[brand] }} className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10 text-center">
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

          <div
            className="rounded-[18px] bg-white p-6 sm:p-8"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.07)' }}
          >
            {/* Monto */}
            <div className="mb-7">
              <label className="mb-3 block text-sm font-semibold text-[#0D1117]">
                ¿Cuánto quieres operar?
              </label>

              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-4 text-sm font-semibold text-[#9CA3AF]">
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={inputText}
                  onFocus={handleAmountFocus}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  onBlur={handleAmountBlur}
                  placeholder="Ej: 1.000"
                  className="h-14 w-full rounded-[12px] border border-[#E5E7EB] bg-white pl-10 pr-16 text-base font-semibold text-[#0D1117] outline-none transition-colors focus:border-[#9CA3AF]"
                />
                <span className="pointer-events-none absolute right-4 text-xs font-bold text-[#9CA3AF]">
                  USD
                </span>
              </div>

              <div className="mt-5">
                <input
                  type="range"
                  min={minAmount}
                  max={maxAmount}
                  step={minAmount >= 1000 ? 1000 : 50}
                  value={amount}
                  onChange={(e) => handleSlider(Number(e.target.value))}
                  className={`calc-range-${brand}`}
                  style={{
                    background: `linear-gradient(to right, ${accentColor} ${sliderPct}%, #E5E7EB ${sliderPct}%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-xs text-[#9CA3AF]">
                  <span>{formatUSD(minAmount)}</span>
                  <span>{formatUSD(maxAmount)}</span>
                </div>
              </div>
            </div>

            {/* Tipo de tarjeta */}
            <div className="mb-7">
              <label className="mb-3 block text-sm font-semibold text-[#0D1117]">
                Tipo de tarjeta
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {CARD_TYPES.map((c) => {
                  const sel = card === c
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCard(c)}
                      className="flex flex-col items-center gap-2 rounded-xl border py-4 transition-all duration-150"
                      style={
                        sel
                          ? { borderColor: accentColor, backgroundColor: accentColor }
                          : { borderColor: '#E5E7EB', backgroundColor: 'white' }
                      }
                    >
                      <span className="flex h-5 items-center justify-center">
                        {CARD_ICON_MAP[c](sel)}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: sel ? 'white' : '#6B7280' }}
                      >
                        {c}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Separator */}
            <div className="mb-6 border-t border-[#E5E7EB]" />

            {/* Resultado */}
            <div className="mb-5">
              <p className="mb-1.5 text-xs font-medium text-[#9CA3AF]">
                Recibes aproximadamente
              </p>
              <p
                className="font-mono font-extrabold leading-none tracking-tight"
                style={{ color: accentColor, fontSize: '40px' }}
              >
                {formatCLP(montoFinal)}
              </p>
              <p className="mt-2 text-xs text-[#9CA3AF]">{tasaLabel}</p>
              {dolarError && (
                <p className="mt-1 text-xs text-amber-500">
                  No se pudo obtener la tasa en tiempo real. Se usa valor de respaldo.
                </p>
              )}
            </div>

            {/* Legal */}
            <p className="mb-6 text-xs text-[#9CA3AF]">
              * Simulación referencial basada en la tasa del día.
              La tasa final se confirma al momento de la operación.
            </p>

            {/* CTA */}
            {brand === 'caja-chica' ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCTA}
                className="flex w-full items-center justify-center rounded-[14px] py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 4px 14px ${accentColor}50`,
                }}
              >
                {CTA_LABEL[brand]}
              </a>
            ) : (
              <button
                type="button"
                onClick={handleCTA}
                className="flex w-full items-center justify-center rounded-[14px] py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 4px 14px ${accentColor}50`,
                }}
              >
                {CTA_LABEL[brand]}
              </button>
            )}

            {/* Time badge */}
            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-xs font-medium text-[#6B7280]">
                ⚡ Operación en aprox. 15-20 minutos
              </span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
