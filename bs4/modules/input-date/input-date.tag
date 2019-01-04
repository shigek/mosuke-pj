<input-date>
  <div class="form-group row text-right">
    <div id="{ref}_dev" class="col-sm-2 col-form-label required">
      <label for="{ref}">
        <riot-i18nlet context="{label}" />
      </label>
    </div>
    <div class="col-sm-10">
      <input type="text" id="{ref}" ref="{ref}" class="form-control {ref}_flatpickr" value="{data}" ref-label="{ref_label}"
        validate="{validate}">
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
    tag.disabled = tag.conversion.toBoolean(opts.disabled)
    tag.readOnly = tag.conversion.toBoolean(opts.readOnly)
    tag.data = opts.data
    tag.label = opts.label
    tag.ref_label = tag.lang.i18n().i(tag.label)
    tag.allowInput = tag.conversion.toBoolean(opts.allowinput)
    tag.dateFormat = opts.dateFormat || 'Y-m-d'

    function _onMount() {
      const dateOption = {}
      dateOption.dateFormat = tag.dateFormat
      dateOption.allowInput = tag.allowInput
      const calendar = flatpickr('.' + tag.ref + '_flatpickr', dateOption)
      if (tag.required === true) {
        $('#' + tag.ref + '_dev').addClass('required')
      }
      if (tag.disabled === true) {
        $('#' + tag.ref).prop('disabled', 'disabled')
      }
      if (tag.readOnly === true) {
        $('#' + tag.ref).prop('readOnly', 'readOnly')
      }
      $('#' + tag.ref).keydown((e) => {
        if (e.keyCode === 13 || e.keyCode === 9) {
          calendar.setDate(e.target.value)
          calendar.close()
        }
      })
    }
  </script>
</input-date>