globalThis.process ??= {}; globalThis.process.env ??= {};
import { o as createComponent, p as renderTemplate, u as addAttribute, v as renderHead, w as renderSlot, t as createAstro, q as renderComponent, s as maybeRenderHead } from './astro/server_zD_PcRO5.mjs';
/* empty css                        */

const $$Astro$2 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Revolutionizing Color with Nature's Touch"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;500;700&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/workspaces/web-dyegon-cloudflare/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Headline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Headline;
  const { level, className = "", color = "", weight = "" } = Astro2.props;
  const Headlines = {
    1: {
      tag: "h1",
      size: "lg:text-8xl text-5xl"
    },
    2: {
      tag: "h2",
      size: "text-3xl"
    },
    3: {
      tag: "h3",
      size: "text-2xl"
    },
    4: {
      tag: "h4",
      size: "lg:text-8xl xxs:text-6xl"
    },
    5: {
      tag: "h5",
      size: "lg:text-8xl xxs:text-6xl"
    },
    6: {
      tag: "h6",
      size: "lg:text-8xl xxs:text-6xl"
    }
  };
  const classColor = color && `text-${color}`;
  const classFont = weight && ` font-${weight}`;
  const Element = Headlines[level].tag;
  const classNames = `${Headlines[level].size} ${classColor} ${classFont} ${className}`;
  return renderTemplate`${renderComponent($$result, "Element", Element, { "class": `${classNames}` }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/workspaces/web-dyegon-cloudflare/src/components/atoms/Headline.astro", void 0);

const $$Astro = createAstro();
const $$Paragraph = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Paragraph;
  const { size = "2xl", className = "", color = "black", weight = "medium" } = Astro2.props;
  const classSize = size && `text-${size}`;
  const classColor = color && `text-${color}`;
  const classFont = weight && ` font-${weight}`;
  const classNames = `${classSize} ${classColor} ${classFont} ${className}`;
  return renderTemplate`${maybeRenderHead()}<p${addAttribute(`${classNames}`, "class")}> ${renderSlot($$result, $$slots["default"])} </p>`;
}, "/workspaces/web-dyegon-cloudflare/src/components/atoms/Paragraph.astro", void 0);

export { $$Headline as $, $$Paragraph as a, $$Layout as b };
