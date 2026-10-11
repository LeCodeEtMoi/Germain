#!/usr/bin/env fish
# Réorganise src/ du projet Germain.
#
#   fish reorganiser.fish            -> simulation : affiche ce qui serait fait
#   fish reorganiser.fish --apply    -> effectue réellement les déplacements
#
# À lancer depuis la racine du projet (le dossier qui contient src/).
# Les pages (src/pages) ne sont PAS touchées : leurs URL restent identiques.

set -l apply 0
if contains -- --apply $argv
    set apply 1
end

# ---------- Vérifications ----------
if not test -d src/components
    echo "Erreur : lancez ce script depuis la racine du projet (src/components introuvable)."
    exit 1
end

if not git rev-parse --is-inside-work-tree >/dev/null 2>&1
    echo "Erreur : ce dossier n'est pas un dépôt git."
    exit 1
end

if test $apply -eq 1; and test -n "(git status --porcelain)"
    echo "Erreur : il reste des modifications non commitées."
    echo "Faites un commit avant, pour pouvoir annuler avec : git reset --hard; git clean -fd src"
    exit 1
end

if not grep -q '"@/\*"' tsconfig.json 2>/dev/null
    echo "Attention : l'alias @/ ne semble pas défini dans tsconfig.json."
    echo '  Ajoutez dans "compilerOptions" :  "baseUrl": ".", "paths": { "@/*": ["src/*"] }'
    echo
end

# ---------- Plan de rangement ----------
set -l layout BaseHead.astro Header.astro HeaderLink.astro Footer.astro \
    FormattedDate.astro SearchBar.astro Tag.astro Content.astro
set -l math MathTex.tsx EditableMathInput.tsx MathToolbar.tsx MathToolbar.css
set -l exercice ExerciceUI.tsx Explication.tsx Questions.tsx Outils.tsx

set -l niveaux \
    college/6eme college/5eme college/4eme college/3eme \
    lycee/seconde lycee/premiere lycee/terminale \
    superieur

# ---------- Fonctions ----------
function deplacer --argument-names apply fichier dest
    if not test -e $fichier
        return
    end
    echo "  $fichier  ->  $dest/"
    if test $apply -eq 1
        mkdir -p $dest
        git mv $fichier $dest/ 2>/dev/null; or mv $fichier $dest/
    end
end

# Réécrit tout import relatif (ou @/ ~/) se terminant par NOM vers DEST.
function reecrire --argument-names nom dest
    set -l fichiers (find src -type f \( -name '*.astro' -o -name '*.tsx' -o -name '*.ts' \
        -o -name '*.jsx' -o -name '*.js' -o -name '*.mdx' \))
    env NOM=$nom DEST=$dest perl -pi -e \
        's{(["\x27])(?:\.{1,2}|[@~])/(?:[^"\x27]*/)?\Q$ENV{NOM}\E((?:\.\w+)?)\1}{$1$ENV{DEST}$2$1}g' \
        $fichiers
end

# ---------- 1. Déplacements ----------
echo "== Composants de mise en page =="
for f in $layout
    deplacer $apply src/components/$f src/components/layout
end

echo "== Composants mathématiques =="
for f in $math
    deplacer $apply src/components/$f src/components/math
end

echo "== Composants d'exercice =="
for f in $exercice
    deplacer $apply src/components/$f src/components/exercice
end

echo "== Exercices de Terminale =="
for f in src/components/Ex_*_T.tsx
    deplacer $apply $f src/exercices/lycee/terminale
end

echo "== Dossiers des niveaux =="
for n in $niveaux
    echo "  src/exercices/$n/"
    if test $apply -eq 1
        mkdir -p src/exercices/$n
        if test -z "(ls -A src/exercices/$n)"
            touch src/exercices/$n/.gitkeep
        end
    end
end

if test $apply -eq 0
    echo
    echo "Simulation terminée, rien n'a été modifié."
    echo "Les imports seraient ensuite réécrits avec l'alias @/ (ex. @/components/math/MathTex)."
    echo "Pour appliquer : fish reorganiser.fish --apply"
    exit 0
end

# ---------- 2. Réécriture des imports ----------
echo "== Réécriture des imports =="
for f in $layout
    reecrire (path change-extension '' $f) @/components/layout/(path change-extension '' $f)
end
for f in $math
    reecrire (path change-extension '' $f) @/components/math/(path change-extension '' $f)
end
for f in $exercice
    reecrire (path change-extension '' $f) @/components/exercice/(path change-extension '' $f)
end
for f in src/exercices/lycee/terminale/Ex_*_T.tsx
    set -l nom (path change-extension '' (path basename $f))
    reecrire $nom @/exercices/lycee/terminale/$nom
end

# Imports relatifs vers lib/ et vers les composants restés à la racine de components/
set -l fichiers (find src -type f \( -name '*.astro' -o -name '*.tsx' -o -name '*.ts' \
    -o -name '*.jsx' -o -name '*.js' -o -name '*.mdx' \))
perl -pi -e 's{(["\x27])(?:\.{1,2}/)+lib/}{$1\@/lib/}g' $fichiers

# Les fichiers déplacés qui importaient un voisin resté dans components/ (ui/, About, Random…)
set -l deplaces (find src/components/layout src/components/math src/components/exercice \
    src/exercices -type f \( -name '*.astro' -o -name '*.tsx' -o -name '*.ts' \))
perl -pi -e 's{(["\x27])\./(ui/|About|Toto|Random|RandomPoint3D)}{$1\@/components/$2}g' $deplaces

echo
echo "Terminé. Vérifiez maintenant :"
echo "  git status"
echo "  npm run build      (ou : npx astro check)"
echo "Pour tout annuler : git reset --hard; git clean -fd src"