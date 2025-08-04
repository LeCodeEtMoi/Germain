import { a as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
export { renderers } from '../../renderers.mjs';

function RaisonnementParRecurrence() {
  const [initialisationValue, setInitialisationValue] = useState("");
  const [herediteStep1, setHerediteStep1] = useState("");
  const [herediteStep2, setHerediteStep2] = useState("");
  const [feedback, setFeedback] = useState(null);
  const correctInitialisation = "0";
  const correctHerediteStep1 = "k(k+1)/2";
  const correctHerediteStep2 = "k+1";
  function handleValidate() {
    const isInitialisationCorrect = initialisationValue.replace(/\s/g, "") === correctInitialisation;
    const isHerediteStep1Correct = herediteStep1.replace(/\s/g, "").includes(correctHerediteStep1);
    const isHerediteStep2Correct = herediteStep2.replace(/\s/g, "") === correctHerediteStep2;
    if (isInitialisationCorrect && isHerediteStep1Correct && isHerediteStep2Correct) {
      setFeedback({ correct: true, message: /* @__PURE__ */ jsx("p", { children: "🎉 Bravo Maître, votre raisonnement est parfait !" }) });
    } else {
      let errorMessages = [];
      if (!isInitialisationCorrect) {
        errorMessages.push(/* @__PURE__ */ jsx("p", { children: "❌ L'initialisation est incorrecte. Pour n=0, la somme est 0." }));
      }
      if (!isHerediteStep1Correct || !isHerediteStep2Correct) {
        errorMessages.push(/* @__PURE__ */ jsx("p", { children: "❌ L'hérédité contient une erreur. Vérifiez vos calculs." }));
        errorMessages.push(/* @__PURE__ */ jsx("p", { children: "Indice : Somme(k+1) = Somme(k) + (k+1) = k(k+1)/2 + (k+1)" }));
      }
      setFeedback({
        correct: false,
        message: /* @__PURE__ */ jsx("div", { children: errorMessages })
      });
    }
  }
  function handleNewExercise() {
    setInitialisationValue("");
    setHerediteStep1("");
    setHerediteStep2("");
    setFeedback(null);
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Raisonnement par Récurrence" }),
    /* @__PURE__ */ jsx("p", { children: "On souhaite démontrer par récurrence la propriété suivante, pour tout entier naturel n ≥ 0 :" }),
    /* @__PURE__ */ jsx("p", { className: "has-text-centered has-text-weight-bold", children: "P(n) : 0 + 1 + 2 + ... + n = n(n+1)/2" }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Étape 1 : Initialisation" }),
    /* @__PURE__ */ jsx("p", { children: "On vérifie que la propriété est vraie pour le premier rang, ici n=0." }),
    /* @__PURE__ */ jsx("p", { children: "Pour n=0, la somme des entiers de 0 à 0 est :" }),
    /* @__PURE__ */ jsx("div", { className: "field", children: /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(
      "input",
      {
        className: "input",
        type: "text",
        placeholder: "Valeur de la somme",
        value: initialisationValue,
        onChange: (e) => setInitialisationValue(e.target.value)
      }
    ) }) }),
    /* @__PURE__ */ jsx("p", { children: "Et n(n+1)/2 = 0(0+1)/2 = 0. Donc P(0) est vraie." }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Étape 2 : Hérédité" }),
    /* @__PURE__ */ jsx("p", { children: "On suppose que P(k) est vraie pour un certain entier k ≥ 0 (Hypothèse de récurrence)." }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On veut démontrer P(k+1), c'est-à-dire : ",
      /* @__PURE__ */ jsx("strong", { children: "0 + 1 + ... + k + (k+1) = (k+1)(k+2)/2" })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Complétez le raisonnement :" }),
    /* @__PURE__ */ jsx("p", { children: "0 + 1 + ... + k + (k+1) = (0 + 1 + ... + k) + (k+1)" }),
    /* @__PURE__ */ jsxs("div", { className: "field is-grouped", children: [
      /* @__PURE__ */ jsxs("p", { className: "control is-expanded", children: [
        "= ",
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "input",
            type: "text",
            placeholder: "Utiliser l'hypothèse",
            value: herediteStep1,
            onChange: (e) => setHerediteStep1(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "control", children: " + " }),
      /* @__PURE__ */ jsx("p", { className: "control is-expanded", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: "input",
          type: "text",
          placeholder: "Terme suivant",
          value: herediteStep2,
          onChange: (e) => setHerediteStep2(e.target.value)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Ensuite, on met (k+1) en facteur : (k+1) * (k/2 + 1) = (k+1) * ((k+2)/2) = ",
      /* @__PURE__ */ jsx("strong", { children: "(k+1)(k+2)/2" })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "On a bien démontré P(k+1)." }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Étape 3 : Conclusion" }),
    /* @__PURE__ */ jsx("p", { children: "P(n) est initialisée pour n=0 et est héréditaire. Donc, par le principe de récurrence, la propriété P(n) est vraie pour tout entier naturel n ≥ 0." }),
    /* @__PURE__ */ jsxs("div", { className: "field is-grouped is-grouped-centered mt-5", children: [
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: handleNewExercise, children: "Recommencer" }) })
    ] }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.correct ? "is-success" : "is-danger"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      feedback.message
    ] })
  ] }) }) });
}

const $$Ex4T = createComponent(($$result, $$props, $$slots) => {
  const title = "Exercice : Raisonnement par R\xE9currence";
  const description = "Un exercice pour s'entra\xEEner au raisonnement par r\xE9currence.";
  return renderTemplate`<html lang="fr"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <article> <div class="prose"> <div class="title"> <h1>${title}</h1> </div> ${renderComponent($$result, "Ex_4_T", RaisonnementParRecurrence, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_4_T.tsx", "client:component-export": "default" })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_4_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_4_T.astro";
const $$url = "/Germain/ex/ex_4_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex4T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
