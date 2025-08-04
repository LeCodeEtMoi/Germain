import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const inequations = [
  {
    type: "sin",
    operator: "<",
    value: "1/2",
    solution: "]-π, -5π/6[ ∪ ]-π/6, π["
  },
  {
    type: "sin",
    operator: ">",
    value: "1/2",
    solution: "]π/6, 5π/6["
  },
  {
    type: "cos",
    operator: "<",
    value: "1/2",
    solution: "]2π/3, π] ∪ ]-π, -2π/3["
  },
  {
    type: "cos",
    operator: ">",
    value: "1/2",
    solution: "]–π/3, π/3["
  },
  {
    type: "cos",
    operator: "<",
    value: "√2/2",
    solution: "]3π/4, π] ∪ ]-π, -3π/4["
  },
  {
    type: "cos",
    operator: ">",
    value: "√2/2",
    solution: "]–π/4, π/4["
  },
  {
    type: "sin",
    operator: ">",
    value: "√2/2",
    solution: "]π/4, 3π/4["
  },
  {
    type: "sin",
    operator: "<",
    value: "√2/2",
    solution: "]–π, π/4[ ∪ ]3π/4, π["
  }
];
function getRandomInequation() {
  const random = inequations[Math.floor(Math.random() * inequations.length)];
  return random;
}
function TrigoInequationExercise() {
  const [ineq, setIneq] = useState(getRandomInequation());
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  function handleValidate() {
    const normalized = userInput.replace(/\s/g, "").replace(/\]/g, "]").replace(/\[/g, "[");
    const correct = ineq.solution.replace(/\s/g, "");
    if (normalized === correct) {
      setFeedback("🎯 Bravo ! C’est exact.");
    } else {
      setFeedback(`❌ Ce n’est pas tout à fait juste. La bonne réponse est : ${ineq.solution}`);
    }
  }
  function handleNew() {
    setIneq(getRandomInequation());
    setUserInput("");
    setFeedback(null);
    setShowHelp(false);
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-half", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Inéquation Trigonométrique dans ]–π, π]" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Résolvez l’inéquation suivante dans l’intervalle ",
      /* @__PURE__ */ jsx("strong", { children: "]–π, π]" }),
      " :"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered my-4", children: /* @__PURE__ */ jsx("strong", { children: `${ineq.type}(x) ${ineq.operator} ${ineq.value}` }) }),
    /* @__PURE__ */ jsxs("div", { className: "field", children: [
      /* @__PURE__ */ jsx("label", { className: "label", children: "Votre réponse (intervalle en notation mathématique)" }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: "input",
          type: "text",
          placeholder: "Ex: ]–π/3, π/3[",
          value: userInput,
          onChange: (e) => setUserInput(e.target.value)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons is-centered mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: handleNew, children: "Nouvel exercice" }),
      /* @__PURE__ */ jsx("button", { className: "button is-info is-light", onClick: () => setShowHelp(true), children: "Voir les conseils" })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: `notification mt-4 ${feedback.includes("❌") ? "is-danger" : "is-success"}`, children: feedback }),
    showHelp && /* @__PURE__ */ jsxs("div", { className: "notification is-info mt-4", children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Conseils :" }) }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "1. Repérez à quelle valeur remarquable correspond ",
          /* @__PURE__ */ jsx("code", { children: ineq.value }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "2. Identifiez les zones où la fonction est strictement ",
          /* @__PURE__ */ jsx("strong", { children: ineq.operator === ">" ? "au-dessus" : "en-dessous" }),
          " de cette valeur."
        ] }),
        /* @__PURE__ */ jsx("li", { children: "3. Utilisez le cercle trigonométrique pour visualiser l’intervalle." }),
        /* @__PURE__ */ jsxs("li", { children: [
          "4. Exprimez la réponse en union d’intervalles dans ",
          /* @__PURE__ */ jsx("strong", { children: "]–π, π]" }),
          "."
        ] })
      ] })
    ] })
  ] }) }) });
}

const $$Ex24T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Inequation trigonom\xE9trique" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", TrigoInequationExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_24_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_24_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_24_T.astro";
const $$url = "/Germain/ex/ex_24_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex24T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
