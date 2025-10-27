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

  useEffect(() => {
    const lightTheme = {
      background: '#ffffff',
      primaryColor: '#fff4dd',
      primaryTextColor: '#222222',
      primaryBorderColor: '#ffe0b2',
      lineColor: '#a0a0a0',
      secondaryColor: '#e0edfa',
      tertiaryColor: '#f5f5f5',
      noteBkgColor: '#fff5ad',
      noteTextColor: '#333',
      noteBorderColor: '#ffe066',
    }

    const darkTheme = {
      background: '#1e1e1e',
      primaryColor: '#22223b',
      primaryTextColor: '#ececec',
      primaryBorderColor: '#575c7c',
      lineColor: '#44475a',
      secondaryColor: '#393e54',
      tertiaryColor: '#2a2d43',
      noteBkgColor: '#393e54',
      noteTextColor: '#ececec',
      noteBorderColor: '#575c7c',
    }

    const isDark = theme === 'dark'
    const themeVars = isDark ? darkTheme : lightTheme

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: themeVars,
    })
    mermaid.contentLoaded()
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
