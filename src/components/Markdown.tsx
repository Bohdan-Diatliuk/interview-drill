import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children, className }) => (
    <code className={`font-mono text-[0.85em] bg-white/10 text-amber-300 rounded px-1.5 py-0.5 ${className ?? ''}`}>
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-white/5 border border-white/10 rounded-lg p-3 overflow-x-auto mb-2 text-sm font-mono">
      {children}
    </pre>
  ),
  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
};

interface Props {
  children: string;
  className?: string;
}

export const Markdown = ({ children, className = '' }: Props) => (
  <div className={className}>
    <ReactMarkdown components={components}>{children}</ReactMarkdown>
  </div>
);
