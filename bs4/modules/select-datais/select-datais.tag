<select-datais>
  <div class="form-group row text-right">
    <div id="{ref}_dev" class="col-sm-2 col-form-label">
      <label for="{ref}">
        <riot-i18nlet context="{label}" />
      </label>
    </div>
    <div class="col-sm-10">
      <select id="{ref}" ref="{ref}" class="form-control" value="{data}" data-is="{datais}" validate="required"></select>
      <span ref="{ref}_span" class="float-left invalid"></span>
    </div>
  </div>
  <script>
    const tag = this
    tag.mixin('conversion')
    tag.on('mount', _onMount)
    tag.on('updated', _onUpdated)

    tag.required = tag.conversion.toBoolean(opts.required)
    tag.ref = opts.id;
    tag.disabled = tag.conversion.toBoolean(opts.disabled)
    tag.readOnly = tag.conversion.toBoolean(opts.readOnly)
    tag.data = opts.data
    tag.label = opts.label
    tag.datais = opts.datais || 'default-option'

    function _onMount() {
      if (tag.required === true) {
        $('#' + tag.ref + '_dev').addClass('required')
      }
      if (tag.disabled === true) {
        $('#' + tag.ref + ' select').prop('disabled', 'disabled')
      }
      if (tag.readOnly === true) {
        $('#' + tag.ref + ' select').prop('readOnly', 'readOnly')
      }
      $('#' + tag.ref + ' select').change((e) => {
        tag.refs[tag.ref].value = e.target.value
        tag.data = e.target.value
      })
      tag.refs[tag.ref].value = tag.data
      tag.update()
    }
    function _onUpdated() {
      $('#' + tag.ref + ' select').val(tag.data)
    }
  </script>
</select-datais>