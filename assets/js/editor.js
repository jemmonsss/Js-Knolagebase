(function () {
  'use strict';

  const TEMPLATES = [
    { name: "Basic Article", file: "page-template.md", description: "Standard wiki article with table of contents" },
    { name: "Guide", file: "guide-template.md", description: "Step-by-step instructions with prerequisites and verification" },
    { name: "Reference", file: "reference-template.md", description: "API or syntax reference with parameters and examples" },
    { name: "Tutorial", file: "tutorial-template.md", description: "Multi-part tutorial with what you'll build and recap" }
  ];

  const CATEGORIES = [
    { slug: "getting-started", title: "Getting Started", description: "Learn the basics of setting up and using this knowledge base.", url: "/wiki/getting-started/", icon: "book-open" },
    { slug: "advanced", title: "Advanced", description: "Deep dives into customization, plugins, and architecture.", url: "/wiki/advanced/", icon: "settings" },
    { slug: "using-this-wiki", title: "Using This Wiki", description: "A self-documenting manual on how to operate and extend this site.", url: "/wiki/using-this-wiki/", icon: "help-circle" }
  ];

  const TEMPLATE_CONTENTS = {
    "page-template.md": `---
title: "My New Article"
layout: wiki
category: "getting-started"
order: 30
toc: true
---

# My New Article

Write your content here.

## Subheading

More content.
`,
    "guide-template.md": `---
title: "{{TITLE}}"
layout: wiki
category: "{{CATEGORY}}"
order: {{ORDER}}
toc: true
description: "{{DESCRIPTION}}"
---

# {{TITLE}}

## Overview

{{OVERVIEW}}

## Prerequisites

- {{PREREQUISITE_1}}
- {{PREREQUISITE_2}}

## Steps

### Step 1: {{STEP_1_TITLE}}

{{STEP_1_CONTENT}}

### Step 2: {{STEP_2_TITLE}}

{{STEP_2_CONTENT}}

### Step 3: {{STEP_3_TITLE}}

{{STEP_3_CONTENT}}

## Verification

{{VERIFICATION}}

## Next Steps

{{NEXT_STEPS}}
`,
    "reference-template.md": `---
title: "{{TITLE}}"
layout: wiki
category: "{{CATEGORY}}"
order: {{ORDER}}
toc: true
description: "{{DESCRIPTION}}"
---

# {{TITLE}}

## Overview

{{OVERVIEW}}

## Syntax

{{SYNTAX}}

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| {{PARAM_1_NAME}} | {{PARAM_1_TYPE}} | {{PARAM_1_REQUIRED}} | {{PARAM_1_DESC}} |
| {{PARAM_2_NAME}} | {{PARAM_2_TYPE}} | {{PARAM_2_REQUIRED}} | {{PARAM_2_DESC}} |

## Examples

{{EXAMPLES}}

## Notes

{{NOTES}}
`,
    "tutorial-template.md": `---
title: "{{TITLE}}"
layout: wiki
category: "{{CATEGORY}}"
order: {{ORDER}}
toc: true
description: "{{DESCRIPTION}}"
---

# {{TITLE}}

## What You'll Build

{{WHAT_YOU_BUILD}}

## Time Required

{{TIME_REQUIRED}}

## Prerequisites

- {{PREREQUISITE_1}}
- {{PREREQUISITE_2}}

## Part 1: {{PART_1_TITLE}}

{{PART_1_CONTENT}}

## Part 2: {{PART_2_TITLE}}

{{PART_2_CONTENT}}

## Part 3: {{PART_3_TITLE}}

{{PART_3_CONTENT}}

## Recap

{{RECAP}}

## Further Reading

{{FURTHER_READING}}
`
  };
  let templates = TEMPLATES;
  let categories = CATEGORIES;
  let currentTemplate = null;
  let editor = null;
  let frontMatter = {};

  async function init() {
    renderTemplateOptions();
    renderCategoryOptions();
    setupEditor();
    setupToolbar();
  }

  // Templates and categories are embedded above to avoid fetch issues
  // with Jekyll's _data/ and _wiki/ collection paths in production

  function renderTemplateOptions() {
    const sel = document.getElementById('template-select');
    sel.innerHTML = '<option value="">Select a template...</option>' +
      templates.map(t => '<option value="' + t.file + '">' + escapeHtml(t.name) + '</option>').join('');
    sel.addEventListener('change', function () {
      if (this.value) loadTemplate(this.value);
    });
  }

  function renderCategoryOptions() {
    const sel = document.getElementById('category-select');
    sel.innerHTML = '<option value="">Select a category...</option>' +
      categories.map(c => '<option value="' + c.slug + '">' + escapeHtml(c.title) + '</option>').join('');
    sel.addEventListener('change', updateUploadPath);
  }

  async function loadTemplate(file) {
    currentTemplate = templates.find(t => t.file === file);
    try {
      const text = TEMPLATE_CONTENTS[file];
      if (!text) throw new Error('Template not found');
      const parsed = parseFrontMatter(text);
      frontMatter = parsed.frontMatter || {};
      if (editor) {
        editor.value(text);
        editor.codemirror.refresh();
      }
      updatePreview();
      updateFilename();
      updateUploadPath();
    } catch (e) {
      console.error(e);
      alert('Could not load template');
    }
  }

  function parseFrontMatter(text) {
    const match = text.match(/^---[\s\S]*?---/);
    let body = text;
    let frontMatter = {};
    if (match) {
      body = text.slice(match[0].length).trim();
      try {
        frontMatter = parseYamlFrontMatter(match[0].slice(3, -3));
      } catch (e) {
        console.warn(e);
      }
    }
    return { frontMatter, body };
  }

  function parseYamlFrontMatter(yamlText) {
    const result = {};
    const lines = yamlText.split('\n');
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const idx = t.indexOf(':');
      if (idx === -1) continue;
      const key = t.slice(0, idx).trim();
      let value = t.slice(idx + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      result[key] = value;
    }
    return result;
  }

  function serializeFrontMatter(fm) {
    let yaml = '---\n';
    for (const [key, value] of Object.entries(fm)) {
      if (typeof value === 'string') {
        yaml += key + ': "' + value.replace(/"/g, '\\"') + '"\n';
      } else if (typeof value === 'boolean') {
        yaml += key + ': ' + (value ? 'true' : 'false') + '\n';
      } else {
        yaml += key + ': ' + value + '\n';
      }
    }
    yaml += '---';
    return yaml;
  }

  function getFullMarkdown() {
    if (!editor) return '';
    const raw = editor.value();
    const parsed = parseFrontMatter(raw);
    const merged = { ...frontMatter, ...parsed.frontMatter };
    return serializeFrontMatter(merged) + '\n\n' + parsed.body;
  }

  function updatePreview() {
    const preview = document.getElementById('preview-content');
    if (!preview || !editor) return;
    const rawHtml = marked.parse(editor.value());
    const title = frontMatter.title || 'My New Article';
    const category = frontMatter.category || document.getElementById('category-select')?.value || 'getting-started';
    const categoryTitle = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    
    preview.innerHTML = `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="#">Home</a></li>
          <li><a href="#">Wiki</a></li>
          <li><a href="#">${escapeHtml(categoryTitle)}</a></li>
          <li aria-current="page">${escapeHtml(title)}</li>
        </ol>
      </nav>
      <article class="wiki-article">
        <h1>${escapeHtml(title)}</h1>
        <div class="article-meta">
          <span>Category: <a href="#">${escapeHtml(categoryTitle)}</a></span>
          <span>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        ${rawHtml}
      </article>
    `;
  }

  function updateFilename() {
    const title = frontMatter.title || 'my-new-article';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    document.getElementById('filename-preview').textContent = slug + '.md';
    updateUploadPath();
  }

  function updateUploadPath() {
    const category = frontMatter.category || document.getElementById('category-select')?.value || 'category';
    const title = frontMatter.title || 'my-new-article';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    document.getElementById('upload-path').textContent = '_wiki/' + category + '/' + slug + '.md';
  }

  function downloadMarkdown() {
    const content = getFullMarkdown();
    const title = frontMatter.title || 'my-new-article';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = slug + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(getFullMarkdown());
      const btn = document.getElementById('btn-copy');
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = original, 2000);
    } catch (e) {
      alert('Failed: ' + e.message);
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function setupEditor() {
    const textarea = document.getElementById('markdown-editor');
    if (!textarea) return;
    editor = new EasyMDE({
      element: textarea,
      spellChecker: false,
      status: false,
      toolbar: ['bold', 'italic', 'heading', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'code', 'table', '|', 'preview', 'side-by-side', 'fullscreen'],
      previewRender: function (plainText) { return marked.parse(plainText); }
    });
    if (editor && editor.codemirror) {
      editor.codemirror.on('change', function () {
        updatePreview();
        updateFilename();
      });
    }
  }

  function setupToolbar() {
    document.getElementById('btn-reset').addEventListener('click', function () {
      const sel = document.getElementById('template-select');
      if (sel.value) loadTemplate(sel.value);
    });
    document.getElementById('btn-download').addEventListener('click', downloadMarkdown);
    document.getElementById('btn-copy').addEventListener('click', copyToClipboard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
