<settings>
  <fieldset>
    <legend>
      <riot-i18nlet context="General" />
    </legend>
    <select-datais label="language" id="language" datais="language-option" data="{data}"></select-datais>
    <select-datais label="theme" id="theme" datais="theme-option" data="{theme}"></select-datais>
  </fieldset>
  <script>
    const tag = this
    tag.on('mount', _onMount)
    tag.on('unmount', _onUnmount)
    tag.mixin('notify')
    tag.mixin('lang')
    tag.mixin('theme')

    tag.lang.loads(require('./lang/en'))
    tag.lang.loads(require('./lang/ja'))

    tag.data = tag.lang.getLanguage() || 'en'
    tag.theme = tag.theme.getTheme()
    function _onMount() {
    }
    function _onUnmount() {
      tag.notify.off('submit-settings')
    }
    tag.notify.on('submit-settings', (obj) => {
      if ($('.theme').hasClass(tag.theme)) {
        $('.theme').removeClass(tag.theme)
        tag.theme = $('#theme select').val()
        $('.theme').addClass(tag.theme)
      }
      tag.data = $('#language select').val()
      tag.lang.setLanguage(tag.data)
      riot.update()
    })

  </script>
</settings>