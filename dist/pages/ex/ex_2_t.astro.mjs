import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const getRandomCoord = () => [
  Math.floor(Math.random() * 11) - 5,
  Math.floor(Math.random() * 11) - 5,
  Math.floor(Math.random() * 11) - 5
];
const vector = (from, to) => [
  to[0] - from[0],
  to[1] - from[1],
  to[2] - from[2]
];
const solveAlphaBetaSystem = (AB, AC, AD) => {
  const [u1, u2, u3] = AB;
  const [v1, v2, v3] = AC;
  const [w1, w2, w3] = AD;
  const det = v1 * w2 - v2 * w1;
  if (Math.abs(det) < 1e-6) {
    return null;
  }
  const alpha = (u1 * w2 - u2 * w1) / det;
  const beta = (v1 * u2 - v2 * u1) / det;
  const left = u3;
  const right = alpha * v3 + beta * w3;
  if (Math.abs(left - right) > 1e-6) {
    return null;
  }
  return { alpha, beta };
};
const RandomPoints = () => {
  const [pointA, setPointA] = useState(getRandomCoord());
  const [pointB, setPointB] = useState(getRandomCoord());
  const [pointC, setPointC] = useState(getRandomCoord());
  const [pointD, setPointD] = useState(getRandomCoord());
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const AB = vector(pointA, pointB);
  const AC = vector(pointA, pointC);
  const AD = vector(pointA, pointD);
  const solution = solveAlphaBetaSystem(AB, AC, AD);
  const coplanar = !!solution;
  const handleValidate = () => {
    setShowResult(true);
  };
  const generateNewPoints = () => {
    setPointA(getRandomCoord());
    setPointB(getRandomCoord());
    setPointC(getRandomCoord());
    setPointD(getRandomCoord());
    setUserAnswer("");
    setShowResult(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h3", { className: "title is-4", children: "Déterminer si les points A, B, C et D sont coplanaires" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "A = (",
        pointA.join(", "),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "B = (",
        pointB.join(", "),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "C = (",
        pointC.join(", "),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "D = (",
        pointD.join(", "),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "field", children: /* @__PURE__ */ jsxs("div", { className: "control", children: [
      /* @__PURE__ */ jsxs("label", { className: "radio", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            name: "coplanarAnswer",
            value: "coplanar",
            checked: userAnswer === "coplanar",
            onChange: (e) => setUserAnswer(e.target.value)
          }
        ),
        "Coplanaires"
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "radio", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            name: "coplanarAnswer",
            value: "nonCoplanar",
            checked: userAnswer === "nonCoplanar",
            onChange: (e) => setUserAnswer(e.target.value)
          }
        ),
        "Non coplanaires"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "field is-grouped", children: [
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: generateNewPoints, children: "Nouveaux points" }) })
    ] }),
    showResult && /* @__PURE__ */ jsxs("div", { className: "notification is-info is-light mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setShowResult(false) }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Réponse correcte :" }),
        " ",
        coplanar ? "Les points sont coplanaires" : "Les points ne sont pas coplanaires"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Votre réponse :" }),
        " ",
        userAnswer === "coplanar" ? "Coplanaires" : "Non coplanaires",
        " ",
        userAnswer === (coplanar ? "coplanar" : "nonCoplanar") ? "✅" : "❌"
      ] }),
      userAnswer !== (coplanar ? "coplanar" : "nonCoplanar") && /* @__PURE__ */ jsxs("div", { className: "content mt-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "title is-5", children: "Correction détaillée :" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Étape 1 — Calcul des vecteurs :" }) }),
        /* @__PURE__ */ jsxs("p", { children: [
          "AB = B - A = (",
          AB.join(", "),
          ")"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "AC = C - A = (",
          AC.join(", "),
          ")"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "AD = D - A = (",
          AD.join(", "),
          ")"
        ] }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Étape 2 — Mise en équation :" }) }),
        /* @__PURE__ */ jsx("p", { children: "On cherche α et β tels que : AB = α·AC + β·AD" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Étape 3 — Résolution du système :" }) }),
        /* @__PURE__ */ jsxs("p", { children: [
          "u1 = α·",
          AC[0],
          " + β·",
          AD[0],
          " ⇒ ",
          AB[0],
          " = α·",
          AC[0],
          " + β·",
          AD[0]
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "u2 = α·",
          AC[1],
          " + β·",
          AD[1],
          " ⇒ ",
          AB[1],
          " = α·",
          AC[1],
          " + β·",
          AD[1]
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "u3 = α·",
          AC[2],
          " + β·",
          AD[2],
          " ⇒ ",
          AB[2],
          " = α·",
          AC[2],
          " + β·",
          AD[2]
        ] }),
        solution ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "→ Solution trouvée :" }) }),
          /* @__PURE__ */ jsxs("p", { children: [
            "α = ",
            solution.alpha.toFixed(2),
            ", β = ",
            solution.beta.toFixed(2)
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Donc AB = α·AC + β·AD, les vecteurs sont coplanaires." })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "→ Ce système n’admet pas de solution compatible." }) }),
          /* @__PURE__ */ jsx("p", { children: "Les vecteurs ne sont donc pas coplanaires." })
        ] })
      ] })
    ] })
  ] });
};

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Ex2T = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ex2T;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-tppmtnqv> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-tppmtnqv": true })}${renderHead()}</head> <body data-astro-cid-tppmtnqv> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-tppmtnqv": true })} <main data-astro-cid-tppmtnqv> <article data-astro-cid-tppmtnqv> <div class="hero-image" data-astro-cid-tppmtnqv> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-tppmtnqv>`} </div> <div class="prose" data-astro-cid-tppmtnqv> <div class="title" data-astro-cid-tppmtnqv> <h1 data-astro-cid-tppmtnqv>${title}</h1> </div> ${renderComponent($$result, "Ex_2_T", RandomPoints, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_2_T.tsx", "client:component-export": "default", "data-astro-cid-tppmtnqv": true })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-tppmtnqv": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_2_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_2_T.astro";
const $$url = "/Germain/ex/ex_2_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex2T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
