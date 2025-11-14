import React, { useMemo } from 'react';

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900/70 rounded-lg my-4 relative">
      <div className="text-xs text-gray-400 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          {copied ? (
             <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
             </>
          ) : (
             <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm text-cyan-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const MarkdownRenderer = ({ content }) => {
  const parsedContent = useMemo(() => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockLang = '';
    let inList = false;

    const flushList = (listItems) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
            {listItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );
      }
    };

    let listItems = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inList) {
          flushList(listItems);
          listItems = [];
          inList = false;
        }
        inCodeBlock = !inCodeBlock;
        if (inCodeBlock) {
          codeBlockLang = line.substring(3).trim();
        } else {
          elements.push(<CodeBlock key={`code-${elements.length}`} language={codeBlockLang} code={codeBlockContent.trim()} />);
          codeBlockContent = '';
          codeBlockLang = '';
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n';
        continue;
      }

      if (line.startsWith('## ')) {
        if (inList) {
          flushList(listItems);
          listItems = [];
          inList = false;
        }
        elements.push(<h2 key={i} className="text-2xl font-bold text-sky-400 mt-6 mb-3">{line.substring(3)}</h2>);
      } else if (line.match(/^(\*|-)\s/)) {
        if (!inList) {
          inList = true;
        }
        listItems.push(line.replace(/^(\*|-)\s/, ''));
      } else if (line.trim() === '') {
        if (inList) {
          flushList(listItems);
          listItems = [];
          inList = false;
        }
        elements.push(<div key={`br-${i}`} className="h-2" />);
      } else {
        if (inList) {
          flushList(listItems);
          listItems = [];
          inList = false;
        }
        elements.push(<p key={i} className="text-gray-300 my-2 leading-relaxed">{line}</p>);
      }
    }
    
    if (listItems.length > 0) {
      flushList(listItems);
    }

    return elements;
  }, [content]);

  return <div className="prose prose-invert max-w-none">{parsedContent}</div>;
};