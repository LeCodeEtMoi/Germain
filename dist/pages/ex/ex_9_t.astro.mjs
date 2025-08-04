import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const random = (type) => {
  if (type === 1) {
    return Math.floor(Math.random() * (40 - 27 + 1)) + 27;
  } else {
    return Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  }
};
const genererTroisNombres = (k) => {
  const a = Math.floor(Math.random() * (k / 2));
  const b = Math.floor(Math.random() * (k - a));
  const c = k - (a + b);
  return [a, b, c];
};
const eleves_ses = (k) => {
  return Math.floor(Math.random() * (k - 2 + 1)) + 2;
};
const genererExercice = () => {
  const nb_eleves = random(1);
  const groupe = random(0);
  const a = genererTroisNombres(nb_eleves);
  const ph = a[0];
  const ses = a[1];
  const llce = a[2];
  const eleve_ses = eleves_ses(ses);
  const propositions = [
    { tex: `\\binom{${ses}}{${eleve_ses}}+\\binom{${nb_eleves - groupe}}{${eleve_ses}}`, correct: false },
    { tex: `\\binom{${ses}}{${eleve_ses}}*\\binom{${nb_eleves - groupe}}{${eleve_ses}}`, correct: true },
    { tex: `${ses}^{${eleve_ses}}*${nb_eleves - groupe}^{${eleve_ses}}`, correct: false },
    { tex: `\\binom{${ses}}{${eleve_ses}}`, correct: false }
  ];
  const melange = propositions.sort(() => Math.random() - 0.5);
  return { nb_eleves, groupe, ph, ses, llce, eleve_ses, propositions: melange };
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
      "Une professeure de terminale Spé Maths s'intéresse à l'autre spécialité des ",
      exercice.nb_eleves,
      " élèves de son groupe :"
    ] }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("p", { children: [
        exercice.ph,
        " élèves ont choisi la spécialité physique-chimie"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("p", { children: [
        exercice.ses,
        " élèves ont choisi la spécialité SES"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("p", { children: [
        exercice.llce,
        " élèves ont choisi la spécialité LLCE espagnol."
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Elle veut former un groupe de ",
      exercice.groupe,
      " élèves comportant exactement ",
      exercice.eleve_ses,
      " élèves ayant choisi la spécialité SES. De combien de façons différentes peut-elle former un tel groupe ?"
    ] }),
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

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Ex9T = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ex9T;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-oenk22rr> <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-mll67QQEhV9IHduH2Cm9Mv3FdRoYIVkRoN0dAB5Dk9s+yEDJ11VX7K8UcNIeIsDy" crossorigin="anonymous">${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-oenk22rr": true })}${renderHead()}</head> <body data-astro-cid-oenk22rr> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-oenk22rr": true })} <main data-astro-cid-oenk22rr> <article data-astro-cid-oenk22rr> <div class="hero-image" data-astro-cid-oenk22rr> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-oenk22rr>`} </div> <div class="prose" data-astro-cid-oenk22rr> <div class="title" data-astro-cid-oenk22rr> <h1 data-astro-cid-oenk22rr>${title}</h1> </div> ${renderComponent($$result, "Ex_9_T", Denombremement, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_9_T.tsx", "client:component-export": "default", "data-astro-cid-oenk22rr": true })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-oenk22rr": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_9_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_9_T.astro";
const $$url = "/Germain/ex/ex_9_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex9T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
