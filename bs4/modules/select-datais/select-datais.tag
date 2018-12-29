<select-datais>
  <div class="form-group row text-right">
    <div id="{ref}_dev" class="col-sm-2 col-form-label">
      <label for="{ref}">
        <i18-n>{label}</i18-n>
      </label>
    </div>
    <div class="col-sm-10">
      <select id="{ref}" ref="{ref}" class="form-control" value="{value}" data-is="{datais}" validate="required"></select>
      <span ref="{ref}_span" class="float-left invalid"></span>
    </div>
  </div>
  <script>
    const tag = this
    tag.mixin('conversion')
    tag.on('mount', _onMount)

    tag.required = tag.conversion.toBoolean(opts.required)
    tag.ref = opts.id;
    tag.disabled = tag.conversion.toBoolean(opts.disabled)
    tag.readOnly = tag.conversion.toBoolean(opts.readOnly)
    tag.value = opts.value
    tag.label = opts.label
    tag.datais = opts.datais || 'default-option'

    function _onMount() {
      if (tag.required === true) {
        $('#' + tag.ref + '_dev').addClass('required')
      }
      if (tag.disabled === true) {
        $('#' + tag.ref).prop('disabled', 'disabled')
      }
      if (tag.readOnly === true) {
        $('#' + tag.ref).prop('readOnly', 'readOnly')
      }
    }
  </script>
</select-datais>