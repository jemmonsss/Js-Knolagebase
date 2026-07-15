(function () {
  'use strict';

  const SEARCH_INDEX_PATH = window.SEARCH_INDEX_PATH || './search.json';

  let indexData = [];

  async function loadIndex() {
    try {
      const response = await fetch(SEARCH_INDEX_PATH);
      if (!response.ok) throw new Error('Search index not found');
      indexData = await response.json();
    } catch (e) {
      console.warn('Search index could not be loaded:', e);
      indexData = [];
    }
  }

  function queryIndex(term) {
    if (!term.trim()) return [];
    const lower = term.toLowerCase();
    return indexData.filter(function (item) {
      return (
        (item.title && item.title.toLowerCase().includes(lower)) ||
        (item.category && item.category.toLowerCase().includes(lower)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(lower))
      );
    });
  }

  function renderResults(results) {
    const container = document.getElementById('search-results');
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results">No results found.</div>';
      return;
    }

    const list = document.createElement('div');
    results.forEach(function (item) {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = item.url;
      a.innerHTML =
        '<div class="search-result-title">' + escapeHtml(item.title) + '</div>' +
        '<div class="search-result-excerpt">' + escapeHtml(item.excerpt || '') + '</div>';
      list.appendChild(a);
    });

    container.innerHTML = '';
    container.appendChild(list);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function init() {
    const input = document.getElementById('search-input');
    if (!input) return;

    let debounceTimer;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        const results = queryIndex(input.value);
        renderResults(results);
      }, 200);
    });
  }

  loadIndex().then(init);
})();
