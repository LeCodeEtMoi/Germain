import { c as createAstro, a as createComponent, f as addAttribute, e as renderTemplate, m as maybeRenderHead, s as spreadAttributes, d as renderSlot, r as renderComponent, g as renderScript } from './astro/server_os80pIPP.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from './internal_DUx92lqW.mjs';

const $$Astro$2 = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description = SITE_DESCRIPTION, image = "/blog-placeholder-1.jpg" } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(SITE_TITLE, "title")}${addAttribute(new URL("rss.xml", Astro2.site), "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font preloads --><link rel="preload" href="/Germain/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin><link rel="preload" href="/Germain/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/components/BaseHead.astro", void 0);

const $$Astro$1 = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$HeaderLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const base = "/Germain/";
  const {
    href,
    class: className = "",
    isNavbarItem = false,
    ...props
  } = Astro2.props;
  const hrefStr = href instanceof URL ? href.pathname : String(href);
  const fullHref = hrefStr.startsWith(base) ? hrefStr : base + hrefStr.replace(/^\//, "");
  const pathname = Astro2.url.pathname;
  const isActive = pathname === fullHref || pathname === fullHref.replace(/\/$/, "");
  const baseClasses = isNavbarItem ? "navbar-item" : "button is-ghost";
  const activeClass = isActive ? "is-active" : "";
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(fullHref, "href")}${addAttribute([baseClasses, className, activeClass], "class:list")}${spreadAttributes(props)} data-astro-cid-eimmu3lg> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "/home/Spike/Documents/Projet Github/Germain/src/components/HeaderLink.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="navbar germain-navbar is-fixed-top" role="navigation" aria-label="main navigation" data-astro-cid-3ef6ksr2> <div class="container" data-astro-cid-3ef6ksr2> <div class="navbar-brand" data-astro-cid-3ef6ksr2> <a class="navbar-item" href="/Germain/" data-astro-cid-3ef6ksr2> <figure class="image  mr-2" data-astro-cid-3ef6ksr2> <img class="is-rounded" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Germain_-_%C5%92uvres_philosophiques%2C_1896_%28Illustration_page_4%29.jpg/1024px-Germain_-_%C5%92uvres_philosophiques%2C_1896_%28Illustration_page_4%29.jpg" alt="Logo Germain" loading="lazy" data-astro-cid-3ef6ksr2> </figure> <h1 class="title is-3 mb-0" data-astro-cid-3ef6ksr2>${SITE_TITLE} </h1> </a> <!-- Burger menu pour mobile --> <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" data-astro-cid-3ef6ksr2> <span aria-hidden="true" data-astro-cid-3ef6ksr2></span> <span aria-hidden="true" data-astro-cid-3ef6ksr2></span> <span aria-hidden="true" data-astro-cid-3ef6ksr2></span> </a> </div> <div id="navbarBasicExample" class="navbar-menu" data-astro-cid-3ef6ksr2> <div class="navbar-end" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/Germain/blog", "isNavbarItem": true, "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Leçons` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/Germain/exercices", "isNavbarItem": true, "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Exercices` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/Germain/mathsmetier", "isNavbarItem": true, "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Maths et métier` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/Germain/application", "isNavbarItem": true, "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`Application` })} ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/Germain/about", "isNavbarItem": true, "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate`À propos` })} </div> </div> </div> </nav> <!-- Script pour le menu burger --> ${renderScript($$result, "/home/Spike/Documents/Projet Github/Germain/src/components/Header.astro?astro&type=script&index=0&lang.ts")} <!-- Styles personnalisés pour le header --> `;
}, "/home/Spike/Documents/Projet Github/Germain/src/components/Header.astro", void 0);

const $$Astro = createAstro("https://lecodeetmoi.github.io/Germain/");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="columns is-multiline" data-astro-cid-sz7xmlte> <div class="column is-full is-two-fifths-desktop" data-astro-cid-sz7xmlte> <p class="has-text-weight-bold" data-astro-cid-sz7xmlte>${SITE_TITLE}</p> <p class="is-size-7" data-astro-cid-sz7xmlte>
Germain - Un projet éducatif pour explorer les mathématiques
</p> <p class="is-size-7 mt-2" data-astro-cid-sz7xmlte>
Construit avec <a href="https://astro.build/" target="_blank" data-astro-cid-sz7xmlte>Astro</a> et <a href="https://bulma.io/" target="_blank" data-astro-cid-sz7xmlte>Bulma</a>.
</p> </div> <div class="column is-one-fifth-desktop is-half-tablet" data-astro-cid-sz7xmlte> <p class="has-text-weight-bold" data-astro-cid-sz7xmlte>Navigation</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/Germain/blog" data-astro-cid-sz7xmlte>Leçons</a></li> <li data-astro-cid-sz7xmlte><a href="/Germain/exercices" data-astro-cid-sz7xmlte>Exercices</a></li> <li data-astro-cid-sz7xmlte><a href="/Germain/about" data-astro-cid-sz7xmlte>À propos</a></li> </ul> </div> <div class="column is-one-fifth-desktop is-half-tablet" data-astro-cid-sz7xmlte> <p class="has-text-weight-bold" data-astro-cid-sz7xmlte>Projet</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/Germain/aide" data-astro-cid-sz7xmlte>Participer</a></li> <li data-astro-cid-sz7xmlte><a href="/Germain/CodeDéontologie" data-astro-cid-sz7xmlte>Code de Déontologie</a></li> <li data-astro-cid-sz7xmlte><a href="/Germain/ui" data-astro-cid-sz7xmlte>Charte Graphique</a></li> </ul> </div> <div class="column is-one-fifth-desktop is-half-tablet" data-astro-cid-sz7xmlte> <p class="has-text-weight-bold" data-astro-cid-sz7xmlte>Réseaux</p> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="https://github.com/LeCodeEtMoi/Germain" target="_blank" data-astro-cid-sz7xmlte>GitHub</a></li> <li data-astro-cid-sz7xmlte><a href="" target="_blank" data-astro-cid-sz7xmlte>BlueSky</a></li> </ul> </div> </div> </div> </footer> `;
}, "/home/Spike/Documents/Projet Github/Germain/src/components/Footer.astro", void 0);

export { $$BaseHead as $, $$Header as a, $$Footer as b };
