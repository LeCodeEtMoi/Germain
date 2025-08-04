import { c as createAstro, a as createComponent, r as renderComponent, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_DNAFawCL.mjs';
import { $ as $$BlogPost } from '../../chunks/BlogPost_C_B_0gQE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await renderEntry(post);
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/blog/[...slug].astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/blog/[...slug].astro";
const $$url = "/Germain/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
