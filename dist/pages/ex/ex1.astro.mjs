import { c as createComponent, r as renderComponent, f as renderTemplate, u as unescapeHTML } from '../../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CPmVxWbh.mjs';
export { renderers } from '../../renderers.mjs';

const html = () => "<h4>Voici la liste de tout les exercices à réaliser sans modération !</h4>\n<h5>Esapce</h5>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_1_T\">Détermine une équation cartésienne du plan passant par A et de vecteur normal n⃗</a>\n  </div>\n</div>\n<h5>Denombrement</h5>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_8_T\">Exo 1</a>\n  </div>\n</div>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_9_T\">Exo 2</a>\n  </div>\n</div>\n<h5>Primitive</h5>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_10_T\">Exo 1 Primitives fonction de base</a>\n  </div>\n</div>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_11_T\">Exo 1 Equadife</a>\n  </div>\n</div>";

				const frontmatter = {"layout":"../../layouts/Leçon.astro","title":"Exo","description":"Tout le programme de terminale","pubDate":"Jul 08 2022","heroImage":"/blog-placeholder-3.jpg"};
				const file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex1.md";
				const url = "/Germain/ex/ex1";
				function rawContent() {
					return "   \n                                 \n            \n                                             \n                      \n                                    \n   \n\n<h4>Voici la liste de tout les exercices à réaliser sans modération !</h4>\n<h5>Esapce</h5>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_1_T\">Détermine une équation cartésienne du plan passant par A et de vecteur normal n⃗</a>\n  </div>\n</div>\n<h5>Denombrement</h5>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_8_T\">Exo 1</a>\n  </div>\n</div>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_9_T\">Exo 2</a>\n  </div>\n</div>\n\n<h5>Primitive</h5>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_10_T\">Exo 1 Primitives fonction de base</a>\n  </div>\n</div>\n<div class=\"chapitre\">\n  <div class=\"titre\">\n    <a href=\"ex_11_T\">Exo 1 Equadife</a>\n  </div>\n</div>\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$Leon, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html())}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
