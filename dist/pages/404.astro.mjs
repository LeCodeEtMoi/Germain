import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_C_B_0gQE.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "404: Page non trouv\xE9e", "description": "La page que vous cherchez n'existe pas.", "pubDate": /* @__PURE__ */ new Date() }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section"> <div class="container has-text-centered"> <div class="box" style="max-width: 600px; margin: 4rem auto;"> <h1 class="title is-1">Oups !</h1> <p class="is-size-4 mb-4">Il semblerait que cette page n'existe pas.</p> <p class="content">
Si vous voulez, on a quelques problèmes pour vous occuper :
<a href="https://fr.wikipedia.org/wiki/Probl%C3%A8mes_non_r%C3%A9solus_en_math%C3%A9matiques" target="_blank" rel="noopener noreferrer">
Problèmes non résolus en mathématiques
</a> </p> <hr> <a href="/Germain/" class="button is-primary">
Retour à l'accueil
</a> </div> </div> </section> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/404.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/404.astro";
const $$url = "/Germain/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
