import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

const primitives = [
  {
    id: "x3+1/x",
    tex: "f(x) = x^3 + \\dfrac{1}{x}",
    domain: "]0 ; +\\infty[",
    answer: "\\dfrac{1}{4}x^4 + \\ln(x)",
    method: "On intègre terme à terme : $\\int x^3 dx = \\dfrac{1}{4}x^4$, $\\int \\dfrac{1}{x} dx = \\ln(x)$"
  },
  {
    id: "invcarre",
    tex: "f(x) = \\dfrac{1}{x^2}",
    domain: "]0 ; +\\infty[",
    answer: "-\\dfrac{1}{x}",
    method: "On reconnaît la forme $x^{-2}$ donc la primitive est $\\dfrac{x^{-1}}{-1} = -\\dfrac{1}{x}$"
  },
  {
    id: "2x+1/(x^2+x+5)^3",
    tex: "f(x) = \\dfrac{2x + 1}{(x^2 + x + 5)^3}",
    domain: "\\mathbb{R}",
    answer: "-\\dfrac{1}{2(x^2 + x + 5)^2}",
    method: "On pose $u = x^2 + x + 5$ donc $f(x) = \\dfrac{u'}{u^3}$. La primitive est $\\dfrac{u^{-2}}{-2}$."
  }
];
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function PrimitiveRecognizer() {
  const [exercise, setExercise] = useState(pickRandom(primitives));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const checkAnswer = () => {
    const cleaned = userAnswer.replace(/\s+/g, "").toLowerCase();
    const correct = exercise.answer.replace(/\s+/g, "").toLowerCase();
    if (cleaned === correct) {
      setFeedback("✅ Très bonne réponse, Maître.");
    } else {
      setFeedback(`❌ Hélas non, Maître. Il fallait : \\(${exercise.answer}\\)`);
    }
    setShowCorrection(true);
  };
  const newExercise = () => {
    setExercise(pickRandom(primitives));
    setUserAnswer("");
    setFeedback(null);
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-10", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Déterminer une primitive" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Soit une fonction définie sur ",
      /* @__PURE__ */ jsx(MathTex, { tex: exercise.domain }),
      " :"
    ] }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: /* @__PURE__ */ jsx(MathTex, { tex: exercise.tex }) }) }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Proposez une primitive ",
      /* @__PURE__ */ jsx("strong", { children: "F(x)" }),
      " de cette fonction :"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "field mt-4", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: "input",
        placeholder: "Ex: 1/4 x^4 + ln(x)",
        value: userAnswer,
        onChange: (e) => setUserAnswer(e.target.value)
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-3", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: checkAnswer, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: newExercise, children: "Nouvel exercice" })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: "notification is-info mt-4", children: /* @__PURE__ */ jsx(MathTex, { tex: feedback }) }),
    showCorrection && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Une primitive est : ",
        /* @__PURE__ */ jsx(MathTex, { tex: exercise.answer })
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Méthode :" }) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(MathTex, { tex: exercise.method }) })
    ] })
  ] }) }) });
}

const $$Ex33T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", PrimitiveRecognizer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_33_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_33_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_33_T.astro";
const $$url = "/Germain/ex/ex_33_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex33T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
