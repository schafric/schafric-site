import ReactMarkdown from 'react-markdown'

export default function Markdown({ children, className = '' }) {
  return (
    <div className={`prose-content ${className}`}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-clay font-medium hover:text-clay-light transition-colors duration-300 underline decoration-clay/30 underline-offset-2 hover:decoration-clay/60"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
