'use client'

import { useRef, useState } from 'react'
import { Calculator, SimulationData } from './Calculator'
import { PreApproval } from './PreApproval'

interface CalculatorSectionProps {
  brand: 'caja-chica' | 'proflow-latam'
  primaryColor: string
  accentColor: string
  minAmount: number
  maxAmount: number
  whatsappNumber: string
}

export function CalculatorSection({
  brand,
  primaryColor,
  accentColor,
  minAmount,
  maxAmount,
  whatsappNumber,
}: CalculatorSectionProps) {
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null)
  const preApprovalRef = useRef<HTMLDivElement>(null)

  const handleSimulate = (data: SimulationData) => {
    setSimulationData(data)
    setTimeout(() => {
      preApprovalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const wa = whatsappNumber || '56912345678'

  return (
    <>
      <Calculator
        brand={brand}
        primaryColor={primaryColor}
        accentColor={accentColor}
        minAmount={minAmount}
        maxAmount={maxAmount}
        onSimulate={handleSimulate}
      />
      <div ref={preApprovalRef}>
        {simulationData && (
          <PreApproval
            brand={brand}
            simulationData={simulationData}
            primaryColor={primaryColor}
            accentColor={accentColor}
            whatsappNumber={wa}
          />
        )}
      </div>
    </>
  )
}
