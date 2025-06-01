import { c as createComponent, r as renderComponent, b as renderHead, f as renderTemplate } from '../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_DMtE2hl_.mjs';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/internal_DUx92lqW.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <h1>🧑‍🏫 Projet Germain</h1> <p></p><h5>Germain se donne plusieur missions :</h5> <ul> <li>Donner au néophyte et a toutes les autre personnes d'aimer les mathématiques</li> <li>Permertre a qui quiconque de s'améliorer dans un domaine lier au mathématiques</li> </ul>  <p></p><h5>1. Des exercices infinis 🤯 </h5>
On a souvent répété qu'il était intéressant de refaire les exercices, mais une fois qu'on a refait tous les exercices vus en classe, on n'a plus d'exercices avec la correction. En effet, à force de refaire les mêmes exercices, on les connaît par cœur et on ne fait plus travailler les bonnes parties de notre cerveau. Germain propose des exercices en mathématiques pour tous les niveaux et pour toutes les branches des mathématiques avec une correction
 <p></p><h5>2. Des leçons de qualité 📚</h5>
Les leçons sont réalisées avec les membres de la communauté, elles seront ainsi constamment mises à jour.<br>
Les leçons suiveront les attentes du <a href="https://eduscol.education.fr/">programme français </a>  </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/index.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/index.astro";
const $$url = "/Germain";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
