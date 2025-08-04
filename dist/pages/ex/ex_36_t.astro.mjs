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
function computeIntegral(a, b) {
  return 1 / 2 * (b ** 2 - a ** 2);
}
function DefiniteIntegralExercise() {
  const generateProblem = () => {
    const a = getRandomInt(0, 5);
    const b = getRandomInt(a + 1, a + 6);
    const result = computeIntegral(a, b);
    return { a, b, result };
  };
  const [problem, setProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const checkAnswer = () => {
    const parsed = parseFloat(userAnswer.replace(",", "."));
    const epsilon = 0.01;
    if (Math.abs(parsed - problem.result) < epsilon) {
      setFeedback("✅ Bonne réponse, Maître.");
    } else {
      setFeedback(`❌ Le résultat exact est ${problem.result.toFixed(2)}`);
    }
    setShowCorrection(true);
  };
  const newExercise = () => {
    setProblem(generateProblem());
    setUserAnswer("");
    setFeedback(null);
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Calcul d’une intégrale définie" }),
    /* @__PURE__ */ jsx("p", { children: "Calculez l'intégrale suivante :" }),
    /* @__PURE__ */ jsx(MathTex, { tex: `\\int_{${problem.a}}^{${problem.b}} x \\, dx` }),
    /* @__PURE__ */ jsx("div", { className: "field mt-4", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: "input",
        placeholder: "Votre réponse (ex: 12.5)",
        value: userAnswer,
        onChange: (e) => setUserAnswer(e.target.value)
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-3", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: checkAnswer, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: newExercise, children: "Nouvel exercice" })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: "notification is-info mt-4", children: /* @__PURE__ */ jsx("p", { children: feedback }) }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "On utilise la formule : ",
        /* @__PURE__ */ jsx(MathTex, { tex: "\\int_a^b x\\,dx = \\frac{1}{2}(b^2 - a^2)" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Ici, ",
        /* @__PURE__ */ jsx(MathTex, { tex: `a = ${problem.a}, \\quad b = ${problem.b}` })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Donc : ",
        /* @__PURE__ */ jsx(MathTex, { tex: `\\int_{${problem.a}}^{${problem.b}} x \\, dx = \\frac{1}{2}(${problem.b}^2 - ${problem.a}^2) = ${problem.result.toFixed(2)}` })
      ] })
    ] })
  ] });
}

const $$Ex36T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", DefiniteIntegralExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_36_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_36_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_36_T.astro";
const $$url = "/Germain/ex/ex_36_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex36T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
