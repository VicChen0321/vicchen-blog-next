import React from 'react'

export type TocHeading = {
  value: string
  depth: number
  url: string
}

type CustomTOCProps = {
  toc: string | TocHeading[]
  exclude?: string | string[]
  maxDepth?: number
}

const CustomTOC: React.FC<CustomTOCProps> = ({ toc, exclude = '', maxDepth = 3 }) => {
  let tocItems: TocHeading[] = []
  if (typeof toc === 'string') {
    try {
      tocItems = JSON.parse(toc)
    } catch (e) {
      console.error('Failed to parse TOC:', e)
      return null
    }
  } else {
    tocItems = toc
  }

  const excludeArray = Array.isArray(exclude) ? exclude : [exclude]
  const filteredToc = tocItems.filter((heading) => {
    return !excludeArray.includes(heading.value) && heading.depth <= maxDepth
  })

  if (filteredToc.length === 0) {
    return null
  }

  return (
    <div className="toc-container">
      <h2 className="border-b border-gray-200 pb-2 text-xs font-bold tracking-wider text-gray-600 uppercase dark:border-gray-700 dark:text-gray-400">
        On This Page
      </h2>
      <ul className="space-y-1 pt-2 text-sm">
        {filteredToc.map((heading) => (
          <li
            key={heading.url}
            className={`toc-item ${heading.depth === 1 ? 'font-medium' : 'font-normal'}`}
            style={{ paddingLeft: `${(heading.depth - 1) * 0.75}rem` }}
          >
            <a
              href={heading.url}
              className="hover:text-primary-600 dark:hover:text-primary-400 text-sm text-gray-700 transition-colors dark:text-gray-300"
            >
              {heading.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default CustomTOC
