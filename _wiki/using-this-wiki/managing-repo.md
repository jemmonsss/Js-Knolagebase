---
title: "Managing Repo"
layout: wiki
category: "using-this-wiki"
order: 30
toc: true
---

# Managing Repo

This manual covers GitHub workflow, pull requests, and GitHub Pages settings.

## GitHub Pages

1. Go to **Settings > Pages** in your repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. The `.github/workflows/pages.yml` file in this repo handles the rest.

## Workflow

1. Create a branch for your changes.
2. Open a pull request.
3. GitHub Actions builds the site on every push.
4. Merge to `main` to deploy.

## Pull Request Checklist

- [ ] Front matter is complete (`title`, `layout`, `category`, `order`, `toc`).
- [ ] Content is placed in the correct `_wiki/<category>/` folder.
- [ ] Links use `relative_url` where possible.
- [ ] Images are optimized and placed in `assets/images/`.

## Troubleshooting

- **Build fails:** Check the Actions log for missing gems or YAML syntax errors.
- **Page not found:** Verify `baseurl` in `_config.yml` matches your repo name.
- **Search not working:** Ensure `search.json` exists in `_site/` after build.
