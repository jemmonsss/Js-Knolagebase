---
title: "Using This Wiki Fully"
layout: wiki
category: "using-this-wiki"
order: 40
toc: true
---

# Using This Wiki Fully

This is the complete reference for operating, extending, and maintaining this knowledge base. Bookmark this page and come back whenever you need a quick reminder.

## What this site is

This wiki is a static documentation website built with Jekyll and hosted on GitHub Pages. It is designed to be:

- **Zero-config for content:** Drop Markdown files into `_wiki/<category>/` and they become pages automatically.
- **Fully customizable:** Change branding, navigation, and behavior from `_config.yml` and data files.
- **Responsive by default:** Works on mobile, tablet, and desktop with a hamburger menu and theme toggle.
- **Searchable:** Every page is indexed into `search.json` for instant client-side search.
- **Self-documenting:** The wiki includes a complete manual on how to use itself.

## What every file does

| Path | Purpose |
|------|---------|
| `_config.yml` | Main site configuration: title, URL, colors, plugins, collections |
| `_wiki/` | Wiki articles organized by category folders |
| `_docs/` | Long-form documentation (optional) |
| `_data/navigation.yml` | Top navigation links |
| `_data/categories.yml` | Category metadata for home page cards |
| `_data/sidebar.yml` | Sidebar links on wiki pages |
| `_data/templates.yml` | Template registry for the built-in editor |
| `_layouts/` | HTML templates (`default`, `wiki`, `docs`, `category`, `home`, `editor`) |
| `_includes/` | Reusable HTML snippets (`nav`, `footer`, `sidebar`, `toc`, `head`) |
| `_sass/` | SCSS stylesheets split by feature |
| `_plugins/` | Custom Jekyll plugins (search index generator) |
| `assets/css/` | Compiled CSS entry point and editor styles |
| `assets/js/` | JavaScript (`main.js`, `search.js`, `editor.js`) |
| `assets/images/` | Logos, diagrams, and other images |

## Front matter cheat sheet

Every page should include a YAML header:

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
| `layout` | `wiki` for articles, `category` for category hubs, `home` for the home page |
| `category` | Must match the folder name under `_wiki/` or `_docs/` |
| `order` | Lower numbers appear first within a category |
| `toc` | Set `true` to generate a table of contents sidebar |
| `search_exclude` | Set `true` to hide the page from search results |
| `permalink` | Override the default URL for the page |
| `description` | Meta description used for SEO and search excerpts |

## Adding content

See [Adding Content](/wiki/using-this-wiki/adding-content/) for step-by-step instructions.

Short version:

1. Create a `.md` file inside `_wiki/<category>/`.
2. Add front matter with at least `title`, `layout`, and `category`.
3. Write content in Markdown below the front matter.
4. Commit and push.

## Editing settings

See [Editing Settings](/wiki/using-this-wiki/editing-settings/) for details.

Common edits:

- **Site title / URL:** `_config.yml`
- **Colors / fonts:** `_config.yml` under `brand:` or `_sass/_variables.scss`
- **Navigation:** `_data/navigation.yml`
- **Sidebar:** `_data/sidebar.yml`
- **Categories:** `_data/categories.yml`
- **Search toggle:** `_config.yml` under `search:`
- **Theme default:** `_config.yml` under `appearance:`

## Managing the repository

See [Managing Repo](/wiki/using-this-wiki/managing-repo/) for workflow and troubleshooting.

Quick preview:

```bash
bundle install
bundle exec jekyll serve
```

## Using the editor

The built-in editor at `/editor/` lets you create pages from templates without touching the file system directly.

1. Go to `/editor/`
2. Pick a template from the dropdown
3. Edit in the split-pane Markdown editor
4. Click **Download .md**
5. Upload the file to `_wiki/<category>/` in your repository

Available templates:

- **Basic Article** — standard page with table of contents
- **Guide** — step-by-step instructions with prerequisites and verification
- **Reference** — API or syntax reference with parameters and examples
- **Tutorial** — multi-part tutorial with what you'll build and recap

## Tips and best practices

- Use `relative_url` for internal links in layouts so they work with any `baseurl`.
- Keep category and file names lowercase with hyphens to match GitHub Pages' Linux filesystem.
- Run `bundle exec jekyll build` locally before pushing to catch errors early.
- Check the **Actions** tab after pushing to verify the build succeeded.
- Use `toc: true` on long articles to help readers navigate.
- Add `order` to pages so they appear in a logical sequence within a category.
- Keep images small and use WebP when possible for faster loading.
- Use code fences with language hints for syntax highlighting.

## Template

A ready-to-copy template is available at:

`_wiki/using-this-wiki/templates/page-template.md`
