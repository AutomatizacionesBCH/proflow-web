import type { Metadata } from 'next'
import Image from 'next/image'
import { ProflowLatamHeader } from '@/components/proflow-latam/Header'
import { CalculatorSection } from '@/components/shared/CalculatorSection'
import { ContactForm } from '@/components/proflow-latam/ContactForm'

export const metadata: Metadata = {
  title: 'ProFlow LATAM — Liquidez empresarial. Ágil y segura.',
  description:
    'Gestión de liquidez en divisas para empresas modernas. Operaciones rápidas, seguras y completamente online.',
  keywords: ['liquidez empresarial', 'divisas chile', 'cambio USD pesos', 'proflow latam', 'fintech'],
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#EEF4FF] to-white pb-24 pt-16 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: content */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1A56DB]/20 bg-white px-4 py-2 text-sm font-medium text-[#0F2D6B] shadow-sm">
              <span aria-hidden>🏦</span>
              <span>Empresa regulada · Operaciones desde USD 1.000</span>
            </div>

            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0D1117] sm:text-5xl">
              Gestión de liquidez en divisas para{' '}
              <span className="text-[#1A56DB]">empresas modernas</span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-[#6B7280]">
              Accede a tu capital en pesos chilenos hoy. Operaciones rápidas,
              seguras y completamente online.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#contacto"
                className="rounded-xl bg-[#1A56DB] px-8 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#0F2D6B]"
              >
                Solicitar operación
              </a>
              <a
                href="#como-funciona"
                className="rounded-xl border-2 border-[#0F2D6B] px-8 py-4 text-base font-bold text-[#0F2D6B] transition-colors hover:bg-[#0F2D6B] hover:text-white"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Right: decorative operation card */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Última operación
                </span>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                  ✓ Completada
                </span>
              </div>
              <div className="mb-5 space-y-3">
                {[
                  { label: 'Monto', value: 'USD 28.500' },
                  { label: 'Recibido', value: 'CLP 26.505.000' },
                  { label: 'Tiempo', value: '18 minutos' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 last:border-0 last:pb-0">
                    <span className="text-sm text-[#6B7280]">{row.label}</span>
                    <span className="font-mono text-sm font-semibold text-[#0D1117]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#F8FAFF] px-4 py-3 text-xs text-[#6B7280]">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                Transferencia confirmada · hace 4 minutos
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFF] p-4">
                <p className="mb-1 text-xs text-[#6B7280]">Hoy</p>
                <p className="font-mono text-2xl font-extrabold text-[#0F2D6B]">12</p>
                <p className="text-xs text-[#6B7280]">operaciones</p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFF] p-4">
                <p className="mb-1 text-xs text-[#6B7280]">Promedio</p>
                <p className="font-mono text-2xl font-extrabold text-[#0F2D6B]">23 min</p>
                <p className="text-xs text-[#6B7280]">por operación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TRUST METRICS ────────────────────────────────────────────────────────────

function TrustMetrics() {
  const items = [
    { value: '$50M+', label: 'en operaciones procesadas' },
    { value: '98%', label: 'satisfacción de clientes' },
    { value: '<30 min', label: 'tiempo de respuesta' },
    { value: '3', label: 'países atendidos' },
  ]

  return (
    <div className="border-y border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-[#E5E7EB] md:grid-cols-4 md:divide-y-0">
          {items.map((m) => (
            <div key={m.label} className="flex flex-col items-center justify-center px-6 py-8 text-center">
              <span className="font-mono text-2xl font-extrabold text-[#0F2D6B] sm:text-3xl">
                {m.value}
              </span>
              <span className="mt-1 text-xs text-[#6B7280]">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PROPUESTA DE VALOR ───────────────────────────────────────────────────────

function ValueProps() {
  const props = [
    {
      icon: (
        <svg className="h-6 w-6 text-[#1A56DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Velocidad',
      headline: 'Operamos el mismo día',
      desc: 'Desde que solicitas hasta que el dinero está en tu cuenta, todo ocurre en horas, no días.',
    },
    {
      icon: (
        <svg className="h-6 w-6 text-[#1A56DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'Seguridad',
      headline: 'Transacciones verificadas',
      desc: 'Cada operación pasa por controles de validación. Tus fondos y datos están protegidos en todo momento.',
    },
    {
      icon: (
        <svg className="h-6 w-6 text-[#1A56DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      title: 'Transparencia',
      headline: 'Sin costos ocultos',
      desc: 'La tasa de cambio y las condiciones se informan antes de confirmar. Cero sorpresas en el proceso.',
    },
  ]

  return (
    <section className="bg-[#F8FAFF] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F2D6B] sm:text-4xl">
            Por qué elegir ProFlow LATAM
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Diseñado para empresas que valoran la rapidez y la certeza.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {props.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF]">
                {p.icon}
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#1A56DB]">
                {p.title}
              </p>
              <h3 className="mb-2 text-lg font-bold text-[#0D1117]">{p.headline}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CÓMO FUNCIONA ────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Solicita tu operación online',
      desc: 'Completa el formulario de contacto con el monto y tus datos. Sin documentación inicial ni formularios extensos.',
    },
    {
      n: '02',
      title: 'Tu equipo la valida en minutos',
      desc: 'Un especialista de ProFlow LATAM revisa tu solicitud, confirma la tasa y te envía los detalles al instante.',
    },
    {
      n: '03',
      title: 'Recibes los fondos en tu cuenta',
      desc: 'Una vez aceptadas las condiciones, los pesos chilenos se acreditan en tu cuenta el mismo día hábil.',
    },
  ]

  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F2D6B] sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Un proceso diseñado para ser claro, rápido y sin fricciones.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="absolute hidden h-px bg-[#E5E7EB] md:block"
            style={{ top: '1.25rem', left: 'calc(100%/6)', right: 'calc(100%/6)' }}
          />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col">
                <div className="relative z-10 mb-6 flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1A56DB] bg-white font-mono text-sm font-extrabold text-[#1A56DB] md:mb-6">
                    {s.n}
                  </div>
                  <div className="md:hidden">
                    <h3 className="font-bold text-[#0D1117]">{s.title}</h3>
                    <p className="mt-1 text-sm text-[#6B7280]">{s.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <h3 className="mb-2 text-base font-bold text-[#0D1117]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B7280]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PARA EMPRESAS ────────────────────────────────────────────────────────────

function ForBusinesses() {
  const cases = [
    {
      icon: '📦',
      title: 'Importadores que necesitan pesos',
      desc: 'Tienes cupo en USD y necesitas cubrir pagos locales. Convierte al instante sin perder días en bancos.',
    },
    {
      icon: '💼',
      title: 'Empresas con ingresos en divisa',
      desc: 'Facturas en USD, EUR o GBP pero operas en Chile. Accede a tus fondos en pesos el mismo día.',
    },
    {
      icon: '🌐',
      title: 'Profesionales con clientes extranjeros',
      desc: 'Cobras al exterior y necesitas liquidez local. Operamos con independientes y PyMEs sin complicaciones.',
    },
  ]

  return (
    <section id="empresas" className="bg-[#F8FAFF] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F2D6B] sm:text-4xl">
            Soluciones para empresas que mueven capital
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Independiente de cómo fluye tu dinero, tenemos una solución.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border-l-4 border-[#1A56DB] bg-white p-8 shadow-sm"
            >
              <span className="mb-4 block text-3xl" aria-hidden>
                {c.icon}
              </span>
              <h3 className="mb-2 text-base font-bold text-[#0D1117]">{c.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{c.desc}</p>
              <a
                href="#contacto"
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#1A56DB] hover:text-[#0F2D6B]"
              >
                Hablar con un especialista
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA + FORM ───────────────────────────────────────────────────────────────

function CTAWithForm() {
  return (
    <section id="contacto" className="bg-[#0F2D6B] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div className="pt-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1A56DB]">
              Empieza hoy
            </p>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              ¿Tu empresa necesita liquidez en pesos?
            </h2>
            <p className="mb-8 text-lg text-white/60">
              Nuestro equipo te contacta en menos de 30 minutos para presentarte
              las condiciones de tu operación.
            </p>

            <ul className="space-y-3">
              {[
                'Sin formularios extensos ni documentación inicial',
                'Tasa confirmada antes de comprometerte',
                'Transferencia el mismo día hábil',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#1A56DB]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIOS ──────────────────────────────────────────────────────────────

function Testimonials() {
  const items = [
    {
      name: 'Rodrigo Fernández',
      role: 'CFO',
      company: 'Importadora Del Sur SpA',
      text: 'Llevamos 6 meses operando con ProFlow LATAM. El proceso es claro, la tasa competitiva y el equipo siempre disponible. Exactamente lo que necesitábamos.',
    },
    {
      name: 'Catalina Vidal',
      role: 'Gerente Financiero',
      company: 'Tech Services Chile',
      text: 'Buscábamos un partner para convertir nuestros ingresos en USD. ProFlow LATAM respondió en minutos y acreditó el día mismo. Muy profesional.',
    },
    {
      name: 'Matías Soto',
      role: 'Director',
      company: 'Consultora Internacional MV',
      text: 'Como consultor con clientes en el extranjero, necesitaba una solución ágil. Ahora opero con ProFlow regularmente. Rápido, confiable y sin burocracia.',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F2D6B] sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-[#F8FAFF] p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] font-semibold text-[#6B7280]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0D1117]">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-[#6B7280]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 text-amber-400">⭐⭐⭐⭐⭐</div>
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
      q: '¿Cuál es el monto mínimo de operación?',
      a: 'El monto mínimo es USD 1.000. No existe un límite máximo definido; operaciones de mayor volumen se evalúan caso a caso con condiciones personalizadas.',
    },
    {
      q: '¿Cómo se determina la tasa de cambio?',
      a: 'La tasa se informa antes de confirmar la operación y es fija para esa transacción. Tomamos de referencia el tipo de cambio observado del día con un spread competitivo.',
    },
    {
      q: '¿Qué documentación se necesita?',
      a: 'Para operaciones estándar, solo se requiere RUT de la empresa (o cédula si eres independiente), datos bancarios y la confirmación del origen de los fondos. Sin trámites extensos.',
    },
    {
      q: '¿En cuánto tiempo se acreditan los fondos?',
      a: 'Una vez aceptadas las condiciones, la transferencia se realiza dentro del mismo día hábil. La mayoría de las operaciones se completa en menos de 4 horas.',
    },
    {
      q: '¿Operan con empresas fuera de Chile?',
      a: 'Actualmente atendemos principalmente a empresas con cuenta bancaria en Chile. Si tu empresa opera desde otro país de LATAM, contáctanos para evaluar tu caso.',
    },
  ]

  return (
    <section id="faq" className="bg-[#F8FAFF] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F2D6B] sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-[#E5E7EB] bg-white"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between px-6 py-5 text-sm font-semibold text-[#0D1117] hover:text-[#0F2D6B] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="ml-4 shrink-0 text-xl font-light text-[#1A56DB] transition-transform duration-200 group-open:rotate-45">
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
  const columns = [
    {
      title: 'Producto',
      links: ['Cómo funciona', 'Simulador', 'Casos de uso', 'Precios'],
    },
    {
      title: 'Empresa',
      links: ['Nosotros', 'Equipo', 'Prensa', 'Carreras'],
    },
    {
      title: 'Legal',
      links: ['Términos de uso', 'Privacidad', 'Cumplimiento', 'Regulación'],
    },
  ]

  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image
                src="/logos/proflow-latam-logo.png"
                alt="ProFlow LATAM"
                width={180}
                height={40}
                className="h-10 w-auto"
                unoptimized
              />
            </div>
            <p className="mb-5 text-sm text-[#6B7280]">
              Liquidez empresarial. Ágil y segura.
            </p>
            <a
              href="mailto:contacto@proflowlatam.com"
              className="text-sm text-[#1A56DB] hover:underline"
            >
              contacto@proflowlatam.com
            </a>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-[#6B7280] transition-colors hover:text-[#0D1117]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#E5E7EB] pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} ProFlow LATAM. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#6B7280]">
            ProFlow LATAM opera en conformidad con la normativa financiera vigente.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProflowLatamPage() {
  return (
    <main>
      <ProflowLatamHeader />
      <Hero />
      <TrustMetrics />
      <ValueProps />
      <HowItWorks />
      <CalculatorSection
          brand="proflow-latam"
          primaryColor="#0F2D6B"
          accentColor="#1A56DB"
          minAmount={1000}
          maxAmount={50000}
          whatsappNumber="56912345678"
        />
      <ForBusinesses />
      <CTAWithForm />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
