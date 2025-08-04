import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
export { renderers } from '../../renderers.mjs';

function generateSample(n, mean, stdDev) {
  const sample = [];
  for (let i = 0; i < n; i++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const value = mean + stdDev * z;
    sample.push(Number(value.toFixed(2)));
  }
  return sample;
}
function computeMeans(sample) {
  const result = [];
  let sum = 0;
  for (let k = 1; k <= sample.length; k++) {
    sum += sample[k - 1];
    result.push({ k, Mk: Number((sum / k).toFixed(2)) });
  }
  return result;
}
function LawOfLargeNumbers() {
  const [mean] = useState(Math.floor(Math.random() * 10 + 5));
  const [stdDev] = useState(Math.floor(Math.random() * 3 + 1));
  const [n] = useState(Math.floor(Math.random() * 21 + 30));
  const [sample, setSample] = useState([]);
  const [data, setData] = useState([]);
  const [userEstimate, setUserEstimate] = useState("");
  const [feedback, setFeedback] = useState(null);
  useEffect(() => {
    const s = generateSample(n, mean, stdDev);
    setSample(s);
    setData(computeMeans(s));
  }, [n, mean, stdDev]);
  const checkAnswer = () => {
    const parsed = parseFloat(userEstimate);
    if (isNaN(parsed)) {
      setFeedback("Veuillez entrer un nombre réel, Maître.");
      return;
    }
    if (data.length === 0) {
      setFeedback("Erreur : données non prêtes, veuillez réessayer.");
      return;
    }
    data[data.length - 1].Mk;
    const error = Math.abs(parsed - mean);
    if (error < 0.5) {
      setFeedback(`✅ Excellente estimation, Maître ! L’espérance réelle est ${mean}.`);
    } else {
      setFeedback(`❌ Ce n’est pas exact, Maître. L’espérance est ${mean}, vous avez proposé ${parsed}.`);
    }
  };
  const newExercise = () => {
    window.location.reload();
  };
  return /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Loi des grands nombres" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On considère un échantillon de ",
      /* @__PURE__ */ jsx("strong", { children: n }),
      " variables aléatoires indépendantes de même espérance ",
      /* @__PURE__ */ jsx("strong", { children: "µ" }),
      ". Leur écart-type est σ = ",
      /* @__PURE__ */ jsx("strong", { children: stdDev }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "On note M",
      /* @__PURE__ */ jsx("sub", { children: "k" }),
      " = (X₁ + ... + X",
      /* @__PURE__ */ jsx("sub", { children: "k" }),
      ") / k. Voici son évolution :"
    ] }),
    data.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(LineChart, { data, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { stroke: "#ccc" }),
      /* @__PURE__ */ jsx(XAxis, { dataKey: "k" }),
      /* @__PURE__ */ jsx(YAxis, { domain: ["auto", "auto"] }),
      /* @__PURE__ */ jsx(Tooltip, {}),
      /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "Mk", stroke: "#3273dc", dot: false })
    ] }) }) : /* @__PURE__ */ jsx("p", { children: "Chargement du graphique…" }),
    /* @__PURE__ */ jsxs("div", { className: "field mt-4", children: [
      /* @__PURE__ */ jsx("label", { className: "label", children: "Votre estimation de µ :" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          className: "input",
          value: userEstimate,
          onChange: (e) => setUserEstimate(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "buttons mt-3", children: [
      /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: checkAnswer, children: "Valider" }),
      /* @__PURE__ */ jsx("button", { className: "button is-light", onClick: newExercise, children: "Nouvel exercice" })
    ] }),
    feedback && /* @__PURE__ */ jsx("div", { className: "notification is-info mt-4", children: feedback }),
    data.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "title is-5", children: "Correction" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "L’espérance réelle µ = ",
        /* @__PURE__ */ jsx("strong", { children: mean }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "La moyenne empirique M",
        /* @__PURE__ */ jsx("sub", { children: "n" }),
        " ≈ ",
        /* @__PURE__ */ jsx("strong", { children: data[data.length - 1].Mk }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "La loi des grands nombres assure que M",
        /* @__PURE__ */ jsx("sub", { children: "n" }),
        " converge vers µ quand n devient grand."
      ] })
    ] })
  ] });
}

const $$Ex44T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Reconnaissance d'une fonction usuelle" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "PythonThresholdAnalysis", LawOfLargeNumbers, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_44_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_44_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_44_T.astro";
const $$url = "/Germain/ex/ex_44_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex44T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
