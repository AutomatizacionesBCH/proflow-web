import { BrandHeader } from '@/components/ui/BrandHeader'

const WA_HREF = 'https://wa.me/56966810468?text=Hola%2C+quiero+simular+una+operaci%C3%B3n'

const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Simulador',     href: '#calculadora' },
  { label: 'Requisitos',    href: '#faq' },
  { label: 'Preguntas',     href: '#faq' },
  { label: 'Contacto',      href: '#contacto' },
]

export function CajaChicaHeader() {
  return (
    <BrandHeader
      logoSrc="/logos/caja-chica-logo.png"
      logoAlt="La Caja Chica"
      links={NAV_LINKS}
      ctaLabel="Simular ahora"
      ctaHref="#calculadora"
      ctaColor="#0A6B5A"
      ctaColorHover="#043D35"
      whatsappHref={WA_HREF}
      whatsappNumber="+56 9 6681 0468"
    />
  )
}
