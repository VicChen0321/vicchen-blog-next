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
      className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-800 mr-2 mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-white uppercase transition-colors"
    >
      {displayText}
    </Link>
  )
}

export default Tag
