---
title: "Editor Workflow"
layout: wiki
category: "advanced"
order: 30
toc: true
---

# Editor Workflow

The built-in split-pane Markdown editor at [`/editor/`](/editor/ | relative_url) provides a fast way to create new wiki pages from templates without manually creating files.

## What you need

- Any modern web browser
- Your repository open in a separate tab for uploading the finished file

## Step 1: Open the editor

Visit [`/editor/`](/editor/ | relative_url) on your site. You will see a toolbar, a Markdown editor on the left, and a live preview on the right.

## Step 2: Choose a template

Use the **Template** dropdown to pick a starting point:

| Template | Use it for |
|----------|-----------|
| **Basic Article** | A standard wiki page with table of contents |
| **Guide** | Step-by-step instructions with prerequisites and verification |
| **Reference** | API or syntax reference with parameters and examples |
| **Tutorial** | Multi-part tutorial with what you'll build and recap |

## Step 3: Fill in the details

The editor loads the template with placeholder text like `{{TITLE}}` and `{{OVERVIEW}}`. Replace these placeholders with your real content.

The **Category** dropdown is populated from your `_data/categories.yml`. Choose the category where this page should live.

## Step 4: Edit and preview

- Type in the left pane. The right pane updates live.
- Use the toolbar for bold, italic, headings, lists, links, images, code, and tables.
- Press **Side-by-side** or **Fullscreen** in the editor toolbar to change the view.

## Step 5: Download the file

Click **Download .md**. The browser saves a file named after your title, for example `my-first-article.md`.

## Step 6: Upload to your repository

1. Open your repository on GitHub.
2. Navigate to `_wiki/<category>/`.
3. Click **Add file** > **Upload files**.
4. Drag in the downloaded `.md` file.
5. Commit directly to `main`, or create a pull request.
6. GitHub Actions builds and publishes the page.

## Tips

- The **Suggested filename** field at the bottom updates automatically as you type the title.
- The **Upload path** shows exactly where the file should go.
- Use **Copy to Clipboard** if you want to paste the content into an existing file instead of downloading.
- **Reset to Template** discards your changes and reloads the original template.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Editor is blank | Make sure you selected a template. The dropdown defaults to "Select a template..." |
| Preview is empty | EasyMDE needs a moment to initialize. Wait a second after selecting a template. |
| Download fails | Check the browser console for errors. Make sure you entered a title. |
| File won't upload | Make sure you are uploading to the correct `_wiki/<category>/` folder. |

## Next steps

- Learn about front matter in [Adding Content](/wiki/using-this-wiki/adding-content/ | relative_url).
- Customize templates in `_wiki/using-this-wiki/templates/`.
- Add your own templates by creating new `.md` files in the templates folder and registering them in `_data/templates.yml`.
