/**
 * Contenu du formulaire de mathématiques (page /formulaire).
 *
 * Pour ajouter une formule : ajouter une ligne dans le tableau `lignes` de la bonne fiche.
 * Pour ajouter une fiche ou une section : copier-coller un bloc existant.
 *
 * Écriture des cellules (chaque ligne = un tableau de cellules) :
 *   - r`\dfrac{1}{x}`        → formule LaTeX (rendue par KaTeX au moment du build)
 *   - r`~texte avec $x^2$`   → texte (la cellule commence par « ~ »), avec des formules entre $ $
 *   - ''                      → cellule vide
 * `r` est String.raw : on écrit les antislashs une seule fois, comme en LaTeX.
 * Éviter la suite « ${ » (réservée par JavaScript) : écrire « $ {…} » ou reformuler.
 */

const r = String.raw;

export type Fiche = {
  titre: string;
  /** Phrase d'aide sous le titre (texte, formules entre $ $ possibles). */
  note?: string;
  /** En-têtes de colonnes (texte, formules entre $ $ possibles). */
  colonnes: string[];
  lignes: string[][];
};

export type Section = {
  id: string;
  titre: string;
  fiches: Fiche[];
};

export const sections: Section[] = [
  /* ===================================================================== */
  {
    id: 'derivation',
    titre: 'Dérivation',
    fiches: [
      {
        titre: 'Dérivées usuelles',
        colonnes: ['Fonction $f(x)$', 'Dérivée $f\'(x)$', 'Sur'],
        lignes: [
          [r`k`, r`0`, r`~$\mathbb{R}$`],
          [r`x`, r`1`, r`~$\mathbb{R}$`],
          [r`x^{n}\ (n\in\mathbb{N}^{*})`, r`n\,x^{n-1}`, r`~$\mathbb{R}$`],
          [r`\dfrac{1}{x}`, r`-\dfrac{1}{x^{2}}`, r`~$x\neq 0$`],
          [r`\dfrac{1}{x^{n}}\ (n\in\mathbb{N}^{*})`, r`-\dfrac{n}{x^{n+1}}`, r`~$x\neq 0$`],
          [r`\sqrt{x}`, r`\dfrac{1}{2\sqrt{x}}`, r`~$x>0$`],
          [r`e^{x}`, r`e^{x}`, r`~$\mathbb{R}$`],
          [r`\ln x`, r`\dfrac{1}{x}`, r`~$x>0$`],
          [r`\cos x`, r`-\sin x`, r`~$\mathbb{R}$`],
          [r`\sin x`, r`\cos x`, r`~$\mathbb{R}$`],
        ],
      },
      {
        titre: 'Opérations et fonctions composées',
        note: '$u$ et $v$ sont dérivables sur l’intervalle étudié.',
        colonnes: ['Fonction', 'Dérivée', 'Condition'],
        lignes: [
          [r`u+v`, r`u'+v'`, ''],
          [r`k\,u`, r`k\,u'`, r`~$k$ réel`],
          [r`u\,v`, r`u'v+uv'`, ''],
          [r`\dfrac{1}{v}`, r`-\dfrac{v'}{v^{2}}`, r`~$v\neq 0$`],
          [r`\dfrac{u}{v}`, r`\dfrac{u'v-uv'}{v^{2}}`, r`~$v\neq 0$`],
          [r`u^{n}`, r`n\,u'\,u^{n-1}`, r`~$n$ entier`],
          [r`\sqrt{u}`, r`\dfrac{u'}{2\sqrt{u}}`, r`~$u>0$`],
          [r`e^{u}`, r`u'\,e^{u}`, ''],
          [r`\ln u`, r`\dfrac{u'}{u}`, r`~$u>0$`],
          [r`f(ax+b)`, r`a\,f'(ax+b)`, ''],
          [r`\cos(ax+b)`, r`-a\sin(ax+b)`, ''],
          [r`\sin(ax+b)`, r`a\cos(ax+b)`, ''],
        ],
      },
      {
        titre: 'Tangente et variations',
        colonnes: ['Notion', 'À retenir'],
        lignes: [
          [r`~Nombre dérivé en $a$`, r`f'(a)=\lim_{h\to 0}\dfrac{f(a+h)-f(a)}{h}`],
          [r`~Tangente à la courbe en $a$`, r`y=f'(a)\,(x-a)+f(a)`],
          [r`~$f'\geq 0$ sur $I$`, r`~$f$ est croissante sur $I$`],
          [r`~$f'\leq 0$ sur $I$`, r`~$f$ est décroissante sur $I$`],
          [r`~$f'$ s’annule en $a$ en changeant de signe`, r`~$f$ a un extremum local en $a$`],
        ],
      },
      {
        titre: 'Convexité',
        note: '$f$ est deux fois dérivable sur l’intervalle $I$.',
        colonnes: ['Propriété', 'Caractérisation'],
        lignes: [
          [r`~$f$ est convexe sur $I$`, r`~$f'$ croissante $\Leftrightarrow f''\geq 0$ $\Leftrightarrow$ la courbe est au-dessus de ses tangentes`],
          [r`~$f$ est concave sur $I$`, r`~$f'$ décroissante $\Leftrightarrow f''\leq 0$ $\Leftrightarrow$ la courbe est en dessous de ses tangentes`],
          [r`~Point d’inflexion en $a$`, r`~$f''$ s’annule en $a$ en changeant de signe : la courbe traverse sa tangente`],
          [r`~Inégalités classiques`, r`e^{x}\geq 1+x \quad\text{et}\quad \ln x\leq x-1`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'primitives',
    titre: 'Primitives',
    fiches: [
      {
        titre: 'Primitives usuelles',
        note: 'Une fonction a une infinité de primitives : elles diffèrent d’une constante $C$.',
        colonnes: ['$f(x)$', 'Une primitive $F(x)$', 'Sur'],
        lignes: [
          [r`a`, r`a\,x`, r`~$\mathbb{R}$`],
          [r`x^{n}\ (n\in\mathbb{Z},\ n\neq -1)`, r`\dfrac{x^{n+1}}{n+1}`, r`~$\mathbb{R}$ si $n\geq 0$, $x\neq 0$ si $n\leq -2$`],
          [r`\dfrac{1}{x}`, r`\ln x`, r`~$x>0$`],
          [r`\dfrac{1}{x^{2}}`, r`-\dfrac{1}{x}`, r`~$x\neq 0$`],
          [r`\dfrac{1}{\sqrt{x}}`, r`2\sqrt{x}`, r`~$x>0$`],
          [r`e^{x}`, r`e^{x}`, r`~$\mathbb{R}$`],
          [r`e^{ax}`, r`\dfrac{1}{a}\,e^{ax}`, r`~$a\neq 0$`],
          [r`\cos x`, r`\sin x`, r`~$\mathbb{R}$`],
          [r`\sin x`, r`-\cos x`, r`~$\mathbb{R}$`],
          [r`\cos(ax+b)`, r`\dfrac{1}{a}\sin(ax+b)`, r`~$a\neq 0$`],
          [r`\sin(ax+b)`, r`-\dfrac{1}{a}\cos(ax+b)`, r`~$a\neq 0$`],
        ],
      },
      {
        titre: 'Primitives de formes composées',
        note: '$u$ est dérivable ; c’est la lecture « dérivée de $u$ » qui fait reconnaître la forme.',
        colonnes: ['$f$', 'Une primitive $F$', 'Condition'],
        lignes: [
          [r`u'\,u^{n}`, r`\dfrac{u^{n+1}}{n+1}`, r`~$n\neq -1$`],
          [r`\dfrac{u'}{u}`, r`\ln |u|`, r`~$u\neq 0$ (ou $\ln u$ si $u>0$)`],
          [r`\dfrac{u'}{u^{2}}`, r`-\dfrac{1}{u}`, r`~$u\neq 0$`],
          [r`\dfrac{u'}{\sqrt{u}}`, r`2\sqrt{u}`, r`~$u>0$`],
          [r`u'\,e^{u}`, r`e^{u}`, ''],
          [r`u'\cos u`, r`\sin u`, ''],
          [r`u'\sin u`, r`-\cos u`, ''],
        ],
      },
      {
        titre: 'Règles',
        colonnes: ['Énoncé', 'Formule'],
        lignes: [
          [r`~Somme et multiple`, r`F+G\ \text{primitive de}\ f+g\ ;\quad kF\ \text{primitive de}\ kf`],
          [r`~Toutes les primitives de $f$`, r`F(x)+C,\quad C\in\mathbb{R}`],
          [r`~Primitive prenant la valeur $y_0$ en $x_0$`, r`~une seule : on détermine $C$ avec $F(x_0)=y_0$`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'limites',
    titre: 'Limites',
    fiches: [
      {
        titre: 'Limites usuelles en l’infini',
        colonnes: ['Fonction', 'En $+\\infty$', 'En $-\\infty$'],
        lignes: [
          [r`x^{n}\ (n\geq 1)`, r`+\infty`, r`~$+\infty$ si $n$ pair, $-\infty$ si $n$ impair`],
          [r`\dfrac{1}{x^{n}}\ (n\geq 1)`, r`0`, r`0`],
          [r`\sqrt{x}`, r`+\infty`, r`~non définie`],
          [r`e^{x}`, r`+\infty`, r`0`],
          [r`\ln x`, r`+\infty`, r`~non définie`],
        ],
      },
      {
        titre: 'Croissances comparées',
        note: '$n$ est un entier naturel non nul. L’exponentielle l’emporte sur les puissances, qui l’emportent sur le logarithme.',
        colonnes: ['Limite', 'Valeur'],
        lignes: [
          [r`\lim_{x\to+\infty}\dfrac{e^{x}}{x^{n}}`, r`+\infty`],
          [r`\lim_{x\to+\infty}\dfrac{\ln x}{x^{n}}`, r`0`],
          [r`\lim_{x\to-\infty}x^{n}e^{x}`, r`0`],
          [r`\lim_{x\to 0^{+}}x^{n}\ln x`, r`0`],
        ],
      },
      {
        titre: 'Limites en un point',
        colonnes: ['Limite', 'Valeur'],
        lignes: [
          [r`\lim_{x\to 0^{+}}\ln x`, r`-\infty`],
          [r`\lim_{x\to 0^{+}}\dfrac{1}{x}`, r`+\infty`],
          [r`\lim_{x\to 0^{-}}\dfrac{1}{x}`, r`-\infty`],
          [r`\lim_{x\to 0}\dfrac{\sin x}{x}`, r`1`],
          [r`\lim_{x\to 0}\dfrac{e^{x}-1}{x}`, r`1`],
          [r`\lim_{x\to 0}\dfrac{\ln(1+x)}{x}`, r`1`],
        ],
      },
      {
        titre: 'Théorèmes et asymptotes',
        colonnes: ['Résultat', 'Énoncé'],
        lignes: [
          [r`~Comparaison`, r`~$f\geq g$ et $\lim g=+\infty$ $\Rightarrow$ $\lim f=+\infty$`],
          [r`~Gendarmes`, r`~$g\leq f\leq h$ et $\lim g=\lim h=\ell$ $\Rightarrow$ $\lim f=\ell$`],
          [r`~Asymptote horizontale`, r`~$\lim_{x\to\pm\infty}f(x)=\ell$ : la droite $y=\ell$`],
          [r`~Asymptote verticale`, r`~$\lim_{x\to a}f(x)=\pm\infty$ : la droite $x=a$`],
          [r`~Composition`, r`~$\lim_{x\to a}u(x)=b$ et $\lim_{X\to b}f(X)=\ell$ $\Rightarrow$ $\lim_{x\to a}f(u(x))=\ell$`],
          [r`~Formes indéterminées`, r`+\infty-\infty\quad 0\times\infty\quad \dfrac{\infty}{\infty}\quad \dfrac{0}{0}`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'continuite',
    titre: 'Continuité',
    fiches: [
      {
        titre: 'Propriétés',
        colonnes: ['Résultat', 'Énoncé'],
        lignes: [
          [r`~Dérivable $\Rightarrow$ continue`, r`~si $f$ est dérivable sur $I$, elle est continue sur $I$`],
          [r`~Fonctions continues`, r`~polynômes, $e^{x}$, $\ln$, $\sqrt{\ }$, $\cos$, $\sin$ sur leur ensemble de définition ; sommes, produits, quotients (dénominateur non nul) et composées de fonctions continues`],
          [r`~Théorème des valeurs intermédiaires`, r`~$f$ continue sur $[a\,;\,b]$ et $k$ compris entre $f(a)$ et $f(b)$ $\Rightarrow$ $f(x)=k$ a au moins une solution dans $[a\,;\,b]$`],
          [r`~Cas strictement monotone`, r`~si de plus $f$ est strictement monotone sur $[a\,;\,b]$, la solution est unique`],
          [r`~Continuité en $a$`, r`\lim_{x\to a}f(x)=f(a)`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'exp-ln',
    titre: 'Exponentielle et logarithme',
    fiches: [
      {
        titre: 'Exponentielle',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Valeurs`, r`e^{0}=1\qquad e^{1}=e\qquad e^{x}>0`],
          [r`~Produit`, r`e^{a+b}=e^{a}\,e^{b}`],
          [r`~Inverse et quotient`, r`e^{-a}=\dfrac{1}{e^{a}}\qquad e^{a-b}=\dfrac{e^{a}}{e^{b}}`],
          [r`~Puissance`, r`(e^{a})^{n}=e^{na}`],
          [r`~Équations et inéquations`, r`e^{a}=e^{b}\Leftrightarrow a=b\qquad e^{a}<e^{b}\Leftrightarrow a<b`],
        ],
      },
      {
        titre: 'Logarithme népérien',
        note: 'Les réels $a$ et $b$ sont strictement positifs.',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Valeurs`, r`\ln 1=0\qquad \ln e=1`],
          [r`~Produit`, r`\ln(ab)=\ln a+\ln b`],
          [r`~Inverse et quotient`, r`\ln\dfrac{1}{a}=-\ln a\qquad \ln\dfrac{a}{b}=\ln a-\ln b`],
          [r`~Puissance et racine`, r`\ln(a^{n})=n\ln a\qquad \ln\sqrt{a}=\dfrac{1}{2}\ln a`],
          [r`~Réciproques`, r`e^{\ln x}=x\ (x>0)\qquad \ln(e^{x})=x\ (x\in\mathbb{R})`],
          [r`~Équations et inéquations`, r`\ln a=\ln b\Leftrightarrow a=b\qquad \ln a<\ln b\Leftrightarrow a<b`],
          [r`~Signe`, r`\ln x<0\ \text{si}\ 0<x<1\qquad \ln x>0\ \text{si}\ x>1`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'trigonometrie',
    titre: 'Trigonométrie',
    fiches: [
      {
        titre: 'Valeurs remarquables',
        colonnes: ['$x$', '$0$', '$\\dfrac{\\pi}{6}$', '$\\dfrac{\\pi}{4}$', '$\\dfrac{\\pi}{3}$', '$\\dfrac{\\pi}{2}$', '$\\pi$'],
        lignes: [
          [r`\cos x`, r`1`, r`\dfrac{\sqrt{3}}{2}`, r`\dfrac{\sqrt{2}}{2}`, r`\dfrac{1}{2}`, r`0`, r`-1`],
          [r`\sin x`, r`0`, r`\dfrac{1}{2}`, r`\dfrac{\sqrt{2}}{2}`, r`\dfrac{\sqrt{3}}{2}`, r`1`, r`0`],
        ],
      },
      {
        titre: 'Relations fondamentales',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Relation fondamentale`, r`\cos^{2}x+\sin^{2}x=1`],
          [r`~Parité`, r`\cos(-x)=\cos x\qquad \sin(-x)=-\sin x`],
          [r`~Périodicité`, r`\cos(x+2\pi)=\cos x\qquad \sin(x+2\pi)=\sin x`],
          [r`~Angles supplémentaires`, r`\cos(\pi-x)=-\cos x\qquad \sin(\pi-x)=\sin x`],
          [r`~Angles complémentaires`, r`\cos\left(\dfrac{\pi}{2}-x\right)=\sin x\qquad \sin\left(\dfrac{\pi}{2}-x\right)=\cos x`],
          [r`~Demi-tour`, r`\cos(x+\pi)=-\cos x\qquad \sin(x+\pi)=-\sin x`],
          [r`~Encadrement`, r`-1\leq\cos x\leq 1\qquad -1\leq\sin x\leq 1`],
        ],
      },
      {
        titre: 'Équations',
        note: '$k$ est un entier relatif.',
        colonnes: ['Équation', 'Solutions'],
        lignes: [
          [r`\cos x=\cos a`, r`x=a+2k\pi\quad\text{ou}\quad x=-a+2k\pi`],
          [r`\sin x=\sin a`, r`x=a+2k\pi\quad\text{ou}\quad x=\pi-a+2k\pi`],
        ],
      },
      {
        titre: 'Formules d’addition et de duplication',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Cosinus d’une somme`, r`\cos(a+b)=\cos a\cos b-\sin a\sin b`],
          [r`~Sinus d’une somme`, r`\sin(a+b)=\sin a\cos b+\cos a\sin b`],
          [r`~Cosinus de $2a$`, r`\cos 2a=\cos^{2}a-\sin^{2}a=2\cos^{2}a-1=1-2\sin^{2}a`],
          [r`~Sinus de $2a$`, r`\sin 2a=2\sin a\cos a`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'suites',
    titre: 'Suites',
    fiches: [
      {
        titre: 'Suites arithmétiques et géométriques',
        colonnes: ['', 'Arithmétique (raison $r$)', 'Géométrique (raison $q$)'],
        lignes: [
          [r`~Récurrence`, r`u_{n+1}=u_{n}+r`, r`u_{n+1}=q\,u_{n}`],
          [r`~Terme général`, r`u_{n}=u_{0}+nr`, r`u_{n}=u_{0}\,q^{n}`],
          [r`~Somme de $u_0$ à $u_n$`, r`\dfrac{(n+1)(u_{0}+u_{n})}{2}`, r`u_{0}\,\dfrac{1-q^{n+1}}{1-q}\ (q\neq 1)`],
        ],
      },
      {
        titre: 'Sommes à connaître',
        colonnes: ['Somme', 'Valeur'],
        lignes: [
          [r`1+2+\dots+n`, r`\dfrac{n(n+1)}{2}`],
          [r`1+q+q^{2}+\dots+q^{n}\ (q\neq 1)`, r`\dfrac{1-q^{n+1}}{1-q}`],
        ],
      },
      {
        titre: 'Limites et convergence',
        colonnes: ['Résultat', 'Énoncé'],
        lignes: [
          [r`~Limite de $q^n$`, r`~$q>1$ : $+\infty$ ; $-1<q<1$ : $0$ ; $q\leq -1$ : pas de limite`],
          [r`~Suite croissante majorée`, r`~elle converge`],
          [r`~Suite décroissante minorée`, r`~elle converge`],
          [r`~Suite croissante non majorée`, r`~elle tend vers $+\infty$`],
          [r`~Limite d’une suite $u_{n+1}=f(u_n)$`, r`~si $(u_n)$ converge vers $\ell$ et $f$ est continue, alors $f(\ell)=\ell$`],
          [r`~Gendarmes`, r`~$v_n\leq u_n\leq w_n$ et $\lim v_n=\lim w_n=\ell$ $\Rightarrow$ $\lim u_n=\ell$`],
        ],
      },
      {
        titre: 'Sens de variation et récurrence',
        colonnes: ['Méthode', 'Principe'],
        lignes: [
          [r`~Signe de la différence`, r`~$u_{n+1}-u_n\geq 0$ pour tout $n$ : $(u_n)$ croissante`],
          [r`~Comparaison au quotient`, r`~$u_n>0$ et $\dfrac{u_{n+1}}{u_n}\geq 1$ : $(u_n)$ croissante`],
          [r`~Raisonnement par récurrence`, r`~initialisation ($P(n_0)$ vraie), hérédité ($P(n)\Rightarrow P(n+1)$), conclusion`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'integrales',
    titre: 'Calcul intégral',
    fiches: [
      {
        titre: 'Définition et propriétés',
        note: '$f$ est continue sur $[a\\,;\\,b]$ et $F$ est une primitive de $f$.',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Définition`, r`\displaystyle\int_{a}^{b}f(x)\,dx=F(b)-F(a)=\Big[F(x)\Big]_{a}^{b}`],
          [r`~Linéarité`, r`\displaystyle\int_{a}^{b}\big(\alpha f+\beta g\big)=\alpha\int_{a}^{b}f+\beta\int_{a}^{b}g`],
          [r`~Relation de Chasles`, r`\displaystyle\int_{a}^{c}f=\int_{a}^{b}f+\int_{b}^{c}f`],
          [r`~Bornes inversées`, r`\displaystyle\int_{b}^{a}f=-\int_{a}^{b}f`],
          [r`~Positivité ($a\leq b$)`, r`~si $f\geq 0$ sur $[a\,;\,b]$, alors $\int_{a}^{b}f\geq 0$`],
          [r`~Croissance ($a\leq b$)`, r`~si $f\leq g$ sur $[a\,;\,b]$, alors $\int_{a}^{b}f\leq\int_{a}^{b}g$`],
        ],
      },
      {
        titre: 'Aire, valeur moyenne, intégration par parties',
        colonnes: ['Notion', 'Formule'],
        lignes: [
          [r`~Aire sous la courbe ($f\geq 0$)`, r`\mathcal{A}=\displaystyle\int_{a}^{b}f(x)\,dx\ \text{(en unités d’aire)}`],
          [r`~Aire entre deux courbes ($f\geq g$)`, r`\mathcal{A}=\displaystyle\int_{a}^{b}\big(f(x)-g(x)\big)\,dx`],
          [r`~Valeur moyenne de $f$ sur $[a\,;\,b]$`, r`\mu=\dfrac{1}{b-a}\displaystyle\int_{a}^{b}f(x)\,dx`],
          [r`~Intégration par parties`, r`\displaystyle\int_{a}^{b}u'(x)\,v(x)\,dx=\Big[u(x)\,v(x)\Big]_{a}^{b}-\int_{a}^{b}u(x)\,v'(x)\,dx`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'equations-differentielles',
    titre: 'Équations différentielles',
    fiches: [
      {
        titre: 'Équations de la forme $y\'=ay+b$',
        note: '$a$ et $b$ sont des réels, $C$ une constante réelle.',
        colonnes: ['Équation', 'Solutions'],
        lignes: [
          [r`y'=f`, r`y(x)=F(x)+C\ \ (F\ \text{primitive de}\ f)`],
          [r`y'=ay`, r`y(x)=C\,e^{ax}`],
          [r`y'=ay+b\ (a\neq 0)`, r`y(x)=C\,e^{ax}-\dfrac{b}{a}`],
          [r`~Condition initiale $y(x_0)=y_0$`, r`~une seule solution : on détermine $C$`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'probabilites',
    titre: 'Probabilités',
    fiches: [
      {
        titre: 'Probabilités conditionnelles',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Probabilité conditionnelle`, r`P_{B}(A)=\dfrac{P(A\cap B)}{P(B)}\quad(P(B)\neq 0)`],
          [r`~Probabilité d’une intersection`, r`P(A\cap B)=P(B)\,P_{B}(A)`],
          [r`~Probabilités totales`, r`P(A)=P(A\cap B)+P(A\cap\overline{B})`],
          [r`~Événement contraire`, r`P(\overline{A})=1-P(A)`],
          [r`~Indépendance`, r`A\ \text{et}\ B\ \text{indépendants}\Leftrightarrow P(A\cap B)=P(A)\,P(B)`],
          [r`~Réunion`, r`P(A\cup B)=P(A)+P(B)-P(A\cap B)`],
        ],
      },
      {
        titre: 'Variable aléatoire',
        colonnes: ['Notion', 'Formule'],
        lignes: [
          [r`~Espérance`, r`E(X)=\displaystyle\sum_{i=1}^{k}x_{i}\,p_{i}`],
          [r`~Variance`, r`V(X)=\displaystyle\sum_{i=1}^{k}p_{i}\big(x_{i}-E(X)\big)^{2}=E(X^{2})-E(X)^{2}`],
          [r`~Écart type`, r`\sigma(X)=\sqrt{V(X)}`],
          [r`~Transformation affine`, r`E(aX+b)=aE(X)+b\qquad V(aX+b)=a^{2}V(X)`],
          [r`~Somme`, r`E(X+Y)=E(X)+E(Y)`],
          [r`~Somme (variables indépendantes)`, r`V(X+Y)=V(X)+V(Y)`],
        ],
      },
      {
        titre: 'Loi binomiale $\\mathcal{B}(n,p)$',
        colonnes: ['Notion', 'Formule'],
        lignes: [
          [r`~Probabilité`, r`P(X=k)=\dbinom{n}{k}\,p^{k}(1-p)^{n-k}`],
          [r`~Espérance`, r`E(X)=np`],
          [r`~Variance`, r`V(X)=np(1-p)`],
          [r`~Écart type`, r`\sigma(X)=\sqrt{np(1-p)}`],
        ],
      },
      {
        titre: 'Concentration et loi des grands nombres',
        note: '$M_n=\\dfrac{X_1+\\dots+X_n}{n}$ avec des variables indépendantes de même loi, d’espérance $\\mu$ et de variance $V$.',
        colonnes: ['Inégalité', 'Énoncé'],
        lignes: [
          [r`~Markov ($X\geq 0$, $a>0$)`, r`P(X\geq a)\leq\dfrac{E(X)}{a}`],
          [r`~Bienaymé-Tchebychev ($\delta>0$)`, r`P\big(|X-E(X)|\geq\delta\big)\leq\dfrac{V(X)}{\delta^{2}}`],
          [r`~Moyenne $M_n$`, r`E(M_{n})=\mu\qquad V(M_{n})=\dfrac{V}{n}`],
          [r`~Concentration`, r`P\big(|M_{n}-\mu|\geq\delta\big)\leq\dfrac{V}{n\,\delta^{2}}`],
          [r`~Loi des grands nombres`, r`\lim_{n\to+\infty}P\big(|M_{n}-\mu|\geq\delta\big)=0`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'denombrement',
    titre: 'Dénombrement',
    fiches: [
      {
        titre: 'Façons de choisir',
        note: '$n!=n\\times(n-1)\\times\\dots\\times 1$ et $0!=1$.',
        colonnes: ['Situation', 'Nombre'],
        lignes: [
          [r`~$k$-uplets d’un ensemble à $n$ éléments (avec répétition)`, r`n^{k}`],
          [r`~Arrangements de $k$ éléments parmi $n$ (ordre, sans répétition)`, r`\dfrac{n!}{(n-k)!}`],
          [r`~Permutations de $n$ éléments`, r`n!`],
          [r`~Combinaisons de $k$ éléments parmi $n$ (sans ordre)`, r`\dbinom{n}{k}=\dfrac{n!}{k!\,(n-k)!}`],
        ],
      },
      {
        titre: 'Coefficients binomiaux',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Valeurs`, r`\dbinom{n}{0}=1\qquad \dbinom{n}{1}=n\qquad \dbinom{n}{n}=1`],
          [r`~Symétrie`, r`\dbinom{n}{k}=\dbinom{n}{n-k}`],
          [r`~Relation de Pascal`, r`\dbinom{n}{k}+\dbinom{n}{k+1}=\dbinom{n+1}{k+1}`],
          [r`~Somme`, r`\displaystyle\sum_{k=0}^{n}\dbinom{n}{k}=2^{n}`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'espace',
    titre: 'Géométrie dans l’espace',
    fiches: [
      {
        titre: 'Vecteurs et produit scalaire',
        note: r`Repère orthonormé $(O\,;\,\vec{\imath},\vec{\jmath},\vec{k})$, $\vec{u}\,(x\,;y\,;z)$ et $\vec{v}\,(x'\,;y'\,;z')$.`,
        colonnes: ['Notion', 'Formule'],
        lignes: [
          [r`~Vecteur $\overrightarrow{AB}$`, r`\overrightarrow{AB}\,(x_{B}-x_{A}\,;\,y_{B}-y_{A}\,;\,z_{B}-z_{A})`],
          [r`~Distance $AB$`, r`AB=\sqrt{(x_{B}-x_{A})^{2}+(y_{B}-y_{A})^{2}+(z_{B}-z_{A})^{2}}`],
          [r`~Milieu de $[AB]$`, r`\left(\dfrac{x_{A}+x_{B}}{2}\,;\,\dfrac{y_{A}+y_{B}}{2}\,;\,\dfrac{z_{A}+z_{B}}{2}\right)`],
          [r`~Norme`, r`\|\vec{u}\|=\sqrt{x^{2}+y^{2}+z^{2}}`],
          [r`~Produit scalaire`, r`\vec{u}\cdot\vec{v}=xx'+yy'+zz'=\|\vec{u}\|\,\|\vec{v}\|\cos\theta`],
          [r`~Orthogonalité`, r`\vec{u}\perp\vec{v}\Leftrightarrow\vec{u}\cdot\vec{v}=0`],
          [r`~Colinéarité`, r`\vec{u}\ \text{et}\ \vec{v}\ \text{colinéaires}\Leftrightarrow\vec{u}=k\vec{v}\ \text{(ou}\ \vec{v}=\vec{0}\text{)}`],
        ],
      },
      {
        titre: 'Droites et plans',
        colonnes: ['Objet', 'Représentation'],
        lignes: [
          [r`~Droite passant par $A\,(x_A\,;y_A\,;z_A)$, dirigée par $\vec{u}\,(\alpha\,;\beta\,;\gamma)$`, r`\begin{cases}x=x_{A}+t\alpha\\ y=y_{A}+t\beta\\ z=z_{A}+t\gamma\end{cases}\quad t\in\mathbb{R}`],
          [r`~Plan de vecteur normal $\vec{n}\,(a\,;b\,;c)$`, r`ax+by+cz+d=0`],
          [r`~Plan passant par $A$ de vecteur normal $\vec{n}$`, r`\overrightarrow{AM}\cdot\vec{n}=0`],
          [r`~Droite orthogonale à un plan`, r`~sa direction $\vec{u}$ est colinéaire à $\vec{n}$`],
          [r`~Droite parallèle à un plan`, r`~$\vec{u}\cdot\vec{n}=0$`],
        ],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'rappels',
    titre: 'Rappels de calcul',
    fiches: [
      {
        titre: 'Identités remarquables',
        colonnes: ['Nom', 'Formule'],
        lignes: [
          [r`~Carré d’une somme`, r`(a+b)^{2}=a^{2}+2ab+b^{2}`],
          [r`~Carré d’une différence`, r`(a-b)^{2}=a^{2}-2ab+b^{2}`],
          [r`~Différence de deux carrés`, r`a^{2}-b^{2}=(a-b)(a+b)`],
        ],
      },
      {
        titre: 'Second degré $ax^2+bx+c$',
        note: '$a\\neq 0$ ; on pose $\\Delta=b^{2}-4ac$.',
        colonnes: ['Cas', 'Résultat'],
        lignes: [
          [r`~$\Delta>0$`, r`x_{1}=\dfrac{-b-\sqrt{\Delta}}{2a}\qquad x_{2}=\dfrac{-b+\sqrt{\Delta}}{2a}`],
          [r`~$\Delta=0$`, r`x_{0}=-\dfrac{b}{2a}`],
          [r`~$\Delta<0$`, r`~pas de solution réelle`],
          [r`~Forme canonique`, r`a\left(x+\dfrac{b}{2a}\right)^{2}-\dfrac{\Delta}{4a}`],
          [r`~Signe`, r`~signe de $a$ à l’extérieur des racines, signe de $-a$ entre les racines`],
        ],
      },
      {
        titre: 'Puissances et racines',
        note: '$a$ et $b$ sont non nuls, $m$ et $n$ sont des entiers relatifs.',
        colonnes: ['Propriété', 'Formule'],
        lignes: [
          [r`~Produit`, r`a^{m}\,a^{n}=a^{m+n}`],
          [r`~Quotient`, r`\dfrac{a^{m}}{a^{n}}=a^{m-n}`],
          [r`~Puissance d’une puissance`, r`(a^{m})^{n}=a^{mn}`],
          [r`~Puissance d’un produit`, r`(ab)^{n}=a^{n}b^{n}`],
          [r`~Exposant négatif`, r`a^{-n}=\dfrac{1}{a^{n}}`],
          [r`~Racine carrée`, r`\sqrt{ab}=\sqrt{a}\sqrt{b}\quad\text{et}\quad\sqrt{a^{2}}=|a|`],
        ],
      },
    ],
  },
];
