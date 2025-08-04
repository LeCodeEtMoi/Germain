import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

const ExerciceFonctionComposee = () => {
  const [showCorrection, setShowCorrection] = useState(false);
  const a = Math.floor(Math.random() * 4 + 1);
  const b = Math.floor(Math.random() * 10 - 5);
  const c = Math.floor(Math.random() * 3 + 1);
  const d = Math.floor(Math.random() * 10 - 5);
  return /* @__PURE__ */ jsxs("div", { className: "box my-5", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Calcul d'une fonction composée" }),
    /* @__PURE__ */ jsx("p", { children: "On considère deux fonctions définies par :" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${a}x ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `g(x) = ${c}x^2 ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}` }) })
    ] }),
    /* @__PURE__ */ jsxs("ol", { className: "mt-3", children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "1. Calculer l'expression de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f \\circ g(x)" }),
        ", c’est-à-dire ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f(g(x))" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mt-2", children: [
        "2. Calculer l'expression de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "g \\circ f(x)" }),
        ", c’est-à-dire ",
        /* @__PURE__ */ jsx(MathTex, { tex: "g(f(x))" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-link mt-4", onClick: () => setShowCorrection(!showCorrection), children: showCorrection ? "Masquer la correction" : "Afficher la correction" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "content mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
        "1. Calcul de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f(g(x))" })
      ] }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On remplace ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x" }),
        " par ",
        /* @__PURE__ */ jsx(MathTex, { tex: `g(x) = ${c}x^2 ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}` }),
        " dans ",
        /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${a}x ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}` }),
        " :"
      ] }),
      /* @__PURE__ */ jsx(MathTex, { tex: `f(g(x)) = ${a}(${c}x^2 ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}) ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}` }),
      /* @__PURE__ */ jsx(MathTex, { tex: `= ${a * c}x^2 ${a * d + b >= 0 ? "+ " + (a * d + b) : "- " + Math.abs(a * d + b)}` }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
        "2. Calcul de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "g(f(x))" })
      ] }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On remplace ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x" }),
        " par ",
        /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${a}x ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}` }),
        " dans ",
        /* @__PURE__ */ jsx(MathTex, { tex: `g(x) = ${c}x^2 ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}` }),
        " :"
      ] }),
      /* @__PURE__ */ jsx(MathTex, { tex: `g(f(x)) = ${c}(${a}x ${b >= 0 ? "+ " + b : "- " + Math.abs(b)})^2 ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}` }),
      /* @__PURE__ */ jsx(MathTex, { tex: `= ${c}(${a * a}x^2 ${2 * a * b >= 0 ? "+ " + 2 * a * b : "- " + Math.abs(2 * a * b)}x ${b * b >= 0 ? "+ " + b * b : "- " + Math.abs(b * b)}) ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}` }),
      /* @__PURE__ */ jsx(MathTex, { tex: `= ${c * a * a}x^2 ${c * 2 * a * b >= 0 ? "+ " + c * 2 * a * b : "- " + Math.abs(c * 2 * a * b)}x ${c * b * b + d >= 0 ? "+ " + (c * b * b + d) : "- " + Math.abs(c * b * b + d)}` })
    ] })
  ] });
};

const $$Ex53T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExerciceFonctionComposee, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_53_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_53_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_53_T.astro";
const $$url = "/Germain/ex/ex_53_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex53T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
