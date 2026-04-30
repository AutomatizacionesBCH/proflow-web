'use client'

import { useState } from 'react'
import { getBrand } from '@/config/brands'

const brand = getBrand('proflow-latam')

const PRODUCTS = [
  { id: 'credit_line', label: 'Línea de crédito', rate: 0.02 },
  { id: 'factoring', label: 'Factoring', rate: 0.015 },
  { id: 'leasing', label: 'Leasing', rate: 0.018 },
]

export function Calculator() {
  const [amount, setAmount] = useState(5000000)
  const [months, setMonths] = useState(12)
  const [productId, setProductId] = useState('credit_line')

  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0]
  const monthlyPayment = (amount * product.rate) / (1 - Math.pow(1 + product.rate, -months))
  const totalPayment = monthlyPayment * months

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

  return (
    <section id="calculadora" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: brand.primaryColor }}
          >
            Simulador financiero
          </h2>
          <p className="mt-4 text-gray-600">
            Calcula el costo de cada producto para tu empresa.
          </p>
        </div>

        <div
          className="rounded-2xl border p-8 shadow-sm"
          style={{ backgroundColor: brand.cardColor, borderColor: `${brand.primaryColor}15` }}
        >
          {/* Product selector */}
          <div className="mb-8 grid grid-cols-3 gap-3">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setProductId(p.id)}
                className="rounded-xl border-2 py-3 text-sm font-semibold transition-colors"
                style={
                  productId === p.id
                    ? { borderColor: brand.primaryColor, backgroundColor: brand.primaryColor, color: 'white' }
                    : { borderColor: `${brand.primaryColor}30`, color: brand.primaryColor }
                }
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <label className="text-sm font-semibold text-gray-700">Monto</label>
                  <span className="text-sm font-bold" style={{ color: brand.primaryColor }}>
                    {fmt(amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={500000000}
                  step={1000000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: brand.primaryColor }}
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between">
                  <label className="text-sm font-semibold text-gray-700">Plazo</label>
                  <span className="text-sm font-bold" style={{ color: brand.primaryColor }}>
                    {months} meses
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={60}
                  step={3}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: brand.primaryColor }}
                />
              </div>
            </div>

            <div
              className="flex flex-col justify-center rounded-xl p-6 space-y-4"
              style={{ backgroundColor: `${brand.primaryColor}08` }}
            >
              <div>
                <p className="text-xs text-gray-500">Cuota mensual estimada</p>
                <p className="text-3xl font-extrabold" style={{ color: brand.primaryColor }}>
                  {fmt(monthlyPayment)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total a pagar</p>
                <p className="text-xl font-bold text-gray-700">{fmt(totalPayment)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tasa mensual</p>
                <p className="text-base font-semibold text-gray-600">
                  {(product.rate * 100).toFixed(1)}%
                </p>
              </div>
              <a
                href="#solicitar"
                className="block w-full rounded-lg py-3 text-center text-sm font-bold text-white"
                style={{ backgroundColor: brand.primaryColor }}
              >
                Solicitar ahora →
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">
            * Simulación referencial. Tasas sujetas a evaluación crediticia.
          </p>
        </div>
      </div>
    </section>
  )
}
