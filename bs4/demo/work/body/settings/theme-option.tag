<theme-option>
  <virtual each={theme in themes}>
    <option ref="{theme.value}" value="{theme.value}">{theme.label}</option>
  </virtual>
  <script>
    const tag = this
    tag.mixin('lang')
    tag.on('mount', _onMount)
    tag.on('updated', _onUpdated)
    tag.ja = tag.lang.i18n().i('ja')
    tag.en = tag.lang.i18n().i('en')

    tag.themes = [
      { value: 'dark-theme', label: 'dark' },
      { value: 'cool-theme', label: 'cool' },
      { value: 'ice-theme', label: 'ice' },
      { value: 'light-theme', label: 'light' },
      { value: 'green-theme', label: 'green' },
      { value: 'spicy-theme', label: 'spicy' },
      { value: 'purple-theme', label: 'purple' },
      { value: 'primary-theme', label: 'primary' },
      { value: 'goldenrod-theme', label: 'goldenrod' }
    ]
    function _onMount() {
    }

    function _onUpdated() {
    }
  </script>
</theme-option>