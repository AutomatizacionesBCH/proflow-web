import type { Metadata } from 'next'
import Image from 'next/image'
import { CajaChicaHeader } from '@/components/caja-chica/Header'
import { CalculatorSection } from '@/components/shared/CalculatorSection'

export const metadata: Metadata = {
  title: 'La Caja Chica — Liquidez inmediata. Sin vueltas.',
  description:
    'Convierte tu cupo de tarjeta en pesos hoy. Operamos en minutos. Sin burocracia. 100% online.',
  keywords: ['cupo tarjeta pesos', 'liquidez inmediata chile', 'la caja chica', 'crédito rápido'],
}

const WA_HREF =
  'https://wa.me/56912345678?text=Hola%2C+quiero+simular+una+operaci%C3%B3n'

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-[#F5F6F8] pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Trust badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#043D35]/20 bg-white px-4 py-2 text-sm font-medium text-[#043D35] shadow-sm">
          <span aria-hidden>🔒</span>
          <span>+500 operaciones realizadas</span>
        </div>

        {/* Headline */}
        <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
          Convierte tu cupo de tarjeta{' '}
          <span className="text-[#043D35]">en pesos HOY</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-xl text-lg text-[#6B7280] sm:text-xl">
          Operamos en minutos. Sin burocracia. 100% online.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#calculadora"
            className="w-full rounded-xl bg-[#0A6B5A] px-8 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#043D35] sm:w-auto"
          >
            Simular ahora
          </a>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl border-2 border-[#043D35] px-8 py-4 text-base font-bold text-[#043D35] transition-colors hover:bg-[#043D35] hover:text-white sm:w-auto"
          >
            Hablar con nosotros
          </a>
        </div>

        {/* Quick trust signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#6B7280]">
          <span className="flex items-center gap-1.5">
            <span aria-hidden>⚡</span> Respuesta en 15 minutos
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden>🔒</span> 100% seguro
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden>💳</span> Visa, Mastercard y Amex
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── TRUST METRICS ────────────────────────────────────────────────────────────

function TrustMetrics() {
  const items = [
    { icon: '⚡', label: 'Operamos en 15 minutos' },
    { icon: '💰', label: 'Mejor tasa del mercado' },
    { icon: '🔒', label: '100% seguro' },
    { icon: '⭐', label: '+500 clientes satisfechos' },
  ]

  return (
    <div className="border-y border-[#043D35]/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-[#043D35]/10 md:grid-cols-4 md:divide-y-0">
          {items.map((m) => (
            <div
              key={m.label}
              className="flex items-center justify-center gap-3 px-4 py-5"
            >
              <span className="text-xl" aria-hidden>
                {m.icon}
              </span>
              <span className="text-sm font-semibold text-[#1A1A1A]">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CÓMO FUNCIONA ────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: '01',
      icon: '🧮',
      title: 'Simula tu operación',
      desc: 'Ingresa el monto en USD de tu cupo disponible. Ve cuántos pesos recibes al instante, sin compromisos.',
    },
    {
      n: '02',
      icon: '📲',
      title: 'Te contactamos en minutos',
      desc: 'Un ejecutivo te escribe por WhatsApp en menos de 15 minutos para confirmar los detalles de tu operación.',
    },
    {
      n: '03',
      icon: '💸',
      title: 'Recibes tu dinero hoy',
      desc: 'Una vez acordada la operación, la transferencia llega a tu cuenta bancaria el mismo día hábil.',
    },
  ]

  return (
    <section id="como-funciona" className="bg-[#F5F6F8] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#043D35] sm:text-4xl">
            Así de simple
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Tres pasos para tener pesos en tu cuenta hoy.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex flex-col rounded-2xl border border-[#043D35]/10 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="text-xs font-extrabold tracking-widest text-[#043D35]/40">
                  {s.n}
                </span>
                <span className="text-3xl" aria-hidden>
                  {s.icon}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#1A1A1A]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA PRINCIPAL ────────────────────────────────────────────────────────────

function CTAPrincipal() {
  return (
    <section className="bg-[#043D35] py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          ¿Listo para operar?
        </h2>
        <p className="mb-10 text-lg text-white/70">
          Escríbenos ahora y operamos hoy mismo.
        </p>
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-xl bg-white px-10 py-5 text-base font-bold text-[#043D35] shadow-sm transition-opacity hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  )
}

// ─── TESTIMONIOS ──────────────────────────────────────────────────────────────

function Testimonials() {
  const items = [
    {
      name: 'Claudia M.',
      city: 'Santiago',
      text: 'Increíble la rapidez. En menos de 20 minutos tenía los pesos en mi cuenta. Lo recomiendo sin dudarlo.',
    },
    {
      name: 'Felipe R.',
      city: 'Viña del Mar',
      text: 'Pensé que iba a ser complicado, pero fue todo por WhatsApp. Sin papeleos. El proceso fue clarísimo.',
    },
    {
      name: 'Valentina S.',
      city: 'Concepción',
      text: 'La tasa fue muy buena y me explicaron todo al detalle. Ya van tres operaciones y siempre excelente.',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#043D35] sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-[#043D35]/10 bg-[#F5F6F8] p-8"
            >
              <div className="mb-4 text-amber-400">⭐⭐⭐⭐⭐</div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#6B7280]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{t.name}</p>
                <p className="text-xs text-[#6B7280]">{t.city}</p>
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
      q: '¿Cómo funciona el proceso?',
      a: 'Simulas tu operación con nuestro calculador, nos contactas por WhatsApp y un ejecutivo te atiende en minutos. Acordamos los detalles y el dinero llega a tu cuenta el mismo día hábil.',
    },
    {
      q: '¿Es seguro?',
      a: 'Sí. Operamos dentro del marco legal chileno. Todos los acuerdos quedan por escrito y nunca solicitamos datos sensibles por canales inseguros.',
    },
    {
      q: '¿Cuánto tiempo tarda?',
      a: 'Desde que nos contactas hasta tener el dinero en tu cuenta, el proceso toma menos de 24 horas hábiles. La gran mayoría de las operaciones se resuelven el mismo día.',
    },
    {
      q: '¿Qué tarjetas aceptan?',
      a: 'Aceptamos Visa, Mastercard y American Express, tanto de crédito nacional como internacional.',
    },
    {
      q: '¿Hay algún límite de monto?',
      a: 'El mínimo es USD 100 y el máximo depende del cupo disponible en tu tarjeta. Contáctanos y evaluamos tu caso sin compromiso.',
    },
  ]

  return (
    <section id="faq" className="bg-[#F5F6F8] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#043D35] sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <details key={item.q} className="faq-item group rounded-xl border border-[#043D35]/10 bg-white">
              <summary className="flex cursor-pointer select-none list-none items-center justify-between px-6 py-5 text-sm font-semibold text-[#1A1A1A] hover:text-[#043D35] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="ml-4 shrink-0 text-xl font-light text-[#043D35] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-sm leading-relaxed text-[#6B7280]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const navLinks = ['Inicio', 'Cómo funciona', 'FAQ', 'Contacto']

  return (
    <footer className="bg-[#043D35]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-1">
              <Image
                src="/logos/caja-chica-logo.png"
                alt="La Caja Chica"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="mb-5 text-sm text-white/50">Liquidez inmediata. Sin vueltas.</p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              Navegar
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              Contacto
            </p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white/60 transition-colors hover:text-white"
            >
              +56 9 1234 5678
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} La Caja Chica. Todos los derechos reservados.
          </p>
          <p className="mt-1 text-xs text-white/20">
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
    <main>
      <CajaChicaHeader />
      <Hero />
      <TrustMetrics />
      <HowItWorks />
      <CalculatorSection
          brand="caja-chica"
          primaryColor="#043D35"
          accentColor="#0A6B5A"
          minAmount={100}
          maxAmount={5000}
          whatsappNumber="56912345678"
        />
      <CTAPrincipal />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
