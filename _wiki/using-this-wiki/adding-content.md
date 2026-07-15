---
title: "Adding Content"
layout: wiki
category: "using-this-wiki"
order: 10
toc: true
---

# Adding Content

This manual teaches you how to add new pages, categories, and documentation sections.

## Create a New Page

1. Pick a category folder inside `_wiki/` (e.g., `_wiki/getting-started/`).
2. Add a new `.md` file:

```markdown
---
title: "New Article"
layout: wiki
category: "getting-started"
order: 30
toc: true
---

# New Article

Write your content here.
```

3. Commit and push. The page builds automatically.

## Create a New Category

1. Create a new folder under `_wiki/` (e.g., `_wiki/design/`).
2. Add an `index.md` inside it:

```markdown
---
title: "Design"
layout: category
category: "design"
---
```

3. Add your first article in the same folder.
4. Update `_data/navigation.yml` to link the category.
5. Update `_data/categories.yml` with metadata.

## Front Matter Reference

| Key | Required | Description |
|-----|----------|-------------|
| `title` | Yes | Page title |
| `layout` | Yes | `wiki`, `category`, `home`, or `docs` |
| `category` | Yes | Matches the folder name |
| `order` | No | Sort order within category (lower first) |
| `toc` | No | `true` to show table of contents |

## Template

A copy-paste template is available at `_wiki/using-this-wiki/templates/page-template.md`.
