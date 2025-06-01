import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, f as renderTemplate } from './astro/server_M7ew8Kth.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/components/FormattedDate.astro", void 0);

export { $$FormattedDate as $ };
