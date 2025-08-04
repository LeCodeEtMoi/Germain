import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

const functions = [
  {
    id: "ln",
    tex: "f(x) = \\ln(x)",
    deriv: "f'(x) = \\frac{1}{x}",
    value: "f(1) = 0",
    growth: "f est strictement croissante sur ]0 ; +\\infty[",
    answer: "ln(x)"
  },
  {
    id: "exp",
    tex: "f(x) = e^x",
    deriv: "f'(x) = e^x",
    value: "f(0) = 1",
    growth: "f est strictement croissante sur R",
    answer: "e^x"
  },
  {
    id: "inv",
    tex: "f(x) = 1/x",
    deriv: "f'(x) = -1/x^2",
    value: "f(1) = 1",
    growth: "f est strictement décroissante sur ]0 ; +\\infty[",
    answer: "1/x"
  },
  {
    id: "sqrt",
    tex: "f(x) = \\sqrt{x}",
    deriv: "f'(x) = 1/(2\\sqrt{x})",
    value: "f(4) = 2",
    growth: "f est strictement croissante sur [0 ; +\\infty[",
    answer: "sqrt(x)"
  },
  {
    id: "cos",
    tex: "f(x) = \\cos(x)",
    deriv: "f'(x) = -\\sin(x)",
    value: "f(0) = 1",
    growth: "f est périodique de période 2\\pi",
    answer: "cos(x)"
  },
  {
    id: "sin",
    tex: "f(x) = \\sin(x)",
    deriv: "f'(x) = \\cos(x)",
    value: "f(0) = 0",
    growth: "f est périodique de période 2\\pi",
    answer: "sin(x)"
  }
];
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function IdentifyFunction() {
  const [problem, setProblem] = useState(pickRandom(functions));
  const [userAnswer, setUserAnswer] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const checkAnswer = () => {
    const cleaned = userAnswer.replace(/\s+/g, "").toLowerCase();
    if (cleaned === problem.answer.replace(/\s+/g, "").toLowerCase()) {
      setFeedback("✅ Bonne réponse, Maître.");
    } else {
      setFeedback(`❌ Non Maître. Il fallait (${problem.tex})`);
    }
    setShowCorrection(true);
  };
  const newExercise = () => {
    setProblem(pickRandom(functions));
    setUserAnswer("");
    setFeedback(null);
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-10", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Reconnaissance d'une fonction usuelle" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On considère une fonction ",
      /* @__PURE__ */ jsx("strong", { children: "f" }),
      " telle que :"
    ] }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: problem.deriv }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: problem.value }) }),
      /* @__PURE__ */ jsx("li", { children: problem.growth })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Déterminez l'expression de la fonction ",
      /* @__PURE__ */ jsx("strong", { children: "f" }),
      "(x)."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "field mt-4", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: "input",
        placeholder: "Ex: ln(x), e^x, 1/x...",
        value: userAnswer,
        onChange: (e) => setUserAnswer(e.target.value)
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-3", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: checkAnswer, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: newExercise, children: "Nouvel exercice" })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: "notification is-info mt-4", children: feedback.includes("\\") ? /* @__PURE__ */ jsx(MathTex, { tex: feedback }) : /* @__PURE__ */ jsx("p", { children: feedback }) }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "La fonction était ",
        /* @__PURE__ */ jsx(MathTex, { tex: problem.tex })
      ] }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Dérivée :" }),
          " ",
          /* @__PURE__ */ jsx(MathTex, { tex: problem.deriv })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Valeur :" }),
          " ",
          /* @__PURE__ */ jsx(MathTex, { tex: problem.value })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Variation :" }),
          " ",
          problem.growth
        ] })
      ] })
    ] })
  ] }) }) });
}

const $$Ex32T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Ln" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", IdentifyFunction, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_32_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_32_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_32_T.astro";
const $$url = "/Germain/ex/ex_32_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex32T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
