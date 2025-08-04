import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function generateTrigFunction() {
  const type = Math.random() < 0.5 ? "cos" : "sin";
  const a = Math.floor(Math.random() * 5 + 1);
  const b = -2 * a;
  const c = 0;
  const expression = `${a}${type}²(x) ${b >= 0 ? "+" : "-"} ${Math.abs(b)}${type}(x)`;
  return {
    type,
    a,
    b,
    c,
    expression
  };
}
function TrigFunctionStudy() {
  const [func, setFunc] = useState(generateTrigFunction());
  const [showCorrection, setShowCorrection] = useState(false);
  const { type, a, b, expression } = func;
  const period = "2π";
  const interval = "[0, 2π]";
  const extremumPoint = b / (2 * a);
  const extremumTrig = type === "cos" ? `cos(x) = ${extremumPoint}` : `sin(x) = ${extremumPoint}`;
  const derivée = `f'(x) = ${2 * a}${type}(x)·${type === "cos" ? "-sin(x)" : "cos(x)"} + ${b}${type === "cos" ? "-sin(x)" : "cos(x)"}`;
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-10", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Étude d’une fonction trigonométrique" }),
    /* @__PURE__ */ jsx("p", { children: "On considère la fonction suivante définie sur ℝ :" }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered my-4", children: /* @__PURE__ */ jsxs("strong", { children: [
      "f(x) = ",
      expression
    ] }) }),
    /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "Montrer que f est périodique" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "Quel intervalle peut-on prendre comme intervalle d’étude ?" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "Dresser le tableau de variation de f sur [0, 2π]" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: () => {
        setFunc(generateTrigFunction());
        setShowCorrection(false);
      }, children: "Nouvel exercice" })
    ] }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "1. f est périodique" }),
          " car elle est composée de fonctions périodiques de période ",
          /* @__PURE__ */ jsx("strong", { children: period }),
          " (cos² ou sin²)."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "2. Intervalle d’étude" }),
          " : ",
          /* @__PURE__ */ jsx("strong", { children: interval }),
          ", une période complète suffit à étudier f."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "3. Étude des variations :" }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Posons ",
              /* @__PURE__ */ jsxs("strong", { children: [
                "u(x) = ",
                type,
                "(x)"
              ] }),
              ", alors ",
              /* @__PURE__ */ jsxs("strong", { children: [
                "f(x) = ",
                a,
                "·u² + ",
                b,
                "·u"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "C’est une fonction polynomiale du second degré en u, qui atteint un extremum pour ",
              /* @__PURE__ */ jsxs("strong", { children: [
                "u = ",
                extremumPoint
              ] }),
              " donc ",
              extremumTrig
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "La dérivée est : ",
              /* @__PURE__ */ jsx("code", { children: derivée })
            ] }),
            /* @__PURE__ */ jsx("li", { children: "On étudie les signes de cette dérivée sur [0, 2π] pour en déduire le tableau de variations." })
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}

const $$Ex25T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "\xC9tude de fonction  trigonom\xE9trique" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", TrigFunctionStudy, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_25_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_25_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_25_T.astro";
const $$url = "/Germain/ex/ex_25_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex25T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
