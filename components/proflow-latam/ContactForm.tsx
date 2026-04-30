'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    await new Promise((r) => setTimeout(r, 900))
    setState('success')
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1A56DB]">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-bold text-white">Solicitud recibida</p>
        <p className="mt-2 text-sm text-white/60">
          Un especialista te contactará en menos de 30 minutos hábiles.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/50 focus:bg-white/15'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
          Nombre
        </label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
          Email corporativo
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nombre@empresa.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
          Monto estimado (USD)
        </label>
        <select
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-white/20 bg-[#0F2D6B] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/50"
        >
          <option value="">Selecciona un rango</option>
          <option value="1000-10000">USD 1.000 – USD 10.000</option>
          <option value="10000-50000">USD 10.000 – USD 50.000</option>
          <option value="50000-200000">USD 50.000 – USD 200.000</option>
          <option value="200000+">Más de USD 200.000</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded-xl bg-[#1A56DB] py-4 text-sm font-bold text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
      >
        {state === 'loading' ? 'Enviando...' : 'Solicitar contacto →'}
      </button>

      <p className="text-center text-xs text-white/30">
        Tu información es confidencial y no será compartida con terceros.
      </p>
    </form>
  )
}
