import { a as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import 'mathlive';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
export { renderers } from '../../renderers.mjs';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateFunction() {
  const a = randomInt(2, 10);
  const b = randomInt(2, 5);
  const funcLatex = `${a}x^{${b}}`;
  const derivativeLatex = `${a * b}x^{${b - 1}}`;
  return {
    funcLatex,
    derivativeLatex
  };
}
function DerivativeExercice() {
  const [problem, setProblem] = useState(generateFunction());
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const mathfieldRef = useRef(null);
  useEffect(() => {
    if (mathfieldRef.current && userInput !== mathfieldRef.current.getValue("latex")) {
      mathfieldRef.current.setValue(userInput);
    }
  }, [userInput]);
  function handleValidate() {
    const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();
    if (normalize(userInput) === normalize(problem.derivativeLatex)) {
      setFeedback({ correct: true, message: /* @__PURE__ */ jsx("p", { children: "🎉 Excellent! C'est la bonne dérivée." }) });
    } else {
      setFeedback({
        correct: false,
        message: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "❌ Ce n'est pas tout à fait ça. Essayez encore !" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Rappel : La dérivée de ",
            /* @__PURE__ */ jsx("strong", { children: "ax^n" }),
            " est ",
            /* @__PURE__ */ jsx("strong", { children: "anx^(n-1)" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "La bonne réponse est : ",
            /* @__PURE__ */ jsx("strong", { children: problem.derivativeLatex })
          ] })
        ] })
      });
    }
  }
  function handleNewExercise() {
    setProblem(generateFunction());
    setUserInput("");
    setFeedback(null);
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Exercice de Dérivation" }),
    /* @__PURE__ */ jsx("p", { children: "Trouvez la fonction dérivée de la fonction suivante :" }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered has-text-weight-bold", children: /* @__PURE__ */ jsx(
      "math-field",
      {
        "read-only": true,
        static: true,
        value: problem.funcLatex,
        style: { fontSize: "1.5rem" }
      }
    ) }),
    /* @__PURE__ */ jsx("label", { className: "label", htmlFor: "userInput", children: "f'(x) =" }),
    /* @__PURE__ */ jsx(
      "math-field",
      {
        id: "userInput",
        ref: mathfieldRef,
        "virtual-keyboard-mode": "manual",
        style: { width: "100%", minHeight: "3rem", fontSize: "1.3rem" },
        onInput: (e) => setUserInput(e.target.getValue("latex"))
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "field is-grouped is-grouped-centered mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: handleNewExercise, children: "Nouvel exercice" })
    ] }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.correct ? "is-success" : "is-danger"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      feedback.message
    ] })
  ] }) }) });
}

const $$Ex5T = createComponent(($$result, $$props, $$slots) => {
  const title = "Exercice : D\xE9rivation de fonctions simples";
  const description = "Un exercice pour s'entra\xEEner \xE0 la d\xE9rivation de fonctions polynomiales.";
  return renderTemplate`<html lang="fr"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <article> <div class="prose"> <div class="title"> <h1>${title}</h1> </div> ${renderComponent($$result, "Ex_5_T", DerivativeExercice, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_5_T.tsx", "client:component-export": "default" })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_5_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_5_T.astro";
const $$url = "/Germain/ex/ex_5_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex5T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
