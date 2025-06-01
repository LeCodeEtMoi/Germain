import { jsx } from 'react/jsx-runtime';
import 'react';
import katex from 'katex';
/* empty css                           */

const MathTex = ({ tex }) => {
  const html = katex.renderToString(tex, {
    throwOnError: false
  });
  return /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: html } });
};

export { MathTex as M };
