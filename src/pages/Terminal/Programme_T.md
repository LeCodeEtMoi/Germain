---
layout: ../../layouts/Leçon.astro
title: "Chapitre : Equations Differentielles"
date: "09 Aug 2022"
---

### 1. Limites de fonctions et de suites
#### Contenus :

Limite d’une fonction ou d’une suite en un point, en +∞+∞, en −∞−∞.

Limites usuelles.
Opérations sur les limites.
Croissances comparées : xnxn, exex, ln⁡xlnx (en +∞+∞ et 0+0+).
Majoration / minoration / encadrement.
Terme prépondérant.

#### Capacités attendues :

Calcul de limites dans des cas simples.

Interprétation des asymptotes (horizontales, verticales).

#### Démonstration exigée :

Croissance comparée : xn≪exxn≪ex en +∞+∞.

#### Approfondissements :

Asymptotes obliques.

Branches infinies.

### 2. Dérivation approfondie
#### Contenus :

Fonction composée : (v∘u)′=(v′∘u)⋅u′(v∘u)′=(v′∘u)⋅u′.

Dérivée seconde.

Convexité :

Par position relative aux sécantes.

Par croissance de f′f′, ou f′′>0f′′>0.

Point d’inflexion.

#### Capacités attendues :

Calcul de dérivées (y compris composées).

Étude des variations.

Démonstration d’inégalités via la convexité.

Lecture graphique des propriétés de ff, f′f′, f′′f′′.

#### Démonstration exigée :

f′′>0⇒f′′>0⇒ courbe au-dessus des tangentes.

#### Approfondissements :

Courbe de Lorenz.

Dérivée n-ième.

Inégalité arithmético-géométrique.

### 3. Continuité
#### Contenus :

Continuité en un point (définie par la limite).

Fonction dérivable ⇒ continue.

Image d’une suite convergente.

Théorème des valeurs intermédiaires.

#### Capacités attendues :

Résolution d’équation f(x)=kf(x)=k par encadrement, unicité.
Étude d’une suite définie par récurrence un+1=f(un)un+1​=f(un​).

#### Algorithmes :

Dichotomie.

Méthode de Newton, de la sécante.

#### Approfondissements :

Démo du TVI par dichotomie.

Fonctions additives : f(x+y)=f(x)+f(y)f(x+y)=f(x)+f(y).

Prolongement par continuité.

### 4. Fonction logarithme népérien
### Contenus :

Fonction ln⁡ln comme réciproque de exex.

Propriétés algébriques : ln⁡(ab),ln⁡(an)ln(ab),ln(an), etc.

Dérivée, variations, limites, courbe représentative.

Croissance comparée avec xnxn.

#### Capacités attendues :

Utiliser équations fonctionnelles : transformer, résoudre.

Résolution de problèmes utilisant e^x, ln⁡(x).

#### Démonstration exigée :

(ln⁡x)′=1x(lnx)′=x1​ (admis).

lim⁡x→0+xln⁡x=0limx→0+​xlnx=0.

#### Algorithme :

Algorithme de Briggs.

#### Approfondissements :

Fonction xαxα.

Limite de (1+xn)n(1+nx​)n.

### 5. Fonctions trigonométriques
### Contenus :

Dérivées de sin⁡xsinx et cos⁡xcosx.

Variations, courbes représentatives.

#### Capacités attendues :

Résolution d’équations/ inéquations trigonométriques.

Études de fonctions avec sinus et cosinus.

#### Approfondissement :

Fonction tangente.

### 6. Primitives et équations différentielles
### Contenus :

Primitive : opération inverse de la dérivation.

Primitives de référence : xnxn, exex, ln⁡xlnx, sin⁡xsinx, cos⁡xcosx.

Équation différentielle :

y′=fy′=f

y′=ayy′=ay

y′=ay+by′=ay+b

#### Capacités attendues :

Calcul de primitives (cas simples, formule (v’∘u)⋅u’(v’∘u)⋅u’).

Résolution des équations différentielles du type :

y′=ay+by′=ay+b

y′=ay+fy′=ay+f, via une solution particulière.

#### Démonstrations exigées :

Deux primitives diffèrent d’une constante.

Résolution de y′=ayy′=ay.

#### Approfondissements :

Équation logistique, y′=y2y′=y2, y′′+ω2y=0y′′+ω2y=0.

#### Algorithme :

Méthode d’Euler pour la résolution approchée.

### .7 Calcul intégral
Objectifs
L’objectif est d’introduire la notion d’intégrale comme outil de calcul d’aire et d’étendre les capacités de calcul des élèves au travers d’exemples concrets et d’interprétations graphiques. On souhaite également qu’ils comprennent le lien entre l'intégrale définie et la notion de primitive.

Contenus

    Aire sous la courbe d’une fonction positive, continue sur un intervalle [a ; b] :
    ∫abf(x) dx
    ∫ab​f(x)dx

    Notion d’intégrale définie : définition comme aire algébrique.

    Linéarité de l’intégrale, relation de Chasles :
    ∫abf(x) dx+∫bcf(x) dx=∫acf(x) dx
    ∫ab​f(x)dx+∫bc​f(x)dx=∫ac​f(x)dx

    Relation entre intégrale et primitives :
    Si FF est une primitive de ff sur [a;b][a;b], alors :
    ∫abf(x) dx=F(b)−F(a)
    ∫ab​f(x)dx=F(b)−F(a)

    Calcul d’aires de domaines délimités par des courbes dans le plan (le cas simple : entre une courbe et l’axe des abscisses, ou entre deux courbes).

    Utilisation de l’intégrale pour déterminer une valeur moyenne d’une fonction continue positive sur un intervalle.

Capacités attendues

    Déterminer une aire sous une courbe représentative d’une fonction continue positive.

    Calculer une intégrale définie à l’aide d’une primitive.

    Utiliser les propriétés de linéarité et de relation de Chasles pour simplifier un calcul.

    Calculer une aire entre deux courbes.

    Déterminer la valeur moyenne d’une fonction sur un intervalle.

Approfondissements possibles

    Introduction de la valeur absolue dans les calculs d’aire.

    Interprétation physique (travail, déplacement, etc.).

    Calculs approchés d'intégrales (méthode des rectangles ou des trapèzes).

Algorithmique et programmation associée

    Écriture d’un algorithme pour estimer une intégrale par une méthode numérique simple (trapèzes ou rectangles).

    Calcul de la valeur moyenne d’une fonction par approximation.