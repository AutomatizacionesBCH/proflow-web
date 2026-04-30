'use client'

import { useState } from 'react'

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar', rate: 930 },
  { code: 'EUR', symbol: '€', label: 'Euro', rate: 1020 },
  { code: 'GBP', symbol: '£', label: 'Libra', rate: 1185 },
] as const

type CurrencyCode = (typeof CURRENCIES)[number]['code']

const fmtCLP = (n: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(n)

export function Calculator() {
  const [amount, setAmount] = useState(10000)
  const [currency, setCurrency] = useState<CurrencyCode>('USD')

  const curr = CURRENCIES.find((c) => c.code === currency)!
  const clp = amount * curr.rate

  return (
    <section id="calculadora" className="bg-[#F8FAFF] py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F2D6B] sm:text-4xl">
            Simulador de operación
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Calcula el monto estimado en pesos chilenos. Operaciones desde{' '}
            <span className="font-semibold text-[#0D1117]">USD 1.000</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
          {/* Currency selector */}
          <div className="mb-8">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Moneda de origen
            </label>
            <div className="grid grid-cols-3 gap-3">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`rounded-lg border py-3 text-sm font-semibold transition-all ${
                    currency === c.code
                      ? 'border-[#1A56DB] bg-[#1A56DB] text-white'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#1A56DB]/40 hover:text-[#0F2D6B]'
                  }`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Amount slider */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-[#0D1117]">
                Monto en {currency}
              </label>
              <span className="font-mono text-xl font-extrabold text-[#0F2D6B]">
                {curr.symbol}
                {amount.toLocaleString('en-US')}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={200000}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{ accentColor: '#1A56DB' }}
            />
            <div className="mt-2 flex justify-between text-xs text-[#6B7280]">
              <span>{curr.symbol} 1.000</span>
              <span>{curr.symbol} 200.000</span>
            </div>
          </div>

          {/* Result */}
          <div className="mb-6 rounded-xl bg-[#0F2D6B] px-6 py-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-xs text-white/50">Recibes en CLP</p>
                <p className="font-mono text-3xl font-extrabold text-white">
                  {fmtCLP(clp)}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-white/40">Tasa de referencia</p>
                <p className="font-mono text-sm text-white/70">
                  1 {currency} = {curr.rate.toLocaleString('es-CL')} CLP
                </p>
              </div>
            </div>
          </div>

          <a
            href="#contacto"
            className="block w-full rounded-xl bg-[#1A56DB] py-4 text-center text-sm font-bold text-white transition-colors hover:bg-[#0F2D6B]"
          >
            Solicitar esta operación →
          </a>

          <p className="mt-4 text-center text-xs text-[#6B7280]">
            * Simulación referencial. La tasa exacta se confirma al momento de operar.
          </p>
        </div>
      </div>
    </section>
  )
}
