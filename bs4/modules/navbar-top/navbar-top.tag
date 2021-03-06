<navbar-top>
  <header class="header">
    <nav class="navbar navbar-expand-lg pt-0 pb-0 ">
      <a if="{brand}" class="navbar-brand" href="{brand_url}">{brand}</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#{navbar_id}"
        aria-controls="{navbar_id}" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-row-reverse" id="{navbar_id}" data-is="{navbar}"></div>
    </nav>
  </header>
  <script>
    const tag = this
    tag.navbar = opts.navbar
    tag.navbar_id = 'navbarNavDropdown'
    tag.brand = opts.brand || ''
    tag.brand_url = opts.brand_url || '#'
  </script>
</navbar-top>