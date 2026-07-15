---
title: "Using This Wiki Fully"
layout: wiki
category: "using-this-wiki"
order: 40
toc: true
---

# Using This Wiki Fully

This is the complete guide to operating, extending, and maintaining this knowledge base.

## Overview

This wiki is designed to be:
- **Zero-config for content:** Add Markdown files to `_wiki/<category>/` and they become pages automatically.
- **Fully customizable:** Change branding, navigation, and behavior from `_config.yml` and data files.
- **Responsive by default:** Works on mobile, tablet, and desktop with a hamburger menu and theme toggle.

## Quick Reference

| Task | Where to edit |
|------|---------------|
| Add a new page | Drop a `.md` file into `_wiki/<category>/` |
| Add a new category | Create `_wiki/<new-category>/index.md` + update `_data/navigation.yml` and `_data/categories.yml` |
| Change site title / URL | `_config.yml` |
| Change colors / fonts | `_config.yml` under `brand:` or `_sass/_variables.scss` |
| Change nav links | `_data/navigation.yml` |
| Change sidebar links | `_data/sidebar.yml` |
| Enable / disable search | `_config.yml` under `search:` |
| Change theme default | `_config.yml` under `theme:` |

## Adding Content

See [Adding Content](/wiki/using-this-wiki/adding-content/) for step-by-step instructions.

## Editing Settings

See [Editing Settings](/wiki/using-this-wiki/editing-settings/) for branding, navigation, and plugin configuration.

## Managing Repo

See [Managing Repo](/wiki/using-this-wiki/managing-repo/) for GitHub workflow and Pages deployment.

## Front Matter Cheat Sheet

Every wiki article should include:

```yaml
---
title: "Page Title"
layout: wiki
category: "category-folder-name"
order: 10
toc: true
---
```

| Field | Purpose |
|-------|---------|
| `title` | Browser tab title and page heading |
| `layout` | Use `wiki` for articles, `category` for category hubs |
| `category` | Must match the folder name under `_wiki/` |
| `order` | Lower numbers appear first within a category |
| `toc` | Set `true` to generate a table of contents sidebar |

## Template

A ready-to-copy template is available at:

`_wiki/using-this-wiki/templates/page-template.md`

## Tips

- Use `relative_url` for internal links in layouts so they work with any `baseurl`.
- Keep category and file names lowercase with hyphens to match GitHub Pages' Linux filesystem.
- Run `bundle exec jekyll build` locally before pushing to catch errors early.
- Check the Actions tab after pushing to verify the build succeeded.
