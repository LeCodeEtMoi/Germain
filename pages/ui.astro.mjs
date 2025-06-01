import { c as createComponent, a as createAstro, r as renderComponent, b as renderHead, e as addAttribute, f as renderTemplate } from '../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DMtE2hl_.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Ui = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ui;
  const { title, description, updatedDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <article> <div class="hero-image"> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="">`} </div> <div class="prose"> <div class="title"> <h1>${title}</h1> <hr> </div>
Charte graphique
<div class="t1"><li>Logo</li><br> <div class="t">Actuellement il n'y a pas de logo </div> <li>Couleurs</li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#f4f3ff"></circle> </svg> <code>#f4f3ff</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#ece9fe"></circle> </svg> <code>#ece9fe</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#dbd6fe"></circle> </svg> <code>#dbd6fe</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#c1b5fd"></circle> </svg> <code>#c1b5fd</code> </li><li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#a28bfa"></circle> </svg> <code>#a28bfa</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#845cf6"></circle> </svg> <code>#845cf6</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#6528d9"></circle> </svg> <code>#6528d9</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#743aed"></circle> </svg> <code>#743aed</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#5421b6"></circle> </svg> <code>#5421b6</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#461d95"></circle> </svg> <code>#461d95</code> </li> <li> <svg class="color-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle r="100" cx="50" cy="50" fill="#2a1065"></circle> </svg> <code>#2a1065</code> </li> <div class="t">Pour une meilleur comprention du l'usage des couleurs : <a href="https://uicolors.app/generate/2A1065">ici</a></div> </div>
- Mise en page 
                    - Icônes
                    - Titres , Soustitre ....
                    -  Textes et liens
                    - Typographie
                    - Accessibilité
                    Voir exemple ici : https://framasoft.org/fr/graphics/
<div class="t1"><li>Titre</li></div> <div class="t2"><li>Sous Titre</li></div> <div class="propriete">Propriete</div> <div class="def">yop</div> </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ui.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ui.astro";
const $$url = "/Germain/ui";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Ui,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
