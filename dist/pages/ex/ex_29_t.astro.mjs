import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function generateLnSimplificationProblem() {
  const choice = Math.floor(Math.random() * 4);
  let question = "";
  let solution = "";
  switch (choice) {
    case 0:
      const a1 = Math.floor(Math.random() * 5) + 10;
      const b1 = Math.floor(Math.random() * 5) + 10;
      question = `ln(${a1}/${b1})`;
      solution = `ln(${a1}) - ln(${b1})`;
      break;
    case 1:
      const a2 = Math.floor(Math.random() * 4) + 10;
      const b2 = Math.floor(Math.random() * 4) + 10;
      question = `ln(${a2}) + ln(${b2})`;
      solution = `ln(${a2 * b2})`;
      break;
    case 2:
      const base = Math.floor(Math.random() * 4) + 10;
      const expo = Math.floor(Math.random() * 3) + 10;
      question = `ln(${base}^${expo})`;
      solution = `${expo} * ln(${base})`;
      break;
    case 3:
      const a3 = Math.floor(Math.random() * 10) + 2;
      question = `ln(√${a3})`;
      solution = `(1/2) * ln(${a3})`;
      break;
  }
  return {
    question,
    solution
  };
}
function LnAlgebraicProperties() {
  const [problem, setProblem] = useState(generateLnSimplificationProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-8", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Simplification avec les propriétés de ln" }),
    /* @__PURE__ */ jsx("p", { children: "Simplifiez l'expression suivante :" }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered is-size-5 my-4", children: /* @__PURE__ */ jsx("strong", { children: problem.question }) }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mr-2", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "button is-light",
        onClick: () => {
          setProblem(generateLnSimplificationProblem());
          setShowCorrection(false);
        },
        children: "Nouvel exercice"
      }
    ),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Rappel :" }),
          " ln(ab) = ln(a) + ln(b), ln(a/b) = ln(a) - ln(b), ln(a^n) = n·ln(a), ln(√a) = (1/2)·ln(a)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Expression simplifiée :" }),
          " ",
          problem.solution
        ] })
      ] })
    ] })
  ] }) }) });
}

const $$Ex29T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Ln" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", LnAlgebraicProperties, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_29_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_29_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_29_T.astro";
const $$url = "/Germain/ex/ex_29_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex29T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
