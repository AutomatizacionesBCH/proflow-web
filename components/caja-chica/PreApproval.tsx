'use client'

import { useState } from 'react'
import { getBrand } from '@/config/brands'
import { submitLead } from '@/lib/supabase/leads'
import { getStoredUTMParams } from '@/lib/analytics/utm'

const brand = getBrand('caja-chica')

type Step = 'form' | 'success'

export function PreApproval() {
  const [step, setStep] = useState<Step>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    amount: '',
  })

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const utm = getStoredUTMParams()
      await submitLead({
        ...form,
        amount: form.amount ? Number(form.amount.replace(/\D/g, '')) : undefined,
        brand: 'caja-chica',
        utm_source: utm.utm_source ?? brand.utmSource,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
      })
      setStep('success')
    } catch {
      setError('Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <section id="solicitar" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
        <div className="mx-auto max-w-lg px-4 sm:px-6 text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: `${brand.accentColor}20` }}
          >
            <svg className="h-8 w-8" style={{ color: brand.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold" style={{ color: brand.primaryColor }}>
            ¡Solicitud recibida!
          </h2>
          <p className="mt-3 text-gray-600">
            Revisaremos tu información y te contactaremos en menos de 24 horas hábiles.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="solicitar" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-2 text-center text-3xl font-extrabold tracking-tight"
          style={{ color: brand.primaryColor }}
        >
          Pre-aprobación express
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Completa el formulario y recibe respuesta en 24 horas.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-8 shadow-sm space-y-5"
          style={{ borderColor: `${brand.primaryColor}15` }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Nombre *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2"
                style={{ '--tw-ring-color': brand.primaryColor } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="tu@empresa.cl"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Teléfono</label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+56 9 1234 5678"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Empresa</label>
              <input
                type="text"
                value={form.company}
                onChange={set('company')}
                placeholder="Nombre de tu empresa"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">Monto a solicitar *</label>
            <select
              required
              value={form.amount}
              onChange={set('amount')}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 bg-white"
            >
              <option value="">Selecciona un rango</option>
              <option value="500000">Hasta $500.000</option>
              <option value="1000000">$500.001 – $1.000.000</option>
              <option value="3000000">$1.000.001 – $3.000.000</option>
              <option value="10000000">$3.000.001 – $10.000.000</option>
              <option value="50000000">Más de $10.000.000</option>
            </select>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: brand.primaryColor }}
          >
            {loading ? 'Enviando...' : 'Solicitar pre-aprobación →'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Sin consulta a Dicom. Sin compromisos. 100% confidencial.
          </p>
        </form>
      </div>
    </section>
  )
}
