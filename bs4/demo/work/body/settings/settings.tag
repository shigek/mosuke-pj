<settings>
  <fieldset>
    <legend>
      <riot-i18nlet context="General" />
    </legend>
    <language-select label="language" id="language" datais="language-option"></language-select>
    <theme-select label="theme" id="theme" datais="theme-option"></theme-select>
  </fieldset>
  <script>
    const tag = this
    tag.on('mount', _onMount)
    tag.on('unmount', _onUnmount)
    tag.mixin('notify')
    tag.mixin('lang')

    tag.lang.loads(require('./lang/en'))
    tag.lang.loads(require('./lang/ja'))
    function _onMount() {
    }

    function _onUnmount() {
      tag.notify.off('submit-settings')
    }

    tag.notify.on('submit-settings', (obj) => {
      riot.update()
    })

  </script>
</settings>