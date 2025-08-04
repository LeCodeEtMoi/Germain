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
  const mean = getRandomInt(500, 1500);
  const variance = getRandomInt(1e3, 5e3);
  const stdDev = Math.sqrt(variance);
  const a = getRandomInt(2, 4) * stdDev;
  return {
    mean,
    variance,
    stdDev: Math.round(stdDev * 100) / 100,
    a: Math.round(a * 100) / 100,
    upperBoundProb: Math.round(variance / (a * a) * 1e4) / 1e4
  };
}
function InegaliteBienayme() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Inégalité de Bienaymé-Tchebychev" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On étudie le débit ",
      /* @__PURE__ */ jsx(MathTex, { tex: "D" }),
      " (en m³/s) d’un fleuve à un instant ",
      /* @__PURE__ */ jsx(MathTex, { tex: "t" }),
      ". On sait que :"
    ] }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(D) = ${problem.mean}` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `V(D) = ${problem.variance}` }) })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Donner une majoration de la probabilité suivante :" }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(MathTex, { tex: `P(|D - ${problem.mean}| geq ${problem.a})` }) }),
    /* @__PURE__ */ jsx("p", { children: "Interpréter ce résultat dans le contexte." }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "En déduire une minoration de la probabilité que le débit soit compris entre ",
      /* @__PURE__ */ jsx(MathTex, { tex: `${problem.mean - problem.a}` }),
      " et ",
      /* @__PURE__ */ jsx(MathTex, { tex: `${problem.mean + problem.a}` }),
      "."
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newExercise, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Inégalité de Bienaymé-Tchebychev :" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(MathTex, { tex: `P(|D - ${problem.mean}| geq ${problem.a}) leq \frac{${problem.variance}}{(${problem.a})^2} = ${problem.upperBoundProb}` })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
          /* @__PURE__ */ jsx("strong", { children: "Interprétation :" }),
          /* @__PURE__ */ jsx("br", {}),
          "La probabilité que le débit s’écarte de plus de ",
          problem.a,
          " m³/s de la moyenne ",
          problem.mean,
          " m³/s est inférieure à ",
          problem.upperBoundProb,
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "mt-3", children: [
          /* @__PURE__ */ jsx("strong", { children: "Minoration de la probabilité :" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(MathTex, { tex: `P(${problem.mean - problem.a} < D < ${problem.mean + problem.a}) geq 1 - ${problem.upperBoundProb} = ${Math.round((1 - problem.upperBoundProb) * 1e4) / 1e4}` })
        ] })
      ] })
    ] })
  ] });
}

const $$Ex43T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", InegaliteBienayme, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_43_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_43_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_43_T.astro";
const $$url = "/Germain/ex/ex_43_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex43T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
