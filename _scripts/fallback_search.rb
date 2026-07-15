#!/usr/bin/env ruby
require "json"
require "fileutils"
require "pathname"

dest = ARGV[0] || "_site"
dest = File.expand_path(dest)

unless Dir.exist?(dest)
  abort "Destination directory does not exist: #{dest}"
end

index = []
baseurl = File.read(File.join(File.dirname(dest), "_config.yml"))[/baseurl:\s*"([^"]+)"/, 1] rescue ""
baseurl = baseurl.to_s.chomp("/")

# Walk HTML files in _site
Dir.glob(File.join(dest, "**", "*.html")).each do |html_path|
  rel = Pathname.new(html_path).relative_path_from(Pathname.new(dest)).to_s
  url = File.join(baseurl, rel).gsub(%r{/+$}, "")

  # Skip non-content files
  next if rel == "index.html" && !rel.start_with?("wiki/") && !rel.start_with?("docs/")
  next if rel.start_with?("feed.xml") || rel.start_with?("sitemap") || rel.start_with?("robots.txt")

  content = File.read(html_path)

  # Extract title
  title = content[/<title[^>]*>([^<]+)<\/title>/i, 1]
  title = content[/<h1[^>]*>([^<]+)<\/h1>/i, 1] unless title
  title = rel unless title
  title = title.strip.gsub(/\s+/, " ")

  # Extract a simple text excerpt
  text = content.gsub(%r{<[^>]+>}, " ").gsub(/\s+/, " ").strip
  excerpt = text[0..200]

  # Determine category from path
  category = ""
  if rel.start_with?("wiki/")
    parts = rel.split("/")
    category = parts[1] if parts.length > 1
  elsif rel.start_with?("docs/")
    parts = rel.split("/")
    category = parts[1] if parts.length > 1
  end

  index << {
    "title" => title,
    "url" => url,
    "category" => category,
    "excerpt" => excerpt,
  }
end

index_path = File.join(dest, "search.json")
FileUtils.mkdir_p(File.dirname(index_path))
File.write(index_path, JSON.generate(index))
puts "Fallback: wrote #{index_path} with #{index.length} entries"
