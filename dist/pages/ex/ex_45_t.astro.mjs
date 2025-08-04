import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function DiceSumExercise() {
  const [nFaces] = useState(randInt(4, 12));
  const [nDice] = useState(randInt(2, 5));
  const [showCorrection, setShowCorrection] = useState(false);
  const expectedValueOneDie = (nFaces + 1) / 2;
  const expectedValueTotal = nDice * expectedValueOneDie;
  const handleShow = () => setShowCorrection(true);
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Somme de variables aléatoires (dés)" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On lance ",
      /* @__PURE__ */ jsx("strong", { children: nDice }),
      " dés équilibrés à ",
      /* @__PURE__ */ jsx("strong", { children: nFaces }),
      " faces, numérotées de 1 à ",
      nFaces,
      ". Soit ",
      /* @__PURE__ */ jsx("strong", { children: "X" }),
      " la variable aléatoire donnant la somme des résultats obtenus."
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "mt-3", children: [
      /* @__PURE__ */ jsx("li", { children: "Décomposer X en somme de variables aléatoires indépendantes suivant une même loi que vous préciserez." }),
      /* @__PURE__ */ jsx("li", { children: "Calculez l’espérance mathématique E(X)." }),
      /* @__PURE__ */ jsx("li", { children: "Interprétez ce résultat dans le contexte." })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "button is-link mt-4", onClick: handleShow, children: "Afficher la correction" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "content mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Soit ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "X₁, X₂, ..., X",
          /* @__PURE__ */ jsx("sub", { children: nDice })
        ] }),
        " les variables aléatoires correspondant aux résultats de chaque dé."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Chaque X",
        /* @__PURE__ */ jsx("sub", { children: "i" }),
        " suit une loi uniforme discrète sur l’ensemble ",
        "{1, 2, ..., " + nFaces + "}",
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On a alors : ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "X = X₁ + X₂ + ... + X",
          /* @__PURE__ */ jsx("sub", { children: nDice })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Pour un dé à ",
        nFaces,
        " faces, on a :",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("strong", { children: [
          "E(X",
          /* @__PURE__ */ jsx("sub", { children: "i" }),
          ") = (1 + ",
          nFaces,
          ") / 2 = ",
          expectedValueOneDie
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Donc : ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "E(X) = ",
          nDice,
          " × ",
          expectedValueOneDie,
          " = ",
          expectedValueTotal
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Interprétation :" }),
        " si on répète un grand nombre de fois cette expérience (lancer de ",
        nDice,
        " dés à ",
        nFaces,
        " faces), la moyenne des sommes obtenues tendra vers ",
        /* @__PURE__ */ jsx("strong", { children: expectedValueTotal }),
        "."
      ] })
    ] })
  ] });
}

const $$Ex45T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", DiceSumExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_45_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_45_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_45_T.astro";
const $$url = "/Germain/ex/ex_45_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex45T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
