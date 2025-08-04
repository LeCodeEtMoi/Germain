import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

function getRandomInt(min, max, avoidZero = false) {
  let n = Math.floor(Math.random() * (max - min + 1)) + min;
  if (avoidZero && n === 0) return getRandomInt(min, max, true);
  return n;
}
function generateEquation() {
  const a = getRandomInt(1, 5, true);
  const b = getRandomInt(-5, 5, true);
  const c = getRandomInt(-5, 5);
  return { a, b, c };
}
function buildEquation({ a, b, c }) {
  const bTerm = b === 1 ? "y" : b === -1 ? "-y" : `${b}y`;
  const cTerm = c === 0 ? "" : c > 0 ? ` + ${c}` : ` - ${-c}`;
  return `${a}y' = ${bTerm}${cTerm}`;
}
function solveEquation({ a, b, c }) {
  const ratio = b / a;
  const homogeneous = `Ce^{${ratio}x}`;
  if (c === 0) return `y(x) = ${homogeneous}`;
  const constant = (-c / b).toFixed(2).replace(".00", "");
  return `y(x) = ${homogeneous} + ${constant}`;
}
function explanation({ a, b, c }) {
  const ratio = b / a;
  let text = `On écrit l’équation sous forme canonique : $y' - \\frac{${b}}{${a}}y = \\frac{${c}}{${a}}$.\\\\`;
  text += `C’est une équation différentielle linéaire du 1er ordre.\\\\`;
  text += `La solution générale est : $y(x) = Ce^{${ratio}x}`;
  if (c !== 0) {
    const constant = (-c / b).toFixed(2).replace(".00", "");
    text += ` + ${constant}`;
  }
  text += `$.`;
  return text;
}
function EDL1Recognizer() {
  const [coeffs, setCoeffs] = useState(generateEquation());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const checkAnswer = () => {
    const expected = solveEquation(coeffs).replace(/\s+/g, "").toLowerCase();
    const cleaned = userAnswer.replace(/\s+/g, "").toLowerCase();
    const isCorrect = cleaned.includes("e") && cleaned.includes("x") && cleaned.includes("c");
    if (cleaned === expected) {
      setFeedback("✅ Réponse exacte, Maître.");
    } else if (isCorrect) {
      setFeedback("🟡 C'est une forme acceptable, Maître. Mais la simplification pourrait être améliorée.");
    } else {
      setFeedback(`❌ Hélas, Maître. Une solution correcte est : \\(${solveEquation(coeffs)}\\)`);
    }
    setShowCorrection(true);
  };
  const newExercise = () => {
    setCoeffs(generateEquation());
    setUserAnswer("");
    setFeedback(null);
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-10", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Équation différentielle du 1er ordre" }),
    /* @__PURE__ */ jsx("p", { children: "Résolvez l'équation suivante :" }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: /* @__PURE__ */ jsx(MathTex, { tex: buildEquation(coeffs) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "field mt-4", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        className: "input",
        placeholder: "Ex: Ce^{2x} - 3",
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
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Solution générale :" }) }),
      /* @__PURE__ */ jsx(MathTex, { tex: solveEquation(coeffs) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Justification :" }) }),
      /* @__PURE__ */ jsx(MathTex, { tex: explanation(coeffs) })
    ] })
  ] }) }) });
}

const $$Ex34T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", EDL1Recognizer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_34_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_34_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_34_T.astro";
const $$url = "/Germain/ex/ex_34_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex34T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
