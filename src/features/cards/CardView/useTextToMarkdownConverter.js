import React from 'react';
import DomPurify from 'dompurify';
import marked from 'marked';

export default function useTextToMarkdownConverter(text) {
  const [ markdown, setMarkdown ] = React.useState();
  React.useMemo(() => {
    if (text) {
      setMarkdown(DomPurify.sanitize(marked(text, { breaks: true })));
    } else {
      setMarkdown();
    }
  }, [text]);
  return markdown;
}