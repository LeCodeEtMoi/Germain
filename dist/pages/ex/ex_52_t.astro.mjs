import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

const ExerciceFonctionPrix = () => {
  const [showCorrection, setShowCorrection] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "box my-5", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Tarifs et continuité d'une fonction par morceaux" }),
    /* @__PURE__ */ jsx("p", { className: "mb-3", children: "Un grossiste pratique les tarifs suivants :" }),
    /* @__PURE__ */ jsxs("ul", { className: "mb-4", children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "• Pour moins de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "100\\ \\ell" }),
        ", le litre coûte 0,50 €."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "• Pour ",
        /* @__PURE__ */ jsx(MathTex, { tex: "100 \\leq x < 200" }),
        ", le litre coûte 0,40 €."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "• Pour ",
        /* @__PURE__ */ jsx(MathTex, { tex: "200 \\leq x \\leq 500" }),
        ", le litre coûte 0,35 €."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On appelle ",
      /* @__PURE__ */ jsx(MathTex, { tex: "x" }),
      " le nombre de litres consommés, et ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f(x)" }),
      " le prix payé en euros."
    ] }),
    /* @__PURE__ */ jsxs("ol", { className: "mt-4", children: [
      /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
        "1. Déterminer l'expression de ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f(x)" }),
        " pour ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x \\in [0; 500]" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "mb-4", children: [
        "2. La fonction ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
        " est-elle continue sur ",
        /* @__PURE__ */ jsx(MathTex, { tex: "[0; 500]" }),
        " ?"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "button is-primary",
        onClick: () => setShowCorrection(!showCorrection),
        children: showCorrection ? "Masquer la correction" : "Afficher la correction"
      }
    ),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "content mt-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "1. Détermination de f(x)" }) }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(MathTex, { tex: "x \\in [0; 100[" }),
          " : ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f(x) = 0.5x" })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(MathTex, { tex: "x \\in [100; 200[" }),
          " : ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f(x) = 0.4x" })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(MathTex, { tex: "x \\in [200; 500]" }),
          " : ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f(x) = 0.35x" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "2. Étude de la continuité" }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On étudie la continuité aux points ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x = 100" }),
        " et ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x = 200" }),
        " :"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "• En ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x = 100" }),
        " :",
        /* @__PURE__ */ jsx("br", {}),
        "Limite à gauche : ",
        /* @__PURE__ */ jsx(MathTex, { tex: "\\lim\\limits_{x \\to 100^-} f(x) = 0.5 \\times 100 = 50" }),
        /* @__PURE__ */ jsx("br", {}),
        "Valeur exacte : ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f(100) = 0.4 \\times 100 = 40" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("strong", { children: [
          "⇒ Discontinuité en ",
          /* @__PURE__ */ jsx(MathTex, { tex: "x = 100" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "• En ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x = 200" }),
        " :",
        /* @__PURE__ */ jsx("br", {}),
        "Limite à gauche : ",
        /* @__PURE__ */ jsx(MathTex, { tex: "\\lim\\limits_{x \\to 200^-} f(x) = 0.4 \\times 200 = 80" }),
        /* @__PURE__ */ jsx("br", {}),
        "Valeur exacte : ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f(200) = 0.35 \\times 200 = 70" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("strong", { children: [
          "⇒ Discontinuité en ",
          /* @__PURE__ */ jsx(MathTex, { tex: "x = 200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Conclusion :" }),
        " la fonction ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
        " n’est pas continue sur ",
        /* @__PURE__ */ jsx(MathTex, { tex: "[0; 500]" }),
        " car elle présente des sauts aux points ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x = 100" }),
        " et ",
        /* @__PURE__ */ jsx(MathTex, { tex: "x = 200" }),
        "."
      ] })
    ] })
  ] });
};

const $$Ex52T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExerciceFonctionPrix, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_52_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_52_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_52_T.astro";
const $$url = "/Germain/ex/ex_52_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex52T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
