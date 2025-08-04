import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const correctRelation = "non_perpendiculaires";
function StaticPlanePlaneCheck() {
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
      let explanation = `❌ Oups, une erreur s'est glissée. La bonne réponse était : **sécants et non perpendiculaires**.`;
      explanation += "\n\n**Explication :**\n";
      explanation += `1. On identifie les vecteurs normaux des plans (P1) et (P2).`;
      explanation += `   - Pour (P1) : **n1(1; -2; 1)**`;
      explanation += `   - Pour (P2) : **n2(2; 1; 1)**`;
      explanation += `2. On vérifie si les vecteurs normaux sont colinéaires. Les coordonnées ne sont pas proportionnelles (2/1 ≠ 1/-2). Les vecteurs ne sont donc pas colinéaires, ce qui signifie que les plans ne sont **ni parallèles, ni confondus**. Ils sont donc **sécants**.`;
      explanation += `3. On vérifie si les plans sont perpendiculaires en calculant le produit scalaire des vecteurs normaux :`;
      explanation += `   n1 · n2 = (1)(2) + (-2)(1) + (1)(1) = 2 - 2 + 1 = 1.`;
      explanation += `Comme le produit scalaire est différent de 0, les plans ne sont pas perpendiculaires.`;
      explanation += `Conclusion : Les plans sont **sécants et non perpendiculaires**.`;
      setFeedback(explanation);
    }
  };
  const options = [
    { id: "confondus", text: "confondus." },
    { id: "perpendiculaires", text: "sécants et perpendiculaires." },
    { id: "non_perpendiculaires", text: "sécants et non perpendiculaires." },
    { id: "parallèles", text: "strictement parallèles." }
  ];
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Position relative de deux plans (Exercice Fixe)" }),
    /* @__PURE__ */ jsx("p", { children: "On se place dans l'espace muni d'un repère orthonormé (O; ı⃗; ȷ⃗; k⃗)." }),
    /* @__PURE__ */ jsx("p", { children: "On considère le plan (P1) d'équation cartésienne :" }),
    /* @__PURE__ */ jsx("p", { className: "is-family-monospace has-background-light p-3", children: "x − 2y + z + 1 = 0" }),
    /* @__PURE__ */ jsx("p", { children: "Ainsi que le plan (P2) d'équation cartésienne :" }),
    /* @__PURE__ */ jsx("p", { className: "is-family-monospace has-background-light p-3", children: "2x + y + z − 6 = 0" }),
    /* @__PURE__ */ jsx("p", { children: "Les plans (P1) et (P2) sont :" }),
    /* @__PURE__ */ jsx("div", { className: "control", children: options.map((option) => /* @__PURE__ */ jsxs("label", { className: "radio", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "radio",
          name: "relation",
          value: option.id,
          checked: userAnswer === option.id,
          onChange: () => setUserAnswer(option.id)
        }
      ),
      ` ${option.text}`
    ] }, option.id)) }),
    /* @__PURE__ */ jsx("div", { className: "field is-grouped is-grouped-centered mt-4", children: /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }) }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.startsWith("🎉") ? "is-success" : "is-warning"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      /* @__PURE__ */ jsx("div", { style: { whiteSpace: "pre-wrap" }, children: feedback })
    ] })
  ] }) }) });
}

const $$Ex13T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 13T - Position relative de deux plans" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "StaticPlanePlaneCheck", StaticPlanePlaneCheck, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_13_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_13_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_13_T.astro";
const $$url = "/Germain/ex/ex_13_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Ex13T,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
