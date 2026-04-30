import { BrandHeader } from '@/components/ui/BrandHeader'

const NAV_LINKS = [
  { label: 'Soluciones',    href: '#soluciones' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios',    href: '#beneficios' },
  { label: 'Nosotros',      href: '#nosotros' },
  { label: 'Contacto',      href: '#contacto' },
]

export function ProflowLatamHeader() {
  return (
    <BrandHeader
      logoSrc="/logos/proflow-latam-logo.png"
      logoAlt="ProFlow LATAM"
      links={NAV_LINKS}
      ctaLabel="Comenzar operación"
      ctaHref="#calculadora"
      ctaColor="#1A56DB"
      ctaColorHover="#1447C0"
    />
  )
}
