---
title: "Adding Content"
layout: wiki
category: "using-this-wiki"
order: 10
toc: true
---

# Adding Content

This page teaches you how to add new pages, organize them into categories, and control how they appear in search and navigation.

## Create a new page

1. Pick a category folder inside `_wiki/`. For example, `_wiki/getting-started/`.
2. Create a new file ending in `.md`, such as `_wiki/getting-started/my-new-article.md`.
3. Paste this template into the file:

```yaml
---
title: "My New Article"
layout: wiki
category: "getting-started"
order: 30
toc: true
---

# My New Article

Write your content here.

## Subheading

More content.
```

4. Replace the placeholder text with your real content.
5. Commit and push. GitHub Actions builds the site automatically.

### Front matter explained

Every page needs a header block called "front matter". It tells the site how to display your page.

| Key | Required | Description |
|-----|----------|-------------|
| `title` | Yes | The page heading and browser tab title |
| `layout` | Yes | Use `wiki` for articles, `category` for category index pages |
| `category` | Yes | Must match the folder name under `_wiki/` |
| `order` | No | Lower numbers appear first within a category |
| `toc` | No | Set to `true` to show a table of contents sidebar |
| `search_exclude` | No | Set to `true` to hide the page from search results |

## Create a new category

1. Create a new folder under `_wiki/`. For example, `_wiki/design/`.
2. Add an `index.md` inside it:

```yaml
---
title: "Design"
layout: category
category: "design"
description: "Design systems, style guides, and visual guidelines."
permalink: /wiki/design/
---
```

3. Add your first article inside the same folder.
4. Update `_data/navigation.yml` to add a link to the category.
5. Update `_data/categories.yml` so the category appears on the home page.

## Add images

Place images in `assets/images/` and reference them in Markdown:

```markdown
![Diagram](/assets/images/diagram.png)
```

Use lowercase names with hyphens to avoid issues on GitHub Pages' Linux filesystem.

## Write good content

- Use `#` for the main title, `##` for sections, and `###` for subsections.
- Use `-` for bullet lists and `1.` for numbered lists.
- Use fenced code blocks with language hints for syntax highlighting:

````markdown
```javascript
console.log("Hello");
```
````

- Keep paragraphs short and use headings to break up long text.

## Template shortcut

A ready-to-copy template is available at:

`_wiki/using-this-wiki/templates/page-template.md`
