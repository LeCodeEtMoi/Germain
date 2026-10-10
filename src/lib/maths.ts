/**
 * Boîte à outils commune aux exercices de Germain.
 * À placer dans src/lib/maths.ts
 *
 * Contenu :
 *   1. Hasard
 *   2. Écriture des nombres (vrai signe moins, parenthèses, fractions)
 *   3. Vecteurs de l'espace
 *   4. Dénombrement (coefficients binomiaux exacts)
 *   5. Expressions saisies par l'élève : lecture, calcul, dérivation, export TeX
 *      (accepte l'écriture « clavier » : x^3/3, e^(2x), sin(2x)…, et le LaTeX produit par MathLive)
 */

/* ================================================================
   1. Hasard
================================================================ */

/** Entier aléatoire dans [min ; max] (bornes comprises). */
export const entier = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const choisir = <T>(liste: readonly T[]): T => liste[entier(0, liste.length - 1)];

export const signeAleatoire = (): 1 | -1 => (Math.random() < 0.5 ? -1 : 1);

/** Mélange de Fisher-Yates (le tri avec Math.random() donne un mélange biaisé). */
export function melanger<T>(liste: readonly T[]): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = entier(0, i);
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/* ================================================================
   2. Écriture des nombres
================================================================ */

export const MOINS = '−';

/** « -3 » s'écrit « −3 » (vrai signe moins). */
export const nombre = (n: number) => (n < 0 ? `${MOINS}${-n}` : `${n}`);

/** « −3 » devient « (−3) » : pour les produits comme 2×(−3). */
export const entreParentheses = (n: number) => (n < 0 ? `(${MOINS}${-n})` : `${n}`);

/** Coefficient devant une variable : 1 → « », −1 → « − », 3 → « 3 ». */
const coefficientDevant = (c: number) => (c === 1 ? '' : c === -1 ? MOINS : nombre(c));

/** Écrit a + b·v proprement : affine(−2, 3, 't') → « −2 + 3t » ; affine(0, −1, 't') → « −t ». */
export function affine(a: number, b: number, v: string): string {
  if (b === 0) return nombre(a);
  if (a === 0) return `${coefficientDevant(b)}${v}`;
  const abs = Math.abs(b);
  return `${nombre(a)} ${b < 0 ? MOINS : '+'} ${abs === 1 ? '' : abs}${v}`;
}

/** Monôme c·x^e en texte brut : monome(4, 1) → « 4x » ; monome(1, 3) → « x^3 ». */
export const monome = (c: number, e: number) => {
  const puissance = e === 0 ? '' : e === 1 ? 'x' : `x^${e}`;
  return e === 0 ? `${c}` : `${c === 1 ? '' : c}${puissance}`;
};

const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));

export type Fraction = { n: number; d: number };

/** Fraction réduite, dénominateur strictement positif. */
export function fraction(n: number, d = 1): Fraction {
  const g = pgcd(n, d) || 1;
  const signe = d < 0 ? -1 : 1;
  return { n: (signe * n) / g, d: (signe * d) / g };
}

export const texteFraction = ({ n, d }: Fraction) => (d === 1 ? nombre(n) : `${nombre(n)}/${d}`);

export const memeFraction = (p: Fraction, q: Fraction) => p.n === q.n && p.d === q.d;

/* ================================================================
   3. Vecteurs de l'espace
================================================================ */

export type Vec3 = [number, number, number];

export const triplet = (v: Vec3) => `(${v.map(nombre).join(' ; ')})`;

export const vecSub = (p: Vec3, q: Vec3): Vec3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
export const vecAdd = (p: Vec3, q: Vec3): Vec3 => [p[0] + q[0], p[1] + q[1], p[2] + q[2]];
export const vecScale = (v: Vec3, k: number): Vec3 => [v[0] * k, v[1] * k, v[2] * k];
export const vecDot = (u: Vec3, v: Vec3) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
export const vecCross = (u: Vec3, v: Vec3): Vec3 => [
  u[1] * v[2] - u[2] * v[1],
  u[2] * v[0] - u[0] * v[2],
  u[0] * v[1] - u[1] * v[0],
];
export const vecNul = (v: Vec3) => v[0] === 0 && v[1] === 0 && v[2] === 0;

/** Deux vecteurs sont colinéaires si leur produit vectoriel est nul (vrai aussi si l'un est nul). */
export const colineaires = (u: Vec3, v: Vec3) => vecNul(vecCross(u, v));

/** Produit mixte u · (v × w). Nul si et seulement si u, v, w sont coplanaires. */
export const produitMixte = (u: Vec3, v: Vec3, w: Vec3) => vecDot(u, vecCross(v, w));

export const vecAleatoire = (min: number, max: number): Vec3 => [entier(min, max), entier(min, max), entier(min, max)];

/** Représentation paramétrique : trois lignes « x = 2 + 3t », « y = −t », « z = 4 ». */
export function lignesParametriques(A: Vec3, V: Vec3, parametre: string): string[] {
  return (['x', 'y', 'z'] as const).map((nom, i) => `${nom} = ${affine(A[i], V[i], parametre)}`);
}

/* ================================================================
   4. Dénombrement
================================================================ */

/** Coefficient binomial « k parmi n », exact (BigInt). */
export function binomial(n: number, k: number): bigint {
  if (k < 0 || k > n) return 0n;
  const m = Math.min(k, n - k);
  let r = 1n;
  for (let i = 1; i <= m; i++) r = (r * BigInt(n - m + i)) / BigInt(i);
  return r;
}

/** Arrangements : n × (n−1) × … × (n−k+1). */
export function arrangements(n: number, k: number): bigint {
  let r = 1n;
  for (let i = 0; i < k; i++) r *= BigInt(n - i);
  return r;
}

/** 1 234 567 (espaces fines à la française). */
export const grandNombre = (x: bigint) => x.toLocaleString('fr-FR');

/* ================================================================
   5. Expressions saisies par l'élève
================================================================ */

export type Fonction = 'sin' | 'cos' | 'ln' | 'exp' | 'sqrt' | 'abs';
export type Operateur = '+' | '-' | '*' | '/' | '^';

export type Noeud =
  | { t: 'num'; v: number }
  | { t: 'var'; nom: string }
  | { t: 'cst'; nom: string } // e, pi, ou une constante libre comme C
  | { t: 'neg'; a: Noeud }
  | { t: 'bin'; op: Operateur; a: Noeud; b: Noeud }
  | { t: 'fn'; nom: Fonction; a: Noeud };

export type Analyse = { ok: true; noeud: Noeud } | { ok: false; message: string };

const FONCTIONS: Fonction[] = ['sqrt', 'sin', 'cos', 'exp', 'abs', 'ln'];

type Jeton =
  | { k: 'num'; v: number }
  | { k: 'id'; v: string }
  | { k: 'fn'; v: Fonction }
  | { k: 'sym'; v: '+' | '-' | '*' | '/' | '^' | '(' | ')' | '|' };

class ErreurLecture extends Error {}

/* ---------- LaTeX (MathLive) → texte clavier ---------- */

function lireGroupe(s: string, i: number): [string, number] {
  // s[i] doit être « { » ; renvoie le contenu et l'index qui suit « } »
  if (s[i] !== '{') throw new ErreurLecture("Il manque une accolade dans l'expression.");
  let profondeur = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === '{') profondeur++;
    else if (s[j] === '}') {
      profondeur--;
      if (profondeur === 0) return [s.slice(i + 1, j), j + 1];
    }
  }
  throw new ErreurLecture("Il manque une accolade fermante dans l'expression.");
}

/** Convertit le LaTeX produit par MathLive en écriture clavier (x^3/3, sqrt(x), (1)/(2)…). */
export function latexVersTexte(latex: string): string {
  const s = latex
    .replace(/\\left|\\right|\\displaystyle|\\,|\\;|\\!|\\ /g, '')
    .replace(/\\dfrac|\\tfrac/g, '\\frac')
    .replace(/\\cdot|\\times/g, '*')
    .replace(/\\div/g, '/');
  let sortie = '';
  let i = 0;
  while (i < s.length) {
    if (s.startsWith('\\frac', i)) {
      const [haut, j] = lireGroupe(s, i + 5);
      const [bas, k] = lireGroupe(s, j);
      sortie += `((${latexVersTexte(haut)})/(${latexVersTexte(bas)}))`;
      i = k;
    } else if (s.startsWith('\\sqrt', i)) {
      if (s[i + 5] === '[') throw new ErreurLecture('Les racines n-ièmes ne sont pas acceptées ici.');
      const [contenu, j] = lireGroupe(s, i + 5);
      sortie += `sqrt(${latexVersTexte(contenu)})`;
      i = j;
    } else if (s[i] === '^' && s[i + 1] === '{') {
      const [contenu, j] = lireGroupe(s, i + 1);
      sortie += `^(${latexVersTexte(contenu)})`;
      i = j;
    } else if (s[i] === '\\') {
      const nom = s.slice(i + 1).match(/^[a-zA-Z]+/)?.[0] ?? '';
      if (['sin', 'cos', 'ln', 'exp', 'pi'].includes(nom)) {
        sortie += nom;
        i += 1 + nom.length;
      } else {
        throw new ErreurLecture(`Je ne comprends pas le symbole « \\${nom} ».`);
      }
    } else if (s[i] === '{') {
      const [contenu, j] = lireGroupe(s, i);
      sortie += `(${latexVersTexte(contenu)})`;
      i = j;
    } else if (s[i] === '}') {
      throw new ErreurLecture("Il y a une accolade fermante en trop dans l'expression.");
    } else {
      sortie += s[i];
      i++;
    }
  }
  return sortie;
}

/* ---------- Lecture ---------- */

function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .replace(/[−–—]/g, '-') // − – —
    .replace(/[×·⋅]/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/√/g, 'sqrt')
    .replace(/π/g, 'pi')
    .replace(/,/g, '.')
    .replace(/\s+/g, '');
}

function decouper(texte: string): Jeton[] {
  const jetons: Jeton[] = [];
  let i = 0;
  while (i < texte.length) {
    const c = texte[i];
    if (/[0-9.]/.test(c)) {
      const m = texte.slice(i).match(/^(?:\d+\.?\d*|\.\d+)/);
      if (!m) throw new ErreurLecture('Nombre mal écrit.');
      if (texte[i + m[0].length] === '.') throw new ErreurLecture('Nombre mal écrit.');
      jetons.push({ k: 'num', v: Number(m[0]) });
      i += m[0].length;
    } else if (/[a-z]/.test(c)) {
      const fn = FONCTIONS.find((f) => texte.startsWith(f, i));
      if (fn) {
        jetons.push({ k: 'fn', v: fn });
        i += fn.length;
      } else if (texte.startsWith('pi', i)) {
        jetons.push({ k: 'id', v: 'pi' });
        i += 2;
      } else {
        jetons.push({ k: 'id', v: c });
        i++;
      }
    } else if ('+-*/^()|'.includes(c)) {
      jetons.push({ k: 'sym', v: c as '+' });
      i++;
    } else {
      throw new ErreurLecture(`Je ne comprends pas le symbole « ${c} ».`);
    }
  }
  return jetons;
}

const bin = (op: Operateur, a: Noeud, b: Noeud): Noeud => ({ t: 'bin', op, a, b });
const num = (v: number): Noeud => ({ t: 'num', v });

class Lecteur {
  private p = 0;
  private profondeurAbs = 0;

  constructor(
    private jetons: Jeton[],
    private variables: string[],
    private constantes: string[]
  ) {}

  lire(): Noeud {
    if (this.jetons.length === 0) throw new ErreurLecture("L'expression est vide.");
    const n = this.somme();
    if (this.p < this.jetons.length) {
      const j = this.jetons[this.p];
      if (j.k === 'sym' && j.v === ')') throw new ErreurLecture('Il y a une parenthèse fermante en trop.');
      throw new ErreurLecture("Je n'arrive pas à lire la fin de ton expression.");
    }
    return n;
  }

  private suivant(): Jeton | undefined {
    return this.jetons[this.p];
  }

  private estSym(v: string): boolean {
    const j = this.suivant();
    return !!j && j.k === 'sym' && j.v === v;
  }

  private somme(): Noeud {
    let n = this.produit();
    while (this.estSym('+') || this.estSym('-')) {
      const op = (this.jetons[this.p++] as { v: '+' | '-' }).v;
      n = bin(op, n, this.produit());
    }
    return n;
  }

  private debutPrimaire(): boolean {
    const j = this.suivant();
    if (!j) return false;
    if (j.k === 'num' || j.k === 'id' || j.k === 'fn') return true;
    if (j.k === 'sym') return j.v === '(' || (j.v === '|' && this.profondeurAbs === 0);
    return false;
  }

  private produit(): Noeud {
    let n = this.unaire();
    for (;;) {
      if (this.estSym('*') || this.estSym('/')) {
        const op = (this.jetons[this.p++] as { v: '*' | '/' }).v;
        n = bin(op, n, this.unaire());
      } else if (this.debutPrimaire()) {
        n = bin('*', n, this.unaire()); // multiplication implicite : 2x, k(k+1)
      } else return n;
    }
  }

  private unaire(): Noeud {
    if (this.estSym('-')) {
      this.p++;
      return { t: 'neg', a: this.unaire() };
    }
    if (this.estSym('+')) {
      this.p++;
      return this.unaire();
    }
    return this.puissance();
  }

  private puissance(): Noeud {
    const base = this.primaire();
    if (this.estSym('^')) {
      this.p++;
      return bin('^', base, this.unaire()); // associatif à droite : 2^3^2 = 2^(3^2)
    }
    return base;
  }

  private primaire(): Noeud {
    const j = this.suivant();
    if (!j) throw new ErreurLecture("Il manque un terme à la fin de l'expression.");
    this.p++;

    if (j.k === 'num') return num(j.v);

    if (j.k === 'id') {
      if (j.v === 'e' || j.v === 'pi') return { t: 'cst', nom: j.v };
      if (this.variables.includes(j.v)) return { t: 'var', nom: j.v };
      if (this.constantes.includes(j.v)) return { t: 'cst', nom: j.v };
      throw new ErreurLecture(`Je ne connais pas la lettre « ${j.v} » ici.`);
    }

    if (j.k === 'fn') {
      if (this.estSym('(') || this.estSym('|')) return { t: 'fn', nom: j.v, a: this.primaire() };
      // sans parenthèses : sin2x se lit sin(2x), ln x se lit ln(x)
      if (!this.debutPrimaire()) throw new ErreurLecture(`Il manque l'argument de « ${j.v} ».`);
      let arg = this.puissance();
      while (this.debutPrimaire()) arg = bin('*', arg, this.puissance());
      return { t: 'fn', nom: j.v, a: arg };
    }

    if (j.v === '(') {
      const saved = this.profondeurAbs;
      this.profondeurAbs = 0;
      const n = this.somme();
      this.profondeurAbs = saved;
      if (!this.estSym(')')) throw new ErreurLecture('Il manque une parenthèse fermante.');
      this.p++;
      return n;
    }

    if (j.v === '|') {
      this.profondeurAbs++;
      const n = this.somme();
      this.profondeurAbs--;
      if (!this.estSym('|')) throw new ErreurLecture('Il manque une barre « | » fermante.');
      this.p++;
      return { t: 'fn', nom: 'abs', a: n };
    }

    if (j.v === ')') throw new ErreurLecture('Il y a une parenthèse fermante en trop.');
    throw new ErreurLecture(`Il manque un terme avant « ${j.v} ».`);
  }
}

export type OptionsAnalyse = {
  /** Lettres autorisées comme variables (ex. ['x'] ou ['k']). */
  variables?: string[];
  /** Lettres autorisées comme constantes libres (ex. ['c'] pour « + C »). */
  constantes?: string[];
  /** Le texte vient de MathLive (LaTeX). */
  latex?: boolean;
};

export function analyser(source: string, options: OptionsAnalyse = {}): Analyse {
  const { variables = [], constantes = [], latex = false } = options;
  try {
    const texte = normaliser(latex ? latexVersTexte(source) : source);
    return { ok: true, noeud: new Lecteur(decouper(texte), variables, constantes).lire() };
  } catch (e) {
    if (e instanceof ErreurLecture) return { ok: false, message: e.message };
    throw e;
  }
}

/* ---------- Calcul ---------- */

const VALEUR_CONSTANTE_LIBRE = 1.2345;

export function evaluer(n: Noeud, env: Record<string, number> = {}): number {
  switch (n.t) {
    case 'num':
      return n.v;
    case 'var':
      return env[n.nom] ?? NaN;
    case 'cst':
      return n.nom === 'e' ? Math.E : n.nom === 'pi' ? Math.PI : (env[n.nom] ?? VALEUR_CONSTANTE_LIBRE);
    case 'neg':
      return -evaluer(n.a, env);
    case 'bin': {
      const a = evaluer(n.a, env);
      const b = evaluer(n.b, env);
      switch (n.op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return a / b;
        case '^':
          return Math.pow(a, b);
      }
      return NaN;
    }
    case 'fn': {
      const a = evaluer(n.a, env);
      switch (n.nom) {
        case 'sin':
          return Math.sin(a);
        case 'cos':
          return Math.cos(a);
        case 'ln':
          return Math.log(a);
        case 'exp':
          return Math.exp(a);
        case 'sqrt':
          return Math.sqrt(a);
        case 'abs':
          return Math.abs(a);
      }
    }
  }
  return NaN;
}

const contient = (n: Noeud, v: string): boolean => {
  switch (n.t) {
    case 'var':
      return n.nom === v;
    case 'neg':
    case 'fn':
      return contient(n.a, v);
    case 'bin':
      return contient(n.a, v) || contient(n.b, v);
    default:
      return false;
  }
};

/** Dérivée formelle par rapport à la variable v (non simplifiée : on ne s'en sert que pour calculer). */
export function deriver(n: Noeud, v: string): Noeud {
  switch (n.t) {
    case 'num':
    case 'cst':
      return num(0);
    case 'var':
      return num(n.nom === v ? 1 : 0);
    case 'neg':
      return { t: 'neg', a: deriver(n.a, v) };
    case 'bin': {
      const { a, b } = n;
      const da = deriver(a, v);
      const db = deriver(b, v);
      switch (n.op) {
        case '+':
        case '-':
          return bin(n.op, da, db);
        case '*':
          return bin('+', bin('*', da, b), bin('*', a, db));
        case '/':
          return bin('/', bin('-', bin('*', da, b), bin('*', a, db)), bin('^', b, num(2)));
        case '^':
          if (!contient(b, v)) return bin('*', bin('*', b, bin('^', a, bin('-', b, num(1)))), da);
          return bin(
            '*',
            n,
            bin('+', bin('*', db, { t: 'fn', nom: 'ln', a }), bin('/', bin('*', b, da), a))
          );
      }
      return num(0);
    }
    case 'fn': {
      const da = deriver(n.a, v);
      switch (n.nom) {
        case 'sin':
          return bin('*', { t: 'fn', nom: 'cos', a: n.a }, da);
        case 'cos':
          return bin('*', { t: 'neg', a: { t: 'fn', nom: 'sin', a: n.a } }, da);
        case 'ln':
          return bin('/', da, n.a);
        case 'exp':
          return bin('*', n, da);
        case 'sqrt':
          return bin('/', da, bin('*', num(2), n));
        case 'abs':
          return bin('*', bin('/', n.a, n), da);
      }
    }
  }
  return num(0);
}

const proche = (x: number, y: number) =>
  Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) <= 1e-7 * Math.max(1, Math.abs(x), Math.abs(y));

/** Les deux expressions prennent-elles les mêmes valeurs en tous les points testés ? */
export function equivalents(a: Noeud, b: Noeud, v: string | null, points: number[]): boolean {
  if (v === null) return proche(evaluer(a), evaluer(b));
  return points.every((p) => proche(evaluer(a, { [v]: p }), evaluer(b, { [v]: p })));
}

/**
 * Si g = r × f en tous les points (r constant), renvoie r ; sinon null.
 * Sert à repérer « il manque un facteur » ou « erreur de signe ».
 */
export function rapportConstant(g: Noeud, f: Noeud, v: string, points: number[]): number | null {
  let r: number | null = null;
  for (const p of points) {
    const fv = evaluer(f, { [v]: p });
    const gv = evaluer(g, { [v]: p });
    if (!Number.isFinite(fv) || !Number.isFinite(gv) || Math.abs(fv) < 1e-9) return null;
    const rapport = gv / fv;
    if (r === null) r = rapport;
    else if (!proche(rapport, r)) return null;
  }
  return r;
}

/** Valeur numérique d'un texte sans variable : « 3 », « −2,5 », « 1/3 ». null si illisible. */
export function valeurDuTexte(texte: string): number | null {
  const a = analyser(texte);
  if (!a.ok) return null;
  const v = evaluer(a.noeud);
  return Number.isFinite(v) ? v : null;
}

/* ---------- Export TeX (aperçu de ce que l'élève a écrit) ---------- */

const priorite = (n: Noeud): number => {
  if (n.t === 'bin') return n.op === '+' || n.op === '-' ? 1 : n.op === '*' ? 2 : n.op === '/' ? 4 : 5;
  if (n.t === 'neg') return 1;
  return 6;
};

function tex(n: Noeud): string {
  switch (n.t) {
    case 'num':
      return Number.isInteger(n.v) ? `${n.v}` : `${n.v}`.replace('.', '{,}');
    case 'var':
      return n.nom;
    case 'cst':
      return n.nom === 'pi' ? '\\pi' : n.nom === 'e' ? 'e' : n.nom.toUpperCase();
    case 'neg':
      return `-${priorite(n.a) < 2 ? paren(n.a) : tex(n.a)}`;
    case 'fn': {
      if (n.nom === 'sqrt') return `\\sqrt{${tex(n.a)}}`;
      if (n.nom === 'abs') return `\\left|${tex(n.a)}\\right|`;
      return `\\${n.nom}\\left(${tex(n.a)}\\right)`;
    }
    case 'bin': {
      const { a, b } = n;
      switch (n.op) {
        case '+':
          return `${tex(a)} + ${priorite(b) < 2 ? paren(b) : tex(b)}`;
        case '-':
          return `${tex(a)} - ${priorite(b) <= 1 ? paren(b) : tex(b)}`;
        case '*': {
          const gauche = priorite(a) < 2 ? paren(a) : tex(a);
          const droite = priorite(b) < 2 ? paren(b) : tex(b);
          // un nombre ou une fraction à droite : on met un point, sinon « 2 3 » se lirait 23
          const point = /^[0-9]/.test(droite) || droite.startsWith('\\frac') ? ' \\cdot ' : '';
          return `${gauche}${point}${droite}`;
        }
        case '/':
          return `\\frac{${tex(a)}}{${tex(b)}}`;
        case '^': {
          const base = priorite(a) < 6 ? paren(a) : tex(a);
          return `${base}^{${tex(b)}}`;
        }
      }
    }
  }
  return '';
}

const paren = (n: Noeud) => `\\left(${tex(n)}\\right)`;

export const versTex = (n: Noeud): string => tex(n);

/* ================================================================
   Écriture d'une somme de termes
================================================================ */

/**
 * Écrit une somme de termes « coefficient × suffixe » : coefficients 1 omis, vrai signe moins,
 * termes nuls supprimés.
 *   combinaison([[2, 'x²'], [-1, 'x'], [3, '']])  →  « 2x² − x + 3 »
 *   combinaison([[-1, 'x'], [4, '']], true)        →  « -x + 4 » (pour TeX)
 */
export function combinaison(termes: [number, string][], tex = false): string {
  const moins = tex ? '-' : MOINS;
  let texte = '';
  for (const [c, suffixe] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = suffixe === '' ? `${abs}` : abs === 1 ? suffixe : `${abs}${suffixe}`;
    if (texte === '') texte = c < 0 ? `${moins}${corps}` : corps;
    else texte += c < 0 ? ` ${moins} ${corps}` : ` + ${corps}`;
  }
  return texte === '' ? '0' : texte;
}
