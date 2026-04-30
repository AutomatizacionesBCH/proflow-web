import type { Metadata } from 'next'
import { getBrand } from '@/config/brands'
import { BrandHeader } from '@/components/shared/BrandHeader'
import { Hero } from '@/components/shared/Hero'
import { TrustMetrics } from '@/components/shared/TrustMetrics'
import { ProcessSteps } from '@/components/shared/ProcessSteps'
import { Calculator } from '@/components/proflow-latam/Calculator'
import { PreApproval } from '@/components/proflow-latam/PreApproval'
import { Testimonials } from '@/components/shared/Testimonials'
import { FAQ } from '@/components/shared/FAQ'
import { CTASection } from '@/components/shared/CTASection'
import { ChatWidget } from '@/components/shared/ChatWidget'
import type { TrustMetric, ProcessStep, Testimonial, FAQItem } from '@/types'

const brand = getBrand('proflow-latam')

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
  keywords: brand.seo.keywords,
}

const metrics: TrustMetric[] = [
  { value: '5', label: 'Países de operación', description: 'Chile, Colombia, México, Perú, Argentina' },
  { value: '+$2B', label: 'Financiado en LATAM', description: 'Desde 2020' },
  { value: '48h', label: 'Tiempo promedio aprobación', description: 'Para empresas calificadas' },
  { value: 'AAA', label: 'Rating de confianza', description: 'Certificado por operadores' },
]

const steps: ProcessStep[] = [
  { step: 1, icon: '🏢', title: 'Perfil de empresa', description: 'Registra tu empresa y define el producto financiero que necesitas.' },
  { step: 2, icon: '📊', title: 'Análisis crediticio', description: 'Nuestro equipo analiza tu historial y capacidad de pago en 48h.' },
  { step: 3, icon: '🤝', title: 'Propuesta personalizada', description: 'Recibes una oferta adaptada a tu estructura financiera y país.' },
  { step: 4, icon: '🚀', title: 'Activación y seguimiento', description: 'Firma digital, desembolso y panel de control en tiempo real.' },
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    company: 'Constructora Andina SAC',
    role: 'Director Financiero',
    text: 'ProFlow LATAM nos permitió estructurar una línea de crédito para operaciones en tres países. El proceso fue institucional y muy transparente.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Valentina Gómez',
    company: 'Distribuidora Norte S.A.',
    role: 'CFO',
    text: 'Buscábamos un partner que entendiera el contexto latinoamericano. ProFlow LATAM tiene el conocimiento regional que necesitábamos.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Roberto Saavedra',
    company: 'Grupo Tecnológico Sur',
    role: 'CEO',
    text: 'Excelente servicio. Desde la evaluación hasta el desembolso fue un proceso ágil y profesional. Ya somos clientes recurrentes.',
    rating: 5,
  },
]

const faqItems: FAQItem[] = [
  {
    question: '¿En qué países operan?',
    answer: 'Actualmente operamos en Chile, Colombia, México, Perú y Argentina, con expansión planificada para Brasil y Ecuador en 2025.',
  },
  {
    question: '¿Qué tipo de empresas pueden acceder?',
    answer: 'Trabajamos con pymes y medianas empresas con al menos 1 año de operación, ventas anuales superiores a $50M CLP (o equivalente) y estados financieros disponibles.',
  },
  {
    question: '¿Qué productos financieros ofrecen?',
    answer: 'Líneas de crédito revolvente, factoring de facturas, leasing de activos, y financiamiento de capital de trabajo a medida.',
  },
  {
    question: '¿Cuál es el monto mínimo y máximo de operación?',
    answer: 'Desde $5.000.000 CLP hasta operaciones sin límite definido para empresas con estados financieros auditados.',
  },
  {
    question: '¿Las operaciones son en moneda local o USD?',
    answer: 'Operamos en la moneda local de cada país. Para operaciones internacionales, también gestionamos en USD y EUR según el caso.',
  },
]

export default function ProflowLatamPage() {
  return (
    <main style={{ backgroundColor: brand.backgroundColor }}>
      <BrandHeader brand={brand} />

      <Hero
        brand={brand}
        badge="Fintech para empresas en LATAM"
        headline="Soluciones financieras para el negocio moderno."
        subheadline="Líneas de crédito, factoring y capital de trabajo para empresas que operan en Latinoamérica. Proceso 100% digital, evaluación personalizada."
        ctaLabel="Hablar con un especialista"
        ctaHref="#solicitar"
        secondaryCtaLabel="Ver simulador"
        secondaryCtaHref="#calculadora"
      />

      <TrustMetrics brand={brand} metrics={metrics} />

      <ProcessSteps
        brand={brand}
        steps={steps}
        title="Proceso institucional"
        subtitle="Un proceso transparente y profesional diseñado para empresas que necesitan certeza."
      />

      <Calculator />

      <Testimonials brand={brand} testimonials={testimonials} />

      <PreApproval />

      <FAQ brand={brand} items={faqItems} />

      <CTASection
        brand={brand}
        title="Tu empresa merece un partner financiero de altura."
        subtitle="Más de 500 empresas en LATAM ya trabajan con ProFlow."
        ctaLabel="Solicitar propuesta →"
      />

      <ChatWidget brand={brand} message="Hola! Soy de una empresa y quiero conocer las soluciones de ProFlow LATAM." />

      {/* Footer */}
      <footer
        className="border-t py-10 text-center"
        style={{ backgroundColor: brand.primaryColor }}
      >
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} ProFlow LATAM. Todos los derechos reservados.
        </p>
        <p className="mt-1 text-xs text-white/40">
          Operaciones sujetas a evaluación. Empresa regulada bajo legislación financiera local.
        </p>
      </footer>
    </main>
  )
}
