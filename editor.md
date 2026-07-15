---
title: "New Page Editor"
layout: editor
permalink: /editor/
---

Use the editor below to create a new wiki page from a template. When you are done, download the file and upload it to the appropriate folder in your repository.

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<div id="editor-container">
  <div class="editor-toolbar">
    <label for="template-select">Template:</label>
    <select id="template-select">
      <option value="">Loading templates...</option>
    </select>

    <label for="category-select">Category:</label>
    <select id="category-select">
      <option value="">Loading categories...</option>
    </select>

    <button id="btn-reset" type="button">Reset to Template</button>
    <button id="btn-download" type="button">Download .md</button>
    <button id="btn-copy" type="button">Copy to Clipboard</button>
  </div>

  <div class="editor-layout">
    <div class="editor-pane">
      <textarea id="markdown-editor"></textarea>
    </div>
    <div class="preview-pane">
      <div id="preview-content"></div>
    </div>
  </div>

  <div class="editor-footer">
    <p><strong>Suggested filename:</strong> <span id="filename-preview">my-new-article.md</span></p>
    <p><strong>Upload path:</strong> <code id="upload-path">_wiki/&lt;category&gt;/&lt;filename&gt;.md</code></p>
  </div>
</div>

<script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
