import React from 'react';
import useTextToMarkdownConverter from './useTextToMarkdownConverter';

describe('useTextToMarkdownConverter', () => {
  test('render plain "hello" text', () => {
    const setMarkdown = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [undefined, setMarkdown]);
    jest.spyOn(React, 'useMemo').mockImplementation(fn => fn());
    useTextToMarkdownConverter('hello');
    expect(setMarkdown).toBeCalledWith('<p>hello</p>\n');
  });

  test('render a bullet list', () => {
    const setMarkdown = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [undefined, setMarkdown]);
    jest.spyOn(React, 'useMemo').mockImplementation(fn => fn());
    useTextToMarkdownConverter('- one\n- two');
    expect(setMarkdown).toBeCalledWith('<ul>\n<li>one</li>\n<li>two</li>\n</ul>\n');
  });

  test('no text given sets markdown to undefined', () => {
    const setMarkdown = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [undefined, setMarkdown]);
    jest.spyOn(React, 'useMemo').mockImplementation(fn => fn());
    useTextToMarkdownConverter(undefined);
    expect(setMarkdown).toBeCalledWith();
  });

  test('returns markdown', () => {
    const setMarkdown = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => ['markdownValue', setMarkdown]);
    jest.spyOn(React, 'useMemo').mockImplementation(() => {});
    const markdown = useTextToMarkdownConverter('textValue');
    expect(markdown).toBe('markdownValue');
  });
});