import type { Metadata } from 'next'
import Image from 'next/image'
import { ProflowLatamHeader } from '@/components/proflow-latam/Header'
import { HeroWithCalculator } from '@/components/proflow-latam/HeroWithCalculator'
import { StepCard } from '@/components/ui/StepCard'
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA'
import { ChatWidget } from '@/components/shared/ChatWidget'

export const metadata: Metadata = {
  title: 'ProFlow LATAM — Liquidez empresarial. Ágil y segura.',
  description:
    'Gestión de liquidez en divisas para personas y empresas en LATAM. Operaciones rápidas, seguras y completamente online.',
  keywords: ['liquidez empresarial', 'divisas chile', 'cambio USD pesos', 'proflow latam', 'fintech'],
}

const WA_HREF =
  'https://wa.me/56966810468?text=Hola%2C+quiero+iniciar+una+operaci%C3%B3n+con+ProFlow'

// ─── MÉTRICAS ─────────────────────────────────────────────────────────────────

function Metrics() {
  const items = [
    { value: '$150M+',   label: 'USD procesados' },
    { value: '+25.000',  label: 'Operaciones exitosas' },
    { value: '+8.000',   label: 'Clientes en LATAM' },
    { value: '15 min',   label: 'Tiempo promedio' },
  ]

  return (
    <section style={{ background: '#0F2D6B' }} className="py-14 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {items.map((m, i) => (
            <div
              key={m.label}
              className={[
                'flex flex-col items-center text-center',
                i < items.length - 1 ? 'md:border-r md:border-white/10' : '',
              ].join(' ')}
            >
              <span className="font-mono text-[42px] font-extrabold leading-none text-white sm:text-[48px]">
                {m.value}
              </span>
              <span className="mt-2 text-sm font-medium text-white/50">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PROPUESTA DE VALOR ───────────────────────────────────────────────────────

function ValueProps() {
  const items = [
    { icon: '⚡', title: 'Liquidez inmediata',      desc: 'Accede a tu capital en pesos el mismo día de la operación.' },
    { icon: '🔒', title: 'Proceso 100% digital',    desc: 'Todo online, sin papeles, sin filas, sin burocracia.' },
    { icon: '💰', title: 'Tasas transparentes',     desc: 'Sin costos ocultos. La tasa se confirma antes de operar.' },
    { icon: '👤', title: 'Atención personalizada',  desc: 'Un asesor real te acompaña en cada operación.' },
    { icon: '🌎', title: 'Operamos en LATAM',       desc: 'Chile y próximamente más países de la región.' },
    { icon: '🔄', title: 'Operaciones recurrentes', desc: 'Clientes frecuentes acceden a condiciones preferenciales.' },
  ]

  return (
    <section id="soluciones" className="bg-[#F8FAFF] py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#1A56DB]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A56DB]">
            Por qué elegirnos
          </span>
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#0D1117] sm:text-[34px] sm:leading-[42px]">
            ¿Por qué elegir ProFlow?
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Una plataforma diseñada para dar rapidez, claridad y confianza en cada operación.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[18px] border border-[#E5E7EB] bg-white p-7 transition-all duration-300 hover:scale-[1.01]"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF] text-xl">
                {item.icon}
              </div>
              <h3 className="mb-2 text-[16px] font-bold text-[#0D1117]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CASOS DE USO ────────────────────────────────────────────────────────────

function UseCases() {
  const items = [
    { icon: '💼', title: 'Capital de trabajo',         desc: 'Financia operaciones de tu negocio con liquidez inmediata.' },
    { icon: '🚨', title: 'Emergencias',                desc: 'Accede a fondos cuando más los necesitas, sin demoras.' },
    { icon: '📈', title: 'Inversiones',                desc: 'Capitaliza oportunidades sin esperar que se libere tu cupo.' },
    { icon: '🌱', title: 'Expansión',                  desc: 'Financia el crecimiento de tu empresa con agilidad.' },
    { icon: '👤', title: 'Liquidez personal',          desc: 'Resuelve necesidades personales con discreción y rapidez.' },
    { icon: '🤝', title: 'Oportunidades comerciales',  desc: 'No pierdas negocios por falta de liquidez en el momento.' },
  ]

  return (
    <section id="beneficios" className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#0F2D6B]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F2D6B]">
            Casos de uso
          </span>
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#0D1117] sm:text-[34px] sm:leading-[42px]">
            Soluciones para cada necesidad
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Desde capital de trabajo hasta emergencias personales, ProFlow está para ti.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-5 rounded-[18px] border border-[#E5E7EB] bg-white p-6"
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                borderLeft: '3px solid #1A56DB',
              }}
            >
              <span className="mt-0.5 text-2xl">{item.icon}</span>
              <div>
                <h3 className="mb-1.5 text-[15px] font-bold text-[#0D1117]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#6B7280]">{item.desc}</p>
              </div>
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
      number: '01',
      title: 'Simulas online',
      description: 'Ingresa el monto y obtén una estimación instantánea, sin datos personales.',
    },
    {
      number: '02',
      title: 'Verificamos',
      description: 'Nuestro equipo valida la operación y te confirma las condiciones en minutos.',
    },
    {
      number: '03',
      title: 'Coordinamos',
      description: 'Confirmamos tasa, monto y detalles de la transferencia contigo directamente.',
    },
    {
      number: '04',
      title: 'Recibes liquidez',
      description: 'Los fondos se acreditan en tu cuenta el mismo día hábil.',
    },
  ]

  return (
    <section id="como-funciona" className="bg-[#F8FAFF] py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#1A56DB]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1A56DB]">
            Proceso simple
          </span>
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#0D1117] sm:text-[34px] sm:leading-[42px]">
            Un proceso simple en 4 pasos
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Diseñado para ser claro, rápido y sin fricciones.
          </p>
        </div>
        <StepCard steps={steps} accentColor="#1A56DB" />
      </div>
    </section>
  )
}

// ─── TESTIMONIOS ──────────────────────────────────────────────────────────────

function Testimonials() {
  const items = [
    {
      name: 'Carlos R.',
      role: 'Gerente Financiero',
      city: 'Santiago',
      amount: 'Opera regularmente',
      text: 'Operamos mensualmente con ProFlow. El proceso es impecable, la tasa competitiva y el equipo siempre disponible.',
    },
    {
      name: 'Patricia M.',
      role: 'Empresaria',
      city: 'Valparaíso',
      amount: 'Operó USD 15.000',
      text: 'La tasa es competitiva y el equipo muy profesional. Tienen claro lo que hacen y te explican todo con detalle.',
    },
    {
      name: 'Sebastián V.',
      role: 'Consultor',
      city: 'Buenos Aires',
      amount: 'Operó USD 8.000',
      text: 'Desde Argentina operamos sin problemas. La experiencia fue excelente de principio a fin. Muy recomendado.',
    },
  ]

  return (
    <section id="nosotros" className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#0D1117] sm:text-[34px] sm:leading-[42px]">
            Empresas y personas que confían en ProFlow
          </h2>
          <p className="mt-3 text-[#6B7280]">Resultados reales de clientes reales en LATAM.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-[18px] border border-[#E5E7EB] bg-white p-8"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <div className="mb-5 text-amber-400">⭐⭐⭐⭐⭐</div>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#6B7280]">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-[#F3F4F6] pt-5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: '#0F2D6B' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0D1117]">{t.name}</p>
                  <p className="text-xs text-[#9CA3AF]">
                    {t.role} · {t.city} · {t.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ASESOR DIGITAL ───────────────────────────────────────────────────────────

function DigitalAdvisor() {
  const capabilities = [
    'Explicar el proceso completo paso a paso',
    'Simular montos y tasas en tiempo real',
    'Responder preguntas frecuentes',
    'Derivar a un asesor humano cuando lo necesites',
  ]

  return (
    <section className="bg-[#F8FAFF] py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          className="rounded-[24px] border border-[#1A56DB]/15 bg-white p-10 sm:p-14"
          style={{ boxShadow: '0 20px 40px rgba(26,86,219,0.08)' }}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left: heading + action */}
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF4FF] text-2xl">
                🤖
              </div>
              <h2 className="mb-4 text-[26px] font-bold leading-[32px] tracking-tight text-[#0D1117] sm:text-[30px] sm:leading-[38px]">
                Habla con un asesor digital
              </h2>
              <p className="mb-8 text-[16px] leading-[26px] text-[#6B7280]">
                Resuelve tus dudas, simula tu operación y avanza con la ayuda de nuestro asistente inteligente.
              </p>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#1A56DB',
                  borderRadius: '14px',
                  boxShadow: '0 4px 12px rgba(26,86,219,0.30)',
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Iniciar conversación →
              </a>
              <p className="mt-4 text-xs text-[#9CA3AF]">
                Disponible 24/7 · Respuesta inmediata
              </p>
            </div>

            {/* Right: capabilities */}
            <div
              className="rounded-[18px] border border-[#E5E7EB] bg-[#F8FAFF] p-8"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                Qué puede hacer por ti
              </p>
              <ul className="space-y-4">
                {capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-[#374151]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                      <svg className="h-3 w-3 text-[#1A56DB]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

          </div>
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
      a: 'El monto mínimo es USD 1.000. No existe un límite máximo definido; operaciones de mayor volumen se evalúan con condiciones personalizadas.',
    },
    {
      q: '¿Cómo se determina la tasa de cambio?',
      a: 'La tasa se informa antes de confirmar la operación y es fija para esa transacción. Tomamos como referencia el tipo de cambio observado del día con un spread competitivo.',
    },
    {
      q: '¿Qué documentación se necesita?',
      a: 'Para operaciones estándar, solo se requiere RUT (o cédula si eres independiente), datos bancarios y confirmación del origen de los fondos. Sin trámites extensos.',
    },
    {
      q: '¿En cuánto tiempo se acreditan los fondos?',
      a: 'Una vez aceptadas las condiciones, la transferencia se realiza dentro del mismo día hábil. La mayoría de las operaciones se completa en menos de 4 horas.',
    },
    {
      q: '¿Operan con empresas fuera de Chile?',
      a: 'Actualmente atendemos principalmente a clientes con cuenta bancaria en Chile. Si operas desde otro país de LATAM, contáctanos para evaluar tu caso.',
    },
    {
      q: '¿Hay costos adicionales?',
      a: 'No. La única comisión es del 3,5% sobre el monto bruto de la operación. No hay cargos ocultos ni comisiones adicionales. Todo se informa antes de operar.',
    },
    {
      q: '¿Puedo realizar operaciones recurrentes?',
      a: 'Sí. Los clientes frecuentes acceden a condiciones preferenciales y proceso simplificado. Una vez completada la primera operación, las siguientes son más ágiles.',
    },
  ]

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-[26px] font-bold leading-[32px] tracking-tight text-[#0D1117] sm:text-[34px] sm:leading-[42px]">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Todo lo que necesitas saber antes de operar.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-[18px] border border-[#E5E7EB] bg-white"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between px-6 py-5 text-sm font-semibold text-[#0D1117] hover:text-[#1A56DB] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="ml-4 shrink-0 text-xl font-light text-[#1A56DB] transition-transform duration-200 group-open:rotate-45">
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
    <section id="contacto" style={{ background: '#0F2D6B' }} className="py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="mb-5 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
            Sin compromiso
          </span>
          <h2 className="mb-4 text-[26px] font-bold leading-[32px] tracking-tight text-white sm:text-[34px] sm:leading-[42px]">
            ¿Listo para obtener liquidez inmediata?
          </h2>
          <p className="mb-10 max-w-lg text-[16px] leading-[26px] text-white/60">
            Miles de clientes en LATAM ya operan con ProFlow. Únete hoy.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#calculadora"
              className="inline-flex items-center justify-center rounded-[14px] bg-white px-8 py-4 text-base font-bold text-[#0F2D6B] transition-all duration-200 hover:bg-[#F8FAFF] active:scale-[0.98]"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.20)' }}
            >
              Comenzar operación
            </a>
            <a
              href="#contacto"
              style={{ border: '1.5px solid rgba(255,255,255,0.40)', borderRadius: '14px' }}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              Hablar con un asesor
            </a>
          </div>

          <p className="mt-8 text-sm text-white/30">
            🔒 100% seguro · Sin compromiso · Respuesta inmediata
          </p>
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
      links: [
        { label: 'Simulador',     href: '#calculadora' },
        { label: 'Cómo funciona', href: '#como-funciona' },
        { label: 'Casos de uso',  href: '#beneficios' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Nosotros',  href: '#nosotros' },
        { label: 'Contacto',  href: '#contacto' },
        { label: 'Recursos',  href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Términos',    href: '#' },
        { label: 'Privacidad',  href: '#' },
        { label: 'Regulación',  href: '#' },
      ],
    },
    {
      title: 'Contacto',
      links: [
        { label: 'contacto@proflowlatam.com', href: 'mailto:contacto@proflowlatam.com' },
        { label: 'WhatsApp',                  href: WA_HREF },
        { label: 'LinkedIn',                  href: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand — spans 1 column on lg */}
          <div className="lg:col-span-1">
            <div className="mb-3">
              <Image
                src="/logos/proflow-latam-logo.png"
                alt="ProFlow LATAM"
                width={160}
                height={36}
                className="h-9 w-auto"
                unoptimized
              />
            </div>
            <p className="text-sm text-[#6B7280]">
              Liquidez empresarial. Ágil y segura.
            </p>
          </div>

          {/* Nav columns — each 1 column on lg */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('mailto') || l.href.startsWith('https') ? '_blank' : undefined}
                      rel={l.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-[#6B7280] transition-colors hover:text-[#0D1117]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} ProFlow LATAM. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#9CA3AF]">
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
    <main className="bg-white">
      <ProflowLatamHeader />
      <HeroWithCalculator />
      <Metrics />
      <ValueProps />
      <UseCases />
      <HowItWorks />
      <Testimonials />
      <DigitalAdvisor />
      <FAQ />
      <CTAFinal />
      <Footer />
      <MobileStickyCTA
        label="Comenzar operación"
        href="#calculadora"
        variant="simulate"
        color="#1A56DB"
      />
      <ChatWidget
        brand="proflow-latam"
        primaryColor="#0F2D6B"
        accentColor="#1A56DB"
        whatsappNumber="56966810468"
        agentName="Asesor ProFlow"
      />
    </main>
  )
}
