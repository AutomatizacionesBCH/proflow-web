'use client'

import { useState } from 'react'
import { getBrand } from '@/config/brands'

const brand = getBrand('caja-chica')

const RATE_MONTHLY = 0.025 // 2.5% mensual (placeholder)

export function Calculator() {
  const [amount, setAmount] = useState(1000000)
  const [months, setMonths] = useState(6)

  const monthlyPayment = (amount * RATE_MONTHLY) / (1 - Math.pow(1 + RATE_MONTHLY, -months))
  const totalPayment = monthlyPayment * months
  const totalInterest = totalPayment - amount

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

  return (
    <section id="calculadora" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-4 text-center text-3xl font-extrabold tracking-tight"
          style={{ color: brand.primaryColor }}
        >
          Calcula tu cuota
        </h2>
        <p className="mb-10 text-center text-gray-600">
          Ajusta el monto y plazo para ver tu cuota estimada. Sin compromisos.
        </p>

        <div
          className="rounded-2xl border p-8 shadow-sm"
          style={{ backgroundColor: brand.cardColor, borderColor: `${brand.primaryColor}15` }}
        >
          {/* Amount slider */}
          <div className="mb-8">
            <div className="mb-2 flex justify-between">
              <label className="text-sm font-semibold text-gray-700">Monto a solicitar</label>
              <span className="text-sm font-bold" style={{ color: brand.primaryColor }}>
                {fmt(amount)}
              </span>
            </div>
            <input
              type="range"
              min={500000}
              max={50000000}
              step={500000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-green-700"
              style={{ accentColor: brand.primaryColor }}
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>$500.000</span>
              <span>$50.000.000</span>
            </div>
          </div>

          {/* Months slider */}
          <div className="mb-8">
            <div className="mb-2 flex justify-between">
              <label className="text-sm font-semibold text-gray-700">Plazo</label>
              <span className="text-sm font-bold" style={{ color: brand.primaryColor }}>
                {months} meses
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={36}
              step={3}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: brand.primaryColor }}
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>3 meses</span>
              <span>36 meses</span>
            </div>
          </div>

          {/* Results */}
          <div
            className="grid grid-cols-3 gap-4 rounded-xl p-6"
            style={{ backgroundColor: `${brand.primaryColor}08` }}
          >
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Cuota mensual</p>
              <p className="text-xl font-extrabold" style={{ color: brand.primaryColor }}>
                {fmt(monthlyPayment)}
              </p>
            </div>
            <div className="text-center border-x" style={{ borderColor: `${brand.primaryColor}20` }}>
              <p className="text-xs text-gray-500 mb-1">Total a pagar</p>
              <p className="text-xl font-extrabold" style={{ color: brand.primaryColor }}>
                {fmt(totalPayment)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Intereses</p>
              <p className="text-xl font-extrabold text-gray-700">{fmt(totalInterest)}</p>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            * Simulación referencial. Tasa 2,5% mensual. Sujeto a evaluación.
          </p>

          <a
            href="#solicitar"
            className="mt-6 block w-full rounded-xl py-4 text-center text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: brand.primaryColor }}
          >
            Solicitar este monto →
          </a>
        </div>
      </div>
    </section>
  )
}
