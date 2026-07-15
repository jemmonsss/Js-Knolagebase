---
title: "Installation"
layout: wiki
category: "getting-started"
order: 20
toc: true
---

# Installation

This guide covers local setup for development and customization.

## Local Build

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview.

## Directory Structure

| Path | Purpose |
|------|---------|
| `_wiki/` | Wiki articles (Jekyll collection) |
| `_data/` | Navigation, categories, sidebar |
| `_sass/` | Stylesheets |
| `_layouts/` | Page templates |
| `_includes/` | Reusable partials |
| `assets/` | CSS, JS, images |

## Environment Variables

No secrets are required for local builds. For production, set `JEKYLL_ENV=production` to enable analytics or other environment-specific features.
