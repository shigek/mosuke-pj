<input-text>
  <div class="form-group row text-right">
    <div id="{ref}_dev" class="col-sm-2 col-form-label">
      <label for="{ref}">
        <i18-n>{label}</i18-n>
      </label>
    </div>
    <div class="col-sm-10">
      <input type="text" id="{ref}" ref="{ref}" class="form-control" value="{data}" validate="{validate}">
      <span ref="{ref}_span" class="float-left invalid"></span>
    </div>
  </div>
  <script>
    const tag = this
    tag.mixin('conversion')
    tag.on('mount', _onMount)

    tag.required = tag.conversion.toBoolean(opts.required)
    tag.validate = opts.validate || ''
    tag.ref = opts.id;
    tag.disabled = tag.conversion.toBoolean(opts.disabled)
    tag.readOnly = tag.conversion.toBoolean(opts.readOnly)
    tag.data = opts.data || ''
    tag.label = opts.label

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
</input-text>