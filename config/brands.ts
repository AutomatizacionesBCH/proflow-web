export type BrandId = 'caja-chica' | 'proflow-latam'

export interface BrandConfig {
  id: BrandId
  name: string
  tagline: string
  domain: string
  primaryColor: string
  accentColor: string
  backgroundColor: string
  cardColor: string
  textColor: string
  tone: string
  whatsappNumber: string
  supabaseTable: string
  utmSource: string
  socialLinks: {
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const brands: Record<BrandId, BrandConfig> = {
  'caja-chica': {
    id: 'caja-chica',
    name: 'La Caja Chica',
    tagline: 'Crédito rápido para tu negocio, sin vueltas.',
    domain: 'lacajachica.cl',
    primaryColor: '#043D35',
    accentColor: '#16A34A',
    backgroundColor: '#F5F6F8',
    cardColor: '#FFFFFF',
    textColor: '#1A1A1A',
    tone: 'directo, rápido, cercano',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
    supabaseTable: 'leads_caja_chica',
    utmSource: 'lacajachica',
    socialLinks: {
      instagram: '',
    },
    seo: {
      title: 'La Caja Chica — Crédito rápido para pymes',
      description:
        'Obtén financiamiento para tu negocio en minutos. Sin burocracia, sin filas. Directo a tu cuenta.',
      keywords: ['crédito pyme', 'financiamiento rápido', 'caja chica', 'préstamo empresa chile'],
    },
  },
  'proflow-latam': {
    id: 'proflow-latam',
    name: 'ProFlow LATAM',
    tagline: 'Soluciones financieras para el negocio moderno.',
    domain: 'proflowlatam.com',
    primaryColor: '#1E3A8A',
    accentColor: '#3B82F6',
    backgroundColor: '#F8FAFC',
    cardColor: '#FFFFFF',
    textColor: '#0F172A',
    tone: 'institucional, fintech internacional',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
    supabaseTable: 'leads_proflow_latam',
    utmSource: 'proflowlatam',
    socialLinks: {
      linkedin: '',
      twitter: '',
    },
    seo: {
      title: 'ProFlow LATAM — Fintech para empresas en Latinoamérica',
      description:
        'Gestión financiera inteligente para pymes y empresas de toda Latinoamérica. Accede a crédito, automatización y control en una sola plataforma.',
      keywords: ['fintech latam', 'crédito empresa', 'gestión financiera', 'proflow'],
    },
  },
}

export const getBrand = (id: BrandId): BrandConfig => brands[id]
