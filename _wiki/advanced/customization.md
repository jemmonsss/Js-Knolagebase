---
title: "Customization"
layout: wiki
category: "advanced"
order: 10
toc: true
---

# Customization

This guide shows you how to change the look, feel, and structure of the site. All customization is done through configuration files and SCSS stylesheets — no JavaScript knowledge required for basic changes.

## Brand colors and fonts

Edit `_config.yml` under the `brand` section:

```yaml
brand:
  primary_color: "#2563eb"
  secondary_color: "#1e40af"
  accent_color: "#f59e0b"
  font_heading: "Inter, sans-serif"
  font_body: "Inter, sans-serif"
```

These values flow through the entire site. For advanced control, edit `_sass/_variables.scss` directly.

## Site identity

Edit `_config.yml` at the root:

```yaml
title: "My Knowledge Base"
description: "A customizable wiki-style documentation site."
url: "https://<username>.github.io"
baseurl: "/<repository-name>"
logo: "/assets/images/logo.svg"
```

| Field | Where it appears |
|-------|------------------|
| `title` | Browser tab, site header, and page titles |
| `description` | Meta description tag and SEO |
| `url` | Root domain of your live site |
| `baseurl` | Repository path, e.g. `/Js-Knolagebase` |
| `logo` | Header logo image inside `assets/images/` |

## Navigation

Edit `_data/navigation.yml` to change the top menu:

```yaml
- title: "Home"
  url: "/"
- title: "Wiki"
  url: "/wiki/"
- title: "Getting Started"
  url: "/wiki/getting-started/"
```

Each item needs a `title` and a `url`. URLs should match the paths in your content. Use `relative_url` in layouts so links work regardless of `baseurl`.

## Sidebar

Edit `_data/sidebar.yml` to control the sidebar shown on wiki pages. This is separate from the top navigation.

## Categories

Edit `_data/categories.yml` to control the cards shown on the home page:

```yaml
- slug: getting-started
  title: Getting Started
  description: Learn the basics of setting up and using this knowledge base.
  url: /wiki/getting-started/
  icon: book-open
```

The `slug` must match the folder name under `_wiki/`. The `icon` uses [Feather Icons](https://feathericons.com/) names.

## Layouts

The site uses these HTML templates:

| Layout | Purpose |
|--------|---------|
| `default.html` | Base shell with header, footer, and asset includes |
| `home.html` | Landing page hero and category cards |
| `wiki.html` | Single article with breadcrumbs, TOC, sidebar, and related articles |
| `category.html` | Category landing page with article cards |
| `docs.html` | Long-form documentation layout |
| `editor.html` | Split-pane page editor |

## Responsive breakpoints

Defined in `_sass/_variables.scss` and mirrored in `_config.yml`:

| Breakpoint | Width |
|------------|-------|
| Mobile | `480px` |
| Tablet | `768px` |
| Desktop | `1024px` |
| Wide | `1280px` |

## Custom CSS

There are two ways to add custom styles:

1. **Recommended:** Edit `_sass/_variables.scss` for colors, fonts, spacing, and shadows.
2. **Advanced:** Edit the feature SCSS files in `_sass/` directly, or add new `_sass/_custom.scss` and import it in `assets/css/main.scss`.

## Dark mode

The site includes a built-in dark mode toggle. To change the default:

```yaml
appearance:
  default: dark
  toggle: true
```

Set `default` to `light` or `dark`. Set `toggle` to `false` to hide the theme button entirely.

## Search

Search is enabled by default. To disable it globally:

```yaml
search:
  enabled: false
```

To hide a single page from search, add `search_exclude: true` to that page's front matter.

## Page editor

The site includes a split-pane Markdown editor at `/editor/`. It lets you:

1. Pick a template (`page-template.md`, `guide-template.md`, `reference-template.md`, `tutorial-template.md`)
2. Edit front matter and body in a live preview environment
3. Download the finished `.md` file
4. Upload it to `_wiki/<category>/` to create a new page

See [Adding Content](/wiki/using-this-wiki/adding-content/) for how to use the editor.
