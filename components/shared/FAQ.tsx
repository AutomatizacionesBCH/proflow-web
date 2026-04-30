'use client'

import { useState } from 'react'
import type { BrandConfig } from '@/config/brands'
import type { FAQItem } from '@/types'

interface FAQProps {
  brand: BrandConfig
  items: FAQItem[]
  title?: string
}

export function FAQ({ brand, items, title = 'Preguntas frecuentes' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20" style={{ backgroundColor: brand.backgroundColor }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-10 text-center text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{ color: brand.primaryColor }}
        >
          {title}
        </h2>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white shadow-sm overflow-hidden"
              style={{ borderColor: `${brand.primaryColor}20` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span
                  className="text-sm font-semibold sm:text-base"
                  style={{ color: brand.primaryColor }}
                >
                  {item.question}
                </span>
                <svg
                  className="ml-4 h-5 w-5 flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: brand.primaryColor,
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="border-t px-6 py-4" style={{ borderColor: `${brand.primaryColor}10` }}>
                  <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
