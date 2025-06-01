import { c as createComponent, r as renderComponent, f as renderTemplate, u as unescapeHTML } from '../../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CPmVxWbh.mjs';
export { renderers } from '../../renderers.mjs';

const html = () => "<p>Definition : Une equation differentielles est une equation dont l’inconnue est un fonctionn que l’on note y</p>\n<p>Remarque : Resoudre une equation differentielle reviend donc a trouver toutes les fonctions qui vérifie l’équation ainsi que leur domaine de définitions</p>\n<div class=\"t1\"><li>Titre</li></div>\n<div class=\"t2\"><li>Sous Titre</li></div>\n<div class=\"propriete\">Propriete</div>\n<div class=\"def\">yop</div>";

				const frontmatter = {"layout":"../../layouts/Leçon.astro","title":"Chapitre : Equations Differentielles","date":"09 Aug 2022"};
				const file = "/home/Spike/Documents/Projet Github/Germain/src/pages/Terminal/chap1_T.md";
				const url = "/Germain/Terminal/chap1_T";
				function rawContent() {
					return "   \n                                 \n                                             \n                   \n   \n\nDefinition : Une equation differentielles est une equation dont l'inconnue est un fonctionn que l'on note y\n\nRemarque : Resoudre une equation differentielle reviend donc a trouver toutes les fonctions qui vérifie l'équation ainsi que leur domaine de définitions\n\n<div class=\"t1\"><li>Titre</li></div>\n\n<div class=\"t2\"><li>Sous Titre</li></div>\n\n<div class=\"propriete\">Propriete</div>\n\n<div class=\"def\">yop</div>\n\n";
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
