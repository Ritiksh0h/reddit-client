"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentProps } from "react";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-lg font-bold mt-4 mb-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-base font-bold mt-3 mb-1" {...props} />
          ),
          p: ({ ...props }) => <p className="mb-3" {...props} />,
          a: ({ ...props }) => (
            <a
              className="text-[#4fbcff] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc pl-6 mb-3" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal pl-6 mb-3" {...props} />
          ),
          li: ({ ...props }) => <li className="mb-1" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-[#343536] pl-3 italic text-[#818384] my-2"
              {...props}
            />
          ),
          code: ({
            children,
            ...props
          }: ComponentProps<"code"> & { inline?: boolean }) => {
            const isInline = props.inline;

            return !isInline ? (
              <pre className="bg-[#1e1e1e] p-3 rounded-md border border-[#343536] my-2 overflow-x-auto">
                <code className="text-sm font-mono text-[#d7dadc]" {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code
                className="bg-[#272729] px-1.5 py-0.5 rounded-md text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-3">
              <table className="border-collapse w-full" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-[#272729]" {...props} />
          ),
          th: ({ ...props }) => (
            <th
              className="border border-[#343536] px-3 py-2 text-left"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td className="border border-[#343536] px-3 py-2" {...props} />
          ),
          img: ({ src, alt, ...props }) => {
            // Use a regular img element since Next.js Image requires width and height
            return (
              <img
                className="max-w-full rounded-md my-2"
                src={src as string}
                alt={alt || "Markdown image"}
                {...props}
              />
            );
          },
          hr: ({ ...props }) => (
            <hr className="border-[#343536] my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
