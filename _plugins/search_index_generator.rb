module Jekyll
  require "json"
  require "fileutils"

  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      search_cfg = site.config["search"] || site.config[:search]
      return unless search_cfg && search_cfg["enabled"]

      pages = site.pages + site.documents
      index = []

      pages.each do |page|
        next if page.data["search_exclude"] == true
        next if page.data["layout"] == "home"

        title = page.data["title"] || page.name
        url = File.join(site.baseurl.to_s, page.url.to_s)
        category = page.data["category"] || ""
        raw_excerpt = page.data["excerpt"] || page.data["description"] || ""
        excerpt = raw_excerpt.to_s.gsub(/\s+/, " ").strip

        index << {
          "title" => title,
          "url" => url,
          "category" => category,
          "excerpt" => excerpt[0..200],
        }
      end

      index_path = File.join(site.dest.to_s, "search.json")
      begin
        FileUtils.mkdir_p(File.dirname(index_path))
        File.write(index_path, JSON.generate(index))
        Jekyll.logger.info "SearchIndexGenerator:", "Wrote #{index_path} with #{index.length} entries"
      rescue => e
        Jekyll.logger.error "SearchIndexGenerator:", "Failed to write search.json - #{e.message}"
      end
    end
  end
end
