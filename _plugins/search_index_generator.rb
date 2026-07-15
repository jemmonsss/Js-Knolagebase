module Jekyll
  require "json"
  require "fileutils"

  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      return unless site.config['search'] && site.config['search']['enabled']

      pages = site.pages + site.documents
      index = []

      pages.each do |page|
        next if page.data['search_exclude'] == true
        next if page.data['layout'] == 'home'

        title = page.data['title'] || page.name
        url = File.join(site.baseurl, page.url)
        category = page.data['category'] || ''
        raw_excerpt = page.data['excerpt'] || page.data['description'] || ''
        excerpt = raw_excerpt.to_s.gsub(/\s+/, ' ').strip

        index << {
          'title' => title,
          'url' => url,
          'category' => category,
          'excerpt' => excerpt[0..200]
        }
      end

      index_path = File.join(site.dest, 'search.json')
      FileUtils.mkdir_p(File.dirname(index_path))
      File.write(index_path, JSON.generate(index))
    end
  end
end
