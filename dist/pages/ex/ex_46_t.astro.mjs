import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateProblem() {
  const k = getRandomInt(1, 3);
  const a = getRandomInt(1, 4);
  const b = getRandomInt(1, 5);
  const limit = a;
  const isPositive = b >= 0;
  return { k, a, b, limit, isPositive };
}
function ExoTheoremeComparaison() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Théorème de comparaison – Limite d’une suite" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit la suite définie pour tout entier naturel ",
      /* @__PURE__ */ jsx(MathTex, { tex: "n \\geq 1" }),
      " par :"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2", children: /* @__PURE__ */ jsx(MathTex, { tex: `U_n = \\frac{${problem.a}n^{${problem.k}} + ${problem.b}}{n^{${problem.k}}}` }) }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "1. Montrer que ",
      /* @__PURE__ */ jsx(MathTex, { tex: `U_n ${problem.isPositive ? "\\geq" : "\\leq"} 1` }),
      " pour tout ",
      /* @__PURE__ */ jsx(MathTex, { tex: "n \\geq 1" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "2. En déduire la limite de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "U_n" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newExercise, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On peut écrire :",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(
          MathTex,
          {
            tex: `U_n = \\frac{${problem.a}n^{${problem.k}} + ${problem.b}}{n^{${problem.k}}} = ${problem.a} + \\frac{${problem.b}}{n^{${problem.k}}}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "Comme ",
        /* @__PURE__ */ jsx(MathTex, { tex: `\\frac{${problem.b}}{n^{${problem.k}}}` }),
        " est ",
        problem.isPositive ? "positif" : "négatif",
        " pour tout ",
        /* @__PURE__ */ jsx(MathTex, { tex: "n \\geq 1" }),
        ", on a :"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2", children: /* @__PURE__ */ jsx(MathTex, { tex: `U_n ${problem.isPositive ? "\\geq" : "\\leq"} ${problem.a}` }) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
        "Enfin, comme ",
        /* @__PURE__ */ jsx(MathTex, { tex: `\\frac{${problem.b}}{n^{${problem.k}}} \\to 0` }),
        ", on obtient :",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(MathTex, { tex: `\\lim_{n \\to +\\infty} U_n = ${problem.a}` })
      ] })
    ] })
  ] });
}

const $$Ex46T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExoTheoremeComparaison, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_46_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_46_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_46_T.astro";
const $$url = "/Germain/ex/ex_46_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex46T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
