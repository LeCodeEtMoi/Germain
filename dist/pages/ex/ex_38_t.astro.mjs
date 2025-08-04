import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateProblem() {
  const a = getRandomInt(0, 2);
  const b = getRandomInt(3, 5);
  const k = getRandomInt(1, 4);
  return { a, b, k };
}
function computeExact(a, b, k) {
  const F = (x) => 1 / k ** 2 * (k * x - 1) * Math.exp(k * x);
  const val = F(b) - F(a);
  return val.toFixed(3);
}
function IntegrationByPartsExercise() {
  const [problem, setProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [feedback, setFeedback] = useState("");
  const handleCheck = () => {
    setShowCorrection(true);
    const expected = computeExact(problem.a, problem.b, problem.k);
    const given = parseFloat(userAnswer.replace(",", ".")).toFixed(3);
    if (given === expected) {
      setFeedback("✅ Exact, Maître. Vous dominez l'intégration par parties.");
    } else {
      setFeedback(`❌ Faux, Maître. Il fallait environ ${expected}`);
    }
  };
  const handleNew = () => {
    setProblem(generateProblem());
    setUserAnswer("");
    setShowCorrection(false);
    setFeedback("");
  };
  const { a, b, k } = problem;
  return /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Intégration par parties" }),
    /* @__PURE__ */ jsx("p", { children: "Soit l'intégrale suivante :" }),
    /* @__PURE__ */ jsx(MathTex, { tex: `\\int_{${a}}^{${b}} x \\cdot e^{${k}x} \\, dx` }),
    /* @__PURE__ */ jsxs("div", { className: "field mt-4", children: [
      /* @__PURE__ */ jsx("label", { className: "label", children: "Votre réponse (valeur approchée à 10⁻³ près)" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "input",
          placeholder: "Ex: 12.345",
          value: userAnswer,
          onChange: (e) => setUserAnswer(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-3", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleCheck, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: handleNew, children: "Nouvel exercice" })
    ] }),
    showCorrection && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "notification is-info mt-4", children: /* @__PURE__ */ jsx("p", { children: feedback }) }),
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsx("p", { children: "On pose :" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `u(x) = x \\Rightarrow u'(x) = 1` }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MathTex, { tex: `v'(x) = e^{${k}x} \\Rightarrow v(x) = \\frac{1}{${k}} e^{${k}x}` }) })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Alors :" }),
      /* @__PURE__ */ jsx(MathTex, { tex: `\\int x \\cdot e^{${k}x} dx = \\frac{x}{${k}} e^{${k}x} - \\int \\frac{1}{${k}} e^{${k}x} dx = \\frac{x}{${k}} e^{${k}x} - \\frac{1}{${k}^2} e^{${k}x} + C` }),
      /* @__PURE__ */ jsx("p", { children: "Donc :" }),
      /* @__PURE__ */ jsx(MathTex, { tex: `\\int_{${a}}^{${b}} x e^{${k}x} dx = \\left[ \\frac{1}{${k}^2} ( ${k}x - 1 ) e^{${k}x} \\right]_{${a}}^{${b}}` }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Valeur approchée : ",
        /* @__PURE__ */ jsx("strong", { children: computeExact(a, b, k) })
      ] })
    ] })
  ] });
}

const $$Ex38T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", IntegrationByPartsExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_38_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_38_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_38_T.astro";
const $$url = "/Germain/ex/ex_38_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex38T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
