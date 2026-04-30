import type { Metadata } from 'next'
import { getBrand } from '@/config/brands'
import { BrandHeader } from '@/components/shared/BrandHeader'
import { Hero } from '@/components/shared/Hero'
import { TrustMetrics } from '@/components/shared/TrustMetrics'
import { ProcessSteps } from '@/components/shared/ProcessSteps'
import { Calculator } from '@/components/caja-chica/Calculator'
import { PreApproval } from '@/components/caja-chica/PreApproval'
import { Testimonials } from '@/components/shared/Testimonials'
import { FAQ } from '@/components/shared/FAQ'
import { CTASection } from '@/components/shared/CTASection'
import { ChatWidget } from '@/components/shared/ChatWidget'
import type { TrustMetric, ProcessStep, Testimonial, FAQItem } from '@/types'

const brand = getBrand('caja-chica')

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
  keywords: brand.seo.keywords,
}

const metrics: TrustMetric[] = [
  { value: '+1.200', label: 'Empresas financiadas', description: 'En todo Chile' },
  { value: '24h', label: 'Respuesta garantizada', description: 'Días hábiles' },
  { value: '$50M', label: 'Máximo financiable', description: 'Por operación' },
  { value: '98%', label: 'Clientes satisfechos', description: 'Según encuesta' },
]

const steps: ProcessStep[] = [
  { step: 1, icon: '📋', title: 'Completa el formulario', description: 'Ingresa tus datos básicos. Sin papeleos ni trámites complicados.' },
  { step: 2, icon: '⚡', title: 'Evaluación express', description: 'Analizamos tu solicitud en menos de 24 horas hábiles.' },
  { step: 3, icon: '✅', title: 'Pre-aprobación', description: 'Te contactamos con la oferta personalizada para tu negocio.' },
  { step: 4, icon: '💰', title: 'Dinero en tu cuenta', description: 'Una vez aceptado, transferimos en el mismo día hábil.' },
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Claudia Rojas',
    company: 'Panadería Don Pan',
    role: 'Dueña',
    text: 'Necesitaba renovar los hornos y no tenía tiempo para bancos. En menos de 48 horas tenía el dinero. Super recomendable.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Miguel Torres',
    company: 'Ferretería El Clavo',
    role: 'Gerente',
    text: 'Proceso rapidísimo, sin vueltas. El equipo fue muy profesional y la tasa fue mejor de lo que esperaba.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Andrea Fuentes',
    company: 'Spa & Belleza AF',
    role: 'Propietaria',
    text: 'Ya llevo 3 operaciones con La Caja Chica. Siempre me ayudaron cuando más lo necesité.',
    rating: 5,
  },
]

const faqItems: FAQItem[] = [
  {
    question: '¿Qué documentos necesito para solicitar?',
    answer: 'Solo necesitas RUT, comprobante de actividad económica y últimas 3 boletas o facturas. Sin declaraciones de renta obligatorias.',
  },
  {
    question: '¿Consultan a Dicom?',
    answer: 'No realizamos consultas a Dicom en el proceso de evaluación inicial. Evaluamos principalmente el flujo de caja de tu negocio.',
  },
  {
    question: '¿Cuánto tiempo demora el proceso?',
    answer: 'Pre-aprobación en 24 horas hábiles. Una vez aceptada la oferta, el dinero llega a tu cuenta en el mismo día hábil.',
  },
  {
    question: '¿Cuál es el monto máximo que puedo solicitar?',
    answer: 'Financiamos desde $500.000 hasta $50.000.000 por operación. El monto depende de la evaluación de tu flujo de caja.',
  },
  {
    question: '¿Cuáles son los plazos de pago?',
    answer: 'Ofrecemos plazos entre 3 y 36 meses. Tú eliges el plazo que mejor se ajuste a tu flujo de caja.',
  },
]

export default function CajaChicaPage() {
  return (
    <main style={{ backgroundColor: brand.backgroundColor }}>
      <BrandHeader brand={brand} />

      <Hero
        brand={brand}
        badge="Financiamiento para pymes"
        headline="Crédito rápido para tu negocio, sin vueltas."
        subheadline="Obtén hasta $50.000.000 en menos de 24 horas hábiles. Sin Dicom, sin filas, sin burocracia. Directo a tu cuenta."
        ctaLabel="Solicitar ahora"
        ctaHref="#solicitar"
        secondaryCtaLabel="Simular cuota"
        secondaryCtaHref="#calculadora"
      />

      <TrustMetrics brand={brand} metrics={metrics} />

      <ProcessSteps
        brand={brand}
        steps={steps}
        title="Así de simple"
        subtitle="Cuatro pasos para tener el dinero en tu cuenta."
      />

      <Calculator />

      <Testimonials brand={brand} testimonials={testimonials} />

      <PreApproval />

      <FAQ brand={brand} items={faqItems} />

      <CTASection
        brand={brand}
        title="¿Listo para hacer crecer tu negocio?"
        subtitle="Únete a más de 1.200 empresas que ya confían en La Caja Chica."
        ctaLabel="Solicitar financiamiento →"
      />

      <ChatWidget brand={brand} message="Hola! Quiero saber más sobre financiamiento para mi negocio." />

      {/* Footer */}
      <footer
        className="border-t py-10 text-center"
        style={{ backgroundColor: brand.primaryColor, borderColor: `${brand.primaryColor}40` }}
      >
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} La Caja Chica. Todos los derechos reservados.
        </p>
        <p className="mt-1 text-xs text-white/40">
          Operaciones sujetas a evaluación crediticia. Tasas referenciales.
        </p>
      </footer>
    </main>
  )
}
