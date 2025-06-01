import { c as createComponent, r as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_CjnjdSqU.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "A propos", "description": "Lorem ipsum dolor sit amet", "pubDate": /* @__PURE__ */ new Date("May 02 2025"), "heroImage": "/about.jpg" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>
La naissance de Germain
<a href="https://www.education.gouv.fr/pisa-programme-international-pour-le-suivi-des-acquis-des-eleves-41558">En France, le niveau en mathématiques n’est plus au sommet depuis quelque temps.</a> L’équipe de Germain a donc pour objectif de rendre les mathématiques plus accessibles et de permettre à celles et ceux qui en ont le désir de s’y intéresser, en éveillant la curiosité pour cette discipline millénaire.
</p> <p>Pourquoi ce nom ? :<br>
Les femmes sont encore sous-représentées dans le domaine des mathématiques, et cela doit changer. Rien ne justifie qu’elles soient moins capables que les hommes dans ce domaine.
C’est pourquoi nous avons choisi le nom Germain, en hommage à Sophie Germain, une pionnière des mathématiques, qui a dû se battre pour avoir le droit d’étudier cette science.
C’est grâce à ses travaux que la Tour Eiffel tient encore debout aujourd’hui.</p>  <p>
"Les mathématiques ne servent à rien..." Sauf que...</p> <img src="https://sorciersdesalem.math.cnrs.fr/Posters/PosterLesMathsCaSertARien.png"> <p>
Comme si bien expliquer <a href="https://sorciersdesalem.math.cnrs.fr/SaufA/LesMathsCaSertARien.html">ici</a>
les mathématiques permettent de réaliser d’innombrables choses dans des domaines aussi variés que :
	la musique, l’économie, la météorologie, la cryptographie, la médecine, l’informatique, ou encore le sport.
</p> <p>
Les mathématiques sont omniprésentes : elles sont partout autour de nous.
		C’est pourquoi il est essentiel d’en comprendre les bases.
		En ce moment, l’intelligence artificielle est en plein essor, et beaucoup s’interrogent à son sujet.
		Or, une grande partie des intelligences artificielles repose sur des systèmes et logiques mathématiques complexes.
		Comprendre les mathématiques, c’est aussi mieux comprendre ce phénomène et savoir l’utiliser à bon escient.</p> ` })}`;
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
