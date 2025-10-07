'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
  className?: string
}

const Mermaid = ({ chart, className = '' }: MermaidProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false })
  }, []) // 只在 component mount 時執行

  useEffect(() => {
    if (!containerRef.current) return

    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    mermaid
      .render(id, chart)
      .then(({ svg, bindFunctions }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
          if (bindFunctions) {
            bindFunctions(containerRef.current)
          }
        }
      })
      .catch((err) => {
        console.error('Mermaid render error:', err)
        if (containerRef.current) {
          containerRef.current.innerText = chart
        }
      })
  }, [chart])

  return <div ref={containerRef} className={className} />
}

export default Mermaid
