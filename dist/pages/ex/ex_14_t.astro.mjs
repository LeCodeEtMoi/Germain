import { a as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_os80pIPP.mjs';
import 'kleur/colors';
import { $ as $$Leon } from '../../chunks/Leçon_CL1x4UYk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useEffect, useState } from 'react';
import { M as MathTex } from '../../chunks/MathTex_DKnOgSOO.mjs';
import { MathfieldElement } from 'mathlive';
export { renderers } from '../../renderers.mjs';

const MathEditor = () => {
  const mathfieldRef = useRef(null);
  useEffect(() => {
    const mf = new MathfieldElement({
      virtualKeyboardMode: "manual",
      smartFence: true,
      smartMode: true
    });
    mf.className = "math-input";
    mf.value = "";
    mf.style.minWidth = "300px";
    mf.style.fontSize = "1.2rem";
    if (mathfieldRef.current) {
      mathfieldRef.current.replaceWith(mf);
    }
    mathfieldRef.current = mf;
  }, []);
  const handleInsertSymbol = (symbol, cursorPos) => {
    mathfieldRef.current?.focus();
    mathfieldRef.current?.insert(symbol);
    if (cursorPos) {
      mathfieldRef.current?.moveToOffset(cursorPos);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { ref: mathfieldRef }),
    /* @__PURE__ */ jsx(MathEditor, { onInsertSymbol: handleInsertSymbol })
  ] });
};

const correctLimit = "+∞";
function SequenceLimitCheck() {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);
  const handleInsertSymbol = (symbol, cursorPos) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart ?? 0;
      const end = inputRef.current.selectionEnd ?? 0;
      const text = inputRef.current.value;
      const selectedText = text.substring(start, end);
      let newSymbol = symbol;
      let finalCursorPos = start + symbol.length;
      if (selectedText) {
        if (symbol.includes("{}")) {
          newSymbol = symbol.replace("{}", `{${selectedText}}`);
        } else {
          newSymbol = symbol;
        }
        finalCursorPos = start + newSymbol.length;
      } else if (cursorPos !== void 0) {
        finalCursorPos = start + cursorPos;
      }
      const newText = text.substring(0, start) + newSymbol + text.substring(end);
      setUserAnswer(newText);
      inputRef.current.focus();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.selectionEnd = finalCursorPos;
        }
      }, 0);
    }
  };
  const handleValidate = () => {
    if (!userAnswer.trim()) {
      setFeedback("Veuillez entrer une réponse.");
      return;
    }
    if (userAnswer.trim() === correctLimit) {
      setFeedback("🎉 Bravo Maître, la réponse est correcte !");
    } else {
      let explanation = `❌ Oups, une erreur s'est glissée. La bonne réponse était : **${correctLimit}**.`;
      explanation += "\n\n**Explication :**\n";
      explanation += `La suite est définie par u_n = n^6 + n.\\n`;
      explanation += `Pour trouver la limite quand n tend vers +∞, on regarde le terme de plus haut degré, qui est n^6.\\n`;
      explanation += `lim (n→+∞) n^6 = +∞ et lim (n→+∞) n = +∞.\\n`;
      explanation += `La limite de la somme est donc +∞. C'est comme essayer d'attraper une prime qui file à la vitesse de la lumière, elle vous échappe toujours vers l'infini !`;
      setFeedback(explanation);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "columns is-centered", children: /* @__PURE__ */ jsx("div", { className: "column is-two-thirds", children: /* @__PURE__ */ jsxs("div", { className: "box content", children: [
    /* @__PURE__ */ jsx("h2", { className: "title is-4", children: "Limite d'une suite" }),
    /* @__PURE__ */ jsx("p", { children: "Déterminer la limite de la suite (u_n) définie pour tout entier positif ou nul n par :" }),
    /* @__PURE__ */ jsx("div", { className: "has-text-centered", children: /* @__PURE__ */ jsx(MathTex, { tex: `u_n = n^6 + n` }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-4", children: "La limite de la suite (u_n) est :" }),
    /* @__PURE__ */ jsxs("div", { className: "field", children: [
      /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx(MathEditor, { onInsertSymbol: handleInsertSymbol }) }),
      /* @__PURE__ */ jsx("div", { className: "control mt-2", children: /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          className: "input",
          type: "text",
          value: userAnswer,
          onChange: (e) => setUserAnswer(e.target.value),
          placeholder: "Entrez la limite (ex: +∞, -∞, 0...)"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "field is-grouped is-grouped-centered mt-4", children: /* @__PURE__ */ jsx("div", { className: "control", children: /* @__PURE__ */ jsx("button", { className: "button is-primary", onClick: handleValidate, children: "Valider" }) }) }),
    feedback && /* @__PURE__ */ jsxs("div", { className: `notification ${feedback.startsWith("🎉") ? "is-success" : "is-warning"} is-light mt-4`, children: [
      /* @__PURE__ */ jsx("button", { className: "delete", onClick: () => setFeedback(null) }),
      /* @__PURE__ */ jsx("div", { style: { whiteSpace: "pre-wrap" }, children: feedback })
    ] })
  ] }) }) });
}

const $$Ex14T = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LeconLayout", $$Leon, { "title": "Exercice 14T - Limite d'une suite" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "SequenceLimitCheck", SequenceLimitCheck, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/Spike/Documents/Projet Github/Germain/src/components/Ex_14_T.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_14_T.astro", void 0);

const $$file = "/home/Spike/Documents/Projet Github/Germain/src/pages/ex/ex_14_T.astro";
const $$url = "/Germain/ex/ex_14_T";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ex14T,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
