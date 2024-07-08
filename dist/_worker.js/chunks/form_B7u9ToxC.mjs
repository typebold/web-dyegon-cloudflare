globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                        */
import { o as createComponent, p as renderTemplate, q as renderComponent, s as maybeRenderHead } from './astro/server_zD_PcRO5.mjs';
import { $ as $$Headline, a as $$Paragraph, b as $$Layout } from './Paragraph_oPXjxbS-.mjs';
import { $ as $$Image } from './_astro_assets_B7Hj58EJ.mjs';
/* empty css                        */

const LogoPatagonFiber = new Proxy({"src":"/_astro/logo_by_patagon_black.B_tKjV84.png","width":598,"height":156,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/workspaces/web-dyegon-cloudflare/src/assets/logo_by_patagon_black.png";
							}
							
							return target[name];
						}
					});

const $$Form = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "DYEGON - Wild Patagonian Bacterial Textile Ink" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="o-container"> <div class="mb-10"> <div class="c-footer__wrapper-content"> ${renderComponent($$result2, "Image", $$Image, { "src": LogoPatagonFiber, "class": "c-about-us__logo-dyegon pt-12", "alt": "descriptive text" })} </div> </div> <div class="md:flex md:items-center md:flex-col"> ${renderComponent($$result2, "Headline", $$Headline, { "level": 2, "color": "primary", "weight": "bold" }, { "default": ($$result3) => renderTemplate`
Revolutionizing Color with Nature's Touch
` })} ${renderComponent($$result2, "Paragraph", $$Paragraph, {}, { "default": ($$result3) => renderTemplate`
We extend our invitation to investors, brand, mills to become the game changer
` })} </div> <div class="c-form"> <form class="c-form__wrapper-form" name="contact-dyegon" method="POST" action="https://usebasin.com/f/c283ee0aa6d9"> <div class="pt-5"> <label for="input-name" class="block text-sm text-primary">Name</label> <input type="text" name="name" id="input-name" class="form-control block mt-2 w-full placeholder-gray-400/70 rounded-lg border px-5 py-2.5 border-gray-600 bg-white text-primary"> <p class="mt-1 text-small text-gray-400" id="help-name">Enter your full name</p> </div> <div class="pt-5"> <label for="input-organization" class="block text-sm text-primary">Organization</label> <input type="text" name="organization" id="input-organization" class="form-control block mt-2 w-full placeholder-gray-400/70 rounded-lg border px-5 py-2.5 border-gray-600 bg-white text-primary"> <p class="mt-1 text-small text-gray-400" id="help-organization">Enter your organization</p> </div> <div class="pt-5"> <label for="input-position" class="block text-sm text-primary">Position</label> <input type="text" name="position" id="input-position" class="form-control block mt-2 w-full placeholder-gray-400/70 rounded-lg border px-5 py-2.5 border-gray-600 bg-white text-primary"> <p class="mt-1 text-small text-gray-400" id="help-position">Enter your position</p> </div> <div class="pt-5"> <label for="input-phone" class="block text-sm text-primary">Phone</label> <div class="flex items-center mt-2"> <p class="py-2.5 px-3 tex-primary bg-white border-gray-700 border border-r-0 rtl:rounded-r-lg rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-l-lg">+</p> <input type="phone" name="phone" id="input-phone" class="form-control block w-full rounded-l-none rtl:rounded-l-lg rtl:rounded-r-none rounded-lg border px-5 py-2.5 text-primary focus:ring focus:ring-blue-300 focus:ring-opacity-40 border-gray-600 bg-white focus:border-blue-300"> </div> <p class="mt-1 text-small text-gray-400" id="help-phone">Enter your phone</p> </div> <div class="pt-5"> <label for="input-email" class="block text-sm text-primary">Email</label> <input type="email" name="email" id="input-email" class="form-control block mt-2 w-full rounded-lg border px-5 py-2.5 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 border-gray-600 bg-white text-primary focus:border-blue-300"> <p class="mt-1 text-small text-gray-400" id="help-email">Enter your email
</p> </div> <div class="pt-5"> <label for="group" class="block text-sm text-primary">
You are
</label> <select name="grupo" id="group" class="mt-1.5 w-full form-select rounded-lg bg-white text-primary sm:text-sm px-5 py-2.5 border border-gray-600"> <option value="">Select</option> <option value="Investor">Investor</option> <option value="Mills">Mills</option> <option value="Brand">Brand</option> <option value="Other">Other</option> </select> </div> <div class="pt-5 c-form__observation-none" id="wrapper-input-observation"> <label for="input-observation" class="block text-sm text-primary">¿Other?</label> <input type="text" name="observation" id="input-observation" class="form-control block mt-2 w-full rounded-lg border px-5 py-2.5 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 border-gray-600 bg-white text-primrary focus:border-blue-300"> <p class="mt-1 text-small text-gray-400" id="help-observation">Enter you other</p> </div> <button disabled type="submit" id="button-send" class="mt-10 text-center block w-full overflow-hidden rounded-lg px-8 py-3 text-primary bg-white border border-gray-600"> <span class="text-md font-bold">
ENVIAR
</span> </button> </form> </div> </main> ` })}  `;
}, "/workspaces/web-dyegon-cloudflare/src/pages/en/form.astro", void 0);

const $$file = "/workspaces/web-dyegon-cloudflare/src/pages/en/form.astro";
const $$url = "/en/form";

export { $$Form as default, $$file as file, $$url as url };
