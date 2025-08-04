import { c as createAstro, a as createComponent, r as renderComponent, b as renderHead, f as addAttribute, e as renderTemplate } from '../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DY7a91H-.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$CodeDontologie = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CodeDontologie;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main class="container"> <article class="box"> <div class="hero-image"> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="">`} </div> <div class="content"> <h1 class="title">${title}</h1> <hr>
Germain a pour mission de rendre les mathématiques accessibles, stimulantes et valorisées auprès du plus grand nombre. En tant que plateforme collaborative ouverte à la participation de passionnés, nous nous engageons à respecter les principes suivants. Toute personne contribuant au site s’engage également à respecter ce code de déontologie.<br> <span class="tag is-success">Regle 1 : Respect de la rigueur scientifique</span> <ul> <li>Les contenus publiés doivent s'appuyer sur des connaissances mathématiques avérées, sourcées si nécessaire.</li> <li>Toute démonstration, définition ou théorie doit être présentée de manière claire, rigoureuse et sans approximation abusive.</li> <li>Les contributeurs doivent reconnaître les limites de leurs compétences et éviter de publier du contenu sur un sujet qu’ils ne maîtrisent pas suffisamment.</li> </ul> <span class="tag is-success">Regle 2 : Ouverture et partage des savoirs</span> <ul> <li>Le site repose sur une philosophie open source : les contributions doivent être partagées librement, dans le respect des licences en vigueur (ex. : licence Creative Commons).</li> <li>Toute contribution est soumise à relecture et peut être modifiée ou améliorée par la communauté.</li> <li>Les idées originales, si elles sont publiées, doivent être accompagnées de l'indication claire de leur caractère spéculatif ou expérimental.</li> <li> Les propositions de cours doivent respecter l'identiter graphique de Germain</li> </ul> <span class="tag is-success">Regle 3 : Crédit et attribution</span> <ul> <li>Les contributeurs doivent citer leurs sources et rendre hommage au travail d’autrui (ouvrages, articles, auteurs, etc.)</li> <li>Le plagiat est strictement interdit. Tout contenu copié sans autorisation ni mention explicite de la source sera supprimé.</li> </ul> <span class="tag is-success">Regle 4 : Modération et responsabilité</span> <ul> <li>L’équipe de modération se réserve le droit de refuser, modifier ou supprimer tout contenu qui ne respecte pas ces règles.</li> <li>Les contributeurs sont responsables de leurs écrits et s'engagent à collaborer avec la communauté pour corriger toute erreur signalée.</li> </ul>
En participant à Germain, vous contribuez à une communauté mathématique dynamique, accessible et rigoureuse. Merci pour votre engagement !
</div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/CodeD\xE9ontologie.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/CodeDéontologie.astro";
const $$url = "/Germain/CodeDéontologie";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        default: $$CodeDontologie,
        file: $$file,
        url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
