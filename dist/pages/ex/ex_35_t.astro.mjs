import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
const possibleA = [5, 10, 20, 50];
const approxLn2 = Math.log(2);
function ExoMedicament() {
  const A = getRandomElement(possibleA);
  const exactK = approxLn2 / 3;
  const limitQ = A / exactK;
  const [userStep, setUserStep] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Modélisation d’un médicament dans le sang" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On injecte un médicament à concentration constante. Sa quantité dans le sang au temps ",
      /* @__PURE__ */ jsx(MathTex, { tex: "t" }),
      " est modélisée par la fonction ",
      /* @__PURE__ */ jsx(MathTex, { tex: "Q(t)" }),
      ", solution de :"
    ] }),
    /* @__PURE__ */ jsx(MathTex, { tex: `Q'(t) = ${A} - k Q(t)` }),
    /* @__PURE__ */ jsxs("p", { children: [
      "avec ",
      /* @__PURE__ */ jsx(MathTex, { tex: "Q(0) = 0" }),
      " et ",
      /* @__PURE__ */ jsx(MathTex, { tex: "k > 0" }),
      " constant."
    ] }),
    /* @__PURE__ */ jsxs("ol", { className: "mt-4", children: [
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Exprimez" }),
        " ",
        /* @__PURE__ */ jsx(MathTex, { tex: "Q(t)" }),
        " en fonction de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "A" }),
        ", ",
        /* @__PURE__ */ jsx(MathTex, { tex: "k" }),
        " et ",
        /* @__PURE__ */ jsx(MathTex, { tex: "t" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mt-2", children: [
        /* @__PURE__ */ jsx("strong", { children: "Déterminez" }),
        " ",
        /* @__PURE__ */ jsx(MathTex, { tex: "lim_{t 	o +infty} Q(t)" }),
        ". Cette limite dépend-elle de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "k" }),
        " ? Interprétez."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mt-2", children: [
        "Sachant que ",
        /* @__PURE__ */ jsx(MathTex, { tex: `Q(3) = dfrac{1}{2} cdot dfrac{${A}}{k}` }),
        ", ",
        /* @__PURE__ */ jsx("strong", { children: "calculez" }),
        " la valeur de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "k" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "buttons mt-4", children: !showCorrection && /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: () => setShowCorrection(true), children: "Afficher la correction" }) }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "1. Résolution :" }) }),
      /* @__PURE__ */ jsx(MathTex, { tex: `Q(t) = \\frac{${A}}{k} left(1 - e^{-kt} \right)` }),
      /* @__PURE__ */ jsx("p", { className: "mt-3", children: /* @__PURE__ */ jsx("strong", { children: "2. Limite :" }) }),
      /* @__PURE__ */ jsx(MathTex, { tex: `\\lim_{t 	o +infty} Q(t) = \\frac{${A}}{k}` }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Oui, cette limite dépend de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "k" }),
        ". Plus ",
        /* @__PURE__ */ jsx(MathTex, { tex: "k" }),
        " est grand, plus le médicament est éliminé rapidement, donc la quantité stabilisée ",
        /* @__PURE__ */ jsx("em", { children: "diminue" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3", children: /* @__PURE__ */ jsx("strong", { children: "3. Calcul de k :" }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On résout : ",
        /* @__PURE__ */ jsx(MathTex, { tex: `\\frac{${A}}{k} left(1 - e^{-3k} \right) = \\frac{1}{2} cdot \\frac{${A}}{k}` })
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(MathTex, { tex: `1 - e^{-3k} = 0.5 Rightarrow e^{-3k} = 0.5 Rightarrow k = \\frac{\\ln(2)}{3} approx ${exactK.toFixed(3)}` }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "La limite ",
        /* @__PURE__ */ jsx(MathTex, { tex: "Q(t)" }),
        " vaut donc environ ",
        /* @__PURE__ */ jsxs("strong", { children: [
          limitQ.toFixed(2),
          " mg"
        ] }),
        "."
      ] })
    ] })
  ] });
}

const $$Ex35T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExoMedicament, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_35_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_35_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_35_T.astro";
const $$url = "/Germain/ex/ex_35_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex35T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
