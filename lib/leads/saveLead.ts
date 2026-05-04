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

    const channel = CHANNEL_MAP[leadData.brand] ?? leadData.brand

    const notes = `Tipo tarjeta: ${leadData.tipoTarjeta} | Banco: ${leadData.banco} | Monto: USD ${leadData.montoUSD} | CLP estimado: $${leadData.montoEstimadoCLP} | Saldo nacional: ${leadData.tiene_saldo_nacional ? 'Sí' : 'No'} | Primera operación: ${leadData.primeraOperacion ? 'Sí' : 'No'}`

    const raw_payload = {
      brand: leadData.brand,
      tipo_tarjeta: leadData.tipoTarjeta,
      banco: leadData.banco,
      monto_usd: leadData.montoUSD,
      monto_clp_estimado: leadData.montoEstimadoCLP,
      tiene_saldo_nacional: leadData.tiene_saldo_nacional,
      primera_operacion: leadData.primeraOperacion,
      source: 'web-preapproval',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        full_name: leadData.nombre,
        email: leadData.email,
        phone: leadData.telefono,
        whatsapp: leadData.telefono,
        source_platform: 'web',
        source_channel: channel,
        stage: 'new',
        priority_label: 'cold',
        notes,
        raw_payload,
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
        channel,
        source: 'web',
        metadata: {
          monto_usd: leadData.montoUSD,
          tipo_tarjeta: leadData.tipoTarjeta,
          tiene_saldo_nacional: leadData.tiene_saldo_nacional,
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
