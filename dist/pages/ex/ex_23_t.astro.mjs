import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const possibleValues = [
  { type: "sin", value: "0", solutions: ["0"] },
  { type: "sin", value: "1/2", solutions: ["π/6", "5π/6"] },
  { type: "sin", value: "√2/2", solutions: ["π/4", "3π/4"] },
  { type: "sin", value: "√3/2", solutions: ["π/3", "2π/3"] },
  { type: "sin", value: "1", solutions: ["π/2"] },
  { type: "sin", value: "-1/2", solutions: ["-π/6", "-5π/6"] },
  { type: "sin", value: "-√2/2", solutions: ["-π/4", "-3π/4"] },
  { type: "sin", value: "-√3/2", solutions: ["-π/3", "-2π/3"] },
  { type: "sin", value: "-1", solutions: ["-π/2"] },
  { type: "cos", value: "0", solutions: ["-π/2", "π/2"] },
  { type: "cos", value: "1/2", solutions: ["-π/3", "π/3"] },
  { type: "cos", value: "√2/2", solutions: ["-π/4", "π/4"] },
  { type: "cos", value: "√3/2", solutions: ["-π/6", "π/6"] },
  { type: "cos", value: "1", solutions: ["0"] },
  { type: "cos", value: "-1/2", solutions: ["2π/3", "-2π/3"] },
  { type: "cos", value: "-√2/2", solutions: ["3π/4", "-3π/4"] },
  { type: "cos", value: "-√3/2", solutions: ["5π/6", "-5π/6"] },
  { type: "cos", value: "-1", solutions: ["π", "-π"] }
  // on affichera uniquement π
];
function getRandomEquation() {
  const eq = possibleValues[Math.floor(Math.random() * possibleValues.length)];
  const cleaned = {
    ...eq,
    solutions: eq.solutions.map((s) => s === "-π" ? "π" : s)
    // unique forme
  };
  return cleaned;
}
function TrigoEquationExercise() {
  const [equation, setEquation] = useState(getRandomEquation());
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  function handleValidate() {
    const userSolutions = userInput.split(",").map((s) => s.trim().replace(/\s/g, ""));
    const correctSet = new Set(equation.solutions);
    const userSet = new Set(userSolutions);
    const allCorrect = equation.solutions.every((sol) => userSet.has(sol));
    const noExtra = [...userSet].every((sol) => correctSet.has(sol));
    if (allCorrect && noExtra) {
      setFeedback("🎉 Bravo ! Toutes les solutions sont correctes !");
    } else {
      setFeedback(
        `❌ Certaines solutions sont incorrectes ou manquantes. Les bonnes réponses sont : ${equation.solutions.join(", ")}`
      );
    }
  }
  function handleNew() {
    setEquation(getRandomEquation());
    setUserInput("");
    setFeedback(null);
    setShowHelp(false);
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-half", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Équation Trigonométrique dans ]-π, π]" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Résolvez l’équation suivante dans l’intervalle",
      " ",
      /* @__PURE__ */ jsx("strong", { children: "]–π, π]" }),
      " :"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered my-4", children: /* @__PURE__ */ jsx("strong", { children: `${equation.type}(x) = ${equation.value}` }) }),
    /* @__PURE__ */ jsxs("div", { className: "field", children: [
      /* @__PURE__ */ jsx("label", { className: "label", children: "Vos solutions (séparées par une virgule)" }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: "input",
          type: "text",
          placeholder: "Ex: π/3, -π/3",
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
          "1. Cherchez à quelle valeur remarquable correspond ",
          equation.type,
          "(x) = ",
          equation.value,
          "."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "2. Trouvez les solutions générales avec ",
          /* @__PURE__ */ jsx("code", { children: "x = a + 2kπ" }),
          " ou ",
          /* @__PURE__ */ jsx("code", { children: "x = -a + 2kπ" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("li", { children: "3. Déterminez quelles valeurs de k donnent des solutions dans ]–π, π]." }),
        /* @__PURE__ */ jsx("li", { children: "4. Écrivez les solutions exactes séparées par des virgules." })
      ] })
    ] })
  ] }) }) });
}

const $$Ex23T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Inequation trigonom\xE9trique" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", TrigoEquationExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_23_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_23_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_23_T.astro";
const $$url = "/Germain/ex/ex_23_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex23T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
