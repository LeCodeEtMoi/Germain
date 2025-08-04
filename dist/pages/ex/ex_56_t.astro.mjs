import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

function generatePolynomial() {
  const a = Math.floor(Math.random() * 3 + 1);
  const b = Math.floor(Math.random() * 10 - 5);
  const c = Math.floor(Math.random() * 6 - 3);
  const d = Math.floor(Math.random() * 6 - 3);
  return { a, b, c, d };
}
const ExerciceConvexiteAvancee = () => {
  const [showCorrection, setShowCorrection] = useState(false);
  const { a, b, c, d } = generatePolynomial();
  const xInflexion = -b / (3 * a);
  return /* @__PURE__ */ jsxs("div", { className: "box my-5", children: [
    /* @__PURE__ */ jsxs("h2", { className: "title is-4", children: [
      "Convexité d'une fonction à partir de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit la fonction ",
      /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${a}x^3 ${b >= 0 ? "+" : ""}${b}x^2 ${c >= 0 ? "+" : ""}${c}x ${d >= 0 ? "+" : ""}${d}` }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On souhaite étudier la convexité et la concavité de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
      " sur ",
      /* @__PURE__ */ jsx(MathTex, { tex: "\\mathbb{R}" }),
      " à partir du signe de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("ol", { className: "my-4", children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "1. Calculer la dérivée seconde ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "2. Résoudre ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f''(x) = 0" }),
        " pour trouver les points d'inflexion éventuels."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "3. Étudier le signe de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" }),
        " sur ",
        /* @__PURE__ */ jsx(MathTex, { tex: "\\mathbb{R}" }),
        " et en déduire les intervalles de convexité et de concavité de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-link mt-4", onClick: () => setShowCorrection(!showCorrection), children: showCorrection ? "Masquer la correction" : "Afficher la correction" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "content mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "1. Dérivée seconde :" }) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(MathTex, { tex: `f''(x) = ${6 * a}x ${2 * b >= 0 ? "+" : ""}${2 * b}` }) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
        "2. Résolution de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f''(x) = 0" })
      ] }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On résout : ",
        /* @__PURE__ */ jsx(MathTex, { tex: `${6 * a}x + ${2 * b} = 0` }),
        " ⇔",
        /* @__PURE__ */ jsx(MathTex, { tex: `x = ${xInflexion.toFixed(2)}` })
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
        "3. Étude du signe de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" })
      ] }) }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "Pour ",
          /* @__PURE__ */ jsx(MathTex, { tex: `x < ${xInflexion.toFixed(2)}` }),
          " : ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" }),
          " est de signe ",
          6 * a < 0 ? "négatif" : "positif",
          " ⇒ ",
          /* @__PURE__ */ jsxs("strong", { children: [
            "f est ",
            6 * a < 0 ? "concave" : "convexe"
          ] }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Pour ",
          /* @__PURE__ */ jsx(MathTex, { tex: `x > ${xInflexion.toFixed(2)}` }),
          " : ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" }),
          " est de signe ",
          6 * a > 0 ? "positif" : "négatif",
          " ⇒ ",
          /* @__PURE__ */ jsxs("strong", { children: [
            "f est ",
            6 * a > 0 ? "convexe" : "concave"
          ] }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Conclusion :" }),
        " la fonction f change de concavité en ",
        /* @__PURE__ */ jsx(MathTex, { tex: `x = ${xInflexion.toFixed(2)}` }),
        ", ce qui est un ",
        /* @__PURE__ */ jsx("em", { children: "point d'inflexion" }),
        "."
      ] })
    ] })
  ] });
};

const $$Ex56T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExerciceConvexiteAvancee, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_56_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_56_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_56_T.astro";
const $$url = "/Germain/ex/ex_56_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex56T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
