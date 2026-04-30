export const colors = {
  // Base
  background: '#F5F6F8',
  surface: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',

  // La Caja Chica
  lcaPrimary: '#043D35',
  lcaAction: '#0A6B5A',
  lcaActionHover: '#085A4B',
  lcaUrgency: '#DC2626',

  // ProFlow LATAM
  pflPrimary: '#0F2D6B',
  pflAction: '#1A56DB',
  pflActionHover: '#1447C0',
  pflConfirm: '#059669',

  // Estados
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',
} as const

export const typography = {
  h1Desktop: { size: '48px', lineHeight: '56px', weight: 700 },
  h1Mobile:  { size: '34px', lineHeight: '40px', weight: 700 },
  h2Desktop: { size: '34px', lineHeight: '42px', weight: 700 },
  h2Mobile:  { size: '26px', lineHeight: '32px', weight: 700 },
  h3:        { size: '22px', lineHeight: '30px', weight: 600 },
  body:      { size: '16px', lineHeight: '24px', weight: 400 },
  small:     { size: '14px', lineHeight: '20px', weight: 400 },
  micro:     { size: '12px', lineHeight: '16px', weight: 400 },
} as const

export const spacing = {
  sectionDesktop: '80px',
  sectionMobile:  '48px',
  containerMax:   '1200px',
  paddingDesktop: '24px',
  paddingMobile:  '16px',
} as const

export const shadows = {
  card:      '0 10px 30px rgba(0,0,0,0.06)',
  cardHover: '0 20px 40px rgba(0,0,0,0.10)',
  button:    '0 4px 12px rgba(0,0,0,0.15)',
} as const

export const radius = {
  card:   '18px',
  button: '14px',
  input:  '12px',
  badge:  '999px',
} as const

export const ds = { colors, typography, spacing, shadows, radius } as const
export default ds
