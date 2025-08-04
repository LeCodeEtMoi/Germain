import { a as createComponent, m as maybeRenderHead, e as renderTemplate, c as createAstro, r as renderComponent, b as renderHead, g as renderScript, f as addAttribute } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DY7a91H-.mjs';
import 'clsx';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$SearchBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="field mb-5"> <p class="control has-icons-left"> <input id="search-input" class="input" type="text" placeholder="Rechercher des applications..."> <span class="icon is-small is-left"> <i class="fas fa-search" aria-hidden="true"></i> </span> </p> </div>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/components/SearchBar.astro", void 0);

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Tag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tag;
  const { text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span class="tag is-info is-light mr-2">${text}</span>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/components/Tag.astro", void 0);

const $$Application = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Applications des math\xE9matiques";
  const pageDescription = "D\xE9couvrez comment les math\xE9matiques s'appliquent dans diff\xE9rents domaines .";
  const applications = [
    {
      title: "Les maths dans la biologie",
      subtitle: "Les math\xE9matiques sont utilis\xE9es pour comprendre les m\xE9canismes de la vie.",
      content: "Les math\xE9matiques sont utilis\xE9es pour comprendre les processus biologiques et les interactions entre les organismes.",
      tags: ["Biologie", "Graphe", "G\xE9om\xE9trie"],
      imageUrl: "https://picsum.photos/id/10/800/600"
    },
    {
      title: "Les maths dans l'informatique",
      subtitle: "Les math\xE9matiques sont utilis\xE9es pour concevoir des algorithmes et des syst\xE8mes d'information.",
      content: "Les math\xE9matiques sont utilis\xE9es pour concevoir des algorithmes et des syst\xE8mes d'information. Les informaticiens math\xE9maticiens utilisent des \xE9quations et des mod\xE8les pour concevoir des syst\xE8mes d'information et des algorithmes pour r\xE9soudre des probl\xE8mes.",
      tags: ["Informatique", "Algorithmique", "Syst\xE8me d'information"],
      imageUrl: "https://picsum.photos/id/42/800/600"
    },
    {
      title: "Les maths dans la physique",
      subtitle: "Les math\xE9matiques sont utilis\xE9es pour comprendre les ph\xE9nom\xE8nes physiques.",
      content: "Les math\xE9matiques sont utilis\xE9es pour comprendre les processus physiques et les interactions entre les particules.",
      tags: ["Physique", "M\xE9canique", "\xC9lectromagn\xE9tisme"],
      imageUrl: "https://picsum.photos/id/48/800/600"
    }
  ];
  return renderTemplate`<html lang="fr" data-astro-cid-mibyinbq> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pageTitle, "description": pageDescription, "data-astro-cid-mibyinbq": true })}<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">${renderHead()}</head> <body data-astro-cid-mibyinbq> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-mibyinbq": true })} <main data-astro-cid-mibyinbq> <section class="section" data-astro-cid-mibyinbq> <div class="container" data-astro-cid-mibyinbq> <h1 class="title is-2 my-6 has-text-centered" data-astro-cid-mibyinbq>${pageTitle}</h1> <p class="subtitle is-5 has-text-centered" data-astro-cid-mibyinbq>${pageDescription}</p> ${renderComponent($$result, "SearchBar", $$SearchBar, { "data-astro-cid-mibyinbq": true })} <div id="application-cards" class="columns is-multiline" data-astro-cid-mibyinbq> ${applications.map((app) => renderTemplate`<div class="column is-4 application-card"${addAttribute(app.tags.join(","), "data-tags")} data-astro-cid-mibyinbq> <div class="card" data-astro-cid-mibyinbq> <div class="card-image" data-astro-cid-mibyinbq> <figure class="image is-4by3" data-astro-cid-mibyinbq> <img${addAttribute(app.imageUrl, "src")}${addAttribute(app.title, "alt")} data-astro-cid-mibyinbq> </figure> </div> <div class="card-content" data-astro-cid-mibyinbq> <div class="media" data-astro-cid-mibyinbq> <div class="media-content" data-astro-cid-mibyinbq> <p class="title is-4 mb-5 card-title" data-astro-cid-mibyinbq>${app.title}</p> <p class="subtitle is-6" data-astro-cid-mibyinbq>${app.subtitle}</p> </div> </div> <div class="content" data-astro-cid-mibyinbq> ${app.content} </div> <div class="tags" data-astro-cid-mibyinbq> ${app.tags.map((tag) => renderTemplate`${renderComponent($$result, "Tag", $$Tag, { "text": tag, "data-astro-cid-mibyinbq": true })}`)} </div> </div> </div> </div>`)} </div> </div> </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-mibyinbq": true })} ${renderScript($$result, "/home/Spike/Documents/Projet Github/Germain/src/pages/application.astro?astro&type=script&index=0&lang.ts")} </body> </html> `;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/application.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/application.astro";
const $$url = "/Germain/application";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Application,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
