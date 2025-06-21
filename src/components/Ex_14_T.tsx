import React, { useState, useRef } from 'react';
import MathTex from './MathTex';
import MathToolbar from './MathToolbar';

type Limit = "+∞" | "-∞" | "0" | "pas_de_limite";

const correctLimit: Limit = "+∞";

export default function SequenceLimitCheck() {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInsertSymbol = (symbol: string, cursorPos?: number) => {
        if (inputRef.current) {
            const start = inputRef.current.selectionStart ?? 0;
            const end = inputRef.current.selectionEnd ?? 0;
            const text = inputRef.current.value;
            const selectedText = text.substring(start, end);

            let newSymbol = symbol;
            let finalCursorPos = start + symbol.length;

            if (selectedText) {
                // Wrap selected text with the structure
                if (symbol.includes('{}')) {
                    newSymbol = symbol.replace('{}', `{${selectedText}}`);
                } else {
                    newSymbol = symbol;
                }
                finalCursorPos = start + newSymbol.length;
            } else if (cursorPos !== undefined) {
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

    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <div className="box content">
                    <h2 className="title is-4">Limite d'une suite</h2>
                    <p>Déterminer la limite de la suite (u_n) définie pour tout entier positif ou nul n par :</p>
                    <div className="has-text-centered">
                        <MathTex tex={`u_n = n^6 + n`} />
                    </div>
                    <p className="mt-4">La limite de la suite (u_n) est :</p>
                    <div className="field">
                        <div className="control">
                            <MathToolbar onInsertSymbol={handleInsertSymbol} />
                        </div>
                        <div className="control mt-2">
                            <input
                                ref={inputRef}
                                className="input"
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Entrez la limite (ex: +∞, -∞, 0...)"
                            />
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-centered mt-4">
                        <div className="control">
                            <button className="button is-primary" onClick={handleValidate}>Valider</button>
                        </div>
                    </div>
                    {feedback && (
                        <div className={`notification ${feedback.startsWith('🎉') ? 'is-success' : 'is-warning'} is-light mt-4`}>
                            <button className="delete" onClick={() => setFeedback(null)}></button>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{feedback}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
