import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function generateTangentAnalysisProblem() {
  const a = Math.floor(Math.random() * 4) + 1;
  const b = Math.floor(Math.random() * 5) - 2;
  const fx = (x) => a * Math.log(x) + b;
  const dfx = (x) => a / x;
  const f1 = fx(1);
  const df1 = dfx(1);
  const tangent = `${df1}·(x - 1) + ${f1}`;
  const gx = (x) => Math.log(x) - x + 1;
  return {
    a,
    b,
    fx: `f(x) = ${a}·ln(x) + ${b}`,
    tangent,
    f1: f1.toFixed(2),
    df1: df1.toFixed(2),
    g1: gx(1).toFixed(2),
    gxExpression: "g(x) = ln(x) - x + 1",
    dgxExpression: `g'(x) = 1/x - 1`
  };
}
function LnTangentAnalysis() {
  const [problem, setProblem] = useState(generateTangentAnalysisProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-10", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Étude d'une tangente et fonction ln" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit la fonction ",
      /* @__PURE__ */ jsx("strong", { children: problem.fx }),
      " définie sur ]0 ; +∞[."
    ] }),
    /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Déterminer l'équation de la tangente ",
        /* @__PURE__ */ jsx("strong", { children: "T₁" }),
        " à la courbe de ",
        /* @__PURE__ */ jsx("strong", { children: "f" }),
        " au point d'abscisse 1."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "a)" }),
        " Montrer qu'étudier la position relative de ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "𝒞",
          /* @__PURE__ */ jsx("sub", { children: "f" })
        ] }),
        " et de sa tangente revient à étudier le signe de ",
        /* @__PURE__ */ jsxs("strong", { children: [
          problem.a,
          "(ln(x) - x + 1)"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "b)" }),
        " Soit ",
        /* @__PURE__ */ jsx("strong", { children: problem.gxExpression }),
        ". Étudier le signe de g(x)."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "c)" }),
        " Calculer ",
        /* @__PURE__ */ jsx("strong", { children: "g(1)" }),
        " et en déduire le signe de g(x) sur ]0 ; +∞[."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "d)" }),
        " En déduire la position relative de ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "𝒞",
          /* @__PURE__ */ jsx("sub", { children: "f" })
        ] }),
        " et ",
        /* @__PURE__ */ jsx("strong", { children: "T₁" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mr-2", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "button is-light",
        onClick: () => {
          setProblem(generateTangentAnalysisProblem());
          setShowCorrection(false);
        },
        children: "Nouvel exercice"
      }
    ),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "f(1) =" }),
          " ",
          problem.f1,
          " ; ",
          /* @__PURE__ */ jsx("strong", { children: "f'(1) =" }),
          " ",
          problem.df1
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Équation de T₁ :" }),
          " y = ",
          problem.tangent
        ] }),
        /* @__PURE__ */ jsx("li", { children: "On étudie le signe de g(x) = ln(x) - x + 1." }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "g'(x) =" }),
          " ",
          problem.dgxExpression,
          " → g décroît sur ]0 ; 1[ et croît sur ]1 ; +∞["
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "g(1) =" }),
          " ",
          problem.g1
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Signe de g(x)" }),
          " : négatif puis positif, donc ln(x) < x - 1 sur ]0 ; 1[ et ln(x) > x - 1 sur ]1 ; +∞["
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Donc ",
          /* @__PURE__ */ jsx("strong", { children: "f(x) < T₁(x)" }),
          " sur ]0 ; 1[ et ",
          /* @__PURE__ */ jsx("strong", { children: "f(x) > T₁(x)" }),
          " sur ]1 ; +∞["
        ] })
      ] })
    ] })
  ] }) }) });
}

const $$Ex31T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Ln" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", LnTangentAnalysis, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_31_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_31_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_31_T.astro";
const $$url = "/Germain/ex/ex_31_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex31T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
