import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DY7a91H-.mjs';
import { g as getCollection } from '../chunks/_astro_content_DNAFawCL.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Exercices = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Exercices;
  const posts = (await getCollection("blog")).sort(
    // Tri des articles du plus récent au plus ancien en se basant sur la date de publication (pubDate)
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const pageTitle = "Exercices";
  return renderTemplate`<!-- --- Template (partie HTML) --- --><html lang="fr" data-astro-cid-niyqakfj> <head><!-- Utilisation du composant BaseHead pour générer les balises <head> communes (meta, title, etc.) -->${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pageTitle, "data-astro-cid-niyqakfj": true })}<!-- Liens vers les feuilles de style externes (CDN) pour Bulma et Font-Awesome --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">${renderHead()}</head> <body data-astro-cid-niyqakfj> <!-- Inclusion du composant Header (barre de navigation) --> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-niyqakfj": true })} <!-- Section "hero" pour afficher le titre de la page de manière proéminente --> <section class="hero" data-astro-cid-niyqakfj> <div class="hero-body" data-astro-cid-niyqakfj> <div class="container font-Righteous " data-astro-cid-niyqakfj> <h1 data-astro-cid-niyqakfj><strong class="righteous-regular lesson-title " data-astro-cid-niyqakfj>${pageTitle}</strong></h1> </div> </div> <!-- Contenu principal de la page --> <main class="section" data-astro-cid-niyqakfj> <div class="container" data-astro-cid-niyqakfj> <!-- Utilisation du système de colonnes de Bulma pour créer une grille responsive --> <div class="columns is-multiline" data-astro-cid-niyqakfj> ${// Itération sur le tableau 'posts' récupéré plus haut
  posts.map((post) => (
    // Chaque article est affiché dans une colonne qui prend 1/3 de la largeur sur grand écran
    renderTemplate`<div class="column is-4" data-astro-cid-niyqakfj> <a${addAttribute(`/Germain/ex/ex1`, "href")} data-astro-cid-niyqakfj> <h1 data-astro-cid-niyqakfj><strong class="righteous-regular lesson-title " data-astro-cid-niyqakfj><span class="righteous" data-astro-cid-niyqakfj>X</span> ${post.data.title}</strong></h1>   <img class=""${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(post.data.heroImage, "src")} alt="" data-astro-cid-niyqakfj> </a> </div>`
  ))} </div> </div> </main> </section> <!-- Inclusion du composant Footer (pied de page) --> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-niyqakfj": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/exercices.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/exercices.astro";
const $$url = "/Germain/exercices";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Exercices,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
