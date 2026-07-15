---
title: "Installation"
layout: wiki
category: "getting-started"
order: 20
toc: true
---

# Installation

This guide covers local setup for development, customization, and offline previewing. You only need this if you want to edit files on your computer before publishing.

## Prerequisites

- **Ruby** (Jekyll is built on Ruby)
- **Bundler** (manages Ruby gem dependencies)
- **Git** (to clone and push changes)

On Windows, the easiest path is the [RubyInstaller](https://rubyinstaller.org/) with the DevKit. On macOS, install Ruby via Homebrew. On Linux, use your package manager.

## Step 1: Clone the repository

```bash
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>
```

Replace `<username>` and `<repository-name>` with your actual GitHub username and repository name.

## Step 2: Install dependencies

```bash
bundle install
```

This reads `Gemfile` and installs every Ruby gem the site needs (Jekyll, plugins, etc.). It may take a minute the first time.

## Step 3: Run the local server

```bash
bundle exec jekyll serve
```

Open `http://localhost:4000/<baseurl>/` in your browser. The site watches for file changes and refreshes automatically as you edit.

## Directory structure

| Path | Purpose |
|------|---------|
| `_wiki/` | Wiki articles organized by category folders |
| `_docs/` | Optional long-form documentation |
| `_data/` | Navigation, categories, sidebar, and template registry |
| `_layouts/` | HTML page templates |
| `_includes/` | Reusable HTML snippets (header, footer, nav, sidebar, TOC) |
| `_sass/` | SCSS stylesheets split by feature |
| `_plugins/` | Custom Jekyll plugins |
| `assets/css/` | CSS entry point and editor styles |
| `assets/js/` | JavaScript (main.js, search.js, editor.js) |
| `assets/images/` | Logos, diagrams, and other images |

## Environment variables

No secrets are required for local builds. For production, set `JEKYLL_ENV=production` to enable environment-specific features:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

GitHub Actions sets this automatically during deployment.

## Common issues

| Issue | Fix |
|-------|-----|
| `bundle install` fails | Make sure Ruby is installed and up to date. On Windows, use RubyInstaller with DevKit. |
| Port 4000 is busy | Stop the other process, or run `bundle exec jekyll serve --port 4001` |
| Styles look broken | Run `bundle exec jekyll clean` then `bundle exec jekyll serve` to rebuild from scratch |
| Changes don't appear | Check the terminal output for errors. Make sure you saved the file. |

## Next steps

- Add your first page following the guide in [Adding Content]({{ '/wiki/using-this-wiki/adding-content/' | relative_url }}).
- Change the site title, colors, and navigation in [Editing Settings]({{ '/wiki/using-this-wiki/editing-settings/' | relative_url }}).
