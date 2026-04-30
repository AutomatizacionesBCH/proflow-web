'use client'

import type { BrandId } from '@/config/brands'
import { trackEvent } from '@/lib/supabase/leads'

type EventName =
  | 'page_view'
  | 'hero_cta_click'
  | 'calculator_used'
  | 'preapproval_started'
  | 'preapproval_submitted'
  | 'whatsapp_click'
  | 'faq_opened'
  | 'lead_submitted'

export async function track(
  brand: BrandId,
  event: EventName,
  metadata?: Record<string, unknown>,
) {
  await trackEvent(brand, event, {
    ...metadata,
    url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
  })
}
