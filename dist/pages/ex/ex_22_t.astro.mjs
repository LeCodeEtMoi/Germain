import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

const angleValues = [
  { x: "0", sin: "0", cos: "1" },
  { x: "π/6", sin: "1/2", cos: "√3/2" },
  { x: "π/4", sin: "√2/2", cos: "√2/2" },
  { x: "π/3", sin: "√3/2", cos: "1/2" },
  { x: "π/2", sin: "1", cos: "0" },
  { x: "π", sin: "0", cos: "-1" }
];
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function TrigTableExercise() {
  const [rows, setRows] = useState(shuffleArray(angleValues));
  const [inputs, setInputs] = useState(
    Object.fromEntries(rows.map((_, i) => [i, { sin: "", cos: "" }]))
  );
  const [feedback, setFeedback] = useState(null);
  const [showCorrection, setShowCorrection] = useState(false);
  function handleChange(rowIndex, field, value) {
    setInputs((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [field]: value
      }
    }));
  }
  function handleCheck() {
    let allCorrect = true;
    rows.forEach((row, i) => {
      const sinCorrect = inputs[i]?.sin.replace(/\s/g, "") === row.sin.replace(/\s/g, "");
      const cosCorrect = inputs[i]?.cos.replace(/\s/g, "") === row.cos.replace(/\s/g, "");
      if (!sinCorrect || !cosCorrect) allCorrect = false;
    });
    setFeedback(
      allCorrect ? "🎉 Bravo, toutes les valeurs sont correctes !" : "❌ Certaines valeurs sont incorrectes. Réessayez ou affichez la correction."
    );
  }
  function handleNewExercise() {
    const newRows = shuffleArray(angleValues);
    setRows(newRows);
    setInputs(Object.fromEntries(newRows.map((_, i) => [i, { sin: "", cos: "" }])));
    setFeedback(null);
    setShowCorrection(false);
  }
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered mt-6", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Tableau des Valeurs Remarquables (sin et cos)" }),
    /* @__PURE__ */ jsx("p", { children: "Complétez les valeurs de sin(x) et cos(x) pour les valeurs remarquables de x :" }),
    /* @__PURE__ */ jsxs("table", { className: "table is-bordered is-striped is-fullwidth has-text-centered mt-4", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "x" }),
        /* @__PURE__ */ jsx("th", { children: "sin(x)" }),
        /* @__PURE__ */ jsx("th", { children: "cos(x)" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: rows.map((row, i) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: row.x }),
        /* @__PURE__ */ jsx("td", { children: showCorrection ? /* @__PURE__ */ jsx("strong", { children: row.sin }) : /* @__PURE__ */ jsx(
          "input",
          {
            className: "input is-small",
            value: inputs[i]?.sin || "",
            onChange: (e) => handleChange(i, "sin", e.target.value),
            placeholder: "Ex: 1/2"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: showCorrection ? /* @__PURE__ */ jsx("strong", { children: row.cos }) : /* @__PURE__ */ jsx(
          "input",
          {
            className: "input is-small",
            value: inputs[i]?.cos || "",
            onChange: (e) => handleChange(i, "cos", e.target.value),
            placeholder: "Ex: √3/2"
          }
        ) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons is-centered mt-4", children: [
      !showCorrection && /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleCheck, children: "Vérifier mes réponses" }),
      !showCorrection && /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: () => setShowCorrection(true), children: "Afficher la correction" }),
      /* @__PURE__ */ jsx("button", { className: "button is-link is-light", onClick: handleNewExercise, children: "Nouvel exercice" })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: `notification mt-4 ${feedback.includes("❌") ? "is-danger" : "is-success"}`, children: feedback })
  ] }) }) });
}

const $$Ex22T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": " Continuit\xE9 et d\xE9rivabilit\xE9 en un point" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", TrigTableExercise, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_22_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_22_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_22_T.astro";
const $$url = "/Germain/ex/ex_22_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex22T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
