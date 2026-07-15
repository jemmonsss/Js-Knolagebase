---
title: "Using This Wiki"
layout: category
category: "using-this-wiki"
description: "A complete, beginner-friendly manual for operating and extending this knowledge base."
permalink: /wiki/using-this-wiki/
---

# Using This Wiki

Welcome! This section is your complete guide to running, customizing, and growing this knowledge base. You do **not** need prior experience with Jekyll, GitHub Pages, or Markdown. Follow these pages in order, or jump to the topic you need.

## Where to start

| Page | What you'll learn |
|------|-------------------|
| [Adding Content]({{ '/wiki/using-this-wiki/adding-content/' | relative_url }}) | Create pages, categories, and upload images. |
| [Editing Settings]({{ '/wiki/using-this-wiki/editing-settings/' | relative_url }}) | Change the site title, colors, fonts, navigation, and plugins. |
| [Managing Repo]({{ '/wiki/using-this-wiki/managing-repo/' | relative_url }}) | GitHub workflow, previewing, and fixing common problems. |
| [Using This Wiki Fully]({{ '/wiki/using-this-wiki/fully/' | relative_url }}) | Complete reference, front matter cheat sheet, and pro tips. |
| [Editor Workflow]({{ '/wiki/advanced/editor-workflow/' | relative_url }}) | Use the built-in split-pane editor and templates. |

## What this site does

- Turns Markdown files into a fast, searchable documentation website.
- Supports dark and light themes with a single click.
- Works on phones, tablets, and desktops.
- Builds and deploys automatically when you push to GitHub.

## How to preview

You can preview changes locally before pushing:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000/<baseurl>/` in your browser.

## Need help?

- Read the full manual at [Using This Wiki Fully]({{ '/wiki/using-this-wiki/fully/' | relative_url }}).
- Check existing wiki articles for examples.
- Open an issue in the repository if you find a bug.
