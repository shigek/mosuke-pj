<sidebar-menu>
  <!-- <div class="sidebar-search">
    <div>
      <div class="input-group">
        <input type="text" class="form-control search-menu" placeholder="Search...">
        <div class="input-group-append">
          <span class="input-group-text">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  </div> -->
  <!-- sidebar-search  -->

  <div class="sidebar-menu">
    <virtual each={menu in items}>
      <ul>
        <li class="header-menu">
          <riot-i18nlet context="{menu.menu_title}" />
        </li>
        <virtual each={dropdown in menu.dropdown}>
          <li class="sidebar-dropdown">
            <a href="javascript:void(0)" class="{disabled:dropdown.disabled}">
              <i class="{dropdown.i}"></i>
              <riot-i18nlet context="{dropdown.label}" />
              <span class="badge badge-pill badge-{dropdown.badge_color}">{dropdown.badge}</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <virtual each={submenu in dropdown.submenu}>
                  <li>
                    <a href="{submenu.href}" class="{disabled:submenu.disabled}">
                      <riot-i18nlet context="{submenu.label}" />
                      <span class="badge badge-pill badge-{submenu.badge_color}">{submenu.badge}</span>
                    </a>
                  </li>
                </virtual>
              </ul>
            </div>
          </li>
        </virtual>
        <virtual each={link in menu.link}>
          <li>
            <a href="{link.href}" class="{disabled:link.disabled}">
              <i class="{link.i}"></i>
              <riot-i18nlet context="{link.label}" />
            </a>
          </li>
        </virtual>
      </ul>
    </virtual>
  </div>
  <!-- sidebar-menu  -->

  <script>
    const tag = this
    tag.mixin('lang')
    tag.lang.loads(require('./lang/en.js'))
    tag.lang.loads(require('./lang/ja.js'))
    tag.lang.setLanguage(tag.lang.getLanguage())

    tag.items = [
      {
        menu_title: 'General',
        dropdown: [
          {
            i: 'fa fa-tachometer-alt', label: 'Dashboard', badge: 'New', badge_color: 'danger',
            submenu: [
              { label: 'Dashboard 1', href: '/#sidemenu/dashbord/1', badge: 'Pro', badge_color: 'success' },
              { label: 'Dashboard 2', href: '/#sidemenu/dashbord/2' },
              { label: 'Dashboard 3', href: '#' }
            ]
          },
          {
            i: 'fa fa-shopping-cart', label: 'E-commerce', badge: '3', badge_color: 'primary',
            submenu: [
              { label: 'Products', href: '#' },
              { label: 'Orders', href: '#' },
              { label: 'Credit cart', href: '#' }
            ]
          },
          {
            i: 'far fa-gem', label: 'Components', badge: '',
            submenu: [
              { label: 'General', href: '#' },
              { label: 'Panels', href: '#' },
              { label: 'Tables', href: '#' },
              { label: 'Icons', href: '#' },
              { label: 'Forms', href: '#' }
            ]
          },
          {
            i: 'fa fa-chart-line', label: 'Charts', badge: '',
            submenu: [
              { label: 'Pie chart', href: '#' },
              { label: 'Line chart', href: '#' },
              { label: 'Bar chart', href: '#' },
              { label: 'Histogram', href: '#' }
            ]
          },
          {
            i: 'fa fa-globe', label: 'Maps', badge: '',
            submenu: [
              { label: 'Google maps', href: '#' },
              { label: 'Open street map', href: '#' }
            ]
          }
        ]
      },
      {
        menu_title: 'Extra',
        link: [
          { i: 'fa fa-calendar', label: 'Calendar', href: '#' },
          { i: 'fa fa-folder', label: 'Examples', href: '#' },
          { i: 'fa fa-book', label: 'Documentation', href: '#' }
        ],
      },
    ]

  </script>
</sidebar-menu>