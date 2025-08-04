import { a as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as generateRandomPoint } from '../../chunks/RandomPoint3D_Bo-jDIuJ.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const subtract = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z });
const crossProduct = (v1, v2) => ({
  x: v1.y * v2.z - v1.z * v2.y,
  y: v1.z * v2.x - v1.x * v2.z,
  z: v1.x * v2.y - v1.y * v2.x
});
const dotProduct = (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
const isZeroVector = (v) => v.x === 0 && v.y === 0 && v.z === 0;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};
const simplifyVector = (v) => {
  const commonDivisor = gcd(gcd(v.x, v.y), v.z);
  if (commonDivisor > 1) {
    return { x: v.x / commonDivisor, y: v.y / commonDivisor, z: v.z / commonDivisor };
  }
  return v;
};
function generateExerciseData() {
  let A, B, C, AB, AC;
  do {
    A = generateRandomPoint(-5, 5);
    B = generateRandomPoint(-5, 5);
    C = generateRandomPoint(-5, 5);
    AB = subtract(B, A);
    AC = subtract(C, A);
  } while (isZeroVector(crossProduct(AB, AC)));
  const correctNormalVector = simplifyVector(crossProduct(AB, AC));
  const shouldBeNormal = Math.random() > 0.5;
  let n;
  if (shouldBeNormal) {
    n = correctNormalVector;
  } else {
    n = { ...correctNormalVector };
    const coordToChange = ["x", "y", "z"][randomInt(0, 2)];
    n[coordToChange] += randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
  }
  n = {
    x: Math.round(n.x),
    y: Math.round(n.y),
    z: Math.round(n.z)
  };
  if (isZeroVector(n)) {
    n.x = 1;
  }
  const isActuallyNormal = Math.abs(dotProduct(n, AB)) < 1e-9 && Math.abs(dotProduct(n, AC)) < 1e-9;
  return { A, B, C, n, isNormal: isActuallyNormal };
}
function VectorNormalToPlaneCheck() {
  const [A, setA] = useState({ x: 0, y: 0, z: 0 });
  const [B, setB] = useState({ x: 0, y: 0, z: 0 });
  const [C, setC] = useState({ x: 0, y: 0, z: 0 });
  const [n, setN] = useState({ x: 1, y: 1, z: 1 });
  const [isNormal, setIsNormal] = useState(false);
  const [feedback, setFeedback] = useState(null);
  function handleNewExercise() {
    const { A: A2, B: B2, C: C2, n: n2, isNormal: isNormal2 } = generateExerciseData();
    setA(A2);
    setB(B2);
    setC(C2);
    setN(n2);
    setIsNormal(isNormal2);
    setFeedback(null);
  }
  useEffect(() => {
    handleNewExercise();
  }, []);
  function getFeedbackMessage(correct) {
    if (correct) {
      return /* @__PURE__ */ jsx("p", { children: "🎉 Bravo Maître, la réponse est correcte !" });
    }
    const AB = subtract(B, A);
    const AC = subtract(C, A);
    const dotAB = dotProduct(n, AB);
    const dotAC = dotProduct(n, AC);
    const conclusion = isNormal ? "Le vecteur est normal au plan, mais vous avez répondu non." : "Le vecteur n'est pas normal au plan, mais vous avez répondu oui.";
    return /* @__PURE__ */ jsxs("div", { className: "content", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "❌ Oups, une erreur s'est glissée, Maître. ",
        conclusion
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Explication :" }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Pour que le vecteur ",
        /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "n⃗" }),
        " soit normal au plan (ABC), il doit être orthogonal à deux vecteurs non colinéaires du plan, par exemple ",
        /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "AB→" }),
        " et ",
        /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "AC→" }),
        ". On vérifie cela en calculant les produits scalaires."
      ] }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "Vecteur ",
          /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "AB→" }),
          " = B - A = (",
          B.x,
          " - ",
          A.x,
          "; ",
          B.y,
          " - ",
          A.y,
          "; ",
          B.z,
          " - ",
          A.z,
          ") = ",
          /* @__PURE__ */ jsxs("strong", { children: [
            "(",
            AB.x,
            "; ",
            AB.y,
            "; ",
            AB.z,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Vecteur ",
          /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "AC→" }),
          " = C - A = (",
          C.x,
          " - ",
          A.x,
          "; ",
          C.y,
          " - ",
          A.y,
          "; ",
          C.z,
          " - ",
          A.z,
          ") = ",
          /* @__PURE__ */ jsxs("strong", { children: [
            "(",
            AC.x,
            "; ",
            AC.y,
            "; ",
            AC.z,
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Calculons les produits scalaires :" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "n⃗ · AB→" }),
          " = (",
          n.x,
          ")×(",
          AB.x,
          ") + (",
          n.y,
          ")×(",
          AB.y,
          ") + (",
          n.z,
          ")×(",
          AB.z,
          ") = ",
          /* @__PURE__ */ jsx("strong", { children: dotAB })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "n⃗ · AC→" }),
          " = (",
          n.x,
          ")×(",
          AC.x,
          ") + (",
          n.y,
          ")×(",
          AC.y,
          ") + (",
          n.z,
          ")×(",
          AC.z,
          ") = ",
          /* @__PURE__ */ jsx("strong", { children: dotAC })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Pour que ",
        /* @__PURE__ */ jsx("span", { className: "is-family-monospace", children: "n⃗" }),
        " soit normal au plan (ABC), les deux produits scalaires doivent être nuls.",
        isNormal ? " C'est bien le cas ici." : " Or, au moins un des produits scalaires n'est pas nul."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "La bonne réponse était : ",
        /* @__PURE__ */ jsx("strong", { children: isNormal ? "Oui" : "Non" }),
        "."
      ] })
    ] });
  }
  function handleValidate(userAnswer) {
    if (userAnswer === isNormal) {
      setFeedback({ correct: true, message: getFeedbackMessage(true) });
    } else {
      setFeedback({ correct: false, message: getFeedbackMessage(false) });
    }
  }
  const formatPoint = (p) => `(${p.x}; ${p.y}; ${p.z})`;
  return /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Le vecteur est-il normal au plan ?" }),
    /* @__PURE__ */ jsx("p", { children: "Dans un repère orthonormé, on considère les points :" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "A ",
        formatPoint(A)
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "B ",
        formatPoint(B)
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "C ",
        formatPoint(C)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Le vecteur ",
      /* @__PURE__ */ jsxs("span", { className: "is-family-monospace", children: [
        "n⃗ ",
        formatPoint(n)
      ] }),
      " est-il normal au plan (ABC) ?"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "field is-grouped is-grouped-centered", children: [
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-success", onClick: () => handleValidate(true), children: "Oui" }) }),
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-danger", onClick: () => handleValidate(false), children: "Non" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "field is-grouped is-grouped-centered mt-4", children: /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: handleNewExercise, children: "Nouvel exercice" }) }) }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.correct ? "is-success" : "is-danger"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      feedback.message
    ] })
  ] });
}

const $$Ex3T = createComponent(($$result, $$props, $$slots) => {
  const title = "Exercice: Vecteur Normal \xE0 un Plan";
  const description = "D\xE9terminer si un vecteur donn\xE9 est normal \xE0 un plan d\xE9fini par trois points.";
  return renderTemplate`<html lang="fr" data-astro-cid-xjn33fws> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-xjn33fws": true })}${renderHead()}</head> <body data-astro-cid-xjn33fws> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-xjn33fws": true })} <main data-astro-cid-xjn33fws> <article data-astro-cid-xjn33fws> <div class="prose" data-astro-cid-xjn33fws> <div class="title" data-astro-cid-xjn33fws> <h1 data-astro-cid-xjn33fws>${title}</h1> </div> ${renderComponent($$result, "Ex_3_T", VectorNormalToPlaneCheck, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_3_T.tsx", "client:component-export": "default", "data-astro-cid-xjn33fws": true })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-xjn33fws": true })} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_3_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_3_T.astro";
const $$url = "/Germain/ex/ex_3_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex3T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
