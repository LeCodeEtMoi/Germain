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
  const a = getRandomInt(1, 4);
  const b = a + getRandomInt(1, 3);
  const coef = getRandomInt(1, 3);
  const fType = Math.random() > 0.5 ? "x" : "cos(x)";
  const m = fType === "x" ? coef * a : -coef;
  const M = fType === "x" ? coef * b : coef;
  return {
    a,
    b,
    f: `${coef === 1 ? "" : coef}·${fType}`,
    m,
    M,
    lowerBound: m * (b - a),
    upperBound: M * (b - a)
  };
}
function IntegralBoundingExercise() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const newProblem = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Encadrement d'une intégrale" }),
    /* @__PURE__ */ jsx("p", { children: "On considère la fonction :" }),
    /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${problem.f}` }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Définie sur l’intervalle ",
      /* @__PURE__ */ jsx(MathTex, { tex: `[${problem.a}; ${problem.b}]` }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On admet que pour tout ",
      /* @__PURE__ */ jsx(MathTex, { tex: "x" }),
      " de cet intervalle : ",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(MathTex, { tex: `${problem.m} \\leq f(x) \\leq ${problem.M}` })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Encadrez l'intégrale ",
      /* @__PURE__ */ jsx(MathTex, { tex: `\\int_{${problem.a}}^{${problem.b}} f(x) dx` }),
      "."
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newProblem, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsx("p", { children: "D’après l’encadrement donné, on a :" }),
      /* @__PURE__ */ jsx(MathTex, { tex: `\\int_{${problem.a}}^{${problem.b}} f(x) dx \\in [${problem.lowerBound} ; ${problem.upperBound}]` })
    ] })
  ] });
}

const $$Ex40T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", IntegralBoundingExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_40_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_40_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_40_T.astro";
const $$url = "/Germain/ex/ex_40_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex40T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
