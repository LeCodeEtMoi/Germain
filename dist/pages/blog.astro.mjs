import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DY7a91H-.mjs';
import { g as getCollection } from '../chunks/_astro_content_DNAFawCL.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await getCollection("blog")).sort(
    // Tri des articles du plus récent au plus ancien en se basant sur la date de publication (pubDate)
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const pageTitle = "Le\xE7ons";
  return renderTemplate`<!-- --- Template (partie HTML) --- --><html lang="fr" data-astro-cid-5tznm7mj> <head><!-- Utilisation du composant BaseHead pour générer les balises <head> communes (meta, title, etc.) -->${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pageTitle, "data-astro-cid-5tznm7mj": true })}<!-- Liens vers les feuilles de style externes (CDN) pour Bulma et Font-Awesome --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">${renderHead()}</head> <body data-astro-cid-5tznm7mj> <!-- Inclusion du composant Header (barre de navigation) --> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5tznm7mj": true })} <!-- Section "hero" pour afficher le titre de la page de manière proéminente --> <section class="hero" data-astro-cid-5tznm7mj> <div class="hero-body" data-astro-cid-5tznm7mj> <div class="container font-Righteous " data-astro-cid-5tznm7mj> <h1 data-astro-cid-5tznm7mj><strong class="righteous-regular lesson-title" data-astro-cid-5tznm7mj>${pageTitle}</strong></h1> </div> </div> <!-- Contenu principal de la page --> <main class="section" data-astro-cid-5tznm7mj> <div class="container" data-astro-cid-5tznm7mj> <!-- Utilisation du système de colonnes de Bulma pour créer une grille responsive --> <div class="columns is-multiline" data-astro-cid-5tznm7mj> ${// Itération sur le tableau 'posts' récupéré plus haut
  posts.map((post) => (
    // Chaque article est affiché dans une colonne qui prend 1/3 de la largeur sur grand écran
    renderTemplate`<div class="column is-4" data-astro-cid-5tznm7mj> <a${addAttribute(`/Germain/blog/${post.id}/`, "href")} data-astro-cid-5tznm7mj> <h1 data-astro-cid-5tznm7mj><strong class="righteous-regular lesson-title " data-astro-cid-5tznm7mj><span class="righteous" data-astro-cid-5tznm7mj>X</span> ${post.data.title}</strong></h1>   <img class=""${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(post.data.heroImage, "src")} alt="" data-astro-cid-5tznm7mj> </a> </div>`
  ))} </div> </div> </main> </section> <!-- Inclusion du composant Footer (pied de page) --> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5tznm7mj": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/blog/index.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/blog/index.astro";
const $$url = "/Germain/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
