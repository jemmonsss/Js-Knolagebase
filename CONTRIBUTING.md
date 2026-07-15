# Contributing

Thank you for your interest in contributing to this knowledge base.

## How to Contribute

1. Fork the repository.
2. Create a branch for your changes.
3. Make your edits following the guidelines below.
4. Open a pull request against `main`.

## Content Guidelines

- Add new pages inside `_wiki/<category>/` using the template at `_wiki/using-this-wiki/templates/page-template.md`.
- Set `order` to control sequence within a category.
- Enable `toc: true` for pages with multiple headings.
- Keep changes focused; one feature or fix per PR.

## Style

- Use the existing layouts and includes; do not add inline styles.
- Update `_data/navigation.yml` if you add top-level sections.
- Run `bundle exec jekyll build` before pushing to catch errors.

## Questions?

See [Using This Wiki](wiki/using-this-wiki/) for full documentation.
