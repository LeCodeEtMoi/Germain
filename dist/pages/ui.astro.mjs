import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_C_B_0gQE.mjs';
/* empty css                              */
export { renderers } from '../renderers.mjs';

const $$Ui = createComponent(($$result, $$props, $$slots) => {
  const colors = [
    { name: "Violet-50", hex: "#f4f3ff" },
    { name: "Violet-100", hex: "#ece9fe" },
    { name: "Violet-200", hex: "#dbd6fe" },
    { name: "Violet-300", hex: "#c1b5fd" },
    { name: "Violet-400", hex: "#a28bfa" },
    { name: "Violet-500 (Primaire)", hex: "#845cf6" },
    { name: "Violet-600", hex: "#743aed" },
    { name: "Violet-700", hex: "#6528d9" },
    { name: "Violet-800", hex: "#5421b6" },
    { name: "Violet-900", hex: "#461d95" },
    { name: "Violet-950", hex: "#2a1065" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "", "description": "Guide de style et composants pour le projet Germain.", "pubDate": /* @__PURE__ */ new Date(), "data-astro-cid-b4koausq": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-b4koausq><div class="container" data-astro-cid-b4koausq><h1 class="title is-1" data-astro-cid-b4koausq>Charte Graphique</h1><br data-astro-cid-b4koausq><p class="subtitle is-3" data-astro-cid-b4koausq>Guide de style et composants pour le projet <strong data-astro-cid-b4koausq>Germain</strong>.</p><hr data-astro-cid-b4koausq><!-- Réaliser des composants comment dans framasoft . Avec les bouton décalée  --><!-- Logo -->
Le logo est le pprtrait de Sophie Germain. L'image est vient de wikipedia. Source de l'image <a href="https://commons.wikimedia.org/wiki/File:Germain_-_%C5%92uvres_philosophiques,_1896_(Illustration_page_4).jpg?uselang=fr" data-astro-cid-b4koausq>Ici</a><!--  Couleurs --><h2 class="title is-2 mt-6" data-astro-cid-b4koausq>Palette de Couleurs</h2><div class="box" data-astro-cid-b4koausq><div class="columns is-multiline" data-astro-cid-b4koausq>${colors.map((color) => renderTemplate`<div class="column is-one-third" data-astro-cid-b4koausq><div class="color-box" data-astro-cid-b4koausq><div class="color-swatch"${addAttribute(`background-color: ${color.hex};`, "style")} data-astro-cid-b4koausq></div><div data-astro-cid-b4koausq><p class="has-text-weight-bold" data-astro-cid-b4koausq>${color.name}</p><code data-astro-cid-b4koausq>${color.hex}</code></div></div></div>`)}</div></div><!-- Composants UI --><h2 class="title is-2 mt-6 " data-astro-cid-b4koausq>Composants d'Interface</h2><!-- Boutons --><h3 class="title is-4" data-astro-cid-b4koausq>Boutons</h3><div class="box" data-astro-cid-b4koausq><div class="field is-grouped" data-astro-cid-b4koausq><p class="control" data-astro-cid-b4koausq><button class="button is-germain" data-astro-cid-b4koausq>Primaire</button></p><p class="control" data-astro-cid-b4koausq><button class="button is-link" data-astro-cid-b4koausq>Lien</button></p><p class="control" data-astro-cid-b4koausq><button class="button is-info" data-astro-cid-b4koausq>Info</button></p><p class="control" data-astro-cid-b4koausq><button class="button is-success" data-astro-cid-b4koausq>Succès</button></p><p class="control" data-astro-cid-b4koausq><button class="button is-warning" data-astro-cid-b4koausq>Avertissement</button></p><p class="control" data-astro-cid-b4koausq><button class="button is-danger" data-astro-cid-b4koausq>Danger</button></p><p class="control" data-astro-cid-b4koausq><button class="button is-light" data-astro-cid-b4koausq>Léger</button></p></div></div></div></section>` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ui.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ui.astro";
const $$url = "/Germain/ui";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ui,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
