/**
 * Coloration syntaxique Python (volontairement petite : pas de dépendance).
 *
 * `colorerPython(code)` découpe le code en lignes de « jetons » {type, texte}. Le composant <BlocCode>
 * transforme chaque jeton en <span class="py-…">, le style est dans src/styles/python.css.
 *
 * Le caractère TROU (U+E000) marque l'emplacement d'un élément React (champ à compléter) dans le code :
 * il devient un jeton de type 'trou'.
 */

export const TROU = '\uE000';

export type TypeJeton =
  | 'kw' // mot-clé : if, while, def, return…
  | 'fn' // nom donné par « def »
  | 'cls' // nom donné par « class »
  | 'call' // appel de fonction : seuil(…)
  | 'bi' // fonction native : print, range, len…
  | 'const' // True, False, None
  | 'self' // self, cls
  | 'str'
  | 'num'
  | 'op'
  | 'pun' // ( ) [ ] { } , : . ;
  | 'com'
  | 'deco' // @décorateur
  | 'id' // autre identifiant
  | 'sp' // espaces
  | 'trou';

export type Jeton = { type: TypeJeton; texte: string };

const MOTS_CLES = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for',
  'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
]);
const CONSTANTES = new Set(['True', 'False', 'None']);
const NATIFS = new Set([
  'abs', 'all', 'any', 'bool', 'dict', 'enumerate', 'filter', 'float', 'input', 'int', 'isinstance', 'len', 'list', 'map', 'max', 'min',
  'open', 'print', 'range', 'reversed', 'round', 'set', 'sorted', 'str', 'sum', 'tuple', 'type', 'zip',
]);

const CHAINE = /(?:[rRbBfFuU]{1,2})?(?:'''[\s\S]*?(?:'''|$)|"""[\s\S]*?(?:"""|$)|'(?:\\.|[^'\\\n])*'?|"(?:\\.|[^"\\\n])*"?)/y;
const COMMENTAIRE = /#[^\n]*/y;
const NOMBRE = /(?:\d+(?:_\d+)*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?j?/y;
const IDENT = /[A-Za-z_]\w*/y;
const DECORATEUR = /@[A-Za-z_][\w.]*/y;
const OPERATEUR = /\*\*=?|\/\/=?|==|!=|<=|>=|->|:=|[-+*/%<>&|^]=|[-+*/%<>=!&|^~@]/y;
const PONCTUATION = /[()[\]{},:;.]/y;
const ESPACES = /[ \t]+/y;

function lire(re: RegExp, code: string, i: number): string | null {
  re.lastIndex = i;
  const m = re.exec(code);
  return m && m.index === i && m[0] !== '' ? m[0] : null;
}

/** Découpe le code en lignes de jetons. */
export function colorerPython(code: string): Jeton[][] {
  const lignes: Jeton[][] = [[]];
  const pousser = (type: TypeJeton, texte: string) => {
    // Un jeton peut contenir des retours à la ligne (chaîne entre """ ) : on le coupe ligne par ligne.
    const morceaux = texte.split('\n');
    morceaux.forEach((m, k) => {
      if (k > 0) lignes.push([]);
      if (m !== '') lignes[lignes.length - 1].push({ type, texte: m });
    });
  };

  let i = 0;
  let precedent = ''; // dernier mot-clé lu, tant qu'aucun autre jeton (hors espaces) n'est venu
  let debutLigne = true;

  while (i < code.length) {
    const c = code[i];
    let t: string | null;

    if (c === '\n') { pousser('sp', '\n'); i++; debutLigne = true; precedent = ''; continue; }
    if (c === TROU) { pousser('trou', c); i++; debutLigne = false; precedent = ''; continue; }
    if ((t = lire(ESPACES, code, i))) { pousser('sp', t); i += t.length; continue; }
    if (c === '#' && (t = lire(COMMENTAIRE, code, i))) { pousser('com', t); i += t.length; precedent = ''; continue; }
    if ((t = lire(CHAINE, code, i)) && /^[rRbBfFuU]{0,2}['"]/.test(t)) { pousser('str', t); i += t.length; debutLigne = false; precedent = ''; continue; }
    if (c === '@' && debutLigne && (t = lire(DECORATEUR, code, i))) { pousser('deco', t); i += t.length; debutLigne = false; continue; }
    if ((t = lire(IDENT, code, i))) {
      const suivant = code.slice(i + t.length).match(/^[ \t]*(\S)/)?.[1];
      let type: TypeJeton;
      if (MOTS_CLES.has(t)) type = 'kw';
      else if (CONSTANTES.has(t)) type = 'const';
      else if (precedent === 'def') type = 'fn';
      else if (precedent === 'class') type = 'cls';
      else if (t === 'self' || t === 'cls') type = 'self';
      else if (NATIFS.has(t)) type = 'bi';
      else if (suivant === '(') type = 'call';
      else type = 'id';
      pousser(type, t);
      i += t.length;
      debutLigne = false;
      precedent = type === 'kw' ? t : '';
      continue;
    }
    if ((t = lire(NOMBRE, code, i))) { pousser('num', t); i += t.length; debutLigne = false; precedent = ''; continue; }
    if ((t = lire(OPERATEUR, code, i))) { pousser('op', t); i += t.length; debutLigne = false; precedent = ''; continue; }
    if ((t = lire(PONCTUATION, code, i))) { pousser('pun', t); i += t.length; debutLigne = false; precedent = ''; continue; }
    pousser('id', c); // caractère inattendu : affiché tel quel
    i++;
    debutLigne = false;
    precedent = '';
  }
  return lignes;
}
