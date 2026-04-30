import { supabase } from './client'
import type { BrandId } from '@/config/brands'

export interface LeadPayload {
  name: string
  email: string
  phone?: string
  company?: string
  amount?: number
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  brand: BrandId
}

const tableMap: Record<BrandId, string> = {
  'caja-chica': 'leads_caja_chica',
  'proflow-latam': 'leads_proflow_latam',
}

export async function submitLead(payload: LeadPayload) {
  const table = tableMap[payload.brand]
  const { data, error } = await supabase.from(table).insert([
    {
      ...payload,
      created_at: new Date().toISOString(),
      status: 'new',
    },
  ])
  if (error) throw error
  return data
}

export async function trackEvent(
  brand: BrandId,
  event: string,
  metadata?: Record<string, unknown>,
) {
  const { error } = await supabase.from('brand_events').insert([
    {
      brand,
      event,
      metadata,
      created_at: new Date().toISOString(),
    },
  ])
  if (error) console.error('Event tracking error:', error)
}
