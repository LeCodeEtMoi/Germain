import { a as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DY7a91H-.mjs';
export { renderers } from '../renderers.mjs';

const $$Aide = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Aider le Projet Germain";
  const pageDescription = "D\xE9couvrez comment vous pouvez contribuer \xE0 l'am\xE9lioration et \xE0 l'enrichissement du projet Germain.";
  return renderTemplate`<html lang="fr"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pageTitle, "description": pageDescription })}<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <section class="section"> <div class="container"> <h1 class="title is-2 mt-6 has-text-centered">${pageTitle}</h1> <p class="subtitle is-4 has-text-centered">${pageDescription}</p> <div class="columns is-centered mt-6"> <div class="column is-8"> <div class="box content"> <h2 class="title is-3">Comment pouvez-vous aider ?</h2> <p>
Le projet Germain est une initiative ouverte et collaborative. Votre aide est précieuse pour le faire grandir et l'améliorer. Voici plusieurs façons de contribuer :
</p> <ul> <li><strong>Signaler des erreurs :</strong> Si vous trouvez une coquille, une erreur mathématique ou une explication peu claire, n'hésitez pas à nous le faire savoir.</li> <li><strong>Suggérer du contenu :</strong> Vous avez une idée de leçon, d'exercice Partagez-la avec nous !</li> <li><strong>Améliorer le code :</strong> Si vous avez des compétences en développement web, vous pouvez proposer des améliorations sur notre <a href="https://github.com/LeCodeEtMoi/Germain" target="_blank">dépôt GitHub</a>.</li> </ul> </div> <div class="notification is-info is-light"> <h3 class="title is-4">Respect et Éthique</h3> <p>
Toute contribution ou suggestion doit impérativement respecter notre <a href="/Germain/CodeDéontologie">Code de Déontologie</a>. Nous souhaitons maintenir un environnement d'apprentissage sain, respectueux et constructif pour tous.
</p> </div> <div class="box has-text-centered mt-5"> <h3 class="title is-4">Prêt à contribuer ?</h3> <p>
Pour toute remarque, suggestion ou signalement, envoyez-nous un message. Nous lisons chaque retour avec attention.
</p> <a href="mailto:germainmaths@tutanota.com" class="button is-primary mt-4"> <span class="icon"> <i class="fas fa-envelope"></i> </span> <span>Envoyer un e-mail</span> </a> <p class="mt-2"> <a href="mailto:germainmaths@tutanota.com">germainmaths@tutanota.com</a> </p> </div> </div> </div> </div> </section> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/aide.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/aide.astro";
const $$url = "/Germain/aide";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Aide,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
