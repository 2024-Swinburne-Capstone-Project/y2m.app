import React from 'react';
import { TextWithMarkup } from '@/types';

const parseTextWithMarkup = (textWithMarkup: TextWithMarkup): React.ReactNode => {
  const { text, markup } = textWithMarkup;

  if (!markup || markup.length === 0) {
    return text;
  }

  const parts = text.split(' ');
  const parsedParts = parts.map((part, index) => {
    const markupElement = markup.find((element) => element.text.includes(part));

    if (markupElement) {
      const { type, className } = markupElement;

      return React.createElement(type, { key: index, className }, part);
    }

    return part;
  });

  return (
    <>
      {parsedParts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index !== parsedParts.length - 1 && ' '}
        </React.Fragment>
      ))}
    </>
  );
};

export default parseTextWithMarkup;
