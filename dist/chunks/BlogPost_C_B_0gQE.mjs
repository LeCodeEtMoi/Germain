import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, d as renderSlot, e as renderTemplate } from './astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Footer_DY7a91H-.mjs';

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <section class="section"> <div class="container"> <header class="has-text-centered mb-6"> <h1 class="title is-2">${title}</h1> <div class="subtitle is-6 has-text-grey"> ${updatedDate && renderTemplate`<span class="last-updated-on" style="font-style: italic;"></span>`} </div> </header> <div class="content is-medium"> ${renderSlot($$result, $$slots["default"])} </div> </div> </section> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/layouts/BlogPost.astro", void 0);

export { $$BlogPost as $ };
