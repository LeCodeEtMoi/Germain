import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import 'katex';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const ExerciceConvexite = () => {
  const [showCorrection, setShowCorrection] = useState(false);
  const a = 0.05;
  const b = -0.4;
  const c = 0.5;
  const d = 1;
  const f = (x) => a * x ** 3 + b * x ** 2 + c * x + d;
  const data = Array.from({ length: 41 }, (_, i) => {
    const x = i - 20;
    return { x, y: parseFloat(f(x).toFixed(2)) };
  });
  const x0 = 0.4 / (3 * a);
  return /* @__PURE__ */ jsxs("div", { className: "box my-5", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Convexité et concavité d'une fonction" }),
    /* @__PURE__ */ jsx("p", { children: "On considère une fonction \\( f \\) définie sur \\([ -10 ; 10 ]\\) dont le graphique est donné ci-dessous. À l’aide du graphique, déterminer les intervalles où la fonction est convexe et ceux où elle est concave." }),
    /* @__PURE__ */ jsx("div", { className: "my-4", children: /* @__PURE__ */ jsxs(LineChart, { width: 600, height: 300, data, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
      /* @__PURE__ */ jsx(XAxis, { dataKey: "x", type: "number", domain: [-10, 10] }),
      /* @__PURE__ */ jsx(YAxis, {}),
      /* @__PURE__ */ jsx(Tooltip, {}),
      /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "y", stroke: "#00d1b2", dot: false })
    ] }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "button is-link",
        onClick: () => setShowCorrection(!showCorrection),
        children: showCorrection ? "Masquer la correction" : "Afficher la correction"
      }
    ),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "content mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsx("p", { children: "La convexité d'une fonction est déterminée par le signe de la dérivée seconde :" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "\\( f''(x) = 6 \\cdot ",
        a,
        " \\cdot x + 2 \\cdot (",
        b,
        ") = ",
        6 * a,
        "x + ",
        2 * b,
        " \\)"
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Le changement de concavité s’effectue lorsque \\( f''(x) = 0 \\), c’est-à-dire :" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "\\( ",
        6 * a,
        "x + ",
        2 * b,
        " = 0 \\Rightarrow x = ",
        0.4,
        " / (3 \\cdot ",
        a,
        ") = ",
        x0.toFixed(2),
        " \\)"
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Conclusion :" }) }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "• \\( f \\) est ",
          /* @__PURE__ */ jsx("strong", { children: "concave" }),
          " sur \\( ] -\\infty ; ",
          x0.toFixed(2),
          " [ \\)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "• \\( f \\) est ",
          /* @__PURE__ */ jsx("strong", { children: "convexe" }),
          " sur \\( ] ",
          x0.toFixed(2),
          " ; +\\infty [ \\)"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Le point \\( x = ",
        x0.toFixed(2),
        " \\) est un ",
        /* @__PURE__ */ jsx("strong", { children: "point d’inflexion" }),
        "."
      ] })
    ] })
  ] });
};

const $$Ex54T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ExerciceConvexite, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_54_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_54_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_54_T.astro";
const $$url = "/Germain/ex/ex_54_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex54T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
