import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const correctAnswer = "5";
const codeBlockStyle = {
  backgroundColor: "#282c34",
  color: "#abb2bf",
  padding: "1rem",
  borderRadius: "5px",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap"
};
const keywordStyle = { color: "#c678dd" };
const functionStyle = { color: "#61afef" };
const numberStyle = { color: "#d19a66" };
function PythonThresholdAnalysis() {
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const options = [
    "4",
    "5",
    "6",
    "22.5"
  ];
  const handleValidate = () => {
    if (!userAnswer) {
      setFeedback("Veuillez sélectionner une réponse.");
      return;
    }
    if (userAnswer === correctAnswer) {
      setFeedback("🎉 Bravo Maître, c'est la bonne réponse ! Votre analyse est parfaite.");
    } else {
      let explanation = `❌ Oups, une erreur s'est glissée.`;
      explanation += `

**La bonne réponse était :** ${correctAnswer}`;
      explanation += `

**Explication du déroulement de l'algorithme :**
`;
      explanation += `La boucle \`while\` s'exécute tant que \`u >= 25\`. On cherche le premier rang \`n\` pour lequel \`u < 25\`.
`;
      explanation += `1. **Initialisation :** \`n = 0\`, \`u = 100\`.
`;
      explanation += `2. **Tours de boucle :**
`;
      explanation += `   - n=0, u=100. u >= 25. On entre. u devient 60, n devient 1.
`;
      explanation += `   - n=1, u=60. u >= 25. On entre. u devient 40, n devient 2.
`;
      explanation += `   - n=2, u=40. u >= 25. On entre. u devient 30, n devient 3.
`;
      explanation += `   - n=3, u=30. u >= 25. On entre. u devient 25, n devient 4.
`;
      explanation += `   - n=4, u=25. u >= 25. On entre. u devient 22.5, n devient 5.
`;
      explanation += `   - n=5, u=22.5. La condition \`u >= 25\` est fausse. La boucle s'arrête.
`;
      explanation += `3. **Retour :** La fonction retourne la valeur de \`n\`, qui est **5**.`;
      setFeedback(explanation);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Algorithmique - Analyse de seuil" }),
    /* @__PURE__ */ jsx("p", { children: "On considère la fonction Python suivante." }),
    /* @__PURE__ */ jsxs("div", { style: codeBlockStyle, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "def" }),
        " ",
        /* @__PURE__ */ jsx("span", { style: functionStyle, children: "seuil" }),
        "():"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        "n = ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "0" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        "u = ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "100" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "while" }),
        " u >= ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "25" }),
        ":"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "    ",
        "u = ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "0.5" }),
        " * u + ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "10" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "    ",
        "n = n + ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "return" }),
        " n"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "Que retourne l'appel ",
      /* @__PURE__ */ jsx("code", { children: "seuil()" }),
      " ?"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "control", children: options.map((option) => /* @__PURE__ */ jsxs("label", { className: "radio", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "radio",
          name: "analysis",
          value: option,
          checked: userAnswer === option,
          onChange: () => setUserAnswer(option)
        }
      ),
      ` ${option}`
    ] }, option)) }),
    /* @__PURE__ */ jsx("div", { className: "field is-grouped is-grouped-centered mt-4", children: /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }) }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.startsWith("🎉") ? "is-success" : "is-warning"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      /* @__PURE__ */ jsx("div", { style: { whiteSpace: "pre-wrap" }, children: feedback })
    ] })
  ] }) }) });
}

const $$Ex17T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 17T - Algorithmique - Analyse de seuil" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", PythonThresholdAnalysis, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_17_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_17_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_17_T.astro";
const $$url = "/Germain/ex/ex_17_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Ex17T,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
