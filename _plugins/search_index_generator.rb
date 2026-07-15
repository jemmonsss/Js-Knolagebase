module Jekyll
  require "json"
  require "fileutils"

  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      Jekyll.logger.info "SearchIndexGenerator:", "Starting search index generation"

      search_cfg = site.config["search"] || site.config[:search]
      unless search_cfg && search_cfg["enabled"]
        Jekyll.logger.info "SearchIndexGenerator:", "Search disabled or config missing, skipping"
        return
      end

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

      dest = site.dest.to_s
      unless dest && !dest.empty?
        Jekyll.logger.error "SearchIndexGenerator:", "site.dest is blank, cannot write search.json"
        return
      end

      index_path = File.join(dest, "search.json")
      begin
        FileUtils.mkdir_p(File.dirname(index_path))
        File.write(index_path, JSON.generate(index))
        Jekyll.logger.info "SearchIndexGenerator:", "Wrote #{index_path} with #{index.length} entries"
      rescue => e
        Jekyll.logger.error "SearchIndexGenerator:", "Failed to write search.json - #{e.class}: #{e.message}"
      end
    rescue => e
      Jekyll.logger.error "SearchIndexGenerator:", "Unexpected error during generation - #{e.class}: #{e.message}"
      Jekyll.logger.error "SearchIndexGenerator:", e.backtrace.first(5).join("\n")
    end
  end
end
