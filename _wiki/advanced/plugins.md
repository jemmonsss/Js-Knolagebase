---
title: "Plugins"
layout: wiki
category: "advanced"
order: 20
toc: true
---

# Plugins

Jekyll plugins extend the site's functionality. This wiki uses a mix of official plugins and a custom search index generator.

## Enabled by default

| Plugin | Purpose |
|--------|---------|
| `jekyll-feed` | Generates an Atom feed at `/feed.xml` |
| `jekyll-sitemap` | Generates a sitemap at `/sitemap.xml` for SEO |
| `jekyll-seo-tag` | Adds Open Graph and Twitter Card meta tags |
| `jekyll-archives` | Generates category archive pages automatically |
| `jekyll-include-cache` | Caches included partials for faster builds |
| `jekyll-last-modified-at` | Shows last-modified dates on pages |

## Search index

A custom plugin (`_plugins/search_index_generator.rb`) builds `search.json` from all wiki and docs pages. This powers the client-side search in the header.

To hide a page from search, add `search_exclude: true` to its front matter.

## Adding a new plugin

1. Add the gem to `Gemfile`.
2. Add the plugin name to `_config.yml` under `plugins:`.
3. Commit and push.

```yaml
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-archives
  - jekyll-include-cache
  - jekyll-last-modified-at
  - jekyll-your-new-plugin
```

## Important notes

- **GitHub Actions:** Any gem is supported. The build runs on Ubuntu, so most Ruby gems work out of the box.
- **Native GitHub Pages:** If you are not using the GitHub Actions workflow, you are limited to the [whitelisted plugins](https://pages.github.com/versions/). This site's workflow avoids that restriction.

## Troubleshooting plugins

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Build fails with `LoadError` | Gem not in `Gemfile` | Add it to `Gemfile` and `_config.yml` |
| Build fails with syntax error | Ruby syntax in `_plugins/` | Check the plugin file for typos |
| Search returns nothing | `search.json` missing | Check Actions log for `SearchIndexGenerator` errors |
