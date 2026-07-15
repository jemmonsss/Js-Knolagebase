#!/usr/bin/env ruby
# Simple site validation script for Jekyll wiki knowledge base.
# Usage:
#   bundle exec ruby scripts/check_site.rb frontmatter
#   bundle exec ruby scripts/check_site.rb links

require "json"
require "yaml"
require "fileutils"
require "pathname"

ROOT = Pathname.new(File.expand_path("../..", __dir__))
SITE_DIR = ROOT.join("_site")
WIKI_DIR = ROOT.join("_wiki")
DOCS_DIR = ROOT.join("_docs")
DATA_NAV = ROOT.join("_data", "navigation.yml")
DATA_CATEGORIES = ROOT.join("_data", "categories.yml")

def build_site
  unless system("bundle", "exec", "jekyll", "build", "-q", chdir: ROOT.to_s)
    abort "Jekyll build failed. Run `bundle exec jekyll build` manually to inspect errors."
  end
end

def check_frontmatter
  puts "==> Validating front matter..."

  errors = []

  [WIKI_DIR, DOCS_DIR].each do |base|
    next unless base.exist?
    Dir.glob("#{base}/**/*.md").each do |file|
      content = File.read(file)
      unless content =~ /\A---\s*\n/
        errors << "#{file}: missing front matter opening"
        next
      end

      fm_text = content.split(/^---\s*$/, 3)[1] || ""
      begin
        fm = YAML.safe_load(fm_text, permitted_classes: [Time]) || {}
      rescue Psych::SyntaxError => e
        errors << "#{file}: YAML syntax error - #{e.message}"
        next
      end

      required = %w[title layout]
      required.each do |key|
        errors << "#{file}: missing required front matter key '#{key}'" unless fm[key]
      end

      if fm["layout"] == "wiki" && !fm["category"]
        errors << "#{file}: wiki pages should have a 'category' key"
      end
    end
  end

  if errors.empty?
    puts "    OK - front matter looks good."
  else
    puts "    FAILURES (#{errors.length}):"
    errors.each { |e| puts "      - #{e}" }
    exit 1
  end
end

def check_links
  puts "==> Validating internal links..."

  unless SITE_DIR.exist?
    abort "    FAIL: _site/ not found. The main Jekyll build step must run before link validation."
  end

  errors = []
  checked = 0

  Dir.glob("#{SITE_DIR}/**/*.html").each do |html|
    html_path = Pathname.new(html)
    relative = html_path.relative_path_from(SITE_DIR).to_s

    # Skip search.json and feeds
    next if relative == "search.json" || relative.end_with?(".xml") || relative.end_with?(".json")

    content = File.read(html)

    content.scan(/href="([^"]+)"/).flatten.each do |href|
      next if href.start_with?("http://", "https://", "mailto:", "tel:", "#")
      next if href.start_with?("//")

      # Resolve relative to current page directory
      current_dir = html_path.parent.relative_path_from(SITE_DIR)
      target = (current_dir / href).to_s

      # Normalize: remove trailing slash, handle index.html
      target = target.chomp("/")
      target = "#{target}/index.html" if target == "" || target.end_with?("/")

      target_path = SITE_DIR.join(target)
      unless target_path.exist?
        errors << "#{relative}: broken link -> #{href} (expected #{target})"
      end

      checked += 1
    end
  end

  puts "    Checked #{checked} internal links."

  if errors.empty?
    puts "    OK - no broken internal links found."
  else
    puts "    FAILURES (#{errors.length}):"
    errors.first(20).each { |e| puts "      - #{e}" }
    puts "    ..." if errors.length > 20
    exit 1
  end
end

command = ARGV.shift
case command
when "frontmatter"
  check_frontmatter
when "links"
  check_links
else
  abort "Usage: bundle exec ruby scripts/check_site.rb [frontmatter|links]"
end
