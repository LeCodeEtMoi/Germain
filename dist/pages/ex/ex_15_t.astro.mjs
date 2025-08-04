import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                                      */
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
export { renderers } from '../../renderers.mjs';

const correctAnswer = "u <= A";
const codeBlockStyle = {
  backgroundColor: "#282c34",
  color: "#abb2bf",
  padding: "1rem",
  borderRadius: "5px",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap"
};
const inputStyle = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #61afef",
  color: "#98c379",
  width: "100px",
  margin: "0 5px",
  fontFamily: "monospace"
};
const keywordStyle = { color: "#c678dd" };
const functionStyle = { color: "#61afef" };
const numberStyle = { color: "#d19a66" };
function PythonScriptCompletion() {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const handleValidate = () => {
    const normalizedAnswer = userAnswer.replace(/\s+/g, " ").trim();
    const normalizedCorrectAnswer = correctAnswer.replace(/\s+/g, " ").trim();
    if (!normalizedAnswer) {
      setFeedback("Veuillez entrer une réponse.");
      return;
    }
    if (normalizedAnswer === normalizedCorrectAnswer) {
      setFeedback("🎉 Bravo Maître, c'est la bonne condition ! Le script est maintenant correct.");
    } else {
      let explanation = "❌ Oups, ce n'est pas tout à fait ça.";
      explanation += "\n\n**La bonne réponse était :** `u <= A`";
      explanation += "\n\n**Explication :**\n";
      explanation += "L'objectif est de trouver le premier rang 'n' pour lequel u_n dépasse A.";
      explanation += "La boucle `while` doit donc continuer **tant que** la condition n'est pas remplie, c'est-à-dire tant que `u` est inférieur ou égal à `A`.";
      explanation += "Dès que `u` devient strictement supérieur à `A`, la boucle s'arrête et la fonction retourne la bonne valeur de 'n'.";
      setFeedback(explanation);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Algorithmique - Calcul de seuil" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On s'intéresse à la suite ",
      /* @__PURE__ */ jsx(MathTex, { tex: "(u_n)" }),
      " définie par ",
      /* @__PURE__ */ jsx(MathTex, { tex: "u_0 = 2000" }),
      " et pour tout entier naturel ",
      /* @__PURE__ */ jsx(MathTex, { tex: "n" }),
      ", ",
      /* @__PURE__ */ jsx(MathTex, { tex: "u_{n+1} = 1.02 * u_n" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On souhaite déterminer le plus petit entier naturel ",
      /* @__PURE__ */ jsx(MathTex, { tex: "n" }),
      " tel que ",
      /* @__PURE__ */ jsx(MathTex, { tex: "u_n > 4000" }),
      ". Complétez la condition de la boucle ",
      /* @__PURE__ */ jsx("code", { children: "while" }),
      " dans la fonction Python ci-dessous pour qu'elle retourne la valeur de ",
      /* @__PURE__ */ jsx(MathTex, { tex: "n" }),
      " recherchée."
    ] }),
    /* @__PURE__ */ jsxs("div", { style: codeBlockStyle, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "def" }),
        " ",
        /* @__PURE__ */ jsx("span", { style: functionStyle, children: "seuil" }),
        "(A):"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        "n = ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "0" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        "u = ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "2000" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "  ",
        /* @__PURE__ */ jsx("span", { style: keywordStyle, children: "while" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: userAnswer,
            onChange: (e) => setUserAnswer(e.target.value),
            placeholder: "u <= A",
            style: inputStyle
          }
        ),
        ":"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "    ",
        "u = u * ",
        /* @__PURE__ */ jsx("span", { style: numberStyle, children: "1.02" })
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
    /* @__PURE__ */ jsx("div", { className: "field is-grouped is-grouped-centered mt-4", children: /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }) }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.startsWith("🎉") ? "is-success" : "is-warning"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      /* @__PURE__ */ jsx("div", { style: { whiteSpace: "pre-wrap" }, children: feedback })
    ] })
  ] }) }) });
}

const $$Ex15T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 15T - Algorithmique - Calcul de seuil" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonScriptCompletion", PythonScriptCompletion, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_15_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_15_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_15_T.astro";
const $$url = "/Germain/ex/ex_15_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Ex15T,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
