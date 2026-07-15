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

  function parseYamlList(text) {
    const items = [];
    const lines = text.split('\n');
    let item = {};
    for (const line of lines) {
      const t = line.trim();
      if (t.startsWith('- name:')) {
        if (item.name) items.push(item);
        item = { name: t.slice(7).trim().replace(/^"|"$/g, '') };
      } else if (t.startsWith('file:')) {
        item.file = t.slice(5).trim().replace(/^"|"$/g, '');
      } else if (t.startsWith('description:')) {
        item.description = t.slice(12).trim().replace(/^"|"$/g, '');
      }
    }
    if (item.name) items.push(item);
    return items;
  }

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
      const res = await fetch('/assets/templates/' + file);
      if (!res.ok) throw new Error('Failed');
      const text = await res.text();
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
    preview.innerHTML = marked.parse(editor.value());
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
    editor.codemirror.on('change', function () {
      updatePreview();
      updateFilename();
    });
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
