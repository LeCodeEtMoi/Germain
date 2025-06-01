import { c as createComponent, a as createAstro, r as renderComponent, b as renderHead, e as addAttribute, f as renderTemplate } from '../../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_C9s5L41r.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DMtE2hl_.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const random = (type) => {
  if (type === 1) {
    return Math.floor(Math.random() * (40 - 27 + 1)) + 27;
  } else {
    return Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  }
};
const expressionDescendante = (n, k) => {
  const termes = [];
  for (let i = 0; i < k; i++) {
    termes.push(n - i);
  }
  return termes.join(" × ");
};
const expressionDescendante1 = (n, k) => {
  const termes = [];
  for (let i = 0; i < k; i++) {
    termes.push(n - i);
  }
  return termes.join(" + ");
};
const genererExercice = () => {
  const nb_eleves = random(1);
  const groupe = random(0);
  const propositions = [
    { tex: `\\binom{${nb_eleves}}{${groupe}}`, correct: true },
    { tex: expressionDescendante(nb_eleves, groupe), correct: false },
    { tex: expressionDescendante1(nb_eleves, groupe), correct: false },
    { tex: `${nb_eleves}^{${groupe}}`, correct: false }
  ];
  const melange = propositions.sort(() => Math.random() - 0.5);
  return { nb_eleves, groupe, propositions: melange };
};
const Denombremement = () => {
  const [exercice, setExercice] = useState(genererExercice());
  const [checked, setChecked] = useState(null);
  const [validated, setValidated] = useState(false);
  const handleChange = (index) => () => {
    setChecked(index);
  };
  const handleValidate = () => {
    setValidated(true);
  };
  const handleNewExercise = () => {
    setExercice(genererExercice());
    setChecked(null);
    setValidated(false);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h4", { children: [
      "Une professeure enseigne la spécialité mathématiques dans une classe de ",
      exercice.nb_eleves,
      " élèves de terminale."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Elle veut former un groupe de ",
      exercice.groupe,
      " élèves."
    ] }),
    /* @__PURE__ */ jsx("p", { children: "De combien de façons différentes peut-elle former un tel groupe ?" }),
    exercice.propositions.map((item, index) => /* @__PURE__ */ jsxs("label", { style: { display: "block", marginBottom: "10px" }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "radio",
          name: "proposition",
          checked: checked === index,
          onChange: handleChange(index)
        }
      ),
      " ",
      /* @__PURE__ */ jsx(MathTex, { tex: item.tex })
    ] }, index)),
    /* @__PURE__ */ jsx("button", { onClick: handleValidate, style: { marginRight: "10px" }, children: "Valider" }),
    /* @__PURE__ */ jsx("button", { onClick: handleNewExercise, children: "Nouvel exercice" }),
    validated && checked !== null && /* @__PURE__ */ jsx("p", { style: { color: exercice.propositions[checked].correct ? "green" : "red" }, children: exercice.propositions[checked].correct ? "Bonne réponse !" : "Mauvaise réponse." })
  ] });
};

const $$Astro = createAstro();
const $$Ex8T = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ex8T;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-onsdp7jy> <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-mll67QQEhV9IHduH2Cm9Mv3FdRoYIVkRoN0dAB5Dk9s+yEDJ11VX7K8UcNIeIsDy" crossorigin="anonymous">${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-onsdp7jy": true })}${renderHead()}</head> <body data-astro-cid-onsdp7jy> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-onsdp7jy": true })} <main data-astro-cid-onsdp7jy> <article data-astro-cid-onsdp7jy> <div class="hero-image" data-astro-cid-onsdp7jy> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-onsdp7jy>`} </div> <div class="prose" data-astro-cid-onsdp7jy> <div class="title" data-astro-cid-onsdp7jy> <h1 data-astro-cid-onsdp7jy>${title}</h1> </div> ${renderComponent($$result, "Ex_8_T", Denombremement, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_8_T.tsx", "client:component-export": "default", "data-astro-cid-onsdp7jy": true })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-onsdp7jy": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_8_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_8_T.astro";
const $$url = "/Germain/ex/ex_8_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex8T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
