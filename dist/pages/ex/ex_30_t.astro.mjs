import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function generateAuxiliaryFunctionExercise() {
  const a = 2 + Math.floor(Math.random() * 3);
  const b = 1 + Math.floor(Math.random() * 3);
  const c = 1 + Math.floor(Math.random() * 4);
  const phi = `ϕ(x) = x^2 - ${b} + ${c} ln(x)`;
  const fx = `(x^2 - ${a}x - ${b} - ${c}ln(x)) / x`;
  return {
    phi,
    fx,
    a,
    b,
    c
  };
}
function EtudeFonctionAuxiliaire() {
  const [exercise, setExercise] = useState(generateAuxiliaryFunctionExercise());
  const [showCorrection, setShowCorrection] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Étudier une fonction à l'aide d'une fonction auxiliaire" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit la fonction ",
      /* @__PURE__ */ jsx("strong", { children: "f" }),
      " définie sur ]0 ; +∞[ par :"
    ] }),
    /* @__PURE__ */ jsxs("pre", { children: [
      "f(x) = ",
      exercise.fx
    ] }),
    /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Soit ",
        /* @__PURE__ */ jsx("strong", { children: "ϕ" }),
        " définie sur ]0 ; +∞[ par :",
        /* @__PURE__ */ jsx("pre", { children: exercise.phi }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "a) Calculer ϕ(1) et la limite de ϕ en 0" }),
          /* @__PURE__ */ jsx("li", { children: "b) Étudier les variations de ϕ sur ]0 ; +∞[. En déduire le signe de ϕ(x)." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "a) Calculer les limites de f aux bornes de ]0 ; +∞[.",
        /* @__PURE__ */ jsx("br", {}),
        "b) Montrer que, sur ]0 ; +∞[, ",
        /* @__PURE__ */ jsx("strong", { children: "f'(x) = ϕ(x)/x²" }),
        ".",
        /* @__PURE__ */ jsx("br", {}),
        "En déduire le tableau de variations de f."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "button is-light",
          onClick: () => {
            setExercise(generateAuxiliaryFunctionExercise());
            setShowCorrection(false);
          },
          children: "Nouvel exercice"
        }
      )
    ] }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On définit la fonction auxiliaire ϕ(x) = x² - ",
        exercise.b,
        " + ",
        exercise.c,
        "·ln(x).",
        /* @__PURE__ */ jsx("br", {}),
        "• ϕ(1) = 1 - ",
        exercise.b,
        " + ",
        exercise.c,
        "·ln(1) = ",
        1 - exercise.b,
        ".",
        /* @__PURE__ */ jsx("br", {}),
        "• lim(x→0⁺) ϕ(x) = -∞ (car ln(x) → -∞).",
        /* @__PURE__ */ jsx("br", {}),
        "• ϕ'(x) = 2x + ",
        exercise.c,
        "/x, donc signe de ϕ'(x) > 0 : ϕ est strictement croissante.",
        /* @__PURE__ */ jsx("br", {}),
        "• On en déduit que ϕ(x) < 0 puis > 0, donc on peut étudier le signe.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        "Pour f(x) = (",
        `x² - ${exercise.a}x - ${exercise.b} - ${exercise.c}ln(x)`,
        ") / x :",
        /* @__PURE__ */ jsx("br", {}),
        "• On étudie lim(x→0⁺) f(x) et lim(x→∞) f(x).",
        /* @__PURE__ */ jsx("br", {}),
        "• f'(x) = ϕ(x) / x², donc f' a le signe de ϕ.",
        /* @__PURE__ */ jsx("br", {}),
        "• On peut ainsi dresser le tableau de variations de f."
      ] })
    ] })
  ] });
}

const $$Ex30T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Ln" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", EtudeFonctionAuxiliaire, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_30_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_30_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_30_T.astro";
const $$url = "/Germain/ex/ex_30_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex30T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
