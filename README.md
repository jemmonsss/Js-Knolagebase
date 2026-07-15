# My Knowledge Base

A customizable, wiki-style documentation site powered by Jekyll and hosted on GitHub Pages.

## What Is This?

This is a ready-to-use knowledge base template. It turns a GitHub repository into a fast, searchable, responsive documentation website. You add content by writing Markdown files, and the site builds and deploys automatically.

## Live Site

**Preview:** `https://<your-username>.github.io/<your-repo>/`

Replace the URL with your own GitHub Pages address. After enabling GitHub Pages, this site is live.

## Features

- **Write in Markdown:** Add `.md` files to `_wiki/<category>/` and they become pages instantly.
- **Client-side search:** Built-in search index (`search.json`) powers instant search across all pages.
- **Dark / light mode:** Toggle theme per session with localStorage persistence.
- **Responsive navigation:** Hamburger menu on mobile, sticky header, and active-page highlighting.
- **Category browsing:** Auto-generated category pages with article cards.
- **Table of contents:** Add `toc: true` to front matter to show a sidebar TOC.
- **Related articles:** Each wiki page shows up to 3 related articles from the same category.
- **Edit links:** "Edit this page on GitHub" links on every article.
- **Code copy buttons:** One-click copy for all code blocks.
- **Reading progress bar:** Visual progress indicator at the top of each page.
- **Back to top:** Floating button appears after scrolling.

## Site Structure

```
├── _wiki/                  # Wiki content (Markdown)
│   ├── <category>/
│   │   └── <article>.md
│   └── using-this-wiki/   # Self-documenting manual
├── _docs/                  # Long-form documentation
├── _data/                  # Navigation, categories, sidebar
├── _sass/                  # SCSS stylesheets
├── _layouts/               # HTML layouts
├── _includes/              # Reusable partials
├── _plugins/               # Custom Jekyll plugins
└── assets/                 # CSS, JS, images
```

## Quick Start

1. **Use this template** or clone the repository.
2. **Edit `_config.yml`** with your site title, URL, and baseurl.
3. **Enable GitHub Pages** in repo **Settings > Pages > Source: GitHub Actions**.
4. **Push to `main`**. The GitHub Actions workflow builds and deploys the site.

## Documentation

The wiki includes a complete manual. Start here:

- **[Using This Wiki](/wiki/using-this-wiki/)** — Overview and quick reference
- **[Adding Content](/wiki/using-this-wiki/adding-content/)** — How to create pages and categories
- **[Editing Settings](/wiki/using-this-wiki/editing-settings/)** — Branding, navigation, plugins
- **[Managing Repo](/wiki/using-this-wiki/managing-repo/)** — GitHub workflow and troubleshooting
- **[Using This Wiki Fully](/wiki/using-this-wiki/fully/)** — Complete guide with cheat sheets

## Template for New Pages

A copy-paste template is available at:

`_wiki/using-this-wiki/templates/page-template.md`

## Local Preview

```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Open http://localhost:4000/<baseurl>/
```

## Troubleshooting

- **Build fails:** Check the **Actions** tab in GitHub for error logs.
- **404 on pages:** Verify `baseurl` in `_config.yml` matches your repo name exactly.
- **Search returns nothing:** Ensure `search.json` exists in the built `_site/` folder.
- **Styles look broken:** Hard refresh (`Ctrl+Shift+R`) to clear cached CSS.

## License

MIT
