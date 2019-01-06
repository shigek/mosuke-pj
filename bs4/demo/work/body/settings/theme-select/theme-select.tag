<theme-select>
  <div class="form-group row text-right">
    <div id="{ref}_dev" class="col-sm-2 col-form-label">
      <label for="{ref}">
        <riot-i18nlet context="{label}" />
      </label>
    </div>
    <div class="col-sm-10">
      <select id="{ref}" ref="{ref}" class="form-control" value="{data}" data-is="{datais}" ref-label="{lef_label}"></select>
      <span ref="{ref}_span" class="float-left invalid"></span>
    </div>
  </div>
  <script>
    const tag = this
    tag.mixin('lang')
    tag.mixin('theme')

    tag.on('mount', _onMount)
    tag.on('updated', _onUpdated)

    tag.ref = opts.id;
    tag.label = opts.label
    tag.ref_label = tag.lang.i18n().i(tag.label)
    tag.datais = opts.datais || 'default-option'
    tag.data = tag.theme.getTheme()

    function _onMount() {
      tag.refs[tag.ref].value = tag.data
      tag.update()

      $('#' + tag.ref + ' select').change((e) => {
        if ($('.theme').hasClass(tag.data)) {
          $('.theme').removeClass(tag.data)
          tag.data = e.target.value
          tag.refs[tag.ref].value = e.target.value
          $('.theme').addClass(tag.data)
          tag.theme.setTheme(tag.data)
        }
      })
    }
    function _onUpdated() {
      $('#' + tag.ref + ' select').val(tag.data)
      tag.theme.setTheme(tag.data)
    }
  </script>
</theme-select>