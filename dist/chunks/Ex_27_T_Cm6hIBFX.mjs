import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';

function generateLnExpProblem() {
  const isLn = Math.random() < 0.5;
  if (isLn) {
    const a = Math.floor(Math.random() * 4) + 2;
    const b = Math.floor(Math.random() * 3) + 1;
    const value = Math.floor(Math.random() * 3) + 2;
    const right = value;
    return {
      type: "ln",
      question: `ln(${a}x + ${b}) = ${right}`,
      domain: `x > ${(-b / a).toFixed(2)}`,
      solution: `x = ${(Math.exp(right) - b) / a}`
    };
  } else {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 3) + 1;
    const right = Math.floor(Math.random() * 10) + 1;
    return {
      type: "exp",
      question: `e^(${a}x - ${b}) > ${right}`,
      domain: "x ∈ ℝ",
      solution: `x > ${(Math.log(right) + b) / a}`
    };
  }
}
function LnExpEquation() {
  const [problem, setProblem] = useState(generateLnExpProblem());
  const [showCorrection, setShowCorrection] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-8", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Équation/Inéquation avec ln ou exp" }),
    /* @__PURE__ */ jsx("p", { children: "Résolvez l’équation ou inéquation suivante :" }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered is-size-5 my-4", children: /* @__PURE__ */ jsx("strong", { children: problem.question }) }),
    /* @__PURE__ */ jsx("button", { className: "button is-primary mr-2", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
    /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: () => {
      setProblem(generateLnExpProblem());
      setShowCorrection(false);
    }, children: "Nouvel exercice" }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "1." }),
          " Domaine de définition : ",
          /* @__PURE__ */ jsx("em", { children: problem.domain })
        ] }),
        problem.type === "ln" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2." }),
            " On applique la fonction exponentielle de chaque côté."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3." }),
            " On isole x et on simplifie."
          ] })
        ] }),
        problem.type === "exp" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2." }),
            " On applique le logarithme de chaque côté."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3." }),
            " On isole x et on simplifie."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "4." }),
          " Solution : ",
          /* @__PURE__ */ jsx("strong", { children: problem.solution })
        ] })
      ] })
    ] })
  ] }) }) });
}

export { LnExpEquation as L };
