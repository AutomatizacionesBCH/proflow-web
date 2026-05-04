'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export interface ChatWidgetProps {
  brand: 'caja-chica' | 'proflow-latam'
  primaryColor: string
  accentColor: string
  whatsappNumber: string
  agentName: string
}

type MsgFrom = 'bot' | 'user'
type ActionKind = 'scroll' | 'wa'

interface MsgAction {
  label: string
  kind: ActionKind
  value: string
}

interface Msg {
  id: string
  from: MsgFrom
  text: string
  ts: Date
  actions?: MsgAction[]
}

type ApiMessage = { role: 'user' | 'assistant'; content: string }

const WELCOME: Record<ChatWidgetProps['brand'], string> = {
  'caja-chica':    '👋 Hola, soy Magdalen-IA, asistente virtual de La Caja Chica.\n¿En qué le puedo ayudar hoy?',
  'proflow-latam': '👋 Bienvenido a ProFlow LATAM.\nSoy Magdalen-IA, su asistente digital. ¿En qué le puedo ayudar?',
}

const CHIPS = [
  { label: '¿Cuánto puedo recibir?' },
  { label: '¿Cómo funciona?' },
  { label: '¿Es seguro?' },
  { label: 'Quiero operar ahora' },
]

function uid() { return Math.random().toString(36).slice(2) }
function fmtTime(d: Date) { return d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) }
function mkBot(text: string, actions?: MsgAction[]): Msg { return { id: uid(), from: 'bot', text, ts: new Date(), actions } }
function mkUser(text: string): Msg { return { id: uid(), from: 'user', text, ts: new Date() } }

export function ChatWidget({ brand, primaryColor, accentColor, whatsappNumber, agentName }: ChatWidgetProps) {
  const [isOpen, setIsOpen]       = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const [showTip, setShowTip]     = useState(false)
  const [msgs, setMsgs]           = useState<Msg[]>([])
  const [input, setInput]         = useState('')
  const [typing, setTyping]       = useState(false)
  const [opened, setOpened]       = useState(false)

  const endRef         = useRef<HTMLDivElement>(null)
  const taRef          = useRef<HTMLTextAreaElement>(null)
  const apiMessagesRef = useRef<ApiMessage[]>([])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  const addBot = useCallback((text: string, actions?: MsgAction[]) => {
    setMsgs(prev => [...prev, mkBot(text, actions)])
  }, [])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setShowBadge(false)
    if (!opened) {
      setOpened(true)
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        addBot(WELCOME[brand])
      }, 800)
    }
  }, [opened, brand, addBot])

  const enviarMensaje = useCallback(async (texto: string) => {
    const t = texto.trim()
    if (!t || typing) return

    const userMsg: ApiMessage = { role: 'user', content: t }
    apiMessagesRef.current = [...apiMessagesRef.current, userMsg]

    setMsgs(prev => [...prev, mkUser(t)])
    setTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessagesRef.current, brand }),
      })
      const data = await res.json()
      const reply = (data.reply as string) ?? 'Lo siento, tuve un problema.'
      apiMessagesRef.current = [...apiMessagesRef.current, { role: 'assistant', content: reply }]
      setTyping(false)
      addBot(reply)
    } catch {
      setTyping(false)
      addBot('Lo siento, tuve un problema. Por favor escríbenos directamente por WhatsApp.')
    }
  }, [brand, addBot, typing])

  const send = useCallback((text: string) => {
    const t = text.trim()
    if (!t) return
    setInput('')
    if (taRef.current) { taRef.current.style.height = 'auto' }
    enviarMensaje(t)
  }, [enviarMensaje])

  const handleAction = useCallback((a: MsgAction) => {
    if (a.kind === 'scroll') {
      setIsOpen(false)
      setTimeout(() => document.getElementById(a.value)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200)
    } else if (a.kind === 'wa') {
      const url = `https://wa.me/${whatsappNumber}?text=${a.value || encodeURIComponent('Hola, tengo una consulta.')}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }, [whatsappNumber])

  const showChips = msgs.length > 0 && msgs.every(m => m.from === 'bot') && !typing

  const cwStyles = `
    @keyframes cw-pulse {
      0%,100% { box-shadow:0 8px 24px rgba(0,0,0,0.25),0 0 0 0 ${accentColor}55; }
      50%     { box-shadow:0 8px 24px rgba(0,0,0,0.25),0 0 0 10px ${accentColor}00; }
    }
    @keyframes cw-dot {
      0%,80%,100% { transform:scale(0.4); opacity:0.3; }
      40%         { transform:scale(1);   opacity:1;   }
    }
    @keyframes cw-panel {
      from { opacity:0; transform:translateY(12px) scale(0.97); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    @keyframes cw-badge {
      0%   { transform:scale(0) rotate(-20deg); }
      70%  { transform:scale(1.2) rotate(5deg); }
      100% { transform:scale(1) rotate(0deg);   }
    }
    .cw-pulse { animation:cw-pulse 2.5s ease-in-out infinite; }
    .cw-d1    { animation:cw-dot 1.2s 0s   infinite; }
    .cw-d2    { animation:cw-dot 1.2s 0.2s infinite; }
    .cw-d3    { animation:cw-dot 1.2s 0.4s infinite; }
    .cw-panel { animation:cw-panel 0.22s ease-out forwards; }
    .cw-badge { animation:cw-badge 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  `

  return (
    <>
      <style>{cwStyles}</style>

      {/* ── PANEL ───────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="cw-panel fixed inset-0 z-[60] flex flex-col bg-white sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[520px] sm:w-[380px] sm:rounded-[18px]"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.20),0 0 0 1px rgba(0,0,0,0.06)' }}
        >
          {/* Header */}
          <div
            className="flex shrink-0 items-center gap-3 rounded-t-[18px] px-5 py-4"
            style={{ backgroundColor: primaryColor }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {agentName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{agentName}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                En línea
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Cerrar chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] flex-col gap-1 ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={
                      m.from === 'user'
                        ? { backgroundColor: `${accentColor}18`, color: '#111827' }
                        : { backgroundColor: '#F3F4F6', color: '#111827' }
                    }
                  >
                    {m.text.split('\n').map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </div>

                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-0.5 flex flex-wrap gap-1.5">
                      {m.actions.map((a, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleAction(a)}
                          className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                          style={{ borderColor: accentColor, color: accentColor, backgroundColor: `${accentColor}0D` }}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-[#9CA3AF]">{fmtTime(m.ts)}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-[#F3F4F6] px-4 py-3.5">
                  <span className="cw-d1 inline-block h-2 w-2 rounded-full bg-[#9CA3AF]" />
                  <span className="cw-d2 inline-block h-2 w-2 rounded-full bg-[#9CA3AF]" />
                  <span className="cw-d3 inline-block h-2 w-2 rounded-full bg-[#9CA3AF]" />
                </div>
              </div>
            )}

            {showChips && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CHIPS.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => {
                      setMsgs(prev => [...prev, mkUser(c.label)])
                      enviarMensaje(c.label)
                    }}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ borderColor: accentColor, color: accentColor, backgroundColor: 'white' }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-[#E5E7EB] p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={taRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
                }}
                placeholder="Escribe tu pregunta..."
                rows={1}
                className="flex-1 resize-none rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#9CA3AF]"
              />
              <button
                type="button"
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
                style={{ backgroundColor: accentColor }}
                aria-label="Enviar"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BUBBLE ──────────────────────────────────────────────────────── */}
      <div className={`fixed bottom-[88px] md:bottom-6 right-6 z-[55] flex flex-col items-end gap-2 ${isOpen ? 'hidden sm:flex' : 'flex'}`}>
        {showTip && !isOpen && (
          <div
            className="mr-1 max-w-[200px] rounded-[12px] border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-xs font-medium text-[#374151]"
            style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.10)' }}
          >
            ¿Tienes dudas? Chatea con nosotros
          </div>
        )}

        <button
          type="button"
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          className={`relative flex h-[60px] w-[60px] items-center justify-center rounded-full text-white transition-transform active:scale-95 ${!isOpen ? 'cw-pulse' : ''}`}
          style={{ backgroundColor: accentColor }}
          aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        >
          {showBadge && !isOpen && (
            <span className="cw-badge absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              1
            </span>
          )}

          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
