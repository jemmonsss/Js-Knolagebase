---
title: "Managing Repo"
layout: wiki
category: "using-this-wiki"
order: 30
toc: true
---

# Managing Repo

This page covers GitHub workflow, pull requests, previewing the site, and fixing common problems.

## GitHub Pages setup

1. Open your repository on GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow file `.github/workflows/pages.yml` in this repo handles building and deploying automatically.

Every time you push to `main`, GitHub Actions builds the site and publishes it.

## Workflow

1. Create a branch for your changes.
2. Make edits and commit to the branch.
3. Open a pull request to `main`.
4. GitHub Actions builds the site on every push to the PR.
5. Check the **Actions** tab to confirm the build passed.
6. Merge the PR. The site deploys to GitHub Pages.

## Preview locally

Before pushing, you can preview the site on your own computer:

```bash
# Install Ruby dependencies
bundle install

# Start local server
bundle exec jekyll serve
```

Open `http://localhost:4000/<baseurl>/` in your browser. Changes to Markdown files appear automatically after you save.

## Pull request checklist

- [ ] Front matter is complete (`title`, `layout`, `category`, `order`, `toc`).
- [ ] Content is placed in the correct `_wiki/<category>/` folder.
- [ ] Links use `relative_url` where possible.
- [ ] Images are optimized and placed in `assets/images/`.
- [ ] `bundle exec jekyll build` passes locally.

## Troubleshooting

### Build fails in GitHub Actions

1. Open the **Actions** tab in your repository.
2. Click the failed workflow run.
3. Read the error log. Common causes:
   - **YAML syntax error** — check `.github/workflows/pages.yml` or front matter in Markdown files.
   - **Missing gem** — add it to `Gemfile` and `_config.yml`.
   - **Plugin error** — check `_plugins/` for Ruby syntax issues.

### Page returns 404

- Verify `baseurl` in `_config.yml` matches your repository name exactly, including case.
- Verify the file path matches the URL structure. For example, `_wiki/getting-started/install.md` becomes `/wiki/getting-started/install/`.

### Search returns no results

- Check that `search.json` exists in the deployed site. You can verify this by opening `https://<your-site>/search.json` in a browser.
- If `search.json` is missing, the search plugin may have failed during build. Check the Actions log for errors from `SearchIndexGenerator`.
- Ensure the page you are searching for does not have `search_exclude: true` in its front matter.

### Styles or scripts look outdated after a deploy

- Hard refresh the page: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac).
- If the problem persists, check that the deploy completed successfully in the **Actions** tab.

### Theme toggle appears broken

- Open the browser console and look for errors.
- Ensure `assets/js/main.js` is loading without a 404.

## Getting help

- Read the full manual at [Using This Wiki Fully](/wiki/using-this-wiki/fully/ | relative_url).
- Check existing wiki articles for examples.
- Open an issue in the repository if you find a bug.
