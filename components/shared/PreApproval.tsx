'use client'

import { useState } from 'react'
import { SimulationData } from './Calculator'
import { formatCLP, formatUSD } from '@/lib/formatters'
import { saveLead } from '@/lib/leads/saveLead'

const CARD_TYPES = ['Visa', 'Mastercard', 'Amex'] as const
const BANCOS = [
  'BancoEstado',
  'Santander',
  'BCI',
  'Scotiabank',
  'Falabella',
  'Ripley',
  'CMR',
  'Otro',
]
const BRAND_NAMES: Record<string, string> = {
  'caja-chica': 'La Caja Chica',
  'proflow-latam': 'ProFlow LATAM',
}
const TASA = 930
const COMISION = 0.035

export interface LeadData {
  nombre: string
  telefono: string
  email: string
  tipoTarjeta: string
  banco: string
  montoUSD: number
  montoEstimadoCLP: number
  primeraOperacion: boolean
  brand: string
  source: 'pre-approval'
  createdAt: string
}

export interface PreApprovalProps {
  brand: 'caja-chica' | 'proflow-latam'
  simulationData?: SimulationData
  primaryColor: string
  accentColor: string
  whatsappNumber: string
  onComplete?: (leadData: LeadData) => void
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep1(nombre: string, telefono: string, email: string) {
  const errors: Record<string, string> = {}
  if (nombre.trim().length < 3) errors.nombre = 'Mínimo 3 caracteres'
  const phone = telefono.replace(/[\s\-()]/g, '')
  if (!/^(\+?56)?9\d{8}$/.test(phone)) errors.telefono = 'Formato válido: +56 9 XXXX XXXX'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Ingresa un email válido'
  return errors
}

function validateStep2(banco: string, montoUSD: number) {
  const errors: Record<string, string> = {}
  if (!banco) errors.banco = 'Selecciona tu banco emisor'
  if (!montoUSD || montoUSD <= 0) errors.montoUSD = 'Ingresa un monto mayor a 0'
  return errors
}

function validateStep3(aceptoContacto: boolean, aceptoReferencial: boolean) {
  const errors: Record<string, string> = {}
  if (!aceptoContacto) errors.aceptoContacto = 'Debes aceptar para continuar'
  if (!aceptoReferencial) errors.aceptoReferencial = 'Debes aceptar para continuar'
  return errors
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const STEP_LABELS = ['Tus datos', 'Tu operación', 'Confirmar']

function ProgressBar({
  currentStep,
  accentColor,
  primaryColor,
}: {
  currentStep: number
  accentColor: string
  primaryColor: string
}) {
  return (
    <div className="mb-8">
      <div className="relative flex items-center justify-between">
        {/* Connecting line background */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-[#E5E7EB]" />
        {/* Connecting line progress */}
        <div
          className="absolute left-0 top-4 h-0.5 transition-all duration-500"
          style={{
            width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
            backgroundColor: accentColor,
          }}
        />
        {STEP_LABELS.map((label, i) => {
          const num = i + 1
          const done = num < currentStep
          const active = num === currentStep
          return (
            <div key={num} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                style={
                  done
                    ? { backgroundColor: accentColor, color: '#fff' }
                    : active
                      ? { backgroundColor: primaryColor, color: '#fff' }
                      : { backgroundColor: '#E5E7EB', color: '#9CA3AF' }
                }
              >
                {done ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  num
                )}
              </div>
              <span
                className="text-xs font-medium"
                style={{ color: active ? primaryColor : '#9CA3AF' }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PreApproval({
  brand,
  simulationData,
  primaryColor,
  accentColor,
  whatsappNumber,
  onComplete,
}: PreApprovalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1)

  // Step 1
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')

  // Step 2 — init from simulationData, sync on change via derived-state pattern
  const [tipoTarjeta, setTipoTarjeta] = useState<string>(simulationData?.tipoTarjeta ?? 'Visa')
  const [banco, setBanco] = useState('')
  const [montoUSD, setMontoUSD] = useState<number>(simulationData?.montoUSD ?? 0)
  const [primeraOperacion, setPrimeraOperacion] = useState<boolean | null>(null)
  const [prevSimData, setPrevSimData] = useState(simulationData)

  if (simulationData !== prevSimData) {
    setPrevSimData(simulationData)
    if (simulationData) {
      setTipoTarjeta(simulationData.tipoTarjeta)
      setMontoUSD(simulationData.montoUSD)
    }
  }

  // Step 3
  const [aceptoContacto, setAceptoContacto] = useState(false)
  const [aceptoReferencial, setAceptoReferencial] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [leadId, setLeadId] = useState<string | undefined>(undefined)

  const brandName = BRAND_NAMES[brand]
  const montoEstimadoCLP = Math.round(montoUSD * TASA * (1 - COMISION))

  const handleNext1 = () => {
    const errs = validateStep1(nombre, telefono, email)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep(2)
  }

  const handleNext2 = () => {
    const errs = validateStep2(banco, montoUSD)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep(3)
  }

  const handleSubmit = async () => {
    const errs = validateStep3(aceptoContacto, aceptoReferencial)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    setSubmitError(null)

    const leadData: LeadData = {
      nombre,
      telefono,
      email,
      tipoTarjeta,
      banco,
      montoUSD,
      montoEstimadoCLP,
      primeraOperacion: primeraOperacion ?? false,
      brand,
      source: 'pre-approval',
      createdAt: new Date().toISOString(),
    }

    const result = await saveLead(leadData)

    if (!result.success) {
      setSubmitError(result.error ?? 'Error desconocido')
      setSubmitting(false)
      return
    }

    onComplete?.(leadData)
    setLeadId(result.leadId)
    setSubmitting(false)
    setStep('success')
  }

  const waText = encodeURIComponent(
    `Hola, acabo de solicitar una pre-aprobación en ${brandName}. Mi nombre es ${nombre}, quiero operar ${formatUSD(montoUSD)}. ¿Me pueden confirmar la tasa de hoy?`,
  )
  const waHref = `https://wa.me/${whatsappNumber}?text=${waText}`

  // ── Shared styles ────────────────────────────────────────────────────────────

  const inputCls = (hasError: boolean) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-[#0D1117] outline-none transition-colors focus:border-[#9CA3AF] ${
      hasError ? 'border-red-400' : 'border-[#E5E7EB]'
    }`
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6B7280]'
  const errorCls = 'mt-1.5 text-xs text-red-500'

  // ── Success screen ───────────────────────────────────────────────────────────

  if (step === 'success') {
    return (
      <section id="pre-aprobacion" className="bg-white py-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm text-center"
          >
            {/* Icon */}
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: `${accentColor}18` }}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: accentColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="mb-2 text-2xl font-extrabold" style={{ color: primaryColor }}>
              ¡Tu operación está pre-aprobada!
            </h2>
            <p className="mb-2 text-[#6B7280]">
              Te contactamos en menos de 15 minutos por WhatsApp.
            </p>
            {leadId && (
              <p className="mb-8 font-mono text-xs text-[#9CA3AF]">Ref: {leadId}</p>
            )}

            {/* Summary */}
            <div
              className="mb-8 rounded-xl p-5 text-left"
              style={{ backgroundColor: `${primaryColor}0A` }}
            >
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Nombre</span>
                  <span className="font-semibold text-[#0D1117]">{nombre}</span>
                </div>
                <div className="flex justify-between border-t border-[#E5E7EB] pt-3">
                  <span className="text-[#6B7280]">Monto a operar</span>
                  <span className="font-mono font-semibold text-[#0D1117]">{formatUSD(montoUSD)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E5E7EB] pt-3">
                  <span className="text-[#6B7280]">Recibes estimado</span>
                  <span className="font-mono font-extrabold" style={{ color: primaryColor }}>
                    {formatCLP(montoEstimadoCLP)}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white transition-colors"
              style={{ backgroundColor: accentColor }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L.057 23.082a.75.75 0 00.921.921l5.238-1.466A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.908 0-3.7-.495-5.254-1.364l-.376-.215-3.898 1.09 1.09-3.897-.215-.376A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Escribir por WhatsApp ahora
            </a>
          </div>
        </div>
      </section>
    )
  }

  // ── Form wrapper ─────────────────────────────────────────────────────────────

  return (
    <section id="pre-aprobacion" className="bg-white py-20">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl" style={{ color: primaryColor }}>
            Solicita tu pre-aprobación
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Completa los datos para reservar tu operación. Gratis, sin compromiso.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
          {/* Progress bar */}
          <ProgressBar
            currentStep={typeof step === 'number' ? step : 3}
            accentColor={accentColor}
            primaryColor={primaryColor}
          />

          {/* Step content */}
          <div>

            {/* ── STEP 1 ──────────────────────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-5">
                <p className="text-sm font-semibold text-[#0D1117]">Paso 1 de 3 — Tus datos</p>

                <div>
                  <label className={labelCls}>Nombre completo</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => { setNombre(e.target.value); setErrors((p) => ({ ...p, nombre: '' })) }}
                    placeholder="Tu nombre completo"
                    className={inputCls(!!errors.nombre)}
                  />
                  {errors.nombre && <p className={errorCls}>{errors.nombre}</p>}
                </div>

                <div>
                  <label className={labelCls}>WhatsApp</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => { setTelefono(e.target.value); setErrors((p) => ({ ...p, telefono: '' })) }}
                    placeholder="+56 9 1234 5678"
                    className={inputCls(!!errors.telefono)}
                  />
                  {errors.telefono && <p className={errorCls}>{errors.telefono}</p>}
                </div>

                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                    placeholder="nombre@empresa.com"
                    className={inputCls(!!errors.email)}
                  />
                  {errors.email && <p className={errorCls}>{errors.email}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleNext1}
                  className="w-full rounded-xl py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  Continuar →
                </button>
              </div>
            )}

            {/* ── STEP 2 ──────────────────────────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-5">
                <p className="text-sm font-semibold text-[#0D1117]">Paso 2 de 3 — Tu operación</p>

                {/* Tipo tarjeta */}
                <div>
                  <label className={labelCls}>Tipo de tarjeta</label>
                  <div className="grid grid-cols-3 gap-3">
                    {CARD_TYPES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setTipoTarjeta(c)}
                        className="rounded-full border py-2.5 text-sm font-semibold transition-all"
                        style={
                          tipoTarjeta === c
                            ? { borderColor: accentColor, backgroundColor: accentColor, color: '#fff' }
                            : { borderColor: '#E5E7EB', color: '#6B7280' }
                        }
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Banco */}
                <div>
                  <label className={labelCls}>Banco emisor</label>
                  <select
                    value={banco}
                    onChange={(e) => { setBanco(e.target.value); setErrors((p) => ({ ...p, banco: '' })) }}
                    className={`${inputCls(!!errors.banco)} bg-white`}
                  >
                    <option value="">Selecciona tu banco</option>
                    {BANCOS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  {errors.banco && <p className={errorCls}>{errors.banco}</p>}
                </div>

                {/* Monto */}
                <div>
                  <label className={labelCls}>Monto aproximado (USD)</label>
                  <input
                    type="number"
                    value={montoUSD || ''}
                    onChange={(e) => { setMontoUSD(Number(e.target.value)); setErrors((p) => ({ ...p, montoUSD: '' })) }}
                    placeholder="Ej: 5000"
                    min={1}
                    className={inputCls(!!errors.montoUSD)}
                  />
                  {errors.montoUSD && <p className={errorCls}>{errors.montoUSD}</p>}
                </div>

                {/* Primera operación */}
                <div>
                  <label className={labelCls}>¿Es tu primera operación?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {([true, false] as const).map((val) => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => setPrimeraOperacion(val)}
                        className="rounded-lg border py-3 text-sm font-semibold transition-all"
                        style={
                          primeraOperacion === val
                            ? { borderColor: accentColor, backgroundColor: accentColor, color: '#fff' }
                            : { borderColor: '#E5E7EB', color: '#6B7280' }
                        }
                      >
                        {val ? 'Sí' : 'No'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-xl border border-[#E5E7EB] py-4 text-sm font-semibold text-[#6B7280] transition-colors hover:border-[#9CA3AF]"
                  >
                    ← Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleNext2}
                    className="flex-[2] rounded-xl py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: accentColor }}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3 ──────────────────────────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="text-sm font-semibold text-[#0D1117]">Paso 3 de 3 — Confirmar</p>

                {/* Summary */}
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: `${primaryColor}0A` }}
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                    Resumen de tu operación
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Nombre</span>
                      <span className="font-semibold text-[#0D1117]">{nombre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Tarjeta</span>
                      <span className="font-semibold text-[#0D1117]">{tipoTarjeta} · {banco}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#E5E7EB] pt-2">
                      <span className="text-[#6B7280]">Monto USD</span>
                      <span className="font-mono font-semibold text-[#0D1117]">{formatUSD(montoUSD)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Recibes aprox.</span>
                      <span className="font-mono font-extrabold" style={{ color: primaryColor }}>
                        {formatCLP(montoEstimadoCLP)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={aceptoContacto}
                      onChange={(e) => { setAceptoContacto(e.target.checked); setErrors((p) => ({ ...p, aceptoContacto: '' })) }}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded"
                      style={{ accentColor }}
                    />
                    <span className="text-sm text-[#6B7280]">
                      Acepto ser contactado por el equipo de{' '}
                      <span className="font-semibold text-[#0D1117]">{brandName}</span> para
                      coordinar esta operación.
                    </span>
                  </label>
                  {errors.aceptoContacto && <p className={errorCls}>{errors.aceptoContacto}</p>}

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={aceptoReferencial}
                      onChange={(e) => { setAceptoReferencial(e.target.checked); setErrors((p) => ({ ...p, aceptoReferencial: '' })) }}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded"
                      style={{ accentColor }}
                    />
                    <span className="text-sm text-[#6B7280]">
                      Entiendo que los valores mostrados son referenciales y la tasa final se
                      confirma al momento de operar.
                    </span>
                  </label>
                  {errors.aceptoReferencial && <p className={errorCls}>{errors.aceptoReferencial}</p>}
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="mb-3 text-sm text-red-700">
                      Hubo un problema al enviar tu solicitud. Por favor escríbenos directamente
                      por WhatsApp.
                    </p>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L.057 23.082a.75.75 0 00.921.921l5.238-1.466A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.908 0-3.7-.495-5.254-1.364l-.376-.215-3.898 1.09 1.09-3.897-.215-.376A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                      Escribir por WhatsApp
                    </a>
                  </div>
                )}

                {/* Buttons */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full rounded-xl py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: accentColor }}
                >
                  {submitting ? 'Enviando...' : 'Solicitar pre-aprobación'}
                </button>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-xl border-2 py-4 text-center text-sm font-semibold transition-colors hover:bg-[#F8FAFF]"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  Prefiero escribir por WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full text-center text-sm text-[#9CA3AF] hover:text-[#6B7280]"
                >
                  ← Atrás
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
