import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

const ExerciceConvexiteDerivee = () => {
  const [showCorrection, setShowCorrection] = useState(false);
  const a = -2;
  const b = 0;
  const c = 4;
  const fpa = 5;
  const fpb = -2;
  const fpc = 5;
  return /* @__PURE__ */ jsxs("div", { className: "box my-5", children: [
    /* @__PURE__ */ jsxs("h2", { className: "title is-4", children: [
      "Étude de la convexité à partir du tableau de variation de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f'" })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On considère une fonction ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
      " deux fois dérivable sur ",
      /* @__PURE__ */ jsx(MathTex, { tex: "\\mathbb{R}" }),
      ". On donne ci-dessous le tableau de variation de sa dérivée ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f'" }),
      " :"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "table-container my-4", children: /* @__PURE__ */ jsxs("table", { className: "table is-bordered has-text-centered is-fullwidth", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: "x" }) }),
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(a) }) }),
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(b) }) }),
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(c) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(MathTex, { tex: "f'(x)" }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(fpa) }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(fpb) }) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(MathTex, { tex: String(fpc) }) })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "Variations" }),
          /* @__PURE__ */ jsx("td", { colSpan: 2, children: "↘️" }),
          /* @__PURE__ */ jsx("td", { colSpan: 2, children: "↗️" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Question :" }),
      " Déterminer les intervalles sur lesquels la fonction ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
      " est convexe ou concave. En déduire le signe de la dérivée seconde ",
      /* @__PURE__ */ jsx(MathTex, { tex: "f''(x)" }),
      "."
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "button is-info mt-4",
        onClick: () => setShowCorrection(!showCorrection),
        children: showCorrection ? "Masquer la correction" : "Afficher la correction"
      }
    ),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "content mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On sait que si ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f'" }),
        " est décroissante sur un intervalle, alors ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f''" }),
        " est négative et donc ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
        " est ",
        /* @__PURE__ */ jsx("strong", { children: "concave" }),
        " sur cet intervalle."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Si ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f'" }),
        " est croissante, alors ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f''" }),
        " est positive et donc ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
        " est ",
        /* @__PURE__ */ jsx("strong", { children: "convexe" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "Sur ",
          /* @__PURE__ */ jsx(MathTex, { tex: `[${a}, ${b}]` }),
          ", ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f'" }),
          " décroît ⇒ ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f''(x) < 0" }),
          " ⇒ ",
          /* @__PURE__ */ jsxs("strong", { children: [
            /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
            " est concave"
          ] }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Sur ",
          /* @__PURE__ */ jsx(MathTex, { tex: `[${b}, ${c}]` }),
          ", ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f'" }),
          " croît ⇒ ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f''(x) > 0" }),
          " ⇒ ",
          /* @__PURE__ */ jsxs("strong", { children: [
            /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
            " est convexe"
          ] }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Conclusion :" }) }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
          " est concave sur ",
          /* @__PURE__ */ jsx(MathTex, { tex: `[${a}, ${b}]` })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
          " est convexe sur ",
          /* @__PURE__ */ jsx(MathTex, { tex: `[${b}, ${c}]` })
        ] })
      ] })
    ] })
  ] });
};

const $$Ex55T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExerciceConvexiteDerivee, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_55_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_55_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_55_T.astro";
const $$url = "/Germain/ex/ex_55_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex55T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
