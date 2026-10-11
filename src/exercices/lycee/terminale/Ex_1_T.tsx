import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

/**
 * Exercice : équation cartésienne d'un plan (un seul fichier pour tout l'exercice).
 *
 * Maths : le plan passant par A(xA ; yA ; zA) et de vecteur normal n(a ; b ; c)
 * est l'ensemble des points M tels que n · AM = 0, soit
 *     a(x − xA) + b(y − yA) + c(z − zA) = 0   ⇔   ax + by + cz + d = 0
 * avec d = −(a·xA + b·yA + c·zA).
 *
 * Une équation saisie (αx + βy + γz + δ = 0) décrit le même plan si et
 * seulement si (α, β, γ, δ) = k·(a, b, c, d) avec k ≠ 0. La correction teste
 * cette proportionnalité en nombres exacts (fractions) : toute équation
 * équivalente est donc acceptée (forme réduite, double, opposé, autre ordre
 * des termes, constante de l'autre côté du signe =, décimaux, fractions…).
 *
 * Le fichier a deux parties : 1) la logique mathématique, 2) l'affichage
 * (composant React). Le style est partagé par tous les exercices
 * (src/styles/exercice.css), importé dans la page .astro.
 */

/* ===== 1. Logique mathématique ===== */

type Coord = [number, number, number];
type Exercice = { A: Coord; V: Coord };
type Coefficients = { a: number; b: number; c: number; d: number };

type Verdict =
  | { type: 'correct'; identique: boolean }
  | { type: 'incompris'; raison: string }
  | { type: 'faux'; indice: 'degenere' | 'constante' | 'normal' };

/* ---------------------------------------------------------------
   Génération
--------------------------------------------------------------- */

const entierAleatoire = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const coordAleatoire = (): Coord => [entierAleatoire(-5, 5), entierAleatoire(-5, 5), entierAleatoire(-5, 5)];

function genererExercice(): Exercice {
  // Un vecteur normal ne peut pas être nul : on tire à nouveau dans ce cas
  let V: Coord;
  do {
    V = coordAleatoire();
  } while (V.every((v) => v === 0));
  return { A: coordAleatoire(), V };
}

function coefficients({ A, V }: Exercice): Coefficients {
  const [a, b, c] = V;
  const [x, y, z] = A;
  return { a, b, c, d: 0 - (a * x + b * y + c * z) }; // « 0 − » évite un -0
}

/** Écrit « 2x − 3y + z + 1 = 0 » (coefficients 1 omis, vrai signe moins). */
function formaterEquation({ a, b, c, d }: Coefficients): string {
  const termes: [number, string][] = [
    [a, 'x'],
    [b, 'y'],
    [c, 'z'],
    [d, ''],
  ];
  let texte = '';
  for (const [coef, variable] of termes) {
    if (coef === 0) continue;
    const abs = Math.abs(coef);
    const morceau = variable === '' ? `${abs}` : abs === 1 ? variable : `${abs}${variable}`;
    if (texte === '') texte = coef < 0 ? `\u2212${morceau}` : morceau;
    else texte += coef < 0 ? ` \u2212 ${morceau}` : ` + ${morceau}`;
  }
  return `${texte} = 0`;
}

/* ---------------------------------------------------------------
   Fractions exactes (BigInt) : pas d'erreur d'arrondi
--------------------------------------------------------------- */

type Frac = { n: bigint; d: bigint }; // d > 0

const frac = (n: bigint, d: bigint = 1n): Frac => (d < 0n ? { n: -n, d: -d } : { n, d });
const ZERO = frac(0n);
const UN = frac(1n);
const add = (p: Frac, q: Frac) => frac(p.n * q.d + q.n * p.d, p.d * q.d);
const sub = (p: Frac, q: Frac) => frac(p.n * q.d - q.n * p.d, p.d * q.d);
const mul = (p: Frac, q: Frac) => frac(p.n * q.n, p.d * q.d);
const neg = (p: Frac) => frac(-p.n, p.d);
const egal = (p: Frac, q: Frac) => p.n * q.d === q.n * p.d;
const estNul = (p: Frac) => p.n === 0n;

/* ---------------------------------------------------------------
   Lecture de l'équation saisie
--------------------------------------------------------------- */

type Forme = { x: Frac; y: Frac; z: Frac; c: Frac };

const NOMBRE_OU_FRACTION = String.raw`\d+(?:\.\d+)?(?:/\d+(?:\.\d+)?)?`;
// 3x · 3*x · 3 · x   (le nombre peut être décimal ou une fraction : 0.5x, 1/2x)
const TERME = new RegExp(
  String.raw`^(?:(${NOMBRE_OU_FRACTION})\*?([xyz])|(${NOMBRE_OU_FRACTION})|([xyz]))$`
);

const decimal = (texte: string): Frac => {
  const [entier, partieDecimale = ''] = texte.split('.');
  return frac(BigInt(entier + partieDecimale), 10n ** BigInt(partieDecimale.length));
};

const lireNombre = (texte: string): Frac | null => {
  const [haut, bas] = texte.split('/');
  const numerateur = decimal(haut);
  if (bas === undefined) return numerateur;
  const denominateur = decimal(bas);
  if (estNul(denominateur)) return null;
  return mul(numerateur, frac(denominateur.d, denominateur.n));
};

const normaliser = (texte: string) =>
  texte
    .toLowerCase()
    .replace(/[\u2212\u2013\u2014]/g, '-') // − – — → -
    .replace(/[\u00d7\u00b7\u22c5]/g, '*') // × · ⋅ → *
    .replace(/,/g, '.') // virgule décimale
    .replace(/\s+/g, '');

function analyserMembre(texte: string): Forme | null {
  if (texte === '') return null;
  const forme: Forme = { x: ZERO, y: ZERO, z: ZERO, c: ZERO };

  for (const brut of texte.split(/(?=[+-])/)) {
    const negatif = brut.startsWith('-');
    const correspondance = brut.replace(/^[+-]/, '').match(TERME);
    if (!correspondance) return null;

    const nombre = correspondance[1] ?? correspondance[3];
    const variable = (correspondance[2] ?? correspondance[4]) as 'x' | 'y' | 'z' | undefined;

    let valeur = nombre !== undefined ? lireNombre(nombre) : UN;
    if (valeur === null) return null;
    if (negatif) valeur = neg(valeur);

    const cle = variable ?? 'c';
    forme[cle] = add(forme[cle], valeur);
  }
  return forme;
}

/* ---------------------------------------------------------------
   Correction
--------------------------------------------------------------- */

const incompris = (raison: string): Verdict => ({ type: 'incompris', raison });

function verifier(exercice: Exercice, saisie: string): Verdict {
  const texte = normaliser(saisie);
  if (texte.length === 0) return incompris('Écris ton équation avant de valider.');
  if (texte.length > 200) return incompris('Ton équation est trop longue.');

  const membres = texte.split('=');
  if (membres.length === 1) return incompris('Il manque le signe « = » dans ton équation.');
  if (membres.length > 2) return incompris('Il y a plusieurs signes « = » dans ton équation.');

  const gauche = analyserMembre(membres[0]);
  const droite = analyserMembre(membres[1]);
  if (!gauche || !droite) {
    return incompris(
      "Je n'ai pas réussi à lire ton équation. Utilise seulement x, y, z, des nombres, + et − (par exemple 2x - 3y + z + 1 = 0)."
    );
  }

  // Tout passé à gauche : αx + βy + γz + δ = 0
  const [alpha, beta, gamma, delta] = [
    sub(gauche.x, droite.x),
    sub(gauche.y, droite.y),
    sub(gauche.z, droite.z),
    sub(gauche.c, droite.c),
  ];
  const saisi = [alpha, beta, gamma, delta];

  const { a, b, c, d } = coefficients(exercice);
  const attendu = [a, b, c, d].map((v) => frac(BigInt(v)));

  // Ce n'est pas une équation de plan si x, y et z disparaissent (ex. « 0 = 0 »)
  if ([alpha, beta, gamma].every(estNul)) return { type: 'faux', indice: 'degenere' };

  // (α, β, γ, δ) = k·(a, b, c, d) avec k ≠ 0 ?
  const i = [a, b, c].findIndex((v) => v !== 0); // existe : le vecteur normal n'est pas nul
  if (!estNul(saisi[i])) {
    const proportionnel = saisi.every((valeur, j) => egal(mul(valeur, attendu[i]), mul(saisi[i], attendu[j])));
    if (proportionnel) {
      return { type: 'correct', identique: saisi.every((valeur, j) => egal(valeur, attendu[j])) };
    }
  }

  // Faux : on cherche à orienter l'élève
  const [fa, fb, fc] = attendu;
  const colineaire =
    estNul(sub(mul(beta, fc), mul(gamma, fb))) &&
    estNul(sub(mul(gamma, fa), mul(alpha, fc))) &&
    estNul(sub(mul(alpha, fb), mul(beta, fa)));

  return { type: 'faux', indice: colineaire ? 'constante' : 'normal' };
}

/* ===== 2. Affichage ===== */

const MOINS = '\u2212';
const nombre = (n: number) => (n < 0 ? `${MOINS}${-n}` : `${n}`);
const entreParentheses = (n: number) => (n < 0 ? `(${MOINS}${-n})` : `${n}`);
const triplet = (v: Coord) => `(${v.map(nombre).join(' ; ')})`;

export default function EquationCartesienne() {
  const [exercice, setExercice] = useState<Exercice | null>(null);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const champ = useRef<HTMLInputElement>(null);
  const idChamp = useId();

  // Le tirage se fait dans le navigateur, après l'affichage : si le serveur et le
  // navigateur tiraient chacun leurs nombres, l'énoncé affiché ne serait pas
  // celui que la correction utilise.
  useEffect(() => {
    setExercice(genererExercice());
  }, []);

  if (!exercice) {
    return (
      <div className="exercice" aria-busy="true">
        <p className="exercice-chargement">Chargement de l'exercice…</p>
      </div>
    );
  }

  const { A, V } = exercice;
  const coefs = coefficients(exercice);
  const equation = formaterEquation(coefs);

  function valider(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVerdict(verifier(exercice as Exercice, saisie));
  }

  function nouvelExercice() {
    setExercice(genererExercice());
    setSaisie('');
    setVerdict(null);
    champ.current?.focus();
  }

  const somme = V[0] * A[0] + V[1] * A[1] + V[2] * A[2];

  return (
    <div className="exercice">
      <h2 className="exercice-titre">
        <span aria-hidden="true">//</span> Énoncé
      </h2>

      <dl className="exercice-donnees">
        <div className="exercice-donnee">
          <dt>Point A</dt>
          <dd>{triplet(A)}</dd>
        </div>
        <div className="exercice-donnee">
          <dt>Vecteur normal n⃗</dt>
          <dd>{triplet(V)}</dd>
        </div>
      </dl>

      <form className="exercice-formulaire" onSubmit={valider} noValidate>
        <label className="exercice-label" htmlFor={idChamp}>
          Écris ton équation cartésienne
        </label>
        <input
          ref={champ}
          id={idChamp}
          className="exercice-champ"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={80}
          placeholder="Ex : 2x - 3y + 4z + 1 = 0"
          aria-describedby={`${idChamp}-aide`}
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
        />
        <p className="exercice-aide" id={`${idChamp}-aide`}>
          Toute équation équivalente est acceptée : x - y + 2 = 0 et 2x - 2y + 4 = 0 décrivent le même plan.
        </p>

        <div className="exercice-boutons">
          <button type="submit" className="exercice-bouton exercice-bouton--principal">
            Valider
          </button>
          <button type="button" className="exercice-bouton exercice-bouton--secondaire" onClick={nouvelExercice}>
            Nouvel exercice
          </button>
        </div>
      </form>

      <div role="status" aria-live="polite">
        {verdict?.type === 'correct' && (
          <div className="exercice-retour exercice-retour--correct">
            <p className="exercice-retour__etat">Correct</p>
            <p>Bravo, la réponse est correcte !</p>
            {!verdict.identique && (
              <p>
                Avec la méthode du cours, on obtient <span className="exercice-equation">{equation}</span>. Ton
                équation décrit bien le même plan.
              </p>
            )}
          </div>
        )}

        {verdict?.type === 'incompris' && (
          <div className="exercice-retour exercice-retour--incompris">
            <p className="exercice-retour__etat">Je n'ai pas compris</p>
            <p>{verdict.raison}</p>
          </div>
        )}

        {verdict?.type === 'faux' && (
          <div className="exercice-retour exercice-retour--faux">
            <p className="exercice-retour__etat">Pas tout à fait</p>
            <p>Oups, une erreur s'est glissée.</p>
            <p>
              {verdict.indice === 'degenere' &&
                'Une équation de plan doit contenir au moins un des termes en x, y ou z.'}
              {verdict.indice === 'constante' &&
                'Les coefficients de x, y et z sont corrects, mais la constante ne convient pas : le point A doit vérifier ton équation.'}
              {verdict.indice === 'normal' &&
                'Les coefficients de x, y et z doivent être les coordonnées du vecteur normal n⃗ (ou un multiple de celles-ci).'}
            </p>

            <ol className="exercice-correction">
              <li>
                Le vecteur normal n⃗ {triplet(V)} donne les coefficients :{' '}
                <span className="exercice-math">
                  a = {nombre(V[0])}, b = {nombre(V[1])}, c = {nombre(V[2])}
                </span>
                .
              </li>
              <li>
                Une équation du plan est de la forme <span className="exercice-math">ax + by + cz + d = 0</span>.
              </li>
              <li>
                Le point A {triplet(A)} appartient au plan, donc{' '}
                <span className="exercice-math">
                  d = {MOINS}(a×x<sub>A</sub> + b×y<sub>A</sub> + c×z<sub>A</sub>) = {MOINS}({entreParentheses(V[0])}×{entreParentheses(A[0])} +{' '}
                  {entreParentheses(V[1])}×{entreParentheses(A[1])} + {entreParentheses(V[2])}×
                  {entreParentheses(A[2])}) = {MOINS}({entreParentheses(somme)}) = {nombre(coefs.d)}
                </span>
                .
              </li>
              <li>
                Une équation cartésienne du plan est donc <span className="exercice-equation">{equation}</span>.
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
