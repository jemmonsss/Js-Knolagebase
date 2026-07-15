---
title: "Editing Settings"
layout: wiki
category: "using-this-wiki"
order: 20
toc: true
---

# Editing Settings

This manual explains how to change site title, colors, navigation, and plugins.

## Site Identity

Edit `_config.yml`:

```yaml
title: "My Knowledge Base"
description: "A customizable wiki-style documentation site."
url: "https://username.github.io"
baseurl: "/repository-name"
logo: "/assets/images/logo.svg"
```

## Branding

Change colors and fonts in `_config.yml` under `brand:`:

```yaml
brand:
  primary_color: "#2563eb"
  font_heading: "Inter, sans-serif"
```

For advanced CSS, edit `_sass/_variables.scss`.

## Navigation

Edit `_data/navigation.yml`. Each item needs a `title` and `url`:

```yaml
- title: "Home"
  url: "/"
- title: "Wiki"
  url: "/wiki/"
```

## Plugins

Add gems to `Gemfile` and list them in `_config.yml`:

```yaml
plugins:
  - jekyll-feed
  - jekyll-sitemap
```

## Search

Search is enabled by default. To disable it, set `search.enabled: false` in `_config.yml`. To hide a page from search results, add `search_exclude: true` to its front matter.
