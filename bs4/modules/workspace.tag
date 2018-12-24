<workspace>
  <div class="container">
    <br>
    <div class="card">
      <div class="card-header"></div>

      <form id="submit-form">
        <div class="card-body">
          <div data-is="{body}"></div>
        </div>
        <div class="card-footer">
          <button type="submit" id="a-b" class="btn btn-outline-primary" }>Submit</button>
        </div>
      </form>

    </div>
  </div>
  <script>
    const tag = this
    tag.errors = {}
    tag.body = 'demo'
    tag.on('mount', _onMount)
    tag.mixin('validator')
    function _onMount() {
      $('#submit-form').submit(() => {
        tag.errors = tag.validator.validation(tag.tags[tag.body].tags)
        if (tag.validator.fails(tag.errors)) {
          tag.validator.alert(tag.tags[tag.body].tags, tag.errors)
          return false
        }
      })
    }
  </script>
</workspace>