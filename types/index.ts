export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  amount?: number
  message?: string
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected'
  brand: string
  created_at?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  text: string
  rating: number
  avatar?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface TrustMetric {
  value: string
  label: string
  description?: string
}
