import { a as createComponent, r as renderComponent, b as renderHead, g as renderScript, f as addAttribute, u as unescapeHTML, e as renderTemplate } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DY7a91H-.mjs';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/internal_DUx92lqW.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  const cards = [
    {
      title: "La naissance de Germain",
      content: `
      <p>
        <a href="https://www.education.gouv.fr/pisa-programme-international-pour-le-suivi-des-acquis-des-eleves-41558" target="_blank">
          En France, le niveau en math\xE9matiques n'est plus au sommet depuis quelque temps.
        </a>
        L'\xE9quipe de Germain a donc pour objectif de rendre les math\xE9matiques plus accessibles et de permettre \xE0 celles et ceux qui en ont le d\xE9sir de s'y int\xE9resser, en \xE9veillant la curiosit\xE9 pour cette discipline mill\xE9naire.
      </p>
    `
    },
    {
      title: "Pourquoi ce nom ?",
      content: `
      <p>
        Les femmes sont encore sous-repr\xE9sent\xE9es dans le domaine des math\xE9matiques, et cela doit changer. Rien ne justifie qu'elles soient moins capables que les hommes dans ce domaine.
      </p>

      <p>
        C'est pourquoi nous avons choisi le nom <strong>Germain</strong>, en hommage \xE0 <strong>Sophie Germain</strong>, une pionni\xE8re des math\xE9matiques, qui a d\xFB se battre pour avoir le droit d'\xE9tudier cette science.
        C'est gr\xE2ce \xE0 ses travaux que la Tour Eiffel tient encore debout aujourd'hui.
      </p>
    `
    },
    {
      title: '"Les math\xE9matiques ne servent \xE0 rien..." Vraiment ?',
      content: `
      <figure class="image is-3by2" style="margin: 2em auto; max-width: 600px;">
        <img
          src="https://sorciersdesalem.math.cnrs.fr/Posters/PosterLesMathsCaSertARien.png"
          alt="Affiche humoristique sur l'utilit\xE9 des math\xE9matiques"
        >
      </figure>
      <p>
        Comme l'explique tr\xE8s bien <a href="https://sorciersdesalem.math.cnrs.fr/SaufA/LesMathsCaSertARien.html" target="_blank">cette page</a>, 
        les math\xE9matiques permettent de r\xE9aliser d'innombrables choses dans des domaines aussi vari\xE9s que :
        la musique, l'\xE9conomie, la m\xE9t\xE9orologie, la cryptographie, la m\xE9decine, l'informatique, ou encore le sport.
      </p>
    `
    }
  ];
  return renderTemplate`<html lang="fr" data-astro-cid-kh7btl4r> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-kh7btl4r": true })}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">${renderHead()}</head> <body data-astro-cid-kh7btl4r> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-kh7btl4r": true })} <main data-astro-cid-kh7btl4r> <section class="section" data-astro-cid-kh7btl4r> <div class="container" data-astro-cid-kh7btl4r> <div class="columns is-centered" data-astro-cid-kh7btl4r> <div class="column is-10" data-astro-cid-kh7btl4r> ${cards.map((card, index) => renderTemplate`<div${addAttribute(`card-${index}`, "id")} class="card"${addAttribute(index, "data-index")} data-astro-cid-kh7btl4r> <header class="card-header" data-astro-cid-kh7btl4r> <p class="card-header-title" data-astro-cid-kh7btl4r>${card.title}</p> </header> <div class="card-content" data-astro-cid-kh7btl4r> <div class="content" data-astro-cid-kh7btl4r>${unescapeHTML(card.content)}</div> </div> <footer class="card-footer" data-astro-cid-kh7btl4r> <div class="card-footer-item" data-astro-cid-kh7btl4r> <button class="button is-link prev-card" data-astro-cid-kh7btl4r> <span class="icon" data-astro-cid-kh7btl4r> <i class="fas fa-chevron-left" data-astro-cid-kh7btl4r></i> </span> <span data-astro-cid-kh7btl4r>Précédent</span> </button> </div> <div class="card-footer-item" data-astro-cid-kh7btl4r> <span class="tag is-info card-counter" data-astro-cid-kh7btl4r> ${index + 1}/${cards.length} </span> </div> <div class="card-footer-item" data-astro-cid-kh7btl4r> <button class="button is-link next-card" data-astro-cid-kh7btl4r> <span data-astro-cid-kh7btl4r>Suivant</span> <span class="icon" data-astro-cid-kh7btl4r> <i class="fas fa-chevron-right" data-astro-cid-kh7btl4r></i> </span> </button> </div> </footer> </div>`)} </div> </div> </div> </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-kh7btl4r": true })} ${renderScript($$result, "/home/Spike/Documents/Projet Github/Germain/src/pages/about.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/about.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/about.astro";
const $$url = "/Germain/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
