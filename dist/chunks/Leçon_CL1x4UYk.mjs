import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, d as renderSlot, f as addAttribute, e as renderTemplate } from './astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Footer_DY7a91H-.mjs';
import { S as SITE_DESCRIPTION } from './internal_DUx92lqW.mjs';
/* empty css                               */

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Leon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Leon;
  const { title, description = SITE_DESCRIPTION, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<!-- --- Template (partie HTML) --- --><html lang="fr" data-astro-cid-luocy72r> <head><!-- Le composant BaseHead gère les balises <head> communes (meta, title, etc.) -->${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-luocy72r": true })}<!-- Styles CSS spécifiques à ce layout. Ils ne s'appliqueront qu'aux pages utilisant Leçon.astro -->${renderHead()}</head> <body data-astro-cid-luocy72r> <!-- Inclusion des composants Header et Footer --> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-luocy72r": true })} <main data-astro-cid-luocy72r> <article data-astro-cid-luocy72r> <!-- Affiche l'image principale ('heroImage') si elle est définie dans le frontmatter --> ${heroImage && renderTemplate`<div class="hero-image" data-astro-cid-luocy72r> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")}${addAttribute(`Image pour la le\xE7on ${title}`, "alt")} data-astro-cid-luocy72r>`} </div>`} <div class="prose" data-astro-cid-luocy72r> <div class="title" data-astro-cid-luocy72r> <!-- Affiche le titre de la leçon --> <h1 data-astro-cid-luocy72r>${title}</h1> <!-- Affiche la date de mise à jour si elle est définie --> ${updatedDate && renderTemplate`<div class="date" data-astro-cid-luocy72r> <span class="last-updated-on" data-astro-cid-luocy72r>Mis à jour le : ${updatedDate.toLocaleDateString()}</span> </div>`} <hr data-astro-cid-luocy72r> </div> <!-- La balise <slot /> est un emplacement réservé. --> <!-- C'est ici que tout le contenu du fichier Markdown (le corps de la leçon) sera inséré. --> ${renderSlot($$result, $$slots["default"])} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-luocy72r": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/layouts/Le\xE7on.astro", void 0);

export { $$Leon as $ };
