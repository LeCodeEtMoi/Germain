import { c as createComponent, a as createAstro, r as renderComponent, b as renderHead, d as renderSlot, e as addAttribute, f as renderTemplate } from './astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Footer_DMtE2hl_.mjs';
/* empty css                               */

const $$Astro = createAstro();
const $$Leon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Leon;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-luocy72r> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-luocy72r": true })}${renderHead()}</head> <body data-astro-cid-luocy72r> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-luocy72r": true })} <main data-astro-cid-luocy72r> <article data-astro-cid-luocy72r> <div class="hero-image" data-astro-cid-luocy72r> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-luocy72r>`} </div> <div class="prose" data-astro-cid-luocy72r> <div class="title" data-astro-cid-luocy72r> <h1 data-astro-cid-luocy72r>${title}</h1> <hr data-astro-cid-luocy72r> </div> ${renderSlot($$result, $$slots["default"])} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-luocy72r": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/layouts/Le\xE7on.astro", void 0);

export { $$Leon as $ };
