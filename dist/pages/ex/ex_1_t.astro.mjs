import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
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
function EquationCartesienne() {
  const [A, setA] = useState(randomCoord());
  const [V, setV] = useState(randomCoord());
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const correctEq = equationCartesienne(A, V);
  function handleValidate() {
    const normalizedUser = userInput.replace(/\s+/g, "").toLowerCase();
    const normalizedCorrect = correctEq.replace(/\s+/g, "").toLowerCase();
    if (normalizedUser === normalizedCorrect) {
      setFeedback({ correct: true, message: /* @__PURE__ */ jsx("p", { children: "🎉 Bravo Maître, la réponse est correcte !" }) });
    } else {
      setFeedback({
        correct: false,
        message: /* @__PURE__ */ jsxs("div", { className: "content", children: [
          /* @__PURE__ */ jsx("p", { children: "❌ Oups, une erreur s'est glissée, Maître." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Le vecteur normal n⃗ = (",
            V.join(", "),
            ") est normal au plan."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "La formule du plan est : ax + by + cz + d = 0" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Avec a = ",
            V[0],
            ", b = ",
            V[1],
            ", c = ",
            V[2],
            " et le point A(",
            A.join(", "),
            ")"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "d = - (a × x + b × y + c × z) = -(",
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
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Équation correcte :" }),
            " ",
            correctEq
          ] })
        ] })
      });
    }
  }
  function handleNewExercise() {
    setA(randomCoord());
    setV(randomCoord());
    setUserInput("");
    setFeedback(null);
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Détermine une équation cartésienne du plan passant par A et de vecteur normal n⃗" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Point A :" }),
        " (",
        A.join(", "),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Vecteur normal n⃗ :" }),
        " (",
        V.join(", "),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "field", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "userInput", className: "label", children: "Écris ton équation cartésienne" }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(
        "input",
        {
          id: "userInput",
          className: "input",
          type: "text",
          placeholder: "Ex: 2x - 3y + 4z + 1 = 0",
          value: userInput,
          onChange: (e) => setUserInput(e.target.value)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "field is-grouped is-grouped-centered", children: [
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: handleNewExercise, children: "Nouvel exercice" }) })
    ] }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.correct ? "is-success" : "is-danger"} is-light`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      feedback.message
    ] })
  ] }) }) });
}

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Ex1T = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ex1T;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <article> <div class="hero-image"> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="">`} </div> <div class="prose"> <div class="title"> <h1>${title}</h1> </div> ${renderComponent($$result, "Ex_1_T", EquationCartesienne, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_1_T.tsx", "client:component-export": "default" })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
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
