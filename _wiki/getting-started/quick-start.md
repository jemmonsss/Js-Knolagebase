---
title: "Quick Start"
layout: wiki
category: "getting-started"
order: 10
toc: true
---

# Quick Start

Get up and running with this knowledge base in under five minutes.

## Prerequisites

- A GitHub account
- Git installed locally
- Basic familiarity with Markdown

## Clone and Deploy

1. Click **Use this template** on the repository page.
2. Clone your new repository locally.
3. Edit `_config.yml` and replace the site title, URL, and baseurl.
4. Commit and push to `main` (or enable GitHub Actions for Pages).
5. GitHub Pages will build and publish your site automatically.

## Add Your First Page

Create a new Markdown file inside `_wiki/<category>/`:

```markdown
---
title: "My First Article"
layout: wiki
category: "getting-started"
order: 20
toc: true
---

# My First Article

This is my first wiki page.
```

Push the change and wait for the build. That's it.
