import { c as createComponent, a as createAstro, r as renderComponent, b as renderHead, e as addAttribute, f as renderTemplate } from '../../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DMtE2hl_.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

function equationCartesienne(A, V) {
  const [a, b, c] = V;
  const [x, y, z] = A;
  const d = -(a * x + b * y + c * z);
  const terms = [];
  if (a !== 0) terms.push(`${a}x`);
  if (b !== 0) terms.push(`${b > 0 && terms.length > 0 ? "+" : ""}${b}y`);
  if (c !== 0) terms.push(`${c > 0 && terms.length > 0 ? "+" : ""}${c}z`);
  if (d !== 0 || terms.length === 0) {
    terms.push(`${d > 0 && terms.length > 0 ? "+" : ""}${d}`);
  }
  return terms.join(" ") + " = 0";
}
function randomCoord() {
  return [
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5
  ];
}
const EquationCartesienne = () => {
  const [A, setA] = useState(randomCoord());
  const [V, setV] = useState(randomCoord());
  const [userInput, setUserInput] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const correctEq = equationCartesienne(A, V);
  const checkAnswer = () => {
    setShowCorrection(true);
  };
  const newExercise = () => {
    setA(randomCoord());
    setV(randomCoord());
    setUserInput("");
    setShowCorrection(false);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h4", { children: "Détermine une équation cartésienne du plan passant par A et de vecteur normal n⃗" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Point A : (",
      A.join(", "),
      ")"
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Vecteur normal n⃗ : (",
      V.join(", "),
      ")"
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: userInput,
        onChange: (e) => setUserInput(e.target.value),
        placeholder: "Ex: 2x - 3y + 4z + 1 = 0",
        style: { width: "300px" }
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("button", { onClick: checkAnswer, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { onClick: newExercise, style: { marginLeft: "1em" }, children: "Nouvel exercice" })
    ] }),
    showCorrection && /* @__PURE__ */ jsx("div", { style: { marginTop: "20px" }, children: userInput.replace(/\s+/g, "") === correctEq.replace(/\s+/g, "") ? /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Bravo Maître, la réponse est correcte !" }) }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Aïe, une erreur s'est glissée, Maître." }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Le vecteur n⃗(",
        V.join(", "),
        ") est normal au plan."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "On utilise la formule : ax + by + cz + d = 0" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Avec a=",
        V[0],
        ", b=",
        V[1],
        ", c=",
        V[2],
        " et le point A(",
        A.join(", "),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "d = -(",
        V[0],
        "×",
        A[0],
        " + ",
        V[1],
        "×",
        A[1],
        " + ",
        V[2],
        "×",
        A[2],
        ") = ",
        -(V[0] * A[0] + V[1] * A[1] + V[2] * A[2])
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
        "Équation correcte : ",
        correctEq
      ] }) })
    ] }) })
  ] });
};

const $$Astro = createAstro();
const $$Ex1T = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ex1T;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-igvbk7ht> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-igvbk7ht": true })}${renderHead()}</head> <body data-astro-cid-igvbk7ht> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-igvbk7ht": true })} <main data-astro-cid-igvbk7ht> <article data-astro-cid-igvbk7ht> <div class="hero-image" data-astro-cid-igvbk7ht> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-igvbk7ht>`} </div> <div class="prose" data-astro-cid-igvbk7ht> <div class="title" data-astro-cid-igvbk7ht> <h1 data-astro-cid-igvbk7ht>${title}</h1> </div> ${renderComponent($$result, "Ex_1_T", EquationCartesienne, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_1_T.tsx", "client:component-export": "default", "data-astro-cid-igvbk7ht": true })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-igvbk7ht": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_1_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_1_T.astro";
const $$url = "/Germain/ex/ex_1_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex1T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
