---
title: "Editing Settings"
layout: wiki
category: "using-this-wiki"
order: 20
toc: true
---

# Editing Settings

This page explains how to change the site identity, colors, fonts, navigation, plugins, and other behavior. All changes are made by editing files in the repository and pushing to GitHub.

## Site identity

Edit `_config.yml` at the root of the repository:

```yaml
title: "My Knowledge Base"
description: "A customizable wiki-style documentation site."
url: "https://<username>.github.io"
baseurl: "/<repository-name>"
logo: "/assets/images/logo.svg"
```

| Field | What it does |
|-------|--------------|
| `title` | Shown in the browser tab and site header |
| `description` | Used for SEO and the meta description tag |
| `url` | The root domain of your live site |
| `baseurl` | The repository name prefixed with `/`. Must match your repo name exactly. |
| `logo` | Path to your logo image inside `assets/images/` |

## Change colors and fonts

Brand colors and fonts are set in `_config.yml` under `brand:`:

```yaml
brand:
  primary_color: "#2563eb"
  secondary_color: "#1e40af"
  accent_color: "#f59e0b"
  font_heading: "Inter, sans-serif"
  font_body: "Inter, sans-serif"
```

For advanced styling, edit the SCSS variables in `_sass/_variables.scss`.

## Change navigation links

Edit `_data/navigation.yml`:

```yaml
- title: "Home"
  url: "/"
- title: "Wiki"
  url: "/wiki/"
- title: "Getting Started"
  url: "/wiki/getting-started/"
```

Each item needs a `title` and a `url`. Keep the URLs consistent with the paths in your content.

## Change sidebar links

Edit `_data/sidebar.yml` to control the sidebar shown on wiki pages.

## Enable or disable search

Search is enabled by default. To disable it, edit `_config.yml`:

```yaml
search:
  enabled: false
```

To hide a single page from search, add `search_exclude: true` to that page's front matter.

## Dark mode

The site includes a dark mode toggle. To change the default theme, edit `_config.yml`:

```yaml
appearance:
  default: dark
  toggle: true
```

Set `default` to `light` or `dark`. Set `toggle` to `false` to hide the theme button.

## Plugins

This site uses several Jekyll plugins. To add a new plugin:

1. Add the gem to `Gemfile`.
2. Add the plugin name to `_config.yml` under `plugins:`.
3. Commit and push.

Enabled by default:

- `jekyll-feed` — generates an Atom feed
- `jekyll-sitemap` — generates a sitemap for SEO
- `jekyll-seo-tag` — adds social sharing meta tags
- `jekyll-archives` — generates category archive pages
- `jekyll-include-cache` — speeds up includes
- `jekyll-last-modified-at` — shows last-modified dates

If you deploy via GitHub Actions, any gem is supported. If you use native GitHub Pages, stick to the [whitelisted plugins](https://pages.github.com/versions/).

## Categories

Edit `_data/categories.yml` to change the category sections shown on the `/wiki/` landing page:

```yaml
- slug: getting-started
  title: Getting Started
  description: Learn the basics of setting up and using this knowledge base.
  url: /wiki/getting-started/
  icon: book-open
```

The `slug` must match the folder name under `_wiki/`. The `icon` uses [Feather Icons](https://feathericons.com/) names.
