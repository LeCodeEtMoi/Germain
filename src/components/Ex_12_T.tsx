import React, { useState } from 'react';

type Relation = "incluse" | "parallèle" | "orthogonale" | "sécante";

const correctRelation: Relation = "incluse";

export default function StaticLinePlaneCheck() {
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
            let explanation = `❌ Oups, une erreur s'est glissée. La bonne réponse était : **${correctRelation}**.`;
            explanation += "\n\n**Explication :**\n";
            explanation += `1. On identifie le vecteur normal du plan (P), **n(2; -1; 1)**, et le vecteur directeur de la droite (Δ), **u(1; 1; -1)**.\n`;
            explanation += `2. On calcule le produit scalaire : n · u = (2)(1) + (-1)(1) + (1)(-1) = 2 - 1 - 1 = 0.`;
            explanation += `\nComme le produit scalaire est nul, la droite est soit parallèle au plan, soit incluse dans le plan.\n`;
            explanation += `3. On vérifie si un point de la droite (Δ) appartient au plan (P). Prenons le point **A(2; 4; 1)** (obtenu avec u=0).\n`;
            explanation += `On remplace ses coordonnées dans l'équation du plan : 2(2) - 4 + 1 - 1 = 4 - 4 + 0 = 0.`;
            explanation += `\nLe point A appartient au plan (P). La droite est donc **incluse** dans le plan.`;
            setFeedback(explanation);
        }
    };

    const options: Relation[] = ["parallèle", "orthogonale", "incluse", "sécante"];

    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <div className="box content">
                    <h2 className="title is-4">Position relative d'une droite et d'un plan (Exercice Fixe)</h2>
                    <p>On se place dans l'espace muni d'un repère orthonormé (O; ı⃗; ȷ⃗; k⃗).</p>
                    <p>On considère le plan (P) d'équation cartésienne :</p>
                    <p className="is-family-monospace has-background-light p-3">2x − y + z − 1 = 0</p>
                    <p>Et la droite (Δ) de représentation paramétrique :</p>
                    <pre className="is-family-monospace has-background-light p-3">
                        {`{\n  x = 2 + u\n  y = 4 + u\n  z = 1 - u\n(u ∈ ℝ)`}
                    </pre>
                    <p>La droite (Δ) est :</p>
                    <div className="control">
                        {options.map(option => (
                            <label className="radio" key={option}>
                                <input
                                    type="radio"
                                    name="relation"
                                    value={option}
                                    checked={userAnswer === option}
                                    onChange={() => setUserAnswer(option)}
                                />
                                {(() => {
                                    switch (option) {
                                        case 'parallèle': return ' Strictement parallèle au plan (P)';
                                        case 'orthogonale': return ' Orthogonale au plan (P)';
                                        case 'incluse': return ' Incluse dans le plan (P)';
                                        case 'sécante': return ' Sécante et non orthogonale au plan (P)';
                                        default: return '';
                                    }
                                })()}
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
