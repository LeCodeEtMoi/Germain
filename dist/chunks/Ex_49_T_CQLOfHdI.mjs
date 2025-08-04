import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from './MathTex_DKnOgSOO.mjs';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateProblem() {
  const a = getRandomInt(1, 3);
  const b = getRandomInt(-5, 5);
  const c = getRandomInt(-5, 5);
  const alpha = getRandomInt(0, 3);
  const x1 = -10;
  const x2 = alpha;
  const f1 = a * x1 * x1 + b * x1 + c;
  const f2 = a * x2 * x2 + b * x2 + c;
  const k = getRandomInt(Math.min(f1, f2) + 1, Math.max(f1, f2) - 1);
  return {
    a,
    b,
    c,
    alpha,
    x1,
    x2,
    f1,
    f2,
    k
  };
}
function ExContinuitéTVI() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  const { a, b, c, alpha, x1, x2, f1, f2, k } = problem;
  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Continuité, dérivabilité, TVI" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit la fonction ",
      /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${a}x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}` }),
      " définie sur ℝ."
    ] }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Pourquoi ",
        /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
        " est-elle continue sur ℝ ?"
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Pourquoi est-elle dérivable sur ℝ ?" }),
      /* @__PURE__ */ jsx("li", { children: "Dresser son tableau de variation." }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Montrer que l'équation ",
        /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${k}` }),
        " admet au moins une solution sur ",
        /* @__PURE__ */ jsx(MathTex, { tex: `(-\\infty, ${alpha}]` }),
        "."
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Donner un encadrement au dixième près de cette solution." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light ml-2", onClick: newExercise, children: "Nouvel exercice" })
    ] }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "La fonction ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
          " est un polynôme, donc elle est continue sur ℝ."
        ] }),
        /* @__PURE__ */ jsx("li", { children: "Elle est également dérivable sur ℝ, car les polynômes sont dérivables partout." }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Sa dérivée est : ",
          /* @__PURE__ */ jsx(MathTex, { tex: `f'(x) = ${2 * a}x ${b >= 0 ? "+ " + b : "- " + -b}` }),
          " ",
          /* @__PURE__ */ jsx("br", {}),
          "Le signe de ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f'(x)" }),
          " dépend de ",
          /* @__PURE__ */ jsx(MathTex, { tex: `x = -\\frac{${b}}{${2 * a}}` }),
          ", ce qui est le sommet de la parabole."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "On a ",
          /* @__PURE__ */ jsx(MathTex, { tex: `f(${x1}) = ${f1}` }),
          " et ",
          /* @__PURE__ */ jsx(MathTex, { tex: `f(${x2}) = ${f2}` }),
          ". ",
          /* @__PURE__ */ jsx("br", {}),
          "Puisque ",
          /* @__PURE__ */ jsx(MathTex, { tex: `${k}` }),
          " est strictement entre ces deux valeurs, et que ",
          /* @__PURE__ */ jsx(MathTex, { tex: "f" }),
          " est continue, on applique le théorème des valeurs intermédiaires (TVI) : ",
          /* @__PURE__ */ jsx("br", {}),
          "Il existe ",
          /* @__PURE__ */ jsx(MathTex, { tex: `x_0 \\in (${x1}, ${x2})` }),
          " tel que ",
          /* @__PURE__ */ jsx(MathTex, { tex: `f(x_0) = ${k}` }),
          "."
        ] }),
        /* @__PURE__ */ jsx("li", { children: "On cherche un encadrement de la solution par dichotomie (au dixième près, non effectué ici dynamiquement mais laissé à l’élève comme suggestion)." })
      ] })
    ] })
  ] });
}

export { ExContinuitéTVI as E };
