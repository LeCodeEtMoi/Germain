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
  const a = getRandomInt(1, 3);
  return {
    u0: a,
    v0: a + 2
  };
}
function ExoSuitesMonotones() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Théorème de convergence des suites monotones" }),
    /* @__PURE__ */ jsx("p", { children: "On considère deux suites définies par récurrence :" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `u_0 = ${problem.u0}` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `v_0 = ${problem.v0}` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `u_{n+1} = \\frac{u_n + v_n}{2}` }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `v_{n+1} = \\sqrt{u_n v_n}` }) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
      "Montrer que ",
      /* @__PURE__ */ jsx(MathTex, { tex: "(u_n)" }),
      " est croissante, ",
      /* @__PURE__ */ jsx(MathTex, { tex: "(v_n)" }),
      " est décroissante, et que ces suites convergent vers la même limite."
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newExercise, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On a ",
        /* @__PURE__ */ jsx(MathTex, { tex: `u_0 = ${problem.u0} < ${problem.v0} = v_0` }),
        ". Montrons que cette propriété est conservée à chaque rang."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "Si ",
        /* @__PURE__ */ jsx(MathTex, { tex: "u_n \\leq v_n" }),
        ", alors :",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: "u_{n+1} = \\frac{u_n + v_n}{2} \\leq \\frac{v_n + v_n}{2} = v_n" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: "v_{n+1} = \\sqrt{u_n v_n} \\geq \\sqrt{u_n u_n} = u_n" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Donc on a toujours ",
        /* @__PURE__ */ jsx(MathTex, { tex: "u_n \\leq v_n" }),
        " et :",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(MathTex, { tex: "u_{n+1} \\geq u_n" }),
            " ⇒ la suite ",
            /* @__PURE__ */ jsx(MathTex, { tex: "(u_n)" }),
            " est croissante,"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(MathTex, { tex: "v_{n+1} \\leq v_n" }),
            " ⇒ la suite ",
            /* @__PURE__ */ jsx(MathTex, { tex: "(v_n)" }),
            " est décroissante."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "De plus, on a toujours ",
        /* @__PURE__ */ jsx(MathTex, { tex: "u_n \\leq v_n" }),
        " donc :",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(MathTex, { tex: "(u_n)" }),
            " est croissante et **majorée** par ",
            /* @__PURE__ */ jsx(MathTex, { tex: "v_0" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(MathTex, { tex: "(v_n)" }),
            " est décroissante et **minorée** par ",
            /* @__PURE__ */ jsx(MathTex, { tex: "u_0" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Par le **théorème de convergence des suites monotones**, les deux suites **convergent**." }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "En fait, on a même ",
        /* @__PURE__ */ jsx("strong", { children: "convergence vers une même limite" }),
        " ",
        /* @__PURE__ */ jsx(MathTex, { tex: "ℓ" }),
        " :",
        /* @__PURE__ */ jsx("br", {}),
        "Si ",
        /* @__PURE__ */ jsx(MathTex, { tex: "u_n \\to ℓ" }),
        " et ",
        /* @__PURE__ */ jsx(MathTex, { tex: "v_n \\to ℓ" }),
        " alors :",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: "u_{n+1} = \\frac{u_n + v_n}{2} \\to \\frac{ℓ + ℓ}{2} = ℓ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: "v_{n+1} = \\sqrt{u_n v_n} \\to \\sqrt{ℓ \\cdot ℓ} = ℓ" }) })
        ] }),
        "Donc les deux suites convergent vers la même limite ℓ."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
        "Ce processus est une forme de **moyenne arithmético-géométrique**, connue pour converger vers une valeur entre ",
        /* @__PURE__ */ jsx(MathTex, { tex: "u_0" }),
        " et ",
        /* @__PURE__ */ jsx(MathTex, { tex: "v_0" }),
        "."
      ] })
    ] })
  ] });
}

const $$Ex48T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExoSuitesMonotones, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_48_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_48_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_48_T.astro";
const $$url = "/Germain/ex/ex_48_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex48T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
