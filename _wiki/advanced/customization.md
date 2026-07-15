---
title: "Customization"
layout: wiki
category: "advanced"
order: 10
toc: true
---

# Customization

This wiki is built for easy theming and configuration.

## Branding

Edit `_config.yml` under the `brand` section:

```yaml
brand:
  primary_color: "#2563eb"
  font_heading: "Inter, sans-serif"
```

Colors and fonts are mirrored in `_sass/_variables.scss` for advanced CSS overrides.

## Layouts

- `default.html` — Base shell
- `wiki.html` — Single article with TOC and breadcrumbs
- `category.html` — Category landing page
- `home.html` — Landing page hero
- `docs.html` — Structured documentation layout

## Navigation

Edit `_data/navigation.yml` to add, remove, or reorder links. The same file feeds both desktop and mobile menus.

## Responsive Breakpoints

Defined in `_config.yml` and `_sass/_variables.scss`:

- Mobile: `< 480px`
- Tablet: `480px - 767px`
- Desktop: `768px - 1023px`
- Wide: `> 1024px`

## Custom CSS

Override styles in `_sass/` or add a custom stylesheet via the `head.html` include.
