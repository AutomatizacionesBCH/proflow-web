import type { Metadata } from 'next'
import Image from 'next/image'
import { CajaChicaHeader } from '@/components/caja-chica/Header'
import { HeroWithCalculator } from '@/components/caja-chica/HeroWithCalculator'
import { StepCard } from '@/components/ui/StepCard'
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA'
import { ChatWidget } from '@/components/shared/ChatWidget'

export const metadata: Metadata = {
  title: 'La Caja Chica — Liquidez inmediata. Sin vueltas.',
  description:
    'Convierte tu cupo de tarjeta en pesos hoy. Operamos en minutos. Sin burocracia. 100% online.',
  keywords: ['cupo tarjeta pesos', 'liquidez inmediata chile', 'la caja chica', 'crédito rápido'],
}

const WA_HREF =
  'https://wa.me/56912345678?text=Hola%2C+quiero+simular+una+operaci%C3%B3n'

// ─── TRUST METRICS ────────────────────────────────────────────────────────────

function TrustMetrics() {
  const items = [
    { icon: '⚡', value: '15 min', label: 'Tiempo promedio' },
    { icon: '💰', value: '+500',   label: 'Operaciones realizadas' },
    { icon: '⭐', value: '98%',    label: 'Clientes satisfechos' },
    { icon: '🔒', value: '100%',   label: 'Operaciones seguras' },
  ]

  return (
    <div
      className="border-y border-[#E5E7EB] bg-white"
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 divide-x divide-y divide-[#E5E7EB] md:grid-cols-4 md:divide-y-0">
          {items.map((m) => (
            <div key={m.label} className="flex flex-col items-center justify-center gap-1 px-6 py-7 text-center">
              <span className="mb-1 text-2xl" aria-hidden>{m.icon}</span>
              <span className="font-mono text-2xl font-extrabold text-[#043D35]">{m.value}</span>
              <span className="text-xs text-[#6B7280]">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PRIORITY OPERATION ───────────────────────────────────────────────────────

function PriorityOperation() {
  return (
    <section className="bg-[#F5F6F8] py-8 sm:py-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          className="flex flex-col items-start gap-5 rounded-[18px] border border-[#DC2626]/20 bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          style={{ boxShadow: '0 10px 30px rgba(220,38,38,0.06)' }}
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-semibold text-[#991B1B]">
              🔴 Operación urgente
            </div>
            <h3 className="text-[18px] font-bold leading-[26px] text-[#111827]">
              ¿Necesitas el dinero ahora mismo?
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Atención prioritaria para operaciones urgentes.{' '}
              <span className="font-medium text-[#374151]">Nuestro equipo te contacta en menos de 5 minutos.</span>
            </p>
          </div>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#DC2626',
              borderRadius: '14px',
              boxShadow: '0 4px 12px rgba(220,38,38,0.25)',
            }}
            className="inline-flex shrink-0 items-center gap-2 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Solicitar operación prioritaria →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── CÓMO FUNCIONA ────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Simulas',
      description:
        'Ingresa el monto de tu tarjeta y ve cuánto recibes al instante. Sin compromisos ni datos personales.',
    },
    {
      number: '02',
      title: 'Coordinamos',
      description:
        'Nuestro equipo te contacta por WhatsApp, valida la operación y confirma la tasa en minutos.',
    },
    {
      number: '03',
      title: 'Recibes',
      description:
        'El dinero llega a tu cuenta el mismo día. Sin complicaciones ni burocracia.',
    },
  ]

  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#043D35]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#043D35]">
            Proceso simple
          </span>
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#111827] sm:text-[34px] sm:leading-[42px]">
            Cómo funciona
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Un proceso diseñado para ser claro, rápido y sin fricciones.
          </p>
        </div>
        <StepCard steps={steps} accentColor="#0A6B5A" />
      </div>
    </section>
  )
}

// ─── OPERATION TRACKING ───────────────────────────────────────────────────────

function OperationTracking() {
  const states = [
    { icon: '✅', label: 'Validando información',  desc: 'Revisamos los datos de tu tarjeta' },
    { icon: '⚙️', label: 'Procesando operación',   desc: 'Coordinamos con nuestro equipo' },
    { icon: '💸', label: 'Enviando pago',           desc: 'Transferencia en proceso' },
    { icon: '🎉', label: 'Pago realizado',          desc: 'El dinero está en tu cuenta' },
  ]

  return (
    <section className="bg-[#F5F6F8] py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#043D35]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#043D35]">
            Transparencia total
          </span>
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#111827] sm:text-[34px] sm:leading-[42px]">
            Sigue tu operación en tiempo real
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Sabes exactamente en qué paso está tu dinero.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="relative hidden md:grid md:grid-cols-4">
          <div
            className="absolute h-0.5 bg-[#E5E7EB]"
            style={{ top: '24px', left: '12.5%', right: '12.5%' }}
          />
          {states.map((s, i) => (
            <div key={i} className="flex flex-col items-center px-4 text-center">
              <div
                className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #E5E7EB' }}
              >
                {s.icon}
              </div>
              <p className="text-sm font-bold text-[#111827]">{s.label}</p>
              <p className="mt-1 text-xs text-[#9CA3AF]">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="relative flex flex-col gap-0 md:hidden">
          <div className="absolute bottom-6 left-6 top-6 w-0.5 bg-[#E5E7EB]" />
          {states.map((s, i) => (
            <div key={i} className="relative flex items-start gap-5 pb-8 last:pb-0">
              <div
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #E5E7EB' }}
              >
                {s.icon}
              </div>
              <div className="pt-2">
                <p className="text-sm font-bold text-[#111827]">{s.label}</p>
                <p className="mt-0.5 text-xs text-[#9CA3AF]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIOS ──────────────────────────────────────────────────────────────

function Testimonials() {
  const items = [
    {
      name: 'María G.',
      city: 'Santiago',
      amount: 'Operó USD 600',
      text: 'Rápido y confiable. En 20 minutos tenía el dinero en mi cuenta. El equipo me explicó todo perfectamente.',
    },
    {
      name: 'Rodrigo M.',
      city: 'Valparaíso',
      amount: 'Operó USD 1.200',
      text: 'Lo usé por primera vez y quedé sorprendido con lo fácil que fue. Volví a operar dos semanas después.',
    },
    {
      name: 'Camila F.',
      city: 'Concepción',
      amount: 'Operó USD 800',
      text: 'El equipo me explicó todo, muy profesional. La tasa fue exacta a lo que calculé. Recomendado.',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#111827] sm:text-[34px] sm:leading-[42px]">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-3 text-[#6B7280]">Personas reales, experiencias reales.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-[18px] border border-[#E5E7EB] bg-white p-8"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
            >
              <div className="mb-5 text-amber-400">⭐⭐⭐⭐⭐</div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#6B7280]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-[#F3F4F6] pt-5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: '#043D35' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{t.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{t.city} · {t.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const items = [
    {
      q: '¿Qué necesito para operar?',
      a: 'Solo necesitas una tarjeta de crédito Visa, Mastercard o Amex con cupo disponible, una cuenta bancaria chilena a tu nombre y tu número de WhatsApp. Sin documentos adicionales.',
    },
    {
      q: '¿Cuánto demora el proceso?',
      a: 'Desde que nos contactas hasta recibir el dinero, el proceso toma entre 15 y 30 minutos en la mayoría de los casos. El mismo día hábil.',
    },
    {
      q: '¿Qué pasa si mi tarjeta está vencida?',
      a: 'Si tu tarjeta está vencida hace pocos días, en muchos casos la operación igual puede realizarse. Escríbenos y lo revisamos contigo sin compromiso.',
    },
    {
      q: '¿Qué pasa si no tengo cupo en pesos?',
      a: 'Si tu tarjeta tiene cupo en dólares o en otra divisa, también podemos operar. Contáctanos y evaluamos tu caso.',
    },
    {
      q: '¿Es seguro operar?',
      a: 'Sí. Operamos dentro del marco legal chileno. Todos los acuerdos quedan por escrito y nunca solicitamos datos sensibles por canales inseguros.',
    },
    {
      q: '¿Cuánto me pagan por mi cupo?',
      a: 'La tasa de referencia es de $930 por dólar con una comisión del 3,5%. Puedes simularlo exactamente en nuestra calculadora antes de comprometerte.',
    },
    {
      q: '¿Puedo operar más de una vez?',
      a: 'Sí, muchos de nuestros clientes operan regularmente. Una vez que realizas la primera operación, el proceso se vuelve aún más ágil.',
    },
  ]

  return (
    <section id="faq" className="bg-[#F5F6F8] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#111827] sm:text-[34px] sm:leading-[42px]">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-[18px] border border-[#E5E7EB] bg-white"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between px-6 py-5 text-sm font-semibold text-[#111827] hover:text-[#043D35] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="ml-4 shrink-0 text-xl font-light text-[#043D35] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm leading-relaxed text-[#6B7280]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA FINAL ────────────────────────────────────────────────────────────────

function CTAFinal() {
  return (
    <section id="contacto" style={{ background: '#043D35' }} className="py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="mb-5 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
            Sin compromiso
          </span>
          <h2 className="mb-4 text-[26px] font-bold leading-[32px] tracking-tight text-white sm:text-[34px] sm:leading-[42px]">
            Simula ahora y recibe respuesta inmediata
          </h2>
          <p className="mb-10 max-w-lg text-[16px] leading-[24px] text-white/60">
            Miles de personas ya convirtieron su cupo. Tú también puedes.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#calculadora"
              className="inline-flex items-center justify-center rounded-[14px] bg-white px-8 py-4 text-base font-bold text-[#043D35] transition-all duration-200 hover:bg-[#F5F6F8] active:scale-[0.98]"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.20)' }}
            >
              Simular ahora
            </a>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#25D366',
                borderRadius: '14px',
                boxShadow: '0 4px 12px rgba(37,211,102,0.30)',
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>

          <p className="mt-8 text-sm text-white/40">
            🔒 100% seguro · Sin compromiso · Respuesta inmediata
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: 'Inicio',        href: '#' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Simulador',     href: '#calculadora' },
    { label: 'Preguntas',     href: '#faq' },
    { label: 'Contacto',      href: '#contacto' },
  ]

  return (
    <footer style={{ background: '#043D35' }}>
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="shrink-0">
            <div className="mb-3">
              <Image
                src="/logos/caja-chica-logo.png"
                alt="La Caja Chica"
                width={160}
                height={36}
                className="h-9 w-auto brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="mb-5 text-sm text-white/50">Liquidez inmediata. Sin vueltas.</p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              <svg className="h-4 w-4 shrink-0" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-1 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} La Caja Chica. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/20">
            La Caja Chica opera en el marco de la ley chilena.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CajaChicaPage() {
  return (
    <main className="bg-[#F5F6F8]">
      <CajaChicaHeader />
      <HeroWithCalculator />
      <TrustMetrics />
      <PriorityOperation />
      <HowItWorks />
      <OperationTracking />
      <Testimonials />
      <FAQ />
      <CTAFinal />
      <Footer />
      <MobileStickyCTA
        label="Simular ahora"
        href="#calculadora"
        variant="simulate"
        color="#0A6B5A"
      />
      <ChatWidget
        brand="caja-chica"
        primaryColor="#043D35"
        accentColor="#0A6B5A"
        whatsappNumber="56912345678"
        agentName="Equipo La Caja Chica"
      />
    </main>
  )
}
