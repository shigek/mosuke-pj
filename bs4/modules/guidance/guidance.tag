<guidance>
  <div if={guidance} id="guidance" class="not-opacity">
    <div class="alert {guidance.alert} alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <strong>{guidance.type}</strong> {guidance.text}
    </div>
  </div>
  <script>
    var tag = this
    tag.guidance = null
    tag.mixin("notify")

    tag.notify.on("guidance-on", (obj) => {
      tag.guidance = obj
      tag.update()
      _close(3000)
    })

    function _close(ms = 0) {
      setTimeout(() => {
        $('#guidance').fadeOut(700)
        tag.guidance = null
      }, ms)
    }
  </script>
</guidance>