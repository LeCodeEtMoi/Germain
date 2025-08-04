import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import katex from 'katex';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const Ex_19_T = () => {
  const [response, setResponse] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const correctAnswers = ["u<=100", "100>=u"];
  const checkResponse = () => {
    const sanitizedResponse = response.trim().replace(/\s/g, "");
    const isAnswerCorrect = correctAnswers.includes(sanitizedResponse);
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "ex-container", children: [
    /* @__PURE__ */ jsx("h2", { className: "ex-title", children: "Exercice 19 : Seuil de suite" }),
    /* @__PURE__ */ jsxs("div", { className: "ex-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "ex-text", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "On considère la suite ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`(u_n)`) } }),
          " définie par ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`u_0 = 10`) } }),
          " et pour tout entier naturel ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`n`) } }),
          ", ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`u_{n+1} = u_n + 5`) } }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "On souhaite déterminer le plus petit entier ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`n`) } }),
          " tel que ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`u_n > 100`) } }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Compléter le script Python suivant pour qu'il renvoie la valeur de ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`n`) } }),
          " recherchée."
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ex-code", children: /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsxs("code", { children: [
        `def seuil():
  n = 0
  u = 10
  while `,
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: response,
            onChange: (e) => setResponse(e.target.value),
            placeholder: "votre condition",
            className: "ex-input"
          }
        ),
        `: 
    n = n + 1
    u = u + 5
  return n`
      ] }) }) }),
      /* @__PURE__ */ jsx("button", { className: "ex-button", onClick: checkResponse, children: "Valider" }),
      showExplanation && /* @__PURE__ */ jsxs("div", { className: "ex-explanation", children: [
        isCorrect ? /* @__PURE__ */ jsxs("p", { className: "ex-feedback-correct", children: [
          "Correct ! La condition est bien ",
          /* @__PURE__ */ jsx("code", { children: "u <= 100" }),
          "."
        ] }) : /* @__PURE__ */ jsxs("p", { className: "ex-feedback-incorrect", children: [
          "Incorrect. La condition doit permettre à la boucle de continuer tant que ",
          /* @__PURE__ */ jsx("code", { children: "u" }),
          " n'a pas dépassé 100."
        ] }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Explication :" }) }),
        /* @__PURE__ */ jsxs("p", { children: [
          "La boucle ",
          /* @__PURE__ */ jsx("code", { children: "while" }),
          " doit s'exécuter tant que la condition ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`u_n \\le 100`) } }),
          " est vraie. Dès que ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`u_n > 100`) } }),
          ", la boucle s'arrête et la fonction renvoie la valeur de ",
          /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: katex.renderToString(`n`) } }),
          " correspondante. La condition à écrire est donc ",
          /* @__PURE__ */ jsx("code", { children: "u <= 100" }),
          ". Le script renverra 19."
        ] })
      ] })
    ] })
  ] });
};

const $$Ex19T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 19T - Algorithmique - Analyse de seuil" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", Ex_19_T, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_19_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_19_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_19_T.astro";
const $$url = "/Germain/ex/ex_19_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex19T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
