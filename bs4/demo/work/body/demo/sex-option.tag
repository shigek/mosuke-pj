<sex-option>
  <option value=""></option>
  <option ref="man" value="001">{man}</option>
  <option ref="femail" value="002">{femail}</option>
  <script>
    const tag = this
    tag.mixin('lang')
    tag.on('mount', _onMount)
    tag.on('updated', _onUpdated)
    tag.lang.loads({ ja: { '001': '男', '002': '女' } })
    tag.lang.loads({ en: { '001': 'Man', '002': 'Femail' } })
    tag.man = tag.lang.i18n().i('001')
    tag.femail = tag.lang.i18n().i('002')
    function _onMount() {
    }

    function _onUpdated() {
      tag.refs.man.innerText = tag.lang.i18n().i('001')
      tag.refs.femail.innerText = tag.lang.i18n().i('002')
    }
  </script>
</sex-option>