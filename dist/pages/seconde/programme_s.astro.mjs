import { c as createComponent, r as renderComponent, f as renderTemplate, u as unescapeHTML } from '../../chunks/astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CPmVxWbh.mjs';
export { renderers } from '../../renderers.mjs';

const html = () => "<h3 id=\"programme\">Programme</h3>\n<p>Le programme est <a href=\"https://eduscol.education.fr/document/24553/download\">ici</a></p>";

				const frontmatter = {"layout":"../../layouts/Leçon.astro","title":"Chapitre : Equations Differentielles","date":"09 Aug 2022"};
				const file = "/home/Spike/Documents/Projet Github/Germain/src/pages/Seconde/Programme_S.md";
				const url = "/Germain/Seconde/Programme_S";
				function rawContent() {
					return "   \n                                 \n                                             \n                   \n   \n\n### Programme \n\nLe programme est [ici](https://eduscol.education.fr/document/24553/download)";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [{"depth":3,"slug":"programme","text":"Programme"}];
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
