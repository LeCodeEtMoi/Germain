import { a as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DY7a91H-.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/internal_DUx92lqW.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const titres = [
  "// Leçon",
  "// Exercice",
  "// Application"
];
const textes = [
  "Des leçons réalisées par des passionnés pour vous passionner. Il est beaucoup plus simple d'apprendre une notion lorsqu'on prend du plaisir à l'apprendre.",
  "Des exercices aléatoires à refaire autant de fois que nécessaire, sans jamais connaître la réponse à l'avance, pour maîtriser chaque notion en profondeur.",
  "Découvrez comment les mathématiques s'invitent dans la vie de tous les jours, à travers des exemples concrets, utiles et parfois étonnants."
];
function TexteCyclique() {
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex((prev2) => (prev2 + 1) % textes.length);
  };
  const prev = () => {
    setIndex((prev2) => (prev2 - 1 + textes.length) % textes.length);
  };
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    /* @__PURE__ */ jsx("h2", { className: "title", children: titres[index] }),
    /* @__PURE__ */ jsx("p", { children: textes[index] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons is-centered mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "button", onClick: prev, children: "⬅️" }),
      /* @__PURE__ */ jsx("button", { className: "button", onClick: next, children: "➡️" })
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="fr" data-astro-cid-j7pv25f6> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-j7pv25f6": true })}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"><link href="/src/styles/bulma.min.css	" rel="stylesheet">${renderHead()}</head><section class="hero my-6" data-astro-cid-j7pv25f6> <div class="hero-body" data-astro-cid-j7pv25f6> <div class="columns is-vcentered is-centered" data-astro-cid-j7pv25f6> <!-- Colonne Texte --> <div class="column is-4 has-text-centered" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h1 class="righteous title" data-astro-cid-j7pv25f6>Germain</h1> <p class="subtitle has-text-left" data-astro-cid-j7pv25f6>Renforcer vos acquis avec style</p> </div> </div> <!-- Colonne Image --> <div class="column is-4 has-text-centered" data-astro-cid-j7pv25f6> <figure class="image is-500x500" data-astro-cid-j7pv25f6> <img src="Mathematics-amico.svg" alt="Mathematics-amico" style="max-width: 100%; height: auto;" data-astro-cid-j7pv25f6> </figure> </div> </div> </div> </section> <section class="section" data-astro-cid-j7pv25f6> <h2 class="hover-switch" data-astro-cid-j7pv25f6> <span class="switch-symbol" data-astro-cid-j7pv25f6>//</span> Des outils pour renforcer vos acquis
</h2> <div class="container" data-astro-cid-j7pv25f6> <div class="item" data-astro-cid-j7pv25f6> <img src="Professor-amico.svg" style="width: 400px; height: auto; display: block;" data-astro-cid-j7pv25f6> </div> ${renderComponent($$result, "Explication", TexteCyclique, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Explication.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </section> <section class="section" data-astro-cid-j7pv25f6> <h2 class="hover-switch" style="font-size: 3.4rem" data-astro-cid-j7pv25f6><span class="switch-symbol" data-astro-cid-j7pv25f6>//</span> Notre mission</h2> <ul data-astro-cid-j7pv25f6> <li class="" data-astro-cid-j7pv25f6><span class="righteous" data-astro-cid-j7pv25f6>X</span> Donner au néophyte et a toutes les autre personnes la possibilité d'aimer les mathématiques</li> <li class="" data-astro-cid-j7pv25f6><span class="righteous" data-astro-cid-j7pv25f6>X</span> Permettre à quiconque de s'améliorer dans un domaine lié aux mathématiques</li> </ul> <ul data-astro-cid-j7pv25f6></ul></section> <section class="section" data-astro-cid-j7pv25f6> <div class="columns" data-astro-cid-j7pv25f6> <div class="column" data-astro-cid-j7pv25f6></div> <div class="column is-7" data-astro-cid-j7pv25f6> <h2 class="hover-switch" data-astro-cid-j7pv25f6><span class="switch-symbol" data-astro-cid-j7pv25f6>//</span> Germain open source</h2> <p style="text-align: justify; width: 50%;" class="" data-astro-cid-j7pv25f6>Germain est un projet open source, c'est à dire que tout le monde peut contribuer à son développement. Plus nous avons de retour, plus nous pouvons améliorer Germain et permettre une meilleur immersion dans le pays des maths.</p> </div> <div class="column is-7" data-astro-cid-j7pv25f6> <h2 class="hover-switch" data-astro-cid-j7pv25f6><span class="switch-symbol" data-astro-cid-j7pv25f6>//</span> Coup de pouce ?</h2> <p style="text-align: justify;width: 50%;" class="" data-astro-cid-j7pv25f6>Si vous avez le temps pour une simple relecture , partager votre expérience des maths dans votre métier, vous êtes passionné dans un domaine présis et vous voulez nous le faire partager, une idée de leçon ou d'exercice, n'hésitez pas à nous le faire savoir.Toute aide est important pour que le projet puisse grandir et s'améliorer. Pour nous aider : <a href="/Germain/aide" data-astro-cid-j7pv25f6>c'est ici que cela ce passe</a></p> </div> <div class="column" data-astro-cid-j7pv25f6></div> </div> </section> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} </html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/index.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/index.astro";
const $$url = "/Germain";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
