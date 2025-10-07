'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import { useTheme } from 'next-themes'

interface MermaidProps {
  chart: string
  className?: string
}

const Mermaid = ({ chart, className = '' }: MermaidProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const lightTheme = {
    background: '#fafafa',
    primaryColor: '#5b6dfa',
    primaryBorderColor: '#4a56d3',
    primaryTextColor: '#1e1e1e',
    lineColor: '#d0d0d0',
    secondaryColor: '#f2f2f2',
    tertiaryColor: '#e8e8e8',
  }

  const darkTheme = {
    background: '#111827',
    primaryColor: '#7a8dfd',
    primaryBorderColor: '#8ea2ff',
    primaryTextColor: '#f5f5f5',
    lineColor: '#4b5563',
    secondaryColor: '#1f2937',
    tertiaryColor: '#374151',
  }

  useEffect(() => {
    const isDark = theme === 'dark'

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: isDark ? darkTheme : lightTheme,
    })
  }, [theme]) // 只在 component mount 時執行

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
  }, [chart, theme])

  return <div ref={containerRef} className={className} />
}

export default Mermaid
