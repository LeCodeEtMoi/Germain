import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import katex from 'katex';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const Ex_18_T = () => {
  const [response, setResponse] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const correctAnswers = ["175"];
  const checkResponse = () => {
    const isAnswerCorrect = correctAnswers.includes(response.trim());
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);
  };
  const handleOptionChange = (e) => {
    setResponse(e.target.value);
    setIsCorrect(null);
    setShowExplanation(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "ex-container", children: [
    /* @__PURE__ */ jsx("h2", { className: "ex-title", children: "Exercice 18 : Somme des termes d'une suite" }),
    /* @__PURE__ */ jsxs("div", { className: "ex-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "ex-text", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "On considère la suite ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`(u_n)`) } }),
          " définie par ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`u_0 = 100`) } }),
          " et pour tout entier naturel ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`n`) } }),
          ", ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`u_{n+1} = 0.5 \\times u_n`) } }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "On souhaite calculer la somme des premiers termes de cette suite." }),
        /* @__PURE__ */ jsx("p", { children: "On a écrit le script Python suivant :" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ex-code", children: /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: `def somme(n):
  u = 100
  s = 0
  for i in range(n + 1):
    s = s + u
    u = u * 0.5
  return s` }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "ex-question", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Que renvoie l'appel ",
          /* @__PURE__ */ jsx("code", { children: "somme(2)" }),
          " ?"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ex-options", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "radio", value: "100", checked: response === "100", onChange: handleOptionChange }),
            "100"
          ] }),
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "radio", value: "150", checked: response === "150", onChange: handleOptionChange }),
            "150"
          ] }),
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "radio", value: "175", checked: response === "175", onChange: handleOptionChange }),
            "175"
          ] }),
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("input", { type: "radio", value: "200", checked: response === "200", onChange: handleOptionChange }),
            "200"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "ex-button", onClick: checkResponse, children: "Valider" }),
      showExplanation && /* @__PURE__ */ jsxs("div", { className: "ex-explanation", children: [
        isCorrect ? /* @__PURE__ */ jsxs("p", { className: "ex-feedback-correct", children: [
          "Correct ! L'appel ",
          /* @__PURE__ */ jsx("code", { children: "somme(2)" }),
          " renvoie bien 175."
        ] }) : /* @__PURE__ */ jsx("p", { className: "ex-feedback-incorrect", children: "Incorrect." }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Explication :" }) }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Initialisation : ",
            /* @__PURE__ */ jsx("code", { children: "u = 100" }),
            ", ",
            /* @__PURE__ */ jsx("code", { children: "s = 0" }),
            ". La boucle ",
            /* @__PURE__ */ jsx("code", { children: "for" }),
            " s'exécute pour ",
            /* @__PURE__ */ jsx("code", { children: "i" }),
            " allant de 0 à 2."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "i = 0" }),
            " : ",
            /* @__PURE__ */ jsx("code", { children: "s" }),
            " devient ",
            /* @__PURE__ */ jsx("code", { children: "0 + 100 = 100" }),
            ". ",
            /* @__PURE__ */ jsx("code", { children: "u" }),
            " devient ",
            /* @__PURE__ */ jsx("code", { children: "100 * 0.5 = 50" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "i = 1" }),
            " : ",
            /* @__PURE__ */ jsx("code", { children: "s" }),
            " devient ",
            /* @__PURE__ */ jsx("code", { children: "100 + 50 = 150" }),
            ". ",
            /* @__PURE__ */ jsx("code", { children: "u" }),
            " devient ",
            /* @__PURE__ */ jsx("code", { children: "50 * 0.5 = 25" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "i = 2" }),
            " : ",
            /* @__PURE__ */ jsx("code", { children: "s" }),
            " devient ",
            /* @__PURE__ */ jsx("code", { children: "150 + 25 = 175" }),
            ". ",
            /* @__PURE__ */ jsx("code", { children: "u" }),
            " devient ",
            /* @__PURE__ */ jsx("code", { children: "25 * 0.5 = 12.5" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "La boucle se termine. La fonction renvoie ",
            /* @__PURE__ */ jsx("code", { children: "s" }),
            ", qui vaut 175."
          ] })
        ] })
      ] })
    ] })
  ] });
};

const $$Ex18T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 18T - Algorithmique - Analyse de seuil" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", Ex_18_T, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_18_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_18_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_18_T.astro";
const $$url = "/Germain/ex/ex_18_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex18T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
