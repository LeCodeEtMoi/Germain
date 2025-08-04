import { a as createComponent, r as renderComponent, b as renderHead, e as renderTemplate } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as generateRandomPoint } from '../../chunks/RandomPoint3D_Bo-jDIuJ.mjs';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../../chunks/Footer_DY7a91H-.mjs';
export { renderers } from '../../renderers.mjs';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
function generateExerciseData() {
  const linePointA = generateRandomPoint(-10, 10);
  let lineVectorU;
  do {
    lineVectorU = generateRandomPoint(-5, 5);
  } while (lineVectorU.x === 0 && lineVectorU.y === 0 && lineVectorU.z === 0);
  const shouldBeOnLine = Math.random() > 0.5;
  let pointM;
  let isPointOnLine;
  if (shouldBeOnLine) {
    const t = randomInt(-5, 5);
    pointM = {
      x: linePointA.x + lineVectorU.x * t,
      y: linePointA.y + lineVectorU.y * t,
      z: linePointA.z + lineVectorU.z * t
    };
    isPointOnLine = true;
  } else {
    const t = randomInt(-5, 5);
    pointM = {
      x: linePointA.x + lineVectorU.x * t,
      y: linePointA.y + lineVectorU.y * t,
      z: linePointA.z + lineVectorU.z * t
    };
    const coordToChange = ["x", "y", "z"][randomInt(0, 2)];
    pointM[coordToChange] += randomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
    isPointOnLine = false;
  }
  return { linePointA, lineVectorU, pointM, isPointOnLine };
}
function formatParametric(A, V) {
  const formatVal = (val, sign = false) => {
    if (val === 0) return "";
    const signStr = val > 0 ? "+" : "-";
    const absVal = Math.abs(val);
    if (absVal === 1) return `${sign ? signStr : val > 0 ? "" : "-"}t`;
    return `${sign ? signStr : val > 0 ? "" : "-"}${absVal}t`;
  };
  return /* @__PURE__ */ jsx("pre", { className: "is-family-monospace has-background-light p-3", children: `{
  x = ${A.x} ${formatVal(V.x, true)}
  y = ${A.y} ${formatVal(V.y, true)}
  z = ${A.z} ${formatVal(V.z, true)}
(t ∈ ℝ)` });
}
function PointOnLineCheck() {
  const [linePointA, setLinePointA] = useState({ x: 0, y: 0, z: 0 });
  const [lineVectorU, setLineVectorU] = useState({ x: 1, y: 1, z: 1 });
  const [pointM, setPointM] = useState({ x: 0, y: 0, z: 0 });
  const [isPointOnLine, setIsPointOnLine] = useState(false);
  const [feedback, setFeedback] = useState(null);
  function handleNewExercise() {
    const { linePointA: linePointA2, lineVectorU: lineVectorU2, pointM: pointM2, isPointOnLine: isPointOnLine2 } = generateExerciseData();
    setLinePointA(linePointA2);
    setLineVectorU(lineVectorU2);
    setPointM(pointM2);
    setIsPointOnLine(isPointOnLine2);
    setFeedback(null);
  }
  useEffect(() => {
    handleNewExercise();
  }, []);
  function getFeedbackMessage(correct) {
    if (correct) {
      return /* @__PURE__ */ jsx("p", { children: "🎉 Bravo Maître, la réponse est correcte !" });
    }
    const { x: xM, y: yM, z: zM } = pointM;
    const { x: xA, y: yA, z: zA } = linePointA;
    const { x: u, y: v, z: w } = lineVectorU;
    const steps = [];
    if (u !== 0) {
      const t = (xM - xA) / u;
      steps.push(/* @__PURE__ */ jsx("p", { children: `${xM} = ${xA} + ${u}t → ${u}t = ${xM - xA} → t = ${t.toFixed(2)}` }));
    } else {
      steps.push(/* @__PURE__ */ jsxs("p", { children: [
        "Pour x, on vérifie si ",
        xM,
        " = ",
        xA,
        ". C'est ",
        xM === xA ? "vrai" : "faux",
        "."
      ] }));
    }
    if (v !== 0) {
      const t = (yM - yA) / v;
      steps.push(/* @__PURE__ */ jsx("p", { children: `${yM} = ${yA} + ${v}t → ${v}t = ${yM - yA} → t = ${t.toFixed(2)}` }));
    } else {
      steps.push(/* @__PURE__ */ jsxs("p", { children: [
        "Pour y, on vérifie si ",
        yM,
        " = ",
        yA,
        ". C'est ",
        yM === yA ? "vrai" : "faux",
        "."
      ] }));
    }
    if (w !== 0) {
      const t = (zM - zA) / w;
      steps.push(/* @__PURE__ */ jsx("p", { children: `${zM} = ${zA} + ${w}t → ${w}t = ${zM - zA} → t = ${t.toFixed(2)}` }));
    } else {
      steps.push(/* @__PURE__ */ jsxs("p", { children: [
        "Pour z, on vérifie si ",
        zM,
        " = ",
        zA,
        ". C'est ",
        zM === zA ? "vrai" : "faux",
        "."
      ] }));
    }
    const conclusion = isPointOnLine ? "Le point est sur la droite mais vous avez répondu non." : "Le point n'est pas sur la droite mais vous avez répondu oui.";
    return /* @__PURE__ */ jsxs("div", { className: "content", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "❌ Oups, une erreur s'est glissée, Maître. ",
        conclusion
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Explication :" }) }),
      /* @__PURE__ */ jsx("p", { children: "On cherche s'il existe un réel 't' qui satisfait les trois équations simultanément :" }),
      steps,
      /* @__PURE__ */ jsx("p", { children: "Pour que le point appartienne à la droite, il faut trouver la même valeur de 't' pour chaque équation (ou que les coordonnées fixes correspondent)." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "La bonne réponse était : ",
        /* @__PURE__ */ jsx("strong", { children: isPointOnLine ? "Oui" : "Non" }),
        "."
      ] })
    ] });
  }
  function handleValidate(userAnswer) {
    if (userAnswer === isPointOnLine) {
      setFeedback({ correct: true, message: getFeedbackMessage(true) });
    } else {
      setFeedback({ correct: false, message: getFeedbackMessage(false) });
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Le point M appartient-il à la droite (Δ) ?" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Point M :" }),
        " (",
        `${pointM.x}; ${pointM.y}; ${pointM.z}`,
        ")"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Représentation paramétrique de (Δ) :" }),
        formatParametric(linePointA, lineVectorU)
      ] })
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
  ] }) }) });
}

const $$Ex6T = createComponent(($$result, $$props, $$slots) => {
  const title = "";
  const description = "Un exercice pour d\xE9terminer si un point de l'espace appartient \xE0 une droite d\xE9finie par une repr\xE9sentation param\xE9trique.";
  return renderTemplate`<html lang="fr"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <article> <div class="prose"> <div class="title"> <h1>${title}</h1> </div> ${renderComponent($$result, "Ex_6_T", PointOnLineCheck, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_6_T.tsx", "client:component-export": "default" })} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_6_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_6_T.astro";
const $$url = "/Germain/ex/ex_6_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex6T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
