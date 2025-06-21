import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import MathTex from './MathTex';

const correctAnswer = "u <= A";

const codeBlockStyle: React.CSSProperties = {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    padding: '1rem',
    borderRadius: '5px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap'
};

const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #61afef',
    color: '#98c379',
    width: '100px',
    margin: '0 5px',
    fontFamily: 'monospace'
};

const keywordStyle = { color: '#c678dd' };
const functionStyle = { color: '#61afef' };
const numberStyle = { color: '#d19a66' };

export default function PythonScriptCompletion() {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleValidate = () => {
        const normalizedAnswer = userAnswer.replace(/\s+/g, ' ').trim();
        const normalizedCorrectAnswer = correctAnswer.replace(/\s+/g, ' ').trim();

        if (!normalizedAnswer) {
            setFeedback("Veuillez entrer une réponse.");
            return;
        }

        if (normalizedAnswer === normalizedCorrectAnswer) {
            setFeedback("🎉 Bravo Maître, c'est la bonne condition ! Le script est maintenant correct.");
        } else {
            let explanation = "❌ Oups, ce n'est pas tout à fait ça.";
            explanation += "\n\n**La bonne réponse était :** `u <= A`";
            explanation += "\n\n**Explication :**\n";
            explanation += "L'objectif est de trouver le premier rang 'n' pour lequel u_n dépasse A.";
            explanation += "La boucle `while` doit donc continuer **tant que** la condition n'est pas remplie, c'est-à-dire tant que `u` est inférieur ou égal à `A`.";
            explanation += "Dès que `u` devient strictement supérieur à `A`, la boucle s'arrête et la fonction retourne la bonne valeur de 'n'.";
            setFeedback(explanation);
        }
    };

    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <div className="box content">
                    <h2 className="title is-4">Algorithmique - Calcul de seuil</h2>
                    <p>
                        On s'intéresse à la suite <MathTex tex="(u_n)" /> définie par <MathTex tex="u_0 = 2000" /> et pour tout entier naturel <MathTex tex="n" />, <MathTex tex="u_{n+1} = 1.02 * u_n" />.
                    </p>
                    <p>
                        On souhaite déterminer le plus petit entier naturel <MathTex tex="n" /> tel que <MathTex tex="u_n > 4000" />.
                        Complétez la condition de la boucle <code>while</code> dans la fonction Python ci-dessous pour qu'elle retourne la valeur de <MathTex tex="n" /> recherchée.
                    </p>
                    
                    <div style={codeBlockStyle}>
                        <div><span style={keywordStyle}>def</span> <span style={functionStyle}>seuil</span>(A):</div>
                        <div>{'  '}n = <span style={numberStyle}>0</span></div>
                        <div>{'  '}u = <span style={numberStyle}>2000</span></div>
                        <div>
                            {'  '}<span style={keywordStyle}>while</span>
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="u &lt;= A"
                                style={inputStyle}
                            />:
                        </div>
                        <div>{'    '}u = u * <span style={numberStyle}>1.02</span></div>
                        <div>{'    '}n = n + <span style={numberStyle}>1</span></div>
                        <div>{'  '}<span style={keywordStyle}>return</span> n</div>
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
