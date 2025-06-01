import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, j as decodeKey } from './chunks/astro/server_M7ew8Kth.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

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
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
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
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/Spike/Documents/Projet%20Github/Germain/","cacheDir":"file:///home/Spike/Documents/Projet%20Github/Germain/node_modules/.astro/","outDir":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/","srcDir":"file:///home/Spike/Documents/Projet%20Github/Germain/src/","publicDir":"file:///home/Spike/Documents/Projet%20Github/Germain/public/","buildClientDir":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/client/","buildServerDir":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/server/","adapterName":"","routes":[{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/aide/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/aide","isIndex":false,"type":"page","pattern":"^\\/aide\\/?$","segments":[[{"content":"aide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aide.astro","pathname":"/aide","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ApprendreLesMaths/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/apprendrelesmaths","isIndex":false,"type":"page","pattern":"^\\/ApprendreLesMaths\\/?$","segments":[[{"content":"ApprendreLesMaths","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ApprendreLesMaths.astro","pathname":"/ApprendreLesMaths","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/CodeD%C3%A9ontologie/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/codedéontologie","isIndex":false,"type":"page","pattern":"^\\/CodeDéontologie\\/?$","segments":[[{"content":"CodeDéontologie","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/CodeDéontologie.astro","pathname":"/CodeDéontologie","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_1_T/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ex/ex_1_t","isIndex":false,"type":"page","pattern":"^\\/ex\\/ex_1_T\\/?$","segments":[[{"content":"ex","dynamic":false,"spread":false}],[{"content":"ex_1_T","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ex/ex_1_T.astro","pathname":"/ex/ex_1_T","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_10_T/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ex/ex_10_t","isIndex":false,"type":"page","pattern":"^\\/ex\\/ex_10_T\\/?$","segments":[[{"content":"ex","dynamic":false,"spread":false}],[{"content":"ex_10_T","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ex/ex_10_T.astro","pathname":"/ex/ex_10_T","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_11_T/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ex/ex_11_t","isIndex":false,"type":"page","pattern":"^\\/ex\\/ex_11_T\\/?$","segments":[[{"content":"ex","dynamic":false,"spread":false}],[{"content":"ex_11_T","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ex/ex_11_T.astro","pathname":"/ex/ex_11_T","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_8_T/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ex/ex_8_t","isIndex":false,"type":"page","pattern":"^\\/ex\\/ex_8_T\\/?$","segments":[[{"content":"ex","dynamic":false,"spread":false}],[{"content":"ex_8_T","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ex/ex_8_T.astro","pathname":"/ex/ex_8_T","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_9_T/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ex/ex_9_t","isIndex":false,"type":"page","pattern":"^\\/ex\\/ex_9_T\\/?$","segments":[[{"content":"ex","dynamic":false,"spread":false}],[{"content":"ex_9_T","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ex/ex_9_T.astro","pathname":"/ex/ex_9_T","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex1/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ex/ex1","isIndex":false,"type":"page","pattern":"^\\/ex\\/ex1\\/?$","segments":[[{"content":"ex","dynamic":false,"spread":false}],[{"content":"ex1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ex/ex1.md","pathname":"/ex/ex1","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/exercices/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/exercices","isIndex":false,"type":"page","pattern":"^\\/exercices\\/?$","segments":[[{"content":"exercices","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/exercices.astro","pathname":"/exercices","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/Premiere/Programme_P/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/premiere/programme_p","isIndex":false,"type":"page","pattern":"^\\/Premiere\\/Programme_P\\/?$","segments":[[{"content":"Premiere","dynamic":false,"spread":false}],[{"content":"Programme_P","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Premiere/Programme_P.md","pathname":"/Premiere/Programme_P","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/Seconde/Programme_S/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/seconde/programme_s","isIndex":false,"type":"page","pattern":"^\\/Seconde\\/Programme_S\\/?$","segments":[[{"content":"Seconde","dynamic":false,"spread":false}],[{"content":"Programme_S","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Seconde/Programme_S.md","pathname":"/Seconde/Programme_S","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/Terminal/chap1_T/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terminal/chap1_t","isIndex":false,"type":"page","pattern":"^\\/Terminal\\/chap1_T\\/?$","segments":[[{"content":"Terminal","dynamic":false,"spread":false}],[{"content":"chap1_T","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Terminal/chap1_T.md","pathname":"/Terminal/chap1_T","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/Terminal/Programme_T/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terminal/programme_t","isIndex":false,"type":"page","pattern":"^\\/Terminal\\/Programme_T\\/?$","segments":[[{"content":"Terminal","dynamic":false,"spread":false}],[{"content":"Programme_T","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Terminal/Programme_T.md","pathname":"/Terminal/Programme_T","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/ui/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ui","isIndex":false,"type":"page","pattern":"^\\/ui\\/?$","segments":[[{"content":"ui","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ui.astro","pathname":"/ui","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///home/Spike/Documents/Projet%20Github/Germain/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/Germain/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/Spike/Documents/Projet Github/Germain/src/pages/aide.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/CodeDéontologie.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/exercices.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/ui.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_1_T.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_10_T.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_11_T.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_8_T.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_9_T.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/Premiere/Programme_P.md",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/Seconde/Programme_S.md",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/Terminal/Programme_T.md",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/Terminal/chap1_T.md",{"propagation":"none","containsHead":true}],["/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex1.md",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/Spike/Documents/Projet Github/Germain/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/aide@_@astro":"pages/aide.astro.mjs","\u0000@astro-page:src/pages/ApprendreLesMaths@_@astro":"pages/apprendrelesmaths.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/CodeDéontologie@_@astro":"pages/codedéontologie.astro.mjs","\u0000@astro-page:src/pages/ex/ex1@_@md":"pages/ex/ex1.astro.mjs","\u0000@astro-page:src/pages/exercices@_@astro":"pages/exercices.astro.mjs","\u0000@astro-page:src/pages/Premiere/Programme_P@_@md":"pages/premiere/programme_p.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/Seconde/Programme_S@_@md":"pages/seconde/programme_s.astro.mjs","\u0000@astro-page:src/pages/Terminal/chap1_T@_@md":"pages/terminal/chap1_t.astro.mjs","\u0000@astro-page:src/pages/Terminal/Programme_T@_@md":"pages/terminal/programme_t.astro.mjs","\u0000@astro-page:src/pages/ui@_@astro":"pages/ui.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/ex/ex_1_T@_@astro":"pages/ex/ex_1_t.astro.mjs","\u0000@astro-page:src/pages/ex/ex_10_T@_@astro":"pages/ex/ex_10_t.astro.mjs","\u0000@astro-page:src/pages/ex/ex_11_T@_@astro":"pages/ex/ex_11_t.astro.mjs","\u0000@astro-page:src/pages/ex/ex_8_T@_@astro":"pages/ex/ex_8_t.astro.mjs","\u0000@astro-page:src/pages/ex/ex_9_T@_@astro":"pages/ex/ex_9_t.astro.mjs","\u0000@astro-renderers":"renderers.mjs","/home/Spike/Documents/Projet Github/Germain/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/home/Spike/Documents/Projet Github/Germain/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CA_p5X0h.mjs","/home/Spike/Documents/Projet Github/Germain/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B5vm9am0.mjs","\u0000@astrojs-manifest":"manifest_Cc4FJl1d.mjs","/home/Spike/Documents/Projet Github/Germain/src/components/Ex_1_T.tsx":"_astro/Ex_1_T.CUgHNTrZ.js","/home/Spike/Documents/Projet Github/Germain/src/components/Ex_10_T.tsx":"_astro/Ex_10_T.Bw_2I2RD.js","/home/Spike/Documents/Projet Github/Germain/src/components/Ex_11_T.tsx":"_astro/Ex_11_T.BKqsFhUd.js","/home/Spike/Documents/Projet Github/Germain/src/components/Ex_8_T.tsx":"_astro/Ex_8_T.DbB5LtPj.js","/home/Spike/Documents/Projet Github/Germain/src/components/Ex_9_T.tsx":"_astro/Ex_9_T.CsesSdfv.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/about/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/aide/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ApprendreLesMaths/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/blog/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/CodeD%C3%A9ontologie/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_1_T/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_10_T/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_11_T/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_8_T/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex_9_T/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ex/ex1/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/exercices/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/Premiere/Programme_P/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/rss.xml","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/Seconde/Programme_S/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/Terminal/chap1_T/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/Terminal/Programme_T/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/ui/index.html","/Germain/file:///home/Spike/Documents/Projet%20Github/Germain/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"M/h/OsCUU52DN7gZA6rnjRaBFhHt1jpir6eeSctXoCY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
