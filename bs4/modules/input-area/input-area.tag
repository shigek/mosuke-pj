<input-area>
  <div class="form-group row text-right">
    <div id="{ref}_dev" class="col-sm-2 col-form-label">
      <label for="{ref}">
        <riot-i18nlet context="{label}" />
      </label>
    </div>
    <div class="col-sm-10">
      <textarea row="{rows}" id="{ref}" ref="{ref}" class="form-control" value="{data}" validate="{validate}" ref-label="{ref_label}"></textarea>
      <span ref="{ref}_span" class="float-left invalid"></span>
    </div>
  </div>
  <script>
    const tag = this
    tag.mixin('conversion')
    tag.mixin('lang')
    tag.on('mount', _onMount)

    tag.validate = opts.validate || ''
    tag.required = tag.conversion.contains(tag.validate, 'required')

    tag.ref = opts.id;
    tag.rows = opts.rows || '3'
    tag.disabled = tag.conversion.toBoolean(opts.disabled)
    tag.readOnly = tag.conversion.toBoolean(opts.readOnly)
    tag.data = opts.data
    tag.label = opts.label
    tag.ref_label = tag.lang.i18n().i(tag.label)

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
</input-area>