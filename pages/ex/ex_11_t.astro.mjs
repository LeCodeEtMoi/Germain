import { c as createComponent, a as createAstro, r as renderComponent, b as renderHead, e as addAttribute, f as renderTemplate } from '../../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { simplify, derivative } from 'mathjs';
import { M as MathTex } from '../../chunks/MathTex_C9s5L41r.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DMtE2hl_.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const edTypes = [
  {
    type: "y' = f(x)",
    generate: () => {
      const f = "cos(x)";
      return { equation: `y' = ${f}`, solution: "sin(x) + C" };
    }
  },
  {
    type: "y' = a*y",
    generate: () => {
      const a = randomNumber(1, 4);
      return { equation: `y' = ${a}y`, solution: `Ce^{${a}x}` };
    }
  },
  {
    type: "y' = a*y + b",
    generate: () => {
      const a = randomNumber(1, 3);
      const b = randomNumber(1, 5);
      return {
        equation: `y' = ${a}y + ${b}`,
        solution: `Ce^{${a}x} - ${b}/${a}`
      };
    }
  },
  {
    type: "y' = a*y + f(x)",
    generate: () => {
      const a = 1;
      const f = "x";
      return {
        equation: `y' = ${a}y + ${f}`,
        solution: "Ce^{x} - x - 1"
      };
    }
  }
];
const generateRandomED = (validated) => {
  const remaining = edTypes.map((_, i) => i).filter((i) => !validated[i]);
  const index = remaining[Math.floor(Math.random() * remaining.length)];
  return {
    index,
    ...edTypes[index].generate()
  };
};
const EquationDifferentiale = () => {
  const [validated, setValidated] = useState(Array(edTypes.length).fill(false));
  const [current, setCurrent] = useState(() => generateRandomED(validated));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const estSolutionED = (reponse, ed) => {
    try {
      const derivée = simplify(derivative(reponse, "x"));
      const partieDroite = ed.split("=")[1];
      return derivée.equals(simplify(partieDroite));
    } catch (e) {
      console.error("Erreur dans la dérivation", e);
      return false;
    }
  };
  const handleSubmit = () => {
    if (estSolutionED(userAnswer, current.equation)) {
      const updated = [...validated];
      updated[current.index] = true;
      setValidated(updated);
      if (updated.every((v) => v)) {
        setFeedback("🎉 Bravo Maître, toutes les équations différentielles sont résolues !");
      } else {
        setFeedback("✅ Juste, Maître !");
        setCurrent(generateRandomED(updated));
      }
    } else {
      setFeedback(`❌ Non Maître. Une solution possible était \\(${current.solution}\\)`);
    }
    setUserAnswer("");
  };
  return /* @__PURE__ */ jsxs("div", { style: { maxWidth: 600, margin: "auto", padding: "1rem" }, children: [
    /* @__PURE__ */ jsx("h3", { children: "📘 Résolvez l'équation différentielle :" }),
    /* @__PURE__ */ jsx(MathTex, { tex: current.equation }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: userAnswer,
        onChange: (e) => setUserAnswer(e.target.value),
        placeholder: "Entrez la solution y(x)",
        style: {
          padding: "0.5rem",
          fontSize: "1rem",
          width: "100%",
          margin: "1rem 0"
        }
      }
    ),
    userAnswer && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("strong", { children: "Prévisualisation :" }),
      /* @__PURE__ */ jsx(MathTex, { tex: userAnswer })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSubmit,
        style: {
          backgroundColor: "#2196f3",
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

const $$Astro = createAstro();
const $$Ex11T = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ex11T;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-jbf7ch3f> <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-mll67QQEhV9IHduH2Cm9Mv3FdRoYIVkRoN0dAB5Dk9s+yEDJ11VX7K8UcNIeIsDy" crossorigin="anonymous">${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-jbf7ch3f": true })}${renderHead()}</head> <body data-astro-cid-jbf7ch3f> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-jbf7ch3f": true })} <main data-astro-cid-jbf7ch3f> <article data-astro-cid-jbf7ch3f> <div class="hero-image" data-astro-cid-jbf7ch3f> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-jbf7ch3f>`} </div> <div class="prose" data-astro-cid-jbf7ch3f> <div class="title" data-astro-cid-jbf7ch3f> <h1 data-astro-cid-jbf7ch3f>${title}</h1> </div> ${renderComponent($$result, "Ex_11_T", EquationDifferentiale, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_11_T.tsx", "client:component-export": "default", "data-astro-cid-jbf7ch3f": true })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-jbf7ch3f": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_11_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_11_T.astro";
const $$url = "/Germain/ex/ex_11_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex11T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
