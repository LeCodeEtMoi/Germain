import React, { useState } from 'react';

type Relation = "confondus" | "perpendiculaires" | "non_perpendiculaires" | "parallèles";

// Correct answer for the given planes
const correctRelation: Relation = "non_perpendiculaires";

export default function StaticPlanePlaneCheck() {
    const [userAnswer, setUserAnswer] = useState<Relation | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleValidate = () => {
        if (!userAnswer) {
            setFeedback("Veuillez sélectionner une réponse.");
            return;
        }

        if (userAnswer === correctRelation) {
            setFeedback("🎉 Bravo Maître, la réponse est correcte !");
        } else {
            let explanation = `❌ Oups, une erreur s'est glissée. La bonne réponse était : **sécants et non perpendiculaires**.`;
            explanation += "\n\n**Explication :**\n";
            explanation += `1. On identifie les vecteurs normaux des plans (P1) et (P2).\
`;
            explanation += `   - Pour (P1) : **n1(1; -2; 1)**\
`;
            explanation += `   - Pour (P2) : **n2(2; 1; 1)**\
`;
            explanation += `2. On vérifie si les vecteurs normaux sont colinéaires. Les coordonnées ne sont pas proportionnelles (2/1 ≠ 1/-2). Les vecteurs ne sont donc pas colinéaires, ce qui signifie que les plans ne sont **ni parallèles, ni confondus**. Ils sont donc **sécants**.\
`;
            explanation += `3. On vérifie si les plans sont perpendiculaires en calculant le produit scalaire des vecteurs normaux :\
`;
            explanation += `   n1 · n2 = (1)(2) + (-2)(1) + (1)(1) = 2 - 2 + 1 = 1.\
`;
            explanation += `Comme le produit scalaire est différent de 0, les plans ne sont pas perpendiculaires.\
`;
            explanation += `Conclusion : Les plans sont **sécants et non perpendiculaires**.`;
            setFeedback(explanation);
        }
    };

    const options: { id: Relation, text: string }[] = [
        { id: "confondus", text: "confondus." },
        { id: "perpendiculaires", text: "sécants et perpendiculaires." },
        { id: "non_perpendiculaires", text: "sécants et non perpendiculaires." },
        { id: "parallèles", text: "strictement parallèles." },
    ];

    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <div className="box content">
                    <h2 className="title is-4">Position relative de deux plans (Exercice Fixe)</h2>
                    <p>On se place dans l'espace muni d'un repère orthonormé (O; ı⃗; ȷ⃗; k⃗).</p>
                    <p>On considère le plan (P1) d'équation cartésienne :</p>
                    <p className="is-family-monospace has-background-light p-3">x − 2y + z + 1 = 0</p>
                    <p>Ainsi que le plan (P2) d'équation cartésienne :</p>
                    <p className="is-family-monospace has-background-light p-3">2x + y + z − 6 = 0</p>
                    <p>Les plans (P1) et (P2) sont :</p>
                    <div className="control">
                        {options.map(option => (
                            <label className="radio" key={option.id}>
                                <input
                                    type="radio"
                                    name="relation"
                                    value={option.id}
                                    checked={userAnswer === option.id}
                                    onChange={() => setUserAnswer(option.id)}
                                />
                                {` ${option.text}`}
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
