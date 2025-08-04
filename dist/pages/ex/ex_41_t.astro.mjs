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
  const EX = getRandomInt(-5, 5);
  const VX = getRandomInt(1, 5);
  const EY = getRandomInt(-5, 5);
  const a = getRandomInt(2, 4);
  return {
    EX,
    VX,
    EY,
    a,
    E_X_plus_Y: EX + EY,
    E_aX: a * EX,
    V_aX: a * a * VX
  };
}
function EsperanceVarianceExercise() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Espérance et Variance" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On considère deux variables aléatoires ",
      /* @__PURE__ */ jsx(MathTex, { tex: "X" }),
      " et ",
      /* @__PURE__ */ jsx(MathTex, { tex: "Y" }),
      " telles que :"
    ] }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(X) = ${problem.EX}` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `V(X) = ${problem.VX}` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(Y) = ${problem.EY}` }) })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Calculer les valeurs suivantes :" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(X + Y)` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(${problem.a}X)` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `V(${problem.a}X)` }) })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newExercise, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(X + Y) = E(X) + E(Y) = ${problem.EX} + ${problem.EY} = ${problem.E_X_plus_Y}` }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(${problem.a}X) = ${problem.a} \\cdot E(X) = ${problem.a} \\cdot ${problem.EX} = ${problem.E_aX}` }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `V(${problem.a}X) = ${problem.a}^2 \\cdot V(X) = ${problem.a ** 2} \\cdot ${problem.VX} = ${problem.V_aX}` }) })
      ] })
    ] })
  ] });
}

const $$Ex41T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", EsperanceVarianceExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_41_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_41_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_41_T.astro";
const $$url = "/Germain/ex/ex_41_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex41T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
