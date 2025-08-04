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
  const n = getRandomInt(3, 8);
  const p = getRandomInt(1, 9) / 10;
  return {
    n,
    p,
    esperance: n * p
  };
}
function SommeBernoulli() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Somme de variables de loi Bernoulli" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soient ",
      /* @__PURE__ */ jsx(MathTex, { tex: `X_1, X_2, \\dots, X_${problem.n}` }),
      " des variables aléatoires **indépendantes** suivant la loi de Bernoulli de paramètre ",
      /* @__PURE__ */ jsx(MathTex, { tex: `p = ${problem.p}` }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On définit ",
      /* @__PURE__ */ jsx(MathTex, { tex: `S = X_1 + X_2 + \\dots + X_${problem.n}` }),
      "."
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Questions :" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Quelle est la loi de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "S" }),
        " ?"
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Déterminer son espérance ",
        /* @__PURE__ */ jsx(MathTex, { tex: "E(S)" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newExercise, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `S \\sim \\mathcal{B}(${problem.n}, ${problem.p})` }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `E(S) = n \\cdot p = ${problem.n} \\cdot ${problem.p} = ${problem.esperance}` }) })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Interprétation : la variable aléatoire \\( S \\) suit une **loi binomiale** car c’est la somme de \\( $",
        problem.n,
        " \\) essais de Bernoulli indépendants avec la même probabilité de succès."
      ] })
    ] })
  ] });
}

const $$Ex42T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", SommeBernoulli, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_42_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_42_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_42_T.astro";
const $$url = "/Germain/ex/ex_42_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex42T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
