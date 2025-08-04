import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generatePiecewiseFunction() {
  const a = randomInt(1, 5);
  const b = randomInt(1, 5);
  const c = randomInt(1, 5);
  const d = randomInt(1, 5);
  const f1 = `${a}x^2 + ${b}`;
  const f2 = `${c}x + ${d}`;
  const f1_derivative = `${2 * a}x`;
  const f2_derivative = `${c}`;
  const f1_at1 = a * 1 ** 2 + b;
  const f2_at1 = c * 1 + d;
  const f1_prime_at1 = 2 * a * 1;
  const f2_prime_at1 = c;
  const isContinuous = f1_at1 === f2_at1;
  const isDerivable = isContinuous && f1_prime_at1 === f2_prime_at1;
  return {
    a,
    b,
    c,
    d,
    f1,
    f2,
    f1_derivative,
    f2_derivative,
    f1_at1,
    f2_at1,
    f1_prime_at1,
    f2_prime_at1,
    isContinuous,
    isDerivable
  };
}
function ContinuityExercise() {
  const [problem, setProblem] = useState(generatePiecewiseFunction());
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  function handleCheckContinuity(answer) {
    const correct = problem.isContinuous ? "oui" : "non";
    if (answer.toLowerCase() === correct) {
      setFeedback("✅ Bonne réponse ! Passons à l'étude des dérivées.");
      setStep(1);
    } else {
      setFeedback(`❌ Mauvaise réponse. La fonction est ${correct === "oui" ? "continue" : "non continue"} en x = 1.`);
    }
  }
  function handleNextExercise() {
    setProblem(generatePiecewiseFunction());
    setStep(0);
    setFeedback(null);
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Continuité en un point" }),
    /* @__PURE__ */ jsx("p", { children: "Soit la fonction définie par morceaux :" }),
    /* @__PURE__ */ jsxs("pre", { children: [
      "f(x) = ",
      "{",
      " ",
      `  
              ${problem.f1} si x ≤ 1  
              ${problem.f2} si x > 1  
            `,
      "}"
    ] }),
    step === 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: "La fonction f est-elle continue en x = 1 ? (oui / non)" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "input",
          type: "text",
          placeholder: "oui ou non",
          onKeyDown: (e) => {
            if (e.key === "Enter") handleCheckContinuity(e.target.value);
          }
        }
      )
    ] }),
    step === 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "f(1⁻) = ",
        problem.f1_at1,
        ", f(1⁺) = ",
        problem.f2_at1,
        " → donc f est ",
        problem.isContinuous ? "continue" : "non continue",
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "f₁'(x) = ",
        problem.f1_derivative,
        ", donc f₁'(1) = ",
        problem.f1_prime_at1
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "f₂'(x) = ",
        problem.f2_derivative,
        ", donc f₂'(1) = ",
        problem.f2_prime_at1
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Conclusion : f est ",
        problem.isDerivable ? "dérivable" : "non dérivable",
        " en x = 1"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "buttons mt-4", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleNextExercise, children: "Nouvel exercice" }) })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: "notification is-light mt-4", children: feedback })
  ] }) }) });
}

const $$Ex21T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": " Continuit\xE9 et d\xE9rivabilit\xE9 en un point" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", ContinuityExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_21_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_21_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_21_T.astro";
const $$url = "/Germain/ex/ex_21_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex21T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
