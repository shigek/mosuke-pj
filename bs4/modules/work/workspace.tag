<workspace>
  <div id="workspace" class="container-fluid pl-0 pt-0 hide">
    <br>
    <div class="card card-shadow">
      <div id="workspace-header" class="card-header"></div>
      <form id="submit-form">
        <div id="workspace-body" class="card-body">
          <div data-is="{body}"></div>
        </div>
        <div id="workspace-footer" class="card-footer">
          <button type="submit" id="a-b" class="btn btn-outline-primary" }>Submit</button>
        </div>
      </form>
    </div>
  </div>
  <script>
    const tag = this
    tag.errors = {}
    tag.body = opts.work || 'demo'
    tag.on('mount', _onMount)
    tag.mixin('validator')
    tag.mixin('notify')

    function _onMount() {
      $('#workspace').fadeIn(500);
      $('#submit-form').submit(() => {
        tag.errors = tag.validator.validation(tag.tags[tag.body].tags)
        if (tag.validator.fails(tag.errors)) {
          tag.validator.alert(tag.tags[tag.body].tags, tag.errors)
          return false
        }
        //バリデーションが成功した場合は、「submit- + tag.body」にメッセージを通知
        tag.notify.trigger('submit-' + tag.body, { form: '#submit-form' });
        return false;
      })
    }
  </script>
</workspace>