---
title: "Quick Start"
layout: wiki
category: "getting-started"
order: 10
toc: true
---

# Quick Start

Get your own copy of this knowledge base live on the web in five minutes or less. No local setup required.

## What you'll do

1. Create a repository from this template.
2. Configure your site name and URL.
3. Push to GitHub.
4. Watch GitHub Pages build and publish automatically.

## Step 1: Create your repository

1. Go to the repository page on GitHub.
2. Click the green **Use this template** button.
3. Choose **Create a new repository**.
4. Give your repository a name. This name becomes your site's URL path.
   - Example: if you name it `my-docs`, your site will be at `https://<username>.github.io/my-docs/`
5. Click **Create repository**.

## Step 2: Configure your site

1. In your new repository, open `_config.yml`.
2. Update these fields near the top:

```yaml
title: "My Site Title"
description: "A short description of your site."
url: "https://<username>.github.io"
baseurl: "/<repository-name>"
```

| Field | What to put here |
|-------|------------------|
| `title` | The name shown in the browser tab and header |
| `description` | A one-sentence description of your site |
| `url` | Your GitHub Pages domain, e.g. `https://jemmonsss.github.io` |
| `baseurl` | Your repository name prefixed with `/`, e.g. `/Js-Knolagebase` |

3. Optionally update `_data/navigation.yml` to change the menu links.

## Step 3: Enable GitHub Pages

1. In your repository, go to **Settings** > **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. The workflow file `.github/workflows/pages.yml` is already included. It builds and deploys automatically on every push to `main`.

## Step 4: Push your first change

1. Edit any file, or add a new Markdown file under `_wiki/<category>/`.
2. Commit the change to `main`.
3. Go to the **Actions** tab to watch the build.
4. When it finishes, open your live site.

## Add your first page

Create a new Markdown file inside `_wiki/<category>/`:

```markdown
---
title: "My First Article"
layout: wiki
category: "getting-started"
order: 10
toc: true
---

# My First Article

This is my first wiki page. Write whatever you want here.

## A Subsection

More content goes here.
```

Commit and push. Within a minute or two, the page is live.

## What's next?

- Learn the full content workflow in [Adding Content](/wiki/using-this-wiki/adding-content/ | relative_url).
- Customize the appearance in [Editing Settings](/wiki/using-this-wiki/editing-settings/ | relative_url).
- Read the complete reference in [Using This Wiki Fully](/wiki/using-this-wiki/fully/ | relative_url).
