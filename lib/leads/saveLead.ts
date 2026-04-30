import { getSupabase } from '@/lib/supabase/client'
import type { LeadData } from '@/components/shared/PreApproval'

const CHANNEL_MAP: Record<string, string> = {
  'caja-chica': 'lacajachica',
  'proflow-latam': 'proflowlatam',
}

export async function saveLead(leadData: LeadData): Promise<{
  success: boolean
  leadId?: string
  error?: string
}> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('leads')
      .insert({
        full_name: leadData.nombre,
        email: leadData.email,
        phone: leadData.telefono,
        whatsapp: leadData.telefono,
        source_channel: CHANNEL_MAP[leadData.brand] ?? leadData.brand,
        source_platform: 'web',
        stage: 'new',
        lead_type: 'pre-approval',
        raw_payload: {
          amount_usd: leadData.montoUSD,
          amount_clp: leadData.montoEstimadoCLP,
          card_type: leadData.tipoTarjeta,
          bank: leadData.banco,
          first_operation: leadData.primeraOperacion,
          source: leadData.source,
        },
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    const leadId = (data as { id: string } | null)?.id

    // Fire-and-forget attribution event — never blocks the main flow
    supabase
      .from('attribution_events')
      .insert({
        lead_id: leadId,
        event_type: 'web_preapproval_completed',
        channel: CHANNEL_MAP[leadData.brand] ?? leadData.brand,
        source: 'web',
        metadata: {
          monto_usd: leadData.montoUSD,
          tipo_tarjeta: leadData.tipoTarjeta,
          primera_operacion: leadData.primeraOperacion,
        },
        created_at: new Date().toISOString(),
      })
      .then(({ error: evErr }) => {
        if (evErr) console.error('[attribution_events]', evErr.message)
      })

    return { success: true, leadId }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return { success: false, error: message }
  }
}
