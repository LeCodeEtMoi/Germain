import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const correctAnswer = "[5, 7, 11, 19]";
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
function PythonAlgorithmAnalysis() {
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const options = [
    "[5, 7, 11, 19]",
    "[5, 7, 11]",
    "[7, 11, 19]",
    "19"
  ];
  const handleValidate = () => {
    if (!userAnswer) {
      setFeedback("Veuillez sélectionner une réponse.");
      return;
    }
    if (userAnswer === correctAnswer) {
      setFeedback("🎉 Bravo Maître, c'est la bonne réponse ! Vous avez bien analysé l'algorithme.");
    } else {
      let explanation = `❌ Oups, ce n'est pas tout à fait ça.`;
      explanation += `

**La bonne réponse était :** ${correctAnswer}`;
      explanation += `

**Explication du déroulement de l'algorithme pour \`liste_termes(3)\` :**
`;
      explanation += `1. **Initialisation :** \`L = []\`, \`u = 5\`.
`;
      explanation += `2. **Boucle \`for i in range(4)\` (car n+1 = 4) :**
`;
      explanation += `   - **i = 0 :** \`L.append(5)\` -> \`L\` devient \`[5]\`. \`u\` devient \`2*5 - 3 = 7\`.
`;
      explanation += `   - **i = 1 :** \`L.append(7)\` -> \`L\` devient \`[5, 7]\`. \`u\` devient \`2*7 - 3 = 11\`.
`;
      explanation += `   - **i = 2 :** \`L.append(11)\` -> \`L\` devient \`[5, 7, 11]\`. \`u\` devient \`2*11 - 3 = 19\`.
`;
      explanation += `   - **i = 3 :** \`L.append(19)\` -> \`L\` devient \`[5, 7, 11, 19]\`. \`u\` devient \`2*19 - 3 = 35\`.
`;
      explanation += `3. **Fin de la boucle.**
`;
      explanation += `4. **Retour :** La fonction retourne la liste \`L\`, qui est \`[5, 7, 11, 19]\`.`;
      setFeedback(explanation);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Algorithmique - Analyse de fonction" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On considère la fonction Python suivante, qui prend un entier ",
      /* @__PURE__ */ jsx("code", { children: "n" }),
      " en paramètre."
    ] }),
    /* @__PURE__ */ jsxs("div", { style: codeBlockStyle, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "def" }),
        " ",
        /* @__PURE__ */ jsx("span", { style: functionStyle, children: "liste_termes" }),
        "(n):"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        "L = []"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        "u = ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "5" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "for" }),
        " i ",
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "in" }),
        " ",
        /* @__PURE__ */ jsx("span", { style: functionStyle, children: "range" }),
        "(n + ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "1" }),
        "):"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "    ",
        "L.append(u)"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "    ",
        "u = ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "2" }),
        " * u - ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "3" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "return" }),
        " L"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "Que retourne l'appel ",
      /* @__PURE__ */ jsx("code", { children: "liste_termes(3)" }),
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

const $$Ex16T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 16T - Algorithmique - Analyse de fonction" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonAlgorithmAnalysis", PythonAlgorithmAnalysis, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_16_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_16_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_16_T.astro";
const $$url = "/Germain/ex/ex_16_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Ex16T,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
