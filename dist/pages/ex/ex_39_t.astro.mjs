import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

const functions = [
  {
    id: "x2",
    tex: "f(x) = x^2",
    f: (x) => x * x,
    primitive: (x) => 1 / 3 * x ** 3,
    answerTex: "\\frac{1}{3}(x^3)"
  },
  {
    id: "x3",
    tex: "f(x) = x^3",
    f: (x) => x ** 3,
    primitive: (x) => 1 / 4 * x ** 4,
    answerTex: "\\frac{1}{4}(x^4)"
  },
  {
    id: "2x",
    tex: "f(x) = 2x",
    f: (x) => 2 * x,
    primitive: (x) => x ** 2,
    answerTex: "x^2"
  },
  {
    id: "x+1",
    tex: "f(x) = x + 1",
    f: (x) => x + 1,
    primitive: (x) => 0.5 * x ** 2 + x,
    answerTex: "\\frac{1}{2}x^2 + x"
  }
];
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
const a = -5;
const b = -3;
function AireSousCourbe() {
  const [func] = useState(pickRandom(functions));
  const [showCorrection, setShowCorrection] = useState(false);
  const aire = Math.abs(func.primitive(b) - func.primitive(a));
  return /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Aire sous une courbe" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit la fonction définie par ",
      /* @__PURE__ */ jsx(MathTex, { tex: func.tex }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On note ",
      /* @__PURE__ */ jsx("strong", { children: "A" }),
      " l’aire, en unités d’aire, de la région comprise entre la courbe de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
      " et l’axe des abscisses, entre ",
      /* @__PURE__ */ jsx(MathTex, { tex: "x = -5" }),
      " et ",
      /* @__PURE__ */ jsx(MathTex, { tex: "x = -3" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Voir la correction" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On utilise la formule : ",
        /* @__PURE__ */ jsx(MathTex, { tex: "A = \\int_{-5}^{-3} f(x) dx" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On connaît une primitive de ",
        /* @__PURE__ */ jsx(MathTex, { tex: func.tex }),
        " :"
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(MathTex, { tex: `F(x) = ${func.answerTex}` }) }),
      /* @__PURE__ */ jsx("p", { children: "Donc :" }),
      /* @__PURE__ */ jsx(MathTex, { tex: `A = \\left[ F(x) \\right]_{-5}^{-3} = F(-3) - F(-5)` }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
        "Aire ≈ ",
        aire.toFixed(2),
        " unités d’aire"
      ] }) })
    ] })
  ] });
}

const $$Ex39T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", AireSousCourbe, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_39_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_39_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_39_T.astro";
const $$url = "/Germain/ex/ex_39_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex39T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
