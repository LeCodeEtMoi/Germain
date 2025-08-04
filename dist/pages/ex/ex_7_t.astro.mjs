import { a as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { g as generateRandomPoint } from '../../chunks/RandomPoint3D_Bo-jDIuJ.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
export { renderers } from '../../renderers.mjs';

const subtract = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z });
const add = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y, z: p1.z + p2.z });
const scale = (v, s) => ({ x: v.x * s, y: v.y * s, z: v.z * s });
const crossProduct = (v1, v2) => ({
  x: v1.y * v2.z - v1.z * v2.y,
  y: v1.z * v2.x - v1.x * v2.z,
  z: v1.x * v2.y - v1.y * v2.x
});
const dotProduct = (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
const isZeroVector = (v) => v.x === 0 && v.y === 0 && v.z === 0;
const areCollinear = (v1, v2) => isZeroVector(crossProduct(v1, v2));
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
function generateExerciseData() {
  let A1, u1, A2, u2;
  let relation;
  let intersectionPoint = null;
  const scenario = randomInt(1, 4);
  do {
    u1 = generateRandomPoint(-3, 3);
  } while (isZeroVector(u1));
  A1 = generateRandomPoint(-5, 5);
  switch (scenario) {
    case 1:
      relation = "sécantes";
      do {
        u2 = generateRandomPoint(-3, 3);
      } while (isZeroVector(u2) || areCollinear(u1, u2));
      intersectionPoint = generateRandomPoint(-5, 5);
      A1 = subtract(intersectionPoint, scale(u1, randomInt(-2, 2)));
      A2 = subtract(intersectionPoint, scale(u2, randomInt(-2, 2)));
      break;
    case 2:
      relation = "parallèles";
      u2 = scale(u1, randomInt(1, 2) * (Math.random() > 0.5 ? 1 : -1));
      do {
        A2 = generateRandomPoint(-5, 5);
      } while (areCollinear(subtract(A2, A1), u1));
      break;
    case 3:
      relation = "non coplanaires";
      do {
        u2 = generateRandomPoint(-3, 3);
      } while (isZeroVector(u2) || areCollinear(u1, u2));
      do {
        A2 = generateRandomPoint(-5, 5);
      } while (Math.abs(dotProduct(subtract(A2, A1), crossProduct(u1, u2))) < 1e-9);
      break;
    case 4:
    // Confondues (Confounded)
    default:
      relation = "confondues";
      u2 = scale(u1, randomInt(1, 2) * (Math.random() > 0.5 ? 1 : -1));
      A2 = add(A1, scale(u1, randomInt(-3, 3)));
      break;
  }
  return { A1, u1, A2, u2, relation, intersectionPoint };
}
function LineRelationshipCheck() {
  const [data, setData] = useState(generateExerciseData());
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [intersectionInput, setIntersectionInput] = useState({ x: "", y: "", z: "" });
  const handleNewExercise = () => {
    setData(generateExerciseData());
    setUserAnswer(null);
    setFeedback(null);
    setIntersectionInput({ x: "", y: "", z: "" });
  };
  const handleValidate = () => {
    if (userAnswer === null) {
      setFeedback("Veuillez sélectionner une réponse.");
      return;
    }
    if (userAnswer === data.relation) {
      if (data.relation === "sécantes") {
        const p = data.intersectionPoint;
        if (!p) {
          setFeedback("Erreur: Le point d'intersection n'a pas été calculé.");
          return;
        }
        const userX = parseFloat(intersectionInput.x.replace(",", "."));
        const userY = parseFloat(intersectionInput.y.replace(",", "."));
        const userZ = parseFloat(intersectionInput.z.replace(",", "."));
        if (isNaN(userX) || isNaN(userY) || isNaN(userZ)) {
          setFeedback("Veuillez entrer des coordonnées numériques valides pour le point d'intersection.");
          return;
        }
        if (Math.abs(userX - p.x) < 1e-9 && Math.abs(userY - p.y) < 1e-9 && Math.abs(userZ - p.z) < 1e-9) {
          setFeedback(`🎉 Bravo Maître, la réponse est correcte ! Le point d'intersection est bien (${p.x}; ${p.y}; ${p.z}).`);
        } else {
          setFeedback(`❌ La position est correcte, mais les coordonnées du point d'intersection sont fausses. La bonne réponse était (${p.x}; ${p.y}; ${p.z}).`);
        }
      } else {
        setFeedback("🎉 Bravo Maître, la réponse est correcte !");
      }
    } else {
      const { A1: A12, u1: u12, A2: A22, u2: u22, relation, intersectionPoint } = data;
      const A1A2 = subtract(A22, A12);
      const u1_x_u2 = crossProduct(u12, u22);
      const collinear = areCollinear(u12, u22);
      let explanation = `❌ Oups, une erreur s'est glissée. La bonne réponse était : **${relation}**.`;
      explanation += "\n\n**Explication :**\n";
      explanation += `1. On compare les vecteurs directeurs u1(${u12.x}; ${u12.y}; ${u12.z}) et u2(${u22.x}; ${u22.y}; ${u22.z}).
`;
      if (collinear) {
        explanation += "Le produit vectoriel u1 x u2 est le vecteur nul, donc les vecteurs sont colinéaires. Les droites sont parallèles ou confondues.\n";
        explanation += `2. On vérifie si le point A1(${A12.x}; ${A12.y}; ${A12.z}) de (d1) appartient à (d2).
`;
        const A1A2_collinear_u2 = areCollinear(A1A2, u22);
        if (A1A2_collinear_u2) {
          explanation += "Le vecteur A1A2 est colinéaire à u2, donc A1 est sur (d2). Les droites sont **confondues**.";
        } else {
          explanation += "Le vecteur A1A2 n'est pas colinéaire à u2, donc A1 n'est pas sur (d2). Les droites sont **strictement parallèles**.";
        }
      } else {
        explanation += "Les vecteurs directeurs ne sont pas colinéaires. Les droites sont sécantes ou non coplanaires.\n";
        explanation += "2. On calcule le produit mixte (A1A2 . (u1 x u2)).\n";
        const mixedProduct = dotProduct(A1A2, u1_x_u2);
        if (Math.abs(mixedProduct) < 1e-9) {
          explanation += `Le produit mixte est nul. Les droites sont coplanaires, donc **sécantes**.`;
          if (intersectionPoint) {
            const p = intersectionPoint;
            explanation += ` Le point d'intersection est (${p.x}; ${p.y}; ${p.z}).`;
          }
        } else {
          explanation += `Le produit mixte est non nul (${mixedProduct.toFixed(2)}). Les droites sont **non coplanaires**.`;
        }
      }
      setFeedback(explanation);
    }
  };
  const formatParametric = (A, V, param) => {
    const formatVal = (val, sign = false) => {
      if (val === 0) return "";
      const signStr = val > 0 ? "+" : "-";
      const absVal = Math.abs(val);
      if (absVal === 1) return `${sign ? signStr : val > 0 ? "" : "-"}${param}`;
      return `${sign ? signStr : val > 0 ? "" : "-"}${absVal}${param}`;
    };
    return /* @__PURE__ */ jsx("pre", { className: "is-family-monospace has-background-light p-3", children: `{
  x = ${A.x} ${formatVal(V.x, true)}
  y = ${A.y} ${formatVal(V.y, true)}
  z = ${A.z} ${formatVal(V.z, true)}
(${param} ∈ ℝ)` });
  };
  const { A1, u1, A2, u2 } = data;
  const options = ["confondues", "parallèles", "sécantes", "non coplanaires"];
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Position relative de deux droites" }),
    /* @__PURE__ */ jsx("p", { children: "On considère les droites (d1) et (d2) de représentations paramétriques :" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: "(d1)" }),
        formatParametric(A1, u1, "r")
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("strong", { children: "(d2)" }),
        formatParametric(A2, u2, "s")
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Les droites (d1) et (d2) sont :" }),
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
      ` ${option.charAt(0).toUpperCase() + option.slice(1)}`
    ] }, option)) }),
    userAnswer === "sécantes" && /* @__PURE__ */ jsxs("div", { className: "field mt-4", children: [
      /* @__PURE__ */ jsx("label", { className: "label", children: "Point d'intersection (x; y; z)" }),
      /* @__PURE__ */ jsxs("div", { className: "field is-grouped", children: [
        /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(
          "input",
          {
            className: "input",
            type: "text",
            placeholder: "x",
            value: intersectionInput.x,
            onChange: (e) => setIntersectionInput({ ...intersectionInput, x: e.target.value })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(
          "input",
          {
            className: "input",
            type: "text",
            placeholder: "y",
            value: intersectionInput.y,
            onChange: (e) => setIntersectionInput({ ...intersectionInput, y: e.target.value })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(
          "input",
          {
            className: "input",
            type: "text",
            placeholder: "z",
            value: intersectionInput.z,
            onChange: (e) => setIntersectionInput({ ...intersectionInput, z: e.target.value })
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "field is-grouped is-grouped-centered mt-4", children: [
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: handleNewExercise, children: "Nouvel exercice" }) })
    ] }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.startsWith("🎉") ? "is-success" : "is-warning"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      /* @__PURE__ */ jsx("div", { style: { whiteSpace: "pre-wrap" }, children: feedback })
    ] })
  ] }) }) });
}

const $$Ex7T = createComponent(($$result, $$props, $$slots) => {
  const title = "";
  const description = "D\xE9terminer si deux droites dans l'espace sont confondues, parall\xE8les, s\xE9cantes ou non coplanaires.";
  return renderTemplate`<html lang="fr"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <article> <div class="prose"> <div class="title"> <h1>${title}</h1> </div> ${renderComponent($$result, "Ex_7_T", LineRelationshipCheck, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_7_T.tsx", "client:component-export": "default" })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_7_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_7_T.astro";
const $$url = "/Germain/ex/ex_7_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex7T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
