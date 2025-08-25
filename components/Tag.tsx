import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const tagSlug = slug(text)
  const displayText = text.split(' ').join('-')

  return (
    <Link
      href={`/tags/${tagSlug}`}
      // className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
      // className="border-primary-500 text-primary-600 hover:bg-primary-100 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/40 mr-2 mb-2 rounded-full border px-3 py-1 text-xs font-medium uppercase transition-colors"
      className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-800 mr-2 mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-white uppercase transition-colors"
    >
      {displayText}
    </Link>
  )
}

export default Tag
