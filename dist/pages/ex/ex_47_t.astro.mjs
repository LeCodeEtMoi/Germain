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
  const a = getRandomInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
  const k = getRandomInt(1, 3);
  return {
    a,
    k,
    simplifiedExponent: k === 1 ? "" : `^{${k}}`,
    limit: 0
  };
}
function ExoGendarmes() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Théorème des gendarmes – Limite d’une suite" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On considère la suite définie pour tout entier naturel ",
      /* @__PURE__ */ jsx(MathTex, { tex: "n \\geq 1" }),
      " par :"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2", children: /* @__PURE__ */ jsx(MathTex, { tex: `u_n = \\frac{${problem.a}\\sin(n)}{n${problem.simplifiedExponent}}` }) }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "Déterminer la limite de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "u_n" }),
      " lorsque ",
      /* @__PURE__ */ jsx(MathTex, { tex: "n \\\\to +\\\\infty" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newExercise, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On sait que pour tout ",
        /* @__PURE__ */ jsx(MathTex, { tex: "n \\in \\mathbb{N}" }),
        ", on a :",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(MathTex, { tex: `-1 \\leq \\sin(n) \\leq 1` })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "En multipliant par ",
        problem.a,
        " (constante), on obtient :",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(MathTex, { tex: `${-Math.abs(problem.a)} \\leq ${problem.a}\\sin(n) \\leq ${Math.abs(problem.a)}` })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "En divisant par ",
        /* @__PURE__ */ jsx(MathTex, { tex: `n${problem.simplifiedExponent}` }),
        ", strictement positif, on encadre :",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(MathTex, { tex: `\\frac{${-Math.abs(problem.a)}}{n${problem.simplifiedExponent}} \\leq u_n \\leq \\frac{${Math.abs(problem.a)}}{n${problem.simplifiedExponent}}` })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "Or, ",
        /* @__PURE__ */ jsx(MathTex, { tex: `\\frac{${Math.abs(problem.a)}}{n${problem.simplifiedExponent}} \\to 0` }),
        " quand ",
        /* @__PURE__ */ jsx(MathTex, { tex: "n \\\\to +\\\\infty" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "Par le théorème des gendarmes, on en déduit que :",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(MathTex, { tex: `\\lim_{n \\to +\\infty} u_n = 0` })
      ] })
    ] })
  ] });
}

const $$Ex47T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExoGendarmes, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_47_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_47_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_47_T.astro";
const $$url = "/Germain/ex/ex_47_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex47T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
