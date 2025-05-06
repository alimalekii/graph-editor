import './style.scss'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const BDMMarkdown = ({ text, className }: { text: string; className?: string }) => {
  return (
    <Markdown
      className={`bdm-markdown ${className ? className : ''}`.trim()}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {text}
    </Markdown>
  )
}

export default BDMMarkdown
