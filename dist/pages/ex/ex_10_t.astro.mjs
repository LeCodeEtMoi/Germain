import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { simplify, derivative } from 'mathjs';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const functionTypes = [
  {
    type: "constant",
    generate: () => {
      const a = randomNumber(1, 10);
      return { func: `${a}`, primitive: `${a}x + C` };
    }
  },
  {
    type: "polynomial",
    generate: () => {
      const n = randomNumber(2, 5);
      return { func: `x^${n}`, primitive: `x^${n + 1}/${n + 1} + C` };
    }
  },
  {
    type: "reciprocal",
    generate: () => ({ func: `1/x`, primitive: `ln|x| + C` })
  },
  {
    type: "inverse_sqrt",
    generate: () => ({ func: `1/sqrt(x)`, primitive: `2*sqrt(x) + C` })
  },
  {
    type: "exponential",
    generate: () => {
      const a = randomNumber(1, 5);
      return { func: `e^(${a}x)`, primitive: `e^(${a}x)/${a} + C` };
    }
  },
  {
    type: "cosine",
    generate: () => {
      const a = randomNumber(1, 5);
      return { func: `cos(${a}x)`, primitive: `sin(${a}x)/${a} + C` };
    }
  },
  {
    type: "sine",
    generate: () => {
      const a = randomNumber(1, 5);
      return { func: `sin(${a}x)`, primitive: `-cos(${a}x)/${a} + C` };
    }
  }
];
const generateRandomFunction = (validated) => {
  const remaining = functionTypes.map((_, i) => i).filter((i) => !validated[i]);
  const index = remaining[Math.floor(Math.random() * remaining.length)];
  return {
    index,
    ...functionTypes[index].generate()
  };
};
const IntegrationExercise = () => {
  const [validated, setValidated] = useState(Array(functionTypes.length).fill(false));
  const [current, setCurrent] = useState(() => generateRandomFunction(validated));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const handleSubmit = () => {
    if (estBonneRéponse(userAnswer, current.func)) {
      const updated = [...validated];
      updated[current.index] = true;
      setValidated(updated);
      if (updated.every((v) => v)) {
        setFeedback("🎉 Félicitations Maître ! Vous avez terminé toutes les intégrales.");
      } else {
        setFeedback("✅ Bonne réponse, Maître !");
        setCurrent(generateRandomFunction(updated));
      }
    } else {
      setFeedback(`❌ Mauvaise réponse. La bonne réponse était : \\(${current.primitive}\\)`);
    }
    setUserAnswer("");
  };
  function estBonneRéponse(reponseUtilisateur, fonctionOriginale) {
    try {
      const derivéeUtilisateur = simplify(derivative(reponseUtilisateur, "x"));
      const fonctionSimplifiée = simplify(fonctionOriginale);
      return derivéeUtilisateur.equals(fonctionSimplifiée);
    } catch (e) {
      console.error("Erreur de dérivation : ", e);
      return false;
    }
  }
  const insertAtCursor = (text) => {
    const input = document.getElementById("primitive-input");
    if (!input) return;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const current2 = userAnswer;
    const updated = current2.slice(0, start) + text + current2.slice(end);
    setUserAnswer(updated);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };
  return /* @__PURE__ */ jsxs("div", { style: { maxWidth: 600, margin: "auto", padding: "1rem", fontFamily: "sans-serif" }, children: [
    /* @__PURE__ */ jsx("h3", { children: "📘 Trouvez la primitive de :" }),
    /* @__PURE__ */ jsx(MathTex, { tex: `f(x) = ${current.func}` }),
    /* @__PURE__ */ jsx("div", { style: { margin: "1rem 0", display: "flex", flexWrap: "wrap", gap: "0.5rem" }, children: [
      { label: "^", insert: "^{x}" },
      { label: "*", insert: "\\cdot " },
      { label: "√", insert: "\\sqrt{x}" },
      { label: "ln|x|", insert: "\\ln{|x|}" },
      { label: "π", insert: "\\pi" },
      { label: "e^", insert: "e^{x}" },
      { label: "sin", insert: "\\sin{x}" },
      { label: "cos", insert: "\\cos{x}" },
      { label: "1/3", insert: "\\frac{1}{3}" },
      { label: "+ C", insert: "+ C" }
    ].map(({ label, insert }) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => insertAtCursor(insert),
        style: {
          padding: "0.3rem 0.6rem",
          fontSize: "1rem",
          borderRadius: "0.3rem",
          border: "1px solid #ccc",
          backgroundColor: "#f5f5f5",
          cursor: "pointer"
        },
        children: label
      },
      label
    )) }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id: "primitive-input",
        type: "text",
        value: userAnswer,
        onChange: (e) => setUserAnswer(e.target.value),
        placeholder: "Entrez la primitive de f(x)",
        style: {
          padding: "0.5rem",
          fontSize: "1rem",
          width: "100%",
          margin: "1rem 0",
          boxSizing: "border-box"
        }
      }
    ),
    userAnswer && /* @__PURE__ */ jsxs("div", { style: { marginTop: "1rem" }, children: [
      /* @__PURE__ */ jsx("strong", { children: "Prévisualisation : " }),
      /* @__PURE__ */ jsx(MathTex, { tex: userAnswer })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSubmit,
        style: {
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "0.5rem"
        },
        children: "Valider"
      }
    ),
    feedback && /* @__PURE__ */ jsx("div", { style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx("p", { children: feedback.includes("\\") ? /* @__PURE__ */ jsx(MathTex, { tex: feedback }) : feedback }) })
  ] });
};

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Ex10T = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ex10T;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-nwebrfwe> <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-mll67QQEhV9IHduH2Cm9Mv3FdRoYIVkRoN0dAB5Dk9s+yEDJ11VX7K8UcNIeIsDy" crossorigin="anonymous">${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-nwebrfwe": true })}${renderHead()}</head> <body data-astro-cid-nwebrfwe> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-nwebrfwe": true })} <main data-astro-cid-nwebrfwe> <article data-astro-cid-nwebrfwe> <div class="hero-image" data-astro-cid-nwebrfwe> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-nwebrfwe>`} </div> <div class="prose" data-astro-cid-nwebrfwe> <div class="title" data-astro-cid-nwebrfwe> <h1 data-astro-cid-nwebrfwe>${title}</h1> </div> ${renderComponent($$result, "Ex_10_T", IntegrationExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_10_T.tsx", "client:component-export": "default", "data-astro-cid-nwebrfwe": true })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-nwebrfwe": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_10_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_10_T.astro";
const $$url = "/Germain/ex/ex_10_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex10T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
