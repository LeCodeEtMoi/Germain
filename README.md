# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

Mise en place de la base de donnée pour que la communotée puis intervenir 
MariaDB comme base de donée 

sudo apt update
sudo apt install mariadb-server
sudo systemctl enable mariadb
sudo systemctl start mariadb

Sécurisation
sudo mysql_secure_installation
Définir mot de passe root, supprimer comptes anonymes, désactiver accès root distant.

Connectez-vous à MariaDB :
sudo mariadb

Puis

CREATE DATABASE base_utilisateurs;
CREATE USER 'utilisateur'@'%' IDENTIFIED BY 'mot_de_passe_fort';
GRANT ALL PRIVILEGES ON base_utilisateurs.* TO 'utilisateur'@'%';
FLUSH PRIVILEGES;


Accès distant sécurisé (optionnel)

Modifier le fichier de config :
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

Remplacez bind-address = 127.0.0.1 par bind-address = 0.0.0.0 (ou votre IP locale uniquement).

Sécurité

Activez un pare-feu (ufw)

sudo ufw allow from 192.168.0.0/24 to any port 3306

Ou mieux : utilisez un tunnel SSH pour accéder à votre base depuis l’extérieur.

Avantages de cette méthode :

100% auto-hébergé.

Aucune dépendance à un service externe.

Chiffrable en local (avec fail2ban, ssh, VPN, etc.).# Germain
# Germain
# Germain
# Germain
