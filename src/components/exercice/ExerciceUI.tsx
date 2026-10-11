import { Children, Fragment, isValidElement, useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode, type Ref } from 'react';
import { colorerPython, TROU, type Jeton } from '@/lib/python.ts';

/**
 * Pièces d'affichage communes à tous les exercices (Ex_1_T … Ex_10_T).
 * Le style est dans src/styles/exercice.css, importé par chaque page .astro.
 */

/* ---------- Tirage au sort ---------- */

/**
 * Tire les données de l'exercice dans le navigateur, après l'affichage.
 * (Si le serveur et le navigateur tiraient chacun leurs nombres, l'énoncé affiché
 * ne serait pas celui que la correction utilise.)
 * Renvoie [données | null, nouveauTirage].
 */
export function useTirage<T>(generer: () => T): [T | null, () => void] {
  const [valeur, setValeur] = useState<T | null>(null);
  useEffect(() => {
    setValeur(generer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const regenerer = useCallback(() => setValeur(generer()), [generer]);
  return [valeur, regenerer];
}

/* ---------- Structure ---------- */

export function Chargement() {
  return (
    <div className="exercice" aria-busy="true">
      <p className="exercice-chargement">Chargement de l'exercice…</p>
    </div>
  );
}

export function Cadre({ children }: { children: ReactNode }) {
  return <div className="exercice">{children}</div>;
}

export function Titre({ children = 'Énoncé' }: { children?: ReactNode }) {
  return (
    <h2 className="exercice-titre">
      <span aria-hidden="true">//</span> {children}
    </h2>
  );
}

export function Enonce({ children }: { children: ReactNode }) {
  return <div className="exercice-enonce">{children}</div>;
}

/** Cartes « libellé / valeur » (points, vecteurs…). */
export function Donnees({ elements }: { elements: [string, ReactNode][] }) {
  return (
    <dl className="exercice-donnees">
      {elements.map(([libelle, valeur]) => (
        <div className="exercice-donnee" key={libelle}>
          <dt>{libelle}</dt>
          <dd>{valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Bloc de code (représentations paramétriques…). */
export function Systeme({ lignes, legende }: { lignes: string[]; legende?: string }) {
  return (
    <div className="exercice-donnee">
      {legende && <p className="exercice-donnee__legende">{legende}</p>}
      <pre className="exercice-code" aria-label={lignes.join(', ')}>
        {lignes.join('\n')}
      </pre>
    </div>
  );
}

/* ---------- Réponse ---------- */

export function Formulaire({ onValider, children }: { onValider: () => void; children: ReactNode }) {
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onValider();
  };
  return (
    <form className="exercice-formulaire" onSubmit={soumettre} noValidate>
      {children}
    </form>
  );
}

type PropsChamp = {
  libelle: ReactNode;
  valeur: string;
  onChange: (valeur: string) => void;
  placeholder?: string;
  aide?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
  maxLength?: number;
};

export function Champ({ libelle, valeur, onChange, placeholder, aide, inputRef, className, maxLength = 80 }: PropsChamp) {
  const id = useId();
  return (
    <div className={`exercice-champ-groupe ${className ?? ''}`}>
      <label className="exercice-label" htmlFor={id}>
        {libelle}
      </label>
      <input
        ref={inputRef}
        id={id}
        className="exercice-champ"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-describedby={aide ? `${id}-aide` : undefined}
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
      />
      {aide && (
        <p className="exercice-aide" id={`${id}-aide`}>
          {aide}
        </p>
      )}
    </div>
  );
}

/** Petit champ texte à placer dans une ligne de code ou dans une case de tableau. */
export function ChampLigne({
  etiquette,
  valeur,
  onChange,
  placeholder,
  maxLength = 40,
  largeur,
}: {
  etiquette: string;
  valeur: string;
  onChange: (valeur: string) => void;
  placeholder?: string;
  maxLength?: number;
  largeur?: string;
}) {
  return (
    <input
      className="exercice-champ exercice-champ--ligne"
      type="text"
      aria-label={etiquette}
      autoComplete="off"
      autoCapitalize="off"
      spellCheck={false}
      maxLength={maxLength}
      placeholder={placeholder}
      style={largeur ? { width: largeur } : undefined}
      value={valeur}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/**
 * Bloc de code Python façon éditeur (onglet = nom du fichier, numéros de ligne, repères d'indentation, coloration, barre d'état).
 * Les enfants sont du texte (le code) et, éventuellement, des champs à compléter placés dans le code.
 * Le style est dans src/styles/python.css (à importer dans la page .astro).
 */
export function BlocCode({
  children,
  legende,
  fichier = 'script.py',
  focus = [],
}: {
  children: ReactNode;
  legende?: string;
  fichier?: string;
  /** Numéros (à partir de 1) des lignes à mettre en évidence. */
  focus?: number[];
}) {
  const [copie, setCopie] = useState(false);
  const trous: ReactNode[] = [];
  let code = '';
  Children.forEach(children, (enfant) => {
    if (typeof enfant === 'string' || typeof enfant === 'number') code += String(enfant);
    else if (isValidElement(enfant)) {
      trous.push(enfant);
      code += TROU;
    }
  });
  const lignes = colorerPython(code);
  while (lignes.length > 1 && lignes[lignes.length - 1].length === 0) lignes.pop();

  /** Type de jeton → classe de python.css. */
  const CLASSE: Partial<Record<Jeton['type'], string>> = {
    kw: 'py-kw', fn: 'py-fn', call: 'py-fn', cls: 'py-cls', bi: 'py-bi', const: 'py-cst', self: 'py-self',
    str: 'py-str', num: 'py-num', op: 'py-op', pun: 'py-pt', com: 'py-com', deco: 'py-dec',
  };
  let k = 0;
  const rendreJeton = (j: Jeton, cle: number) => {
    if (j.type === 'trou') return <Fragment key={cle}>{trous[k++]}</Fragment>;
    const classe = j.type === 'kw' && (j.texte === 'def' || j.texte === 'class') ? 'py-def' : CLASSE[j.type];
    return classe ? <span key={cle} className={classe}>{j.texte}</span> : j.texte;
  };

  /** Espaces de début de ligne → repères d'indentation (un par groupe de 4 espaces). */
  const rendreLigne = (jetons: Jeton[]) => {
    let debut = 0;
    if (jetons[0]?.type === 'sp') debut = jetons[0].texte.length;
    const guides = Math.floor(debut / 4);
    const reste = debut - guides * 4;
    return (
      <>
        {Array.from({ length: guides }, (_, g) => (
          <span key={`g${g}`} className="py-gu" />
        ))}
        {reste > 0 && ' '.repeat(reste)}
        {jetons.slice(debut > 0 ? 1 : 0).map((j, n) => rendreJeton(j, n))}
      </>
    );
  };

  const copiable = trous.length === 0;
  async function copier() {
    try {
      await navigator.clipboard.writeText(code);
      setCopie(true);
      setTimeout(() => setCopie(false), 1600);
    } catch {
      /* presse-papiers indisponible : on ne fait rien */
    }
  }

  return (
    <figure className="exercice-code-bloc exercice-code-bloc--lignes">
      <figcaption>
        {fichier}
        {copiable && (
          <button type="button" className="py-copier" onClick={copier} aria-label="Copier le code">
            {copie ? 'Copié ✓' : 'Copier'}
          </button>
        )}
      </figcaption>
      <pre tabIndex={0} aria-label={legende ?? 'Code Python'}>
        <code>
          {lignes.map((jetons, n) => (
            <Fragment key={n}>
              <span className={focus.includes(n + 1) ? 'py-l py-l--focus' : 'py-l'}>{rendreLigne(jetons)}</span>
              {'\n'}
            </Fragment>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export type Touche = { label: string; texte: string; recul?: number };

type PropsChampTouches = Omit<PropsChamp, 'inputRef' | 'className'> & { touches: Touche[]; apercu?: ReactNode };

/** Champ texte + boutons qui insèrent un symbole à l'endroit du curseur (π, ∪, √, [ …). */
export function ChampAvecTouches({ touches, apercu, ...champ }: PropsChampTouches) {
  const ref = useRef<HTMLInputElement>(null);
  const curseur = useRef<number | null>(null);

  // Après une insertion : on remet le curseur à l'endroit voulu
  useEffect(() => {
    if (curseur.current === null || !ref.current) return;
    ref.current.focus();
    ref.current.setSelectionRange(curseur.current, curseur.current);
    curseur.current = null;
  }, [champ.valeur]);

  function inserer({ texte, recul = 0 }: Touche) {
    const el = ref.current;
    const debut = el?.selectionStart ?? champ.valeur.length;
    const fin = el?.selectionEnd ?? champ.valeur.length;
    curseur.current = debut + texte.length - recul;
    champ.onChange(champ.valeur.slice(0, debut) + texte + champ.valeur.slice(fin));
  }

  return (
    <>
      <Champ {...champ} inputRef={ref} />
      <div className="exercice-touches" role="group" aria-label="Aide à la saisie">
        {touches.map((t) => (
          <button key={t.label} type="button" className="exercice-touche" onClick={() => inserer(t)}>
            {t.label}
          </button>
        ))}
      </div>
      {apercu}
    </>
  );
}

type PropsChoix = {
  legende: ReactNode;
  options: { valeur: string; contenu: ReactNode }[];
  valeur: string | null;
  onChange: (valeur: string) => void;
  enLigne?: boolean;
};

/** Boutons radio (un seul choix possible). */
export function Choix({ legende, options, valeur, onChange, enLigne = false }: PropsChoix) {
  const nom = useId();
  return (
    <fieldset className="exercice-choix">
      <legend className="exercice-label">{legende}</legend>
      <div className={enLigne ? 'exercice-choix__liste exercice-choix__liste--ligne' : 'exercice-choix__liste'}>
        {options.map((o) => (
          <label className="exercice-choix__option" key={o.valeur}>
            <input type="radio" name={nom} value={o.valeur} checked={valeur === o.valeur} onChange={() => onChange(o.valeur)} />
            <span>{o.contenu}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Boutons({ onNouveau }: { onNouveau: () => void }) {
  return (
    <div className="exercice-boutons">
      <button type="submit" className="exercice-bouton exercice-bouton--principal">
        Valider
      </button>
      <button type="button" className="exercice-bouton exercice-bouton--secondaire" onClick={onNouveau}>
        Nouvel exercice
      </button>
    </div>
  );
}

/* ---------- Retour après validation ---------- */

/** Zone annoncée aux lecteurs d'écran quand un retour apparaît. */
export function ZoneRetour({ children }: { children?: ReactNode }) {
  return (
    <div role="status" aria-live="polite">
      {children}
    </div>
  );
}

export type TypeRetour = 'correct' | 'faux' | 'incompris';

const TITRES: Record<TypeRetour, string> = {
  correct: 'Correct',
  faux: 'Pas tout à fait',
  incompris: "Je n'ai pas compris",
};

export function Retour({ type, titre, children }: { type: TypeRetour; titre?: string; children: ReactNode }) {
  return (
    <div className={`exercice-retour exercice-retour--${type}`}>
      <p className="exercice-retour__etat">{titre ?? TITRES[type]}</p>
      {children}
    </div>
  );
}

export const MessageSucces = ({ children }: { children?: ReactNode }) => (
  <Retour type="correct">
    <p>Bravo, la réponse est correcte !</p>
    {children}
  </Retour>
);

export const MessageIncompris = ({ raison }: { raison: ReactNode }) => (
  <Retour type="incompris">
    <p>{raison}</p>
  </Retour>
);

export function Correction({ children }: { children: ReactNode }) {
  return <ol className="exercice-correction">{children}</ol>;
}

/** Valeur mise en valeur dans une phrase (calcul, équation). */
export const Calcul = ({ children }: { children: ReactNode }) => <span className="exercice-math">{children}</span>;

/** « Erreurs fréquentes » / « Pour réussir la prochaine fois ». */
export function Astuce({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div className="exercice-astuce">
      <p className="exercice-astuce__titre">{titre}</p>
      {children}
    </div>
  );
}
