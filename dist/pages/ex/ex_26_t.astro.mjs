import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateTrigInequation() {
  const type = Math.random() < 0.5 ? "cos" : "sin";
  const u = type;
  const a = randomInt(1, 3);
  const b = randomInt(-6, 6);
  const c = randomInt(-4, 4);
  const fExpression = `${a}${u}²(x) ${b >= 0 ? "+" : "-"} ${Math.abs(b)}${u}(x) ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;
  const reducedForm = `${a}u² ${b >= 0 ? "+" : "-"} ${Math.abs(b)}u ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;
  const checkValue = a * 1 * 1 + b * 1 + c;
  return { type, a, b, c, fExpression, reducedForm, checkValue };
}
function TrigInequationDegree3() {
  const [problem, setProblem] = useState(generateTrigInequation());
  const [showCorrection, setShowCorrection] = useState(false);
  const { type, a, b, c, fExpression, reducedForm, checkValue } = problem;
  const u = `${type}`;
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-10", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Inéquation trigonométrique de degré 3" }),
    /* @__PURE__ */ jsx("p", { children: "Soit la fonction f définie sur ℝ par :" }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered mb-4", children: /* @__PURE__ */ jsxs("strong", { children: [
      "f(x) = ",
      fExpression
    ] }) }),
    /* @__PURE__ */ jsx("p", { children: "On souhaite résoudre l’inéquation suivante :" }),
    /* @__PURE__ */ jsxs("p", { className: "has-text-centered mb-4", children: [
      /* @__PURE__ */ jsxs("strong", { children: [
        fExpression,
        " > 0"
      ] }),
      " sur ",
      /* @__PURE__ */ jsx("strong", { children: "[0, 2π]" })
    ] }),
    /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Vérifier que f(1) = ",
        checkValue
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Exprimer f(x) sous la forme : ",
        /* @__PURE__ */ jsxs("strong", { children: [
          "f(x) = ",
          reducedForm
        ] }),
        " avec u = ",
        u
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Étudier le signe de f(x)" }),
      /* @__PURE__ */ jsx("li", { children: "En déduire les solutions de l’inéquation sur [0, 2π]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: () => {
        setProblem(generateTrigInequation());
        setShowCorrection(false);
      }, children: "Nouvel exercice" })
    ] }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "1." }),
          " f(1) = ",
          a,
          "×1² + ",
          b,
          "×1 + ",
          c,
          " = ",
          /* @__PURE__ */ jsx("strong", { children: checkValue })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "2." }),
          " Posons u = ",
          u,
          ", alors f(x) = ",
          /* @__PURE__ */ jsx("strong", { children: reducedForm })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "3." }),
          " Étude de signe :",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "On résout ",
              /* @__PURE__ */ jsxs("strong", { children: [
                a,
                "u² + ",
                b,
                "u + ",
                c,
                " > 0"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Discriminant Δ = ",
              b,
              "² - 4×",
              a,
              "×",
              c,
              " = ",
              b * b - 4 * a * c
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Racines (si Δ ≥ 0) : ",
              /* @__PURE__ */ jsx("br", {}),
              "u₁ = ",
              ((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)).toFixed(2),
              " ",
              /* @__PURE__ */ jsx("br", {}),
              "u₂ = ",
              ((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)).toFixed(2)
            ] }),
            /* @__PURE__ */ jsx("li", { children: "On dresse le tableau de signes selon le tableau de variations d’un trinôme." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "4." }),
          " Ensuite, on cherche les x ∈ [0, 2π] tels que ",
          type,
          "(x) ∈ les bons intervalles en fonction du signe."
        ] })
      ] })
    ] })
  ] }) }) });
}

const $$Ex26T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "\xC9tude de fonction  trigonom\xE9trique" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main>
Pour info inspiration : https://manuel.sesamath.net/numerique/diapo.php?atome=92423&ordre=1
${renderComponent($$result2, "PythonThresholdAnalysis", TrigInequationDegree3, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_26_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_26_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_26_T.astro";
const $$url = "/Germain/ex/ex_26_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex26T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
