import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const correctRelation = "incluse";
function StaticLinePlaneCheck() {
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const handleValidate = () => {
    if (!userAnswer) {
      setFeedback("Veuillez sélectionner une réponse.");
      return;
    }
    if (userAnswer === correctRelation) {
      setFeedback("🎉 Bravo Maître, la réponse est correcte !");
    } else {
      let explanation = `❌ Oups, une erreur s'est glissée. La bonne réponse était : **${correctRelation}**.`;
      explanation += "\n\n**Explication :**\n";
      explanation += `1. On identifie le vecteur normal du plan (P), **n(2; -1; 1)**, et le vecteur directeur de la droite (Δ), **u(1; 1; -1)**.
`;
      explanation += `2. On calcule le produit scalaire : n · u = (2)(1) + (-1)(1) + (1)(-1) = 2 - 1 - 1 = 0.`;
      explanation += `
Comme le produit scalaire est nul, la droite est soit parallèle au plan, soit incluse dans le plan.
`;
      explanation += `3. On vérifie si un point de la droite (Δ) appartient au plan (P). Prenons le point **A(2; 4; 1)** (obtenu avec u=0).
`;
      explanation += `On remplace ses coordonnées dans l'équation du plan : 2(2) - 4 + 1 - 1 = 4 - 4 + 0 = 0.`;
      explanation += `
Le point A appartient au plan (P). La droite est donc **incluse** dans le plan.`;
      setFeedback(explanation);
    }
  };
  const options = ["parallèle", "orthogonale", "incluse", "sécante"];
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Position relative d'une droite et d'un plan (Exercice Fixe)" }),
    /* @__PURE__ */ jsx("p", { children: "On se place dans l'espace muni d'un repère orthonormé (O; ı⃗; ȷ⃗; k⃗)." }),
    /* @__PURE__ */ jsx("p", { children: "On considère le plan (P) d'équation cartésienne :" }),
    /* @__PURE__ */ jsx("p", { className: "is-family-monospace has-background-light p-3", children: "2x − y + z − 1 = 0" }),
    /* @__PURE__ */ jsx("p", { children: "Et la droite (Δ) de représentation paramétrique :" }),
    /* @__PURE__ */ jsx("pre", { className: "is-family-monospace has-background-light p-3", children: `{
  x = 2 + u
  y = 4 + u
  z = 1 - u
(u ∈ ℝ)` }),
    /* @__PURE__ */ jsx("p", { children: "La droite (Δ) est :" }),
    /* @__PURE__ */ jsx("div", { className: "control", children: options.map((option) => /* @__PURE__ */ jsxs("label", { className: "radio", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "radio",
          name: "relation",
          value: option,
          checked: userAnswer === option,
          onChange: () => setUserAnswer(option)
        }
      ),
      (() => {
        switch (option) {
          case "parallèle":
            return " Strictement parallèle au plan (P)";
          case "orthogonale":
            return " Orthogonale au plan (P)";
          case "incluse":
            return " Incluse dans le plan (P)";
          case "sécante":
            return " Sécante et non orthogonale au plan (P)";
          default:
            return "";
        }
      })()
    ] }, option)) }),
    /* @__PURE__ */ jsx("div", { className: "field is-grouped is-grouped-centered mt-4", children: /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }) }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.startsWith("🎉") ? "is-success" : "is-warning"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      /* @__PURE__ */ jsx("div", { style: { whiteSpace: "pre-wrap" }, children: feedback })
    ] })
  ] }) }) });
}

const $$Ex12T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 12T - Position relative (Fixe)" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "StaticLinePlaneCheck", StaticLinePlaneCheck, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_12_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_12_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_12_T.astro";
const $$url = "/Germain/ex/ex_12_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Ex12T,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
