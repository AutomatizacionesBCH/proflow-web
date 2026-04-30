'use client'

import { useState } from 'react'
import { getBrand } from '@/config/brands'
import { submitLead } from '@/lib/supabase/leads'
import { getStoredUTMParams } from '@/lib/analytics/utm'

const brand = getBrand('proflow-latam')

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
    country: '',
    product: '',
    amount: '',
    message: '',
  })

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const utm = getStoredUTMParams()
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        amount: form.amount ? Number(form.amount.replace(/\D/g, '')) : undefined,
        message: `País: ${form.country} | Producto: ${form.product} | ${form.message}`,
        brand: 'proflow-latam',
        utm_source: utm.utm_source ?? brand.utmSource,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
      })
      setStep('success')
    } catch {
      setError('Ocurrió un error al enviar tu solicitud. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <section id="solicitar" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
        <div className="mx-auto max-w-lg px-4 text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: `${brand.accentColor}15` }}
          >
            <svg className="h-8 w-8" style={{ color: brand.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold" style={{ color: brand.primaryColor }}>
            Solicitud enviada correctamente
          </h2>
          <p className="mt-3 text-gray-600">
            Un especialista de ProFlow LATAM se pondrá en contacto contigo en las próximas 24 horas hábiles.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="solicitar" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: brand.primaryColor }}
          >
            Habla con un especialista
          </h2>
          <p className="mt-3 text-gray-600">
            Cuéntanos tu necesidad y diseñamos una solución a la medida de tu empresa.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-8 shadow-sm space-y-5"
          style={{ borderColor: `${brand.primaryColor}15` }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Nombre completo *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Email corporativo *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="nombre@empresa.com"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-1"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Empresa *</label>
              <input
                required
                type="text"
                value={form.company}
                onChange={set('company')}
                placeholder="Nombre de tu empresa"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">País</label>
              <select
                value={form.country}
                onChange={set('country')}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-800 focus:ring-1 bg-white"
              >
                <option value="">Selecciona tu país</option>
                <option>Chile</option>
                <option>Colombia</option>
                <option>México</option>
                <option>Perú</option>
                <option>Argentina</option>
                <option>Otro</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Producto de interés</label>
              <select
                value={form.product}
                onChange={set('product')}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none bg-white"
              >
                <option value="">Selecciona un producto</option>
                <option>Línea de crédito</option>
                <option>Factoring</option>
                <option>Leasing</option>
                <option>Capital de trabajo</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">Monto aproximado</label>
              <select
                value={form.amount}
                onChange={set('amount')}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none bg-white"
              >
                <option value="">Selecciona un rango</option>
                <option value="5000000">Hasta $5M CLP</option>
                <option value="20000000">$5M – $20M CLP</option>
                <option value="100000000">$20M – $100M CLP</option>
                <option value="500000000">Más de $100M CLP</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">Mensaje (opcional)</label>
            <textarea
              value={form.message}
              onChange={set('message')}
              rows={3}
              placeholder="Cuéntanos brevemente tu necesidad..."
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none resize-none"
            />
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
            {loading ? 'Enviando...' : 'Enviar solicitud →'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Tu información es confidencial y no será compartida con terceros.
          </p>
        </form>
      </div>
    </section>
  )
}
