<navbar>

  <ul class="navbar-nav">

    <ul class="navbar-nav mr-auto">
      <!-- 1 -->
      <li class="nav-item active">
        <a class="nav-link" href="#demo">
          <riot-i18nlet context="Home" /> <span class="sr-only">(現位置)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <riot-i18nlet context="Link" /></a>
      </li>

      <!-- 2 -->
      <li class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-wrench"></i>
          <riot-i18nlet context="settings" />
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <!-- <div class="dropdown-divider"></div> -->
          <a class="dropdown-item" href="#settings">
            <i class="fa fa-cog"></i>
            <riot-i18nlet context="settings" /></a>
        </div>
      </li>

      <!-- 3 -->
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
          <riot-i18nlet context="Disabled" /></a>
      </li>
    </ul>

    <!-- 4 -->
    <form class="form-inline my-2 my-lg-0">
      <input type="search" class="form-control mr-sm-2" placeholder="{psearch}" aria-label="{psearch}">
      <button type="submit" class="btn btn-outline-success my-2 my-sm-0">
        {button}
      </button>
    </form>

  </ul>
  <script>
    const tag = this
    tag.mixin('lang')
    tag.lang.loads(require('./lang/en'))
    tag.lang.loads(require('./lang/ja'))
    tag.button = tag.lang.i18n().i('Search')
    tag.psearch = tag.lang.i18n().i('PSearch')

  </script>
</navbar>