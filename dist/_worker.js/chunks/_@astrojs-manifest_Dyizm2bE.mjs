globalThis.process ??= {}; globalThis.process.env ??= {};
import { k as bold, l as red, y as yellow, m as dim, n as blue } from './astro/server_zD_PcRO5.mjs';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const c=document.querySelectorAll(\".form-control\"),u=document.querySelectorAll(\".form-select\"),d=u[0],o=document.getElementById(\"button-send\"),a={name:!1,email:!1,phone:!1,organization:!1,position:!1,selected_group:!1,observation:!1,is_observation:!1,is_completed_fields:!1},s={name:/^[a-zA-ZÀ-ÿ\\s]{1,40}$/,organization:/^[a-zA-ZÀ-ÿ\\s]{1,40}$/,position:/^[a-zA-ZÀ-ÿ\\s]{1,40}$/,email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$/,phone:/^\\d{6,20}$/,observation:/^[a-zA-ZÀ-ÿ\\s]{1,40}$/},m=e=>{const n=e.target.value;[\"Investor\",\"Mills\",\"Brand\",\"Horeca\",\"Other\"].includes(n)?(a.selected_group=!0,e.target.className=\"mt-1.5 w-full form-select rounded-lg bg-white border-gray-300 text-primary sm:text-sm px-5 py-2.5 border border-lime-500\"):(a.selected_group=!1,e.target.className=\"mt-1.5 w-full form-select rounded-lg bg-white border-gray-300 text-primary sm:text-sm px-5 py-2.5 border border-red \"),n===\"Other\"?(a.is_observation=!0,document.getElementById(\"wrapper-input-observation\").classList.remove(\"c-form__observation-none\"),document.getElementById(\"wrapper-input-observation\").classList.add(\"c-form__observation-block\")):(a.is_observation=!1,document.getElementById(\"wrapper-input-observation\").classList.add(\"c-form__observation-none\"),document.getElementById(\"wrapper-input-observation\").classList.remove(\"c-form__observation-block\"))},i=e=>{switch(e.target.name){case\"name\":r(s.name,e.target,e.target.name);break;case\"organization\":r(s.organization,e.target,e.target.name);break;case\"position\":r(s.position,e.target,e.target.name);break;case\"email\":r(s.email,e.target,e.target.name);break;case\"phone\":r(s.phone,e.target,e.target.name);break;case\"observation\":r(s.observation,e.target,e.target.name);break}},r=(e,n,t)=>{console.log(e.test(n.value)),e.test(n.value)?(document.getElementById(`input-${t}`).classList.remove(\"form-control\"),document.getElementById(`input-${t}`).classList.remove(\"border-red\"),document.getElementById(`input-${t}`).classList.add(\"form-control\"),document.getElementById(`input-${t}`).classList.add(\"border-lime-500\"),document.getElementById(`help-${t}`).classList.remove(\"text-red\"),document.getElementById(`help-${t}`).classList.add(\"text-gray-600\"),a[t]=!0):(document.getElementById(`input-${t}`).classList.remove(\"form-control\"),document.getElementById(`input-${t}`).classList.remove(\"border-lime-500\"),document.getElementById(`input-${t}`).classList.add(\"form-control\"),document.getElementById(`input-${t}`).classList.add(\"border-red\"),document.getElementById(`help-${t}`).classList.remove(\"text-gray-600\"),document.getElementById(`help-${t}`).classList.add(\"text-red\"),a[t]=!1)},l=()=>{a.name&&a.email&&a.phone&&a.selected_group&&a.position&&a.organization&&!a.is_observation||a.is_observation&&a.observation?(o.removeAttribute(\"disabled\"),o.style.backgroundColor=\"#C0FB76\"):(o.setAttribute(\"disabled\",\"\"),o.style.backgroundColor=\"#ffffff\")};c.forEach(e=>{e.addEventListener(\"keyup\",i),e.addEventListener(\"blur\",i),e.addEventListener(\"blur\",l),e.addEventListener(\"keyup\",l)});d.addEventListener(\"blur\",m);d.addEventListener(\"change\",m);d.addEventListener(\"blur\",l);d.addEventListener(\"change\",l);\n"}],"styles":[{"type":"external","src":"/_astro/form.kV-bB27w.css"},{"type":"external","src":"/_astro/form.0Mn64HZ5.css"}],"routeData":{"route":"/en/form","isIndex":false,"type":"page","pattern":"^\\/en\\/form\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/form.astro","pathname":"/en/form","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var i=document.querySelector(\".c-home-new__video--aspect\"),o=document.querySelector(\".c-home-new__video--width\"),d=i.offsetHeight/i.offsetWidth,e;function n(){var t=window.innerHeight/window.innerWidth;t>d?o.style.width=t/d*100+\"%\":o.style.width=\"100%\"}window.addEventListener(\"resize\",function(){e&&clearTimeout(e),e=setTimeout(n,100)});window.addEventListener(\"DOMContentLoaded\",function(){n()});\n"}],"styles":[{"type":"external","src":"/_astro/form.kV-bB27w.css"},{"type":"external","src":"/_astro/index.bjDt99s1.css"}],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/","pattern":"^\\/$","segments":[],"params":[],"component":"/","pathname":"/","prerender":false,"redirect":"en","fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/web-dyegon-cloudflare/src/pages/en/form.astro",{"propagation":"none","containsHead":true}],["/workspaces/web-dyegon-cloudflare/src/pages/en/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/en/form@_@astro":"pages/en/form.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_CMYwBGnb.mjs","/src/pages/en/form.astro":"chunks/form_B7u9ToxC.mjs","/src/pages/en/index.astro":"chunks/index_DKNoHFUq.mjs","/workspaces/web-dyegon-cloudflare/node_modules/@astrojs/cloudflare/dist/entrypoints/image-service.js":"chunks/image-service_BZiKurAD.mjs","\u0000@astrojs-manifest":"manifest_CThswHSC.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.h7YgH431.js","/astro/hoisted.js?q=1":"_astro/hoisted.BO5fpWRf.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/logo_by_patagon.xCu8M4gs.svg","/_astro/icon_1.DqBlQrAx.svg","/_astro/icon_1-white.Ds-aj17k.svg","/_astro/icon_2.BeSPz_SE.svg","/_astro/icon_3.ezlr7GX-.svg","/_astro/icon_3-white.Db-rbOfj.svg","/_astro/award_1.gkPbHks5.png","/_astro/award_2.4cqFk15M.png","/_astro/award_3.CWGdZrnw.png","/_astro/cycle_1.DI4EU4UW.jpg","/_astro/leader_2.CJ69lMpz.jpg","/_astro/icon_2-white.jX-GOoC1.svg","/_astro/logo_by_patagon_black.B_tKjV84.png","/_astro/cycle_3.tiIBINRg.jpg","/_astro/cycle_2.DgSPb2tv.jpg","/_astro/advisor_3.BjkvkOt0.png","/_astro/advisor_2.C3Buh0m-.png","/_astro/advisor_4.B8B3wWjQ.png","/_astro/advisor_1.8nVWBoHl.png","/_astro/advisor_5.BqGEFUua.png","/_astro/advisor_6.ZmMtUSYv.png","/_astro/advisor_7.Cge98brP.png","/_astro/advisor_9.Z8umWn2Q.png","/_astro/advisor_11.CODH68k1.png","/_astro/advisor_13.q2msS0h9.png","/_astro/advisor_10.vVAPHdrA.png","/_astro/advisor_8.DGJ2JTBR.png","/_astro/advisor_12.BnTaMfBP.png","/_astro/press_1.CNslz0Sc.png","/_astro/press_2.Bw0Bf37g.png","/_astro/leader_1.Dgd30JqR.png","/_astro/press_3.BireD41t.png","/_astro/press_4.DHGzM81c.png","/_astro/press_5.CtBWGirj.png","/_astro/press_6.Rf_NWOBE.png","/_astro/press_7.DJKf9-M5.png","/_astro/by_patagon.1hceulQ6.svg","/_astro/arrow.Zrp-Myqr.png","/_astro/news.WwerdVs1.svg","/_astro/arrow.B_gGYnDK.svg","/_astro/facebook.Bq95bosA.svg","/_astro/instagram.D9qf9IUu.svg","/_astro/linkedin.DDC2A2QQ.svg","/_astro/email.CjoMu0SD.svg","/_astro/phone.COKdtBg-.svg","/_astro/map.BjNWzNxD.svg","/_astro/corfo.Cg4YIFxU.png","/_astro/form.kV-bB27w.css","/_astro/form.0Mn64HZ5.css","/_astro/index.bjDt99s1.css","/favicon.svg","/_worker.js/_noop-middleware.mjs","/_worker.js/index.js","/_worker.js/manifest_CThswHSC.mjs","/_worker.js/renderers.mjs","/_worker.js/_astro/advisor_1.8nVWBoHl.png","/_worker.js/_astro/advisor_10.vVAPHdrA.png","/_worker.js/_astro/advisor_11.CODH68k1.png","/_worker.js/_astro/advisor_12.BnTaMfBP.png","/_worker.js/_astro/advisor_13.q2msS0h9.png","/_worker.js/_astro/advisor_2.C3Buh0m-.png","/_worker.js/_astro/advisor_3.BjkvkOt0.png","/_worker.js/_astro/advisor_4.B8B3wWjQ.png","/_worker.js/_astro/advisor_5.BqGEFUua.png","/_worker.js/_astro/advisor_6.ZmMtUSYv.png","/_worker.js/_astro/advisor_7.Cge98brP.png","/_worker.js/_astro/advisor_8.DGJ2JTBR.png","/_worker.js/_astro/advisor_9.Z8umWn2Q.png","/_worker.js/_astro/arrow.B_gGYnDK.svg","/_worker.js/_astro/arrow.Zrp-Myqr.png","/_worker.js/_astro/award_1.gkPbHks5.png","/_worker.js/_astro/award_2.4cqFk15M.png","/_worker.js/_astro/award_3.CWGdZrnw.png","/_worker.js/_astro/by_patagon.1hceulQ6.svg","/_worker.js/_astro/corfo.Cg4YIFxU.png","/_worker.js/_astro/cycle_1.DI4EU4UW.jpg","/_worker.js/_astro/cycle_2.DgSPb2tv.jpg","/_worker.js/_astro/cycle_3.tiIBINRg.jpg","/_worker.js/_astro/email.CjoMu0SD.svg","/_worker.js/_astro/facebook.Bq95bosA.svg","/_worker.js/_astro/form.0Mn64HZ5.css","/_worker.js/_astro/form.kV-bB27w.css","/_worker.js/_astro/icon_1-white.Ds-aj17k.svg","/_worker.js/_astro/icon_1.DqBlQrAx.svg","/_worker.js/_astro/icon_2-white.jX-GOoC1.svg","/_worker.js/_astro/icon_2.BeSPz_SE.svg","/_worker.js/_astro/icon_3-white.Db-rbOfj.svg","/_worker.js/_astro/icon_3.ezlr7GX-.svg","/_worker.js/_astro/index.bjDt99s1.css","/_worker.js/_astro/instagram.D9qf9IUu.svg","/_worker.js/_astro/leader_1.Dgd30JqR.png","/_worker.js/_astro/leader_2.CJ69lMpz.jpg","/_worker.js/_astro/linkedin.DDC2A2QQ.svg","/_worker.js/_astro/logo_by_patagon.xCu8M4gs.svg","/_worker.js/_astro/logo_by_patagon_black.B_tKjV84.png","/_worker.js/_astro/map.BjNWzNxD.svg","/_worker.js/_astro/news.WwerdVs1.svg","/_worker.js/_astro/phone.COKdtBg-.svg","/_worker.js/_astro/press_1.CNslz0Sc.png","/_worker.js/_astro/press_2.Bw0Bf37g.png","/_worker.js/_astro/press_3.BireD41t.png","/_worker.js/_astro/press_4.DHGzM81c.png","/_worker.js/_astro/press_5.CtBWGirj.png","/_worker.js/_astro/press_6.Rf_NWOBE.png","/_worker.js/_astro/press_7.DJKf9-M5.png","/_worker.js/chunks/Paragraph_oPXjxbS-.mjs","/_worker.js/chunks/_astro_assets_B7Hj58EJ.mjs","/_worker.js/chunks/astro_Sz5GLZvw.mjs","/_worker.js/chunks/form_B7u9ToxC.mjs","/_worker.js/chunks/generic_CMYwBGnb.mjs","/_worker.js/chunks/image-service_BZiKurAD.mjs","/_worker.js/chunks/index_DKNoHFUq.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/en.astro.mjs","/_worker.js/chunks/astro/assets-service_CCsKmb_P.mjs","/_worker.js/chunks/astro/env-setup_nxDOIah1.mjs","/_worker.js/chunks/astro/server_zD_PcRO5.mjs","/_worker.js/pages/en/form.astro.mjs"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
