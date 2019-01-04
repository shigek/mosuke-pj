<language>
  <fieldset>
    <legend>Controls Bootstrap</legend>
    <select-datais label="language" id="language" required=true datais="language-option" data="{data}"></select-datais>
  </fieldset>
  <script>
    const tag = this
    tag.on('mount', _onMount)
    tag.on('unmount', _onUnmount)
    tag.mixin('notify')
    tag.mixin('lang')

    tag.lang.loads(require('./lang/en'))
    tag.lang.loads(require('./lang/ja'))

    tag.data = tag.lang.getLanguage() || 'en'
    function _onMount() {
    }
    function _onUnmount() {
      tag.notify.off('submit-language')
    }
    tag.notify.on('submit-language', (obj) => {
      const value = tag.tags['select-datais'].refs['language'].value
      tag.lang.setLanguage(value)
      tag.data = value
      riot.update()
    })

  </script>
</language>