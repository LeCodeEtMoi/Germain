// src/components/MathTex.tsx
import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface Props {
  tex: string;
}

const MathTex: React.FC<Props> = ({ tex }) => {
  const html = katex.renderToString(tex, {
    throwOnError: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MathTex;
