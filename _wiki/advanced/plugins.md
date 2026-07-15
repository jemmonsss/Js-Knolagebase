---
title: "Plugins"
layout: wiki
category: "advanced"
order: 20
toc: true
---

# Plugins

This wiki uses Jekyll plugins to extend functionality.

## Enabled by Default

| Plugin | Purpose |
|--------|---------|
| `jekyll-feed` | Atom feed |
| `jekyll-sitemap` | Sitemap for SEO |
| `jekyll-seo-tag` | Meta tags for social sharing |
| `jekyll-archives` | Category archive pages |

## Search Index

A custom generator (`_plugins/search_index_generator.rb`) builds `search.json` from all wiki and docs pages. The front matter key `search_exclude: true` hides a page from search.

## Adding New Plugins

1. Add the gem to `Gemfile`.
2. Add the name to `_config.yml` under `plugins`.
3. Commit and push.

If you deploy via GitHub Actions, any gem is supported. If you use native GitHub Pages, restrict yourself to the [whitelisted plugins](https://pages.github.com/versions/).
