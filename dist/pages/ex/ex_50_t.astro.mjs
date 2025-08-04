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
function generateVariationData() {
  const a = getRandomInt(1, 4);
  const x0 = getRandomInt(1, 3);
  const f0 = -getRandomInt(1, 5);
  const L = getRandomInt(4, 8);
  return {
    a,
    x0,
    f0,
    L
  };
}
function ExerciceTableauVariationUniqueZero() {
  const [problem, setProblem] = useState(generateVariationData());
  const [showCorrection, setShowCorrection] = useState(false);
  const newExercise = () => {
    setProblem(generateVariationData());
    setShowCorrection(false);
  };
  const { x0, f0, L } = problem;
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Étude graphique d'une fonction" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit une fonction ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
      " définie sur ",
      /* @__PURE__ */ jsx(MathTex, { tex: "[0, +\\\\infty[" }),
      " dont le tableau de variations est donné ci-dessous :"
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "table is-bordered is-striped is-narrow is-hoverable mt-4 has-text-centered", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: "x" }) }),
        /* @__PURE__ */ jsx("th", { children: "0" }),
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(x0) }) }),
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: "+\\\\infty" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: "f(x)" }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(MathTex, { tex: "+" }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(f0) }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(L) }) })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Variations" }),
          /* @__PURE__ */ jsx("td", { colSpan: 1, children: /* @__PURE__ */ jsx(MathTex, { tex: "\\\\searrow" }) }),
          /* @__PURE__ */ jsx("td", { colSpan: 1, children: /* @__PURE__ */ jsx(MathTex, { tex: "\\\\nearrow" }) }),
          /* @__PURE__ */ jsx("td", {})
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "Justifier que l'équation ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f(x) = 0" }),
      " admet une ",
      /* @__PURE__ */ jsx("strong", { children: "unique solution" }),
      " sur ",
      /* @__PURE__ */ jsx(MathTex, { tex: "[0, +\\\\infty[" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mt-4", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light mt-4 ml-2", onClick: newExercise, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "La fonction ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
          " est continue par hypothèse sur ",
          /* @__PURE__ */ jsx(MathTex, { tex: "[0, +\\\\infty[" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Le tableau de variations montre que :",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(MathTex, { tex: `f(0) > 0` }),
              ","
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(MathTex, { tex: `f(${x0}) = ${f0}` }),
              " avec ",
              /* @__PURE__ */ jsx(MathTex, { tex: `${f0} < 0` }),
              ","
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(MathTex, { tex: `f(x) \\to ${L} > 0` }),
              " quand ",
              /* @__PURE__ */ jsx(MathTex, { tex: "x \\\\to +\\\\infty" }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Donc, ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
          " passe de positif à négatif, puis redevient positif."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Par le théorème des valeurs intermédiaires, il existe :",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "au moins une solution",
              /* @__PURE__ */ jsx(MathTex, { tex: `\\alpha_1 \\in (0, ${x0})` }),
              "avec ",
              /* @__PURE__ */ jsx(MathTex, { tex: "f(\\\\alpha_1) = 0" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "au moins une solution ",
              /* @__PURE__ */ jsx(MathTex, { tex: "\\\\alpha_1 < x_0 < \\\\alpha_2" }),
              "avec ",
              /* @__PURE__ */ jsx(MathTex, { tex: "f(\\\\alpha_2) = 0" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Mais" }),
          " comme le minimum est atteint en ",
          /* @__PURE__ */ jsx(MathTex, { tex: `x = ${x0}` }),
          " et que ",
          /* @__PURE__ */ jsx(MathTex, { tex: `f(${x0}) = ${f0} < 0` }),
          ", il y a un seul zéro de part et d’autre de ce minimum."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Donc, l’équation ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f(x) = 0" }),
          " admet exactement deux solutions réelles distinctes ",
          /* @__PURE__ */ jsx(MathTex, { tex: "\\\\alpha_1 < x_0 < \\\\alpha_2" }),
          " sur ",
          /* @__PURE__ */ jsx(MathTex, { tex: "[0, +\\\\infty[" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Mais si" }),
          " vous voulez uniquement une solution (et que la fonction est strictement décroissante par exemple jusqu’à +∞), vous pouvez ajuster le générateur."
        ] })
      ] })
    ] })
  ] });
}

const $$Ex50T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExerciceTableauVariationUniqueZero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_50_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_50_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_50_T.astro";
const $$url = "/Germain/ex/ex_50_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex50T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
