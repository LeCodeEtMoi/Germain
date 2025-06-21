import React, { useState } from 'react';

const correctAnswer = "5";

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

export default function PythonThresholdAnalysis() {
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const options = [
        "4",
        "5",
        "6",
        "22.5"
    ];

    const handleValidate = () => {
        if (!userAnswer) {
            setFeedback("Veuillez sélectionner une réponse.");
            return;
        }

        if (userAnswer === correctAnswer) {
            setFeedback("🎉 Bravo Maître, c'est la bonne réponse ! Votre analyse est parfaite.");
        } else {
            let explanation = `❌ Oups, une erreur s'est glissée.`;
            explanation += `\n\n**La bonne réponse était :** ${correctAnswer}`;
            explanation += `\n\n**Explication du déroulement de l'algorithme :**\n`;
            explanation += `La boucle \`while\` s'exécute tant que \`u >= 25\`. On cherche le premier rang \`n\` pour lequel \`u < 25\`.\n`;
            explanation += `1. **Initialisation :** \`n = 0\`, \`u = 100\`.\n`;
            explanation += `2. **Tours de boucle :**\n`;
            explanation += `   - n=0, u=100. u >= 25. On entre. u devient 60, n devient 1.\n`;
            explanation += `   - n=1, u=60. u >= 25. On entre. u devient 40, n devient 2.\n`;
            explanation += `   - n=2, u=40. u >= 25. On entre. u devient 30, n devient 3.\n`;
            explanation += `   - n=3, u=30. u >= 25. On entre. u devient 25, n devient 4.\n`;
            explanation += `   - n=4, u=25. u >= 25. On entre. u devient 22.5, n devient 5.\n`;
            explanation += `   - n=5, u=22.5. La condition \`u >= 25\` est fausse. La boucle s'arrête.\n`;
            explanation += `3. **Retour :** La fonction retourne la valeur de \`n\`, qui est **5**.`;
            setFeedback(explanation);
        }
    };

    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <div className="box content">
                    <h2 className="title is-4">Algorithmique - Analyse de seuil</h2>
                    <p>
                        On considère la fonction Python suivante.
                    </p>
                    
                    <div style={codeBlockStyle}>
                        <div><span style={keywordStyle}>def</span> <span style={functionStyle}>seuil</span>():</div>
                        <div>{'  '}n = <span style={numberStyle}>0</span></div>
                        <div>{'  '}u = <span style={numberStyle}>100</span></div>
                        <div>{'  '}<span style={keywordStyle}>while</span> u &gt;= <span style={numberStyle}>25</span>:</div>
                        <div>{'    '}u = <span style={numberStyle}>0.5</span> * u + <span style={numberStyle}>10</span></div>
                        <div>{'    '}n = n + <span style={numberStyle}>1</span></div>
                        <div>{'  '}<span style={keywordStyle}>return</span> n</div>
                    </div>

                    <p className="mt-4">
                        Que retourne l'appel <code>seuil()</code> ?
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
