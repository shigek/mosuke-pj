<language-option>
  <option ref="en" value="en">{en}</option>
  <option ref="ja" value="ja">{ja}</option>
  <script>
    const tag = this
    tag.mixin('lang')
    tag.on('mount', _onMount)
    tag.on('updated', _onUpdated)
    tag.ja = tag.lang.i18n().i('ja')
    tag.en = tag.lang.i18n().i('en')
    function _onMount() {
    }

    function _onUpdated() {
      tag.refs.ja.innerText = tag.lang.i18n().i('ja')
      tag.refs.en.innerText = tag.lang.i18n().i('en')
    }
  </script>
</language-option>