<scroll-sidebar>
    <div id="show-sidebar">
        <a href="#"><i class="fa fa-fw fa-bars fa-pull-right"></i></a>
      </div>
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <div id="toggle-sidebar">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="sidebar-brand">
        <a id="close-sidebar" href="#" class="button-center"><i class="fa fa-fw fa-bars"></i></a>
        <a if={brand_url} href="{brand_url}">{brand}</a>
      </div>
      <div class="sidebar-header p-0" data-is="sidebar-header"></div>
      <div class="sidebar-menu" data-is="sidebar-menu"></div>
    </div>
    <div class="sidebar-footer" data-is="sidebar-footer"></div>
  </nav>
  <div class="navbar-content">
    <navbar-top navbar="navbar"></navbar-top>
  </div>
  <main class="page-content"></main>

  <script>
    const tag = this
    tag.show_close = opts.show_close || false
    tag.brand = opts.brand || '{brand}'
    tag.brand_url = opts.brand_url || '#'
    tag.on('mount', _onMount);

    function _onMount() {
      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
          $(".sidebar-dropdown").removeClass("active");
          $(this).parent().removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this).next(".sidebar-submenu").slideDown(200);
          $(this).parent().addClass("active");
        }
      });

      $("#toggle-sidebar").click(function () {
        $(".page-wrapper").toggleClass("toggled");
      });

      $("#close-sidebar").click(function () {
        $(".page-wrapper").toggleClass("toggled");
        $(".navbar-content").addClass("close-sidebar");
      });

      $("#show-sidebar").click(function () {
        $(".page-wrapper").toggleClass("toggled");
        $(".navbar-content").removeClass("close-sidebar");
      });
    }
  </script>
</scroll-sidebar>