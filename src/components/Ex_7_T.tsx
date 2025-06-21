import React, { useState, useEffect } from "react";
import { generateRandomPoint, type Point3D } from "./RandomPoint3D";

// --- Vector Math Utilities ---
const subtract = (p1: Point3D, p2: Point3D): Point3D => ({ x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z });
const add = (p1: Point3D, p2: Point3D): Point3D => ({ x: p1.x + p2.x, y: p1.y + p2.y, z: p1.z + p2.z });
const scale = (v: Point3D, s: number): Point3D => ({ x: v.x * s, y: v.y * s, z: v.z * s });
const crossProduct = (v1: Point3D, v2: Point3D): Point3D => ({
  x: v1.y * v2.z - v1.z * v2.y,
  y: v1.z * v2.x - v1.x * v2.z,
  z: v1.x * v2.y - v1.y * v2.x,
});
const dotProduct = (v1: Point3D, v2: Point3D): number => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
const isZeroVector = (v: Point3D): boolean => v.x === 0 && v.y === 0 && v.z === 0;
const areCollinear = (v1: Point3D, v2: Point3D): boolean => isZeroVector(crossProduct(v1, v2));
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

type LineRelation = "confondues" | "parallèles" | "sécantes" | "non coplanaires";

// --- Exercise Data Generation ---
function generateExerciseData() {
  let A1: Point3D, u1: Point3D, A2: Point3D, u2: Point3D;
  let relation: LineRelation;
  let intersectionPoint: Point3D | null = null;

  const scenario = randomInt(1, 4);

  // Ensure direction vectors are not zero
  do { u1 = generateRandomPoint(-3, 3); } while (isZeroVector(u1));
  
  A1 = generateRandomPoint(-5, 5);

  switch (scenario) {
    case 1: // Sécantes (Intersecting)
      relation = "sécantes";
      do { u2 = generateRandomPoint(-3, 3); } while (isZeroVector(u2) || areCollinear(u1, u2));
      
      // Define an intersection point and construct lines passing through it
      intersectionPoint = generateRandomPoint(-5, 5);
      A1 = subtract(intersectionPoint, scale(u1, randomInt(-2, 2)));
      A2 = subtract(intersectionPoint, scale(u2, randomInt(-2, 2)));
      break;

    case 2: // Parallèles (Parallel)
      relation = "parallèles";
      u2 = scale(u1, randomInt(1, 2) * (Math.random() > 0.5 ? 1 : -1));
      // Ensure A2 is not on the first line
      do {
        A2 = generateRandomPoint(-5, 5);
      } while (areCollinear(subtract(A2, A1), u1));
      break;

    case 3: // Non coplanaires (Skew)
      relation = "non coplanaires";
      do { u2 = generateRandomPoint(-3, 3); } while (isZeroVector(u2) || areCollinear(u1, u2));

      // Ensure lines are not coplanar
      do {
        A2 = generateRandomPoint(-5, 5);
      } while (Math.abs(dotProduct(subtract(A2, A1), crossProduct(u1, u2))) < 1e-9);
      break;

    case 4: // Confondues (Confounded)
    default:
      relation = "confondues";
      u2 = scale(u1, randomInt(1, 2) * (Math.random() > 0.5 ? 1 : -1));
      // A2 is a point on the first line
      A2 = add(A1, scale(u1, randomInt(-3, 3)));
      break;
  }

  return { A1, u1, A2, u2, relation, intersectionPoint };
}

// --- React Component ---
export default function LineRelationshipCheck() {
    const [data, setData] = useState(generateExerciseData());
    const [userAnswer, setUserAnswer] = useState<LineRelation | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [intersectionInput, setIntersectionInput] = useState({ x: '', y: '', z: '' });
    
    const handleNewExercise = () => {
        setData(generateExerciseData());
        setUserAnswer(null);
        setFeedback(null);
        setIntersectionInput({ x: '', y: '', z: '' });
    };

    const handleValidate = () => {
        if (userAnswer === null) {
            setFeedback("Veuillez sélectionner une réponse.");
            return;
        }
        if (userAnswer === data.relation) {
            if (data.relation === 'sécantes') {
                const p = data.intersectionPoint;
                if (!p) {
                     setFeedback("Erreur: Le point d'intersection n'a pas été calculé.");
                     return;
                }

                const userX = parseFloat(intersectionInput.x.replace(',', '.'));
                const userY = parseFloat(intersectionInput.y.replace(',', '.'));
                const userZ = parseFloat(intersectionInput.z.replace(',', '.'));

                if (isNaN(userX) || isNaN(userY) || isNaN(userZ)) {
                    setFeedback("Veuillez entrer des coordonnées numériques valides pour le point d'intersection.");
                    return;
                }

                if (Math.abs(userX - p.x) < 1e-9 && Math.abs(userY - p.y) < 1e-9 && Math.abs(userZ - p.z) < 1e-9) {
                    setFeedback(`🎉 Bravo Maître, la réponse est correcte ! Le point d'intersection est bien (${p.x}; ${p.y}; ${p.z}).`);
                } else {
                    setFeedback(`❌ La position est correcte, mais les coordonnées du point d'intersection sont fausses. La bonne réponse était (${p.x}; ${p.y}; ${p.z}).`);
                }

            } else {
                setFeedback("🎉 Bravo Maître, la réponse est correcte !");
            }
        } else {
            const { A1, u1, A2, u2, relation, intersectionPoint } = data;
            const A1A2 = subtract(A2, A1);
            const u1_x_u2 = crossProduct(u1, u2);
            const collinear = areCollinear(u1, u2);
            
            let explanation = `❌ Oups, une erreur s'est glissée. La bonne réponse était : **${relation}**.`;
            explanation += "\n\n**Explication :**\n";
            explanation += `1. On compare les vecteurs directeurs u1(${u1.x}; ${u1.y}; ${u1.z}) et u2(${u2.x}; ${u2.y}; ${u2.z}).\n`;
            
            if (collinear) {
                explanation += "Le produit vectoriel u1 x u2 est le vecteur nul, donc les vecteurs sont colinéaires. Les droites sont parallèles ou confondues.\n";
                explanation += `2. On vérifie si le point A1(${A1.x}; ${A1.y}; ${A1.z}) de (d1) appartient à (d2).\n`;
                const A1A2_collinear_u2 = areCollinear(A1A2, u2);
                if (A1A2_collinear_u2) {
                    explanation += "Le vecteur A1A2 est colinéaire à u2, donc A1 est sur (d2). Les droites sont **confondues**.";
                } else {
                    explanation += "Le vecteur A1A2 n'est pas colinéaire à u2, donc A1 n'est pas sur (d2). Les droites sont **strictement parallèles**.";
                }
            } else {
                explanation += "Les vecteurs directeurs ne sont pas colinéaires. Les droites sont sécantes ou non coplanaires.\n";
                explanation += "2. On calcule le produit mixte (A1A2 . (u1 x u2)).\n";
                const mixedProduct = dotProduct(A1A2, u1_x_u2);
                if (Math.abs(mixedProduct) < 1e-9) {
                    explanation += `Le produit mixte est nul. Les droites sont coplanaires, donc **sécantes**.`;
                    if (intersectionPoint) {
                        const p = intersectionPoint;
                        explanation += ` Le point d'intersection est (${p.x}; ${p.y}; ${p.z}).`;
                    }
                } else {
                    explanation += `Le produit mixte est non nul (${mixedProduct.toFixed(2)}). Les droites sont **non coplanaires**.`;
                }
            }
            setFeedback(explanation);
        }
    };

    const formatParametric = (A: Point3D, V: Point3D, param: string): React.ReactNode => {
        const formatVal = (val: number, sign: boolean = false) => {
            if (val === 0) return "";
            const signStr = val > 0 ? "+" : "-";
            const absVal = Math.abs(val);
            if (absVal === 1) return `${sign ? signStr : (val > 0 ? "" : "-")}${param}`;
            return `${sign ? signStr : (val > 0 ? "" : "-")}${absVal}${param}`;
        }
        return (
            <pre className="is-family-monospace has-background-light p-3">
                {`{\n  x = ${A.x} ${formatVal(V.x, true)}\n  y = ${A.y} ${formatVal(V.y, true)}\n  z = ${A.z} ${formatVal(V.z, true)}\n(${param} ∈ ℝ)`}
            </pre>
        );
    };

    const { A1, u1, A2, u2 } = data;
    const options: LineRelation[] = ["confondues", "parallèles", "sécantes", "non coplanaires"];

    return (
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                <div className="box content">
            <h2 className="title is-4">Position relative de deux droites</h2>
            <p>On considère les droites (d1) et (d2) de représentations paramétriques :</p>
            <div>
                <div>
                    <strong>(d1)</strong>
                    {formatParametric(A1, u1, 'r')}
                </div>
                <div className="mt-4">
                    <strong>(d2)</strong>
                    {formatParametric(A2, u2, 's')}
                </div>
            </div>
            <p>Les droites (d1) et (d2) sont :</p>
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
                        {` ${option.charAt(0).toUpperCase() + option.slice(1)}`}
                    </label>
                ))}
            </div>
            {userAnswer === 'sécantes' && (
                <div className="field mt-4">
                    <label className="label">Point d'intersection (x; y; z)</label>
                    <div className="field is-grouped">
                        <div className="control">
                            <input 
                                className="input"
                                type="text" 
                                placeholder="x"
                                value={intersectionInput.x}
                                onChange={e => setIntersectionInput({...intersectionInput, x: e.target.value})}
                            />
                        </div>
                        <div className="control">
                            <input 
                                className="input"
                                type="text" 
                                placeholder="y"
                                value={intersectionInput.y}
                                onChange={e => setIntersectionInput({...intersectionInput, y: e.target.value})}
                            />
                        </div>
                        <div className="control">
                            <input 
                                className="input"
                                type="text" 
                                placeholder="z"
                                value={intersectionInput.z}
                                onChange={e => setIntersectionInput({...intersectionInput, z: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="field is-grouped is-grouped-centered mt-4">
                <div className="control">
                    <button className="button is-primary" onClick={handleValidate}>Valider</button>
                </div>
                <div className="control">
                    <button className="button is-light" onClick={handleNewExercise}>Nouvel exercice</button>
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