'use client'

import { useState, useEffect } from 'react'
import { SimulationData } from './Calculator'
import { formatCLP, formatUSD } from '@/lib/formatters'
import { saveLead } from '@/lib/leads/saveLead'

const CARD_TYPES = ['Visa', 'Mastercard', 'Amex'] as const
const FALLBACK_DOLAR = 930

const getFactor = (amount: number): number => {
  if (amount < 200) return 0
  if (amount < 1000) return 0.78
  if (amount < 2500) return 0.79
  if (amount < 5000) return 0.80
  return 0.81
}
const BANCOS = [
  'Banco de Chile',
  'Banco Estado',
  'Banco BCI',
  'Banco Santander Chile',
  'Banco Itaú Chile',
  'Scotiabank Chile',
  'Banco Falabella',
  'Banco Ripley',
  'Banco Security',
  'Banco Consorcio',
  'Banco Internacional',
  'Banco BICE',
  'Banco BTG Pactual Chile',
  'Banco Coopeuch (cooperativa)',
  'TAPP Caja Los Andes (cooperativa)',
  'Otro',
]
const BRAND_NAMES: Record<string, string> = {
  'caja-chica': 'La Caja Chica',
  'proflow-latam': 'ProFlow LATAM',
}

export interface LeadData {
  nombre: string
  telefono: string
  email: string
  tipoTarjeta: string
  banco: string
  montoUSD: number
  montoEstimadoCLP: number
  primeraOperacion: boolean
  tiene_saldo_nacional: boolean
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

function validateStep2(banco: string, montoUSD: number, tieneSaldoNacional: boolean | null) {
  const errors: Record<string, string> = {}
  if (!banco) errors.banco = 'Selecciona tu banco emisor'
  if (!montoUSD || montoUSD <= 0) errors.montoUSD = 'Ingresa un monto mayor a 0'
  else if (montoUSD < 200) errors.montoUSD = 'El monto mínimo de operación es USD 200'
  if (tieneSaldoNacional === null) errors.tieneSaldoNacional = 'Este campo es requerido para continuar'
  return errors
}

function validateStep3(aceptoContacto: boolean, aceptoReferencial: boolean) {
  const errors: Record<string, string> = {}
  if (!aceptoContacto) errors.aceptoContacto = 'Debes aceptar para continuar'
  if (!aceptoReferencial) errors.aceptoReferencial = 'Debes aceptar para continuar'
  return errors
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconPerson() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function WaIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L.057 23.082a.75.75 0 00.921.921l5.238-1.466A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.908 0-3.7-.495-5.254-1.364l-.376-.215-3.898 1.09 1.09-3.897-.215-.376A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
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
      <div className="relative flex items-start justify-between">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-[#E5E7EB]" />
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

// ─── Custom Checkbox ──────────────────────────────────────────────────────────

function CustomCheckbox({
  checked,
  onChange,
  label,
  accentColor,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: React.ReactNode
  accentColor: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <div
        className="relative mt-0.5 h-5 w-5 shrink-0 rounded-md transition-all duration-150"
        style={{
          border: `2px solid ${checked ? accentColor : '#D1D5DB'}`,
          backgroundColor: checked ? accentColor : 'white',
        }}
      >
        {checked && (
          <svg
            className="absolute inset-0 h-full w-full p-[3px] text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        <input
          type="checkbox"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      </div>
      <span className="text-sm leading-relaxed text-[#6B7280]">{label}</span>
    </label>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const PA_STYLES = `
  @keyframes pa-check-pop {
    0% { transform: scale(0) rotate(-15deg); opacity: 0; }
    65% { transform: scale(1.2) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); }
  }
  .pa-success-icon { animation: pa-check-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  @keyframes pa-step-in {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .pa-step { animation: pa-step-in 0.22s ease-out forwards; }
`

export function PreApproval({
  brand,
  simulationData,
  primaryColor,
  accentColor,
  whatsappNumber,
  onComplete,
}: PreApprovalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1)

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')

  const [tipoTarjeta, setTipoTarjeta] = useState<string>(simulationData?.tipoTarjeta ?? 'Visa')
  const [banco, setBanco] = useState('')
  const [bancoOtro, setBancoOtro] = useState('')
  const [montoUSD, setMontoUSD] = useState<number>(simulationData?.montoUSD ?? 0)
  const [primeraOperacion, setPrimeraOperacion] = useState<boolean | null>(null)
  const [tieneSaldoNacional, setTieneSaldoNacional] = useState<boolean | null>(null)
  const [prevSimData, setPrevSimData] = useState(simulationData)
  const [valorDolar, setValorDolar] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://mindicador.cl/api/dolar')
      .then((res) => res.json())
      .then((data) => {
        const valor =
          (Array.isArray(data) ? data[0]?.valor : null) ??
          data?.serie?.[0]?.valor
        if (typeof valor === 'number') setValorDolar(valor)
        else throw new Error('Formato inesperado')
      })
      .catch(() => setValorDolar(FALLBACK_DOLAR))
  }, [])

  if (simulationData !== prevSimData) {
    setPrevSimData(simulationData)
    if (simulationData) {
      setTipoTarjeta(simulationData.tipoTarjeta)
      setMontoUSD(simulationData.montoUSD)
    }
  }

  const [aceptoContacto, setAceptoContacto] = useState(false)
  const [aceptoReferencial, setAceptoReferencial] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [leadId, setLeadId] = useState<string | undefined>(undefined)

  const brandName = BRAND_NAMES[brand]
  const dolarActual = valorDolar ?? FALLBACK_DOLAR
  const montoEstimadoCLP = montoUSD > 0 ? Math.round(montoUSD * getFactor(montoUSD) * dolarActual) : 0

  const handleNext1 = () => {
    const errs = validateStep1(nombre, telefono, email)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep(2)
  }

  const handleNext2 = () => {
    const errs = validateStep2(banco, montoUSD, tieneSaldoNacional)
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
      banco: banco === 'Otro' ? (bancoOtro.trim() || 'Otro') : banco,
      montoUSD,
      montoEstimadoCLP,
      primeraOperacion: primeraOperacion ?? false,
      tiene_saldo_nacional: tieneSaldoNacional ?? false,
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

  const inputCls = (hasError: boolean) =>
    `w-full rounded-[12px] border px-4 py-3.5 text-sm text-[#0D1117] outline-none transition-colors focus:border-[#9CA3AF] ${
      hasError ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
    }`

  const inputWithIconCls = (hasError: boolean) =>
    `w-full rounded-[12px] border pl-11 pr-4 py-3.5 text-sm text-[#0D1117] outline-none transition-colors focus:border-[#9CA3AF] ${
      hasError ? 'border-red-400 bg-red-50' : 'border-[#E5E7EB] bg-white'
    }`

  const labelCls = 'mb-2 block text-sm font-semibold text-[#374151]'
  const errorCls = 'mt-1.5 flex items-center gap-1 text-xs text-red-500'

  // ── Success screen ───────────────────────────────────────────────────────────

  if (step === 'success') {
    return (
      <section id="pre-aprobacion" className="bg-white py-20">
        <style>{PA_STYLES}</style>
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div
            className="rounded-[18px] bg-white p-8 text-center"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.07)' }}
          >
            <div
              className="pa-success-icon mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: `${accentColor}18` }}
            >
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                style={{ color: accentColor }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="mb-2 text-2xl font-extrabold" style={{ color: primaryColor }}>
              ¡Tu operación está pre-aprobada!
            </h2>
            <p className="mb-1 text-[#6B7280]">
              Te contactamos en menos de 15 minutos por WhatsApp.
            </p>
            {leadId && (
              <p className="mb-8 font-mono text-xs text-[#9CA3AF]">Ref: {leadId}</p>
            )}
            {!leadId && <div className="mb-8" />}

            <div
              className="mb-6 rounded-[14px] p-5 text-left"
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
                  <span className="font-mono font-extrabold" style={{ color: accentColor }}>
                    {formatCLP(montoEstimadoCLP)}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-[14px] py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366', boxShadow: '0 4px 14px rgba(37,211,102,0.35)' }}
            >
              <WaIcon />
              Escribir por WhatsApp ahora
            </a>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#9CA3AF]">
              <span>🔒</span>
              Tus datos están protegidos
            </p>
          </div>
        </div>
      </section>
    )
  }

  // ── Form wrapper ─────────────────────────────────────────────────────────────

  return (
    <section id="pre-aprobacion" className="bg-white py-20">
      <style>{PA_STYLES}</style>
      <div className="mx-auto max-w-lg px-4 sm:px-6">

        <div className="mb-10 text-center">
          <h2
            className="text-2xl font-extrabold sm:text-3xl"
            style={{ color: primaryColor }}
          >
            Solicita tu pre-aprobación
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Completa los datos para reservar tu operación. Gratis, sin compromiso.
          </p>
        </div>

        <div
          className="rounded-[18px] bg-white p-6 sm:p-8"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.07)' }}
        >
          <ProgressBar
            currentStep={typeof step === 'number' ? step : 3}
            accentColor={accentColor}
            primaryColor={primaryColor}
          />

          {/* ── STEP 1 ──────────────────────────────────────────────────── */}
          {step === 1 && (
            <div className="pa-step space-y-5">
              <p className="text-sm font-bold" style={{ color: primaryColor }}>
                Cuéntanos sobre ti
              </p>

              <div>
                <label className={labelCls}>Nombre completo</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#9CA3AF]">
                    <IconPerson />
                  </span>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => { setNombre(e.target.value); setErrors((p) => ({ ...p, nombre: '' })) }}
                    placeholder="Tu nombre completo"
                    className={inputWithIconCls(!!errors.nombre)}
                  />
                </div>
                {errors.nombre && <p className={errorCls}>{errors.nombre}</p>}
              </div>

              <div>
                <label className={labelCls}>Teléfono WhatsApp</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#9CA3AF]">
                    <IconPhone />
                  </span>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => { setTelefono(e.target.value); setErrors((p) => ({ ...p, telefono: '' })) }}
                    placeholder="+56 9 XXXX XXXX"
                    className={inputWithIconCls(!!errors.telefono)}
                  />
                </div>
                {errors.telefono && <p className={errorCls}>{errors.telefono}</p>}
              </div>

              <div>
                <label className={labelCls}>Email</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#9CA3AF]">
                    <IconMail />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                    placeholder="nombre@empresa.com"
                    className={inputWithIconCls(!!errors.email)}
                  />
                </div>
                {errors.email && <p className={errorCls}>{errors.email}</p>}
              </div>

              <button
                type="button"
                onClick={handleNext1}
                className="w-full rounded-[14px] py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: accentColor, boxShadow: `0 4px 12px ${accentColor}40` }}
              >
                Continuar →
              </button>
            </div>
          )}

          {/* ── STEP 2 ──────────────────────────────────────────────────── */}
          {step === 2 && (
            <div className="pa-step space-y-5">
              <p className="text-sm font-bold" style={{ color: primaryColor }}>
                Tu operación
              </p>

              <div>
                <label className={labelCls}>Tipo de tarjeta</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {CARD_TYPES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setTipoTarjeta(c)}
                      className="rounded-xl border py-3 text-sm font-semibold transition-all"
                      style={
                        tipoTarjeta === c
                          ? { borderColor: accentColor, backgroundColor: accentColor, color: '#fff' }
                          : { borderColor: '#E5E7EB', color: '#6B7280', backgroundColor: 'white' }
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>Banco emisor</label>
                <select
                  value={banco}
                  onChange={(e) => { setBanco(e.target.value); setBancoOtro(''); setErrors((p) => ({ ...p, banco: '' })) }}
                  className={`${inputCls(!!errors.banco)} appearance-none`}
                >
                  <option value="">Selecciona tu banco</option>
                  {BANCOS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {banco === 'Otro' && (
                  <input
                    type="text"
                    value={bancoOtro}
                    onChange={(e) => setBancoOtro(e.target.value)}
                    placeholder="Escribe el nombre de tu banco"
                    className={`${inputCls(false)} mt-2`}
                    autoFocus
                  />
                )}
                {errors.banco && <p className={errorCls}>{errors.banco}</p>}
              </div>

              <div>
                <label className={labelCls}>Monto (USD)</label>
                {simulationData ? (
                  <div
                    className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3.5"
                  >
                    <span className="flex-1 font-semibold text-[#0D1117]">{formatUSD(montoUSD)}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      Desde simulación
                    </span>
                  </div>
                ) : (
                  <>
                    <input
                      type="number"
                      value={montoUSD || ''}
                      onChange={(e) => { setMontoUSD(Number(e.target.value)); setErrors((p) => ({ ...p, montoUSD: '' })) }}
                      placeholder="Ej: 5000"
                      min={200}
                      className={inputCls(!!errors.montoUSD)}
                    />
                    {errors.montoUSD && <p className={errorCls}>{errors.montoUSD}</p>}
                  </>
                )}
                {montoUSD >= 200 && (
                  <p className="mt-1.5 text-xs font-medium text-green-600">
                    Recibirías {formatCLP(montoEstimadoCLP)} CLP
                  </p>
                )}
              </div>

              <div>
                <label className={labelCls}>¿Es tu primera operación?</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {([true, false] as const).map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => setPrimeraOperacion(val)}
                      className="rounded-xl border py-3 text-sm font-semibold transition-all"
                      style={
                        primeraOperacion === val
                          ? { borderColor: accentColor, backgroundColor: accentColor, color: '#fff' }
                          : { borderColor: '#E5E7EB', color: '#6B7280', backgroundColor: 'white' }
                      }
                    >
                      {val ? 'Sí, primera vez' : 'Ya he operado antes'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>¿Cuentas con saldo nacional en tu tarjeta?</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {([true, false] as const).map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => { setTieneSaldoNacional(val); setErrors((p) => ({ ...p, tieneSaldoNacional: '' })) }}
                      className="rounded-xl border py-3 text-sm font-semibold transition-all"
                      style={
                        tieneSaldoNacional === val
                          ? { borderColor: accentColor, backgroundColor: accentColor, color: '#fff' }
                          : { borderColor: '#E5E7EB', color: '#6B7280', backgroundColor: 'white' }
                      }
                    >
                      {val ? 'Sí, tengo saldo' : 'No tengo saldo'}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-[#9CA3AF]">
                  El no tener saldo positivo implica que probablemente la tarjeta esté bloqueada y no se pueda operar.
                </p>
                {errors.tieneSaldoNacional && <p className={errorCls}>{errors.tieneSaldoNacional}</p>}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-[14px] border border-[#E5E7EB] py-4 text-sm font-semibold text-[#6B7280] transition-colors hover:border-[#9CA3AF]"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNext2}
                  className="flex-[2] rounded-[14px] py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: accentColor, boxShadow: `0 4px 12px ${accentColor}40` }}
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ──────────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="pa-step space-y-5">
              <p className="text-sm font-bold" style={{ color: primaryColor }}>
                Confirma tu solicitud
              </p>

              <div
                className="rounded-[14px] p-5"
                style={{ backgroundColor: `${primaryColor}08` }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  Resumen de tu operación
                </p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Nombre</span>
                    <span className="font-semibold text-[#0D1117]">{nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Teléfono</span>
                    <span className="font-semibold text-[#0D1117]">{telefono}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E5E7EB] pt-2.5">
                    <span className="text-[#6B7280]">Tarjeta · Banco</span>
                    <span className="font-semibold text-[#0D1117]">{tipoTarjeta} · {banco || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Monto USD</span>
                    <span className="font-mono font-semibold text-[#0D1117]">{formatUSD(montoUSD)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E5E7EB] pt-2.5">
                    <span className="text-[#6B7280]">Recibes aprox.</span>
                    <span className="font-mono font-extrabold" style={{ color: accentColor }}>
                      {formatCLP(montoEstimadoCLP)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <CustomCheckbox
                  checked={aceptoContacto}
                  onChange={(v) => { setAceptoContacto(v); setErrors((p) => ({ ...p, aceptoContacto: '' })) }}
                  accentColor={accentColor}
                  label={
                    <>
                      Acepto ser contactado por el equipo de{' '}
                      <span className="font-semibold text-[#0D1117]">{brandName}</span> para
                      coordinar esta operación.
                    </>
                  }
                />
                {errors.aceptoContacto && (
                  <p className={errorCls}>{errors.aceptoContacto}</p>
                )}

                <CustomCheckbox
                  checked={aceptoReferencial}
                  onChange={(v) => { setAceptoReferencial(v); setErrors((p) => ({ ...p, aceptoReferencial: '' })) }}
                  accentColor={accentColor}
                  label="Entiendo que los valores mostrados son referenciales y la tasa final se confirma al momento de operar."
                />
                {errors.aceptoReferencial && (
                  <p className={errorCls}>{errors.aceptoReferencial}</p>
                )}
              </div>

              {submitError && (
                <div className="rounded-[14px] border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-3 flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
                      <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800">
                        Hubo un problema al enviar tu solicitud.
                      </p>
                      <p className="mt-0.5 text-xs text-orange-600">
                        Por favor escríbenos directamente por WhatsApp.
                      </p>
                    </div>
                  </div>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    <WaIcon />
                    Escribir por WhatsApp
                  </a>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full rounded-[14px] py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 active:scale-[0.98]"
                style={{ backgroundColor: accentColor, boxShadow: `0 4px 14px ${accentColor}40` }}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Solicitar pre-aprobación'
                )}
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-[14px] border-2 py-4 text-sm font-semibold transition-colors hover:bg-[#F0FFF4]"
                style={{ borderColor: '#25D366', color: '#25D366' }}
              >
                <WaIcon />
                Prefiero escribir por WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full text-center text-sm text-[#9CA3AF] transition-colors hover:text-[#6B7280]"
              >
                ← Atrás
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
