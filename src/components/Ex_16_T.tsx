import React, { useState } from 'react';

const correctAnswer = "[5, 7, 11, 19]";

const codeBlockStyle: React.CSSProperties = {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    padding: '1rem',
    borderRadius: '5px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap'
};

const keywordStyle = { color: '#c678dd' };
const functionStyle = { color: '#61afef' };
const numberStyle = { color: '#d19a66' };

export default function PythonAlgorithmAnalysis() {
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const options = [
        "[5, 7, 11, 19]",
        "[5, 7, 11]",
        "[7, 11, 19]",
        "19"
    ];

    const handleValidate = () => {
        if (!userAnswer) {
            setFeedback("Veuillez sélectionner une réponse.");
            return;
        }

        if (userAnswer === correctAnswer) {
            setFeedback("🎉 Bravo Maître, c'est la bonne réponse ! Vous avez bien analysé l'algorithme.");
        } else {
            let explanation = `❌ Oups, ce n'est pas tout à fait ça.`;
            explanation += `\n\n**La bonne réponse était :** ${correctAnswer}`;
            explanation += `\n\n**Explication du déroulement de l'algorithme pour \`liste_termes(3)\` :**\n`;
            explanation += `1. **Initialisation :** \`L = []\`, \`u = 5\`.\n`;
            explanation += `2. **Boucle \`for i in range(4)\` (car n+1 = 4) :**\n`;
            explanation += `   - **i = 0 :** \`L.append(5)\` -> \`L\` devient \`[5]\`. \`u\` devient \`2*5 - 3 = 7\`.\n`;
            explanation += `   - **i = 1 :** \`L.append(7)\` -> \`L\` devient \`[5, 7]\`. \`u\` devient \`2*7 - 3 = 11\`.\n`;
            explanation += `   - **i = 2 :** \`L.append(11)\` -> \`L\` devient \`[5, 7, 11]\`. \`u\` devient \`2*11 - 3 = 19\`.\n`;
            explanation += `   - **i = 3 :** \`L.append(19)\` -> \`L\` devient \`[5, 7, 11, 19]\`. \`u\` devient \`2*19 - 3 = 35\`.\n`;
            explanation += `3. **Fin de la boucle.**\n`;
            explanation += `4. **Retour :** La fonction retourne la liste \`L\`, qui est \`[5, 7, 11, 19]\`.`;
            setFeedback(explanation);
        }
    };

    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <div className="box content">
                    <h2 className="title is-4">Algorithmique - Analyse de fonction</h2>
                    <p>
                        On considère la fonction Python suivante, qui prend un entier <code>n</code> en paramètre.
                    </p>
                    
                    <div style={codeBlockStyle}>
                        <div><span style={keywordStyle}>def</span> <span style={functionStyle}>liste_termes</span>(n):</div>
                        <div>{'  '}L = []</div>
                        <div>{'  '}u = <span style={numberStyle}>5</span></div>
                        <div>{'  '}<span style={keywordStyle}>for</span> i <span style={keywordStyle}>in</span> <span style={functionStyle}>range</span>(n + <span style={numberStyle}>1</span>):</div>
                        <div>{'    '}L.append(u)</div>
                        <div>{'    '}u = <span style={numberStyle}>2</span> * u - <span style={numberStyle}>3</span></div>
                        <div>{'  '}<span style={keywordStyle}>return</span> L</div>
                    </div>

                    <p className="mt-4">
                        Que retourne l'appel <code>liste_termes(3)</code> ?
                    </p>

                    <div className="control">
                        {options.map(option => (
                            <label className="radio" key={option}>
                                <input
                                    type="radio"
                                    name="analysis"
                                    value={option}
                                    checked={userAnswer === option}
                                    onChange={() => setUserAnswer(option)}
                                />
                                {` ${option}`}
                            </label>
                        ))}
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
