<input-date>
  <div class="form-group row text-right">
    <div id="{ref}_dev" class="col-sm-2 col-form-label required">
      <label for="{ref}">
        <i18-n>{label}</i18-n>
      </label>
    </div>
    <div class="col-sm-10">
      <input type="text" id="{ref}" ref="{ref}" class="form-control {ref}_flatpickr" value="{data}">
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
    tag.data = opts.data
    tag.label = opts.label
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