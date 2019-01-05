<demo>
  <fieldset>
    <legend id="group1-labelledby">
      Controls Bootstrap
      <a href="#group-1" class="collapsed text-body" role="button" data-toggle="collapse" aria-expanded="true"
        aria-controls="group-1"></a>
    </legend>
    <div class="collapse show" role="tabpanel" id="group-1" aria-labelledby="group1-labelledby" aria-expanded="true">
      <input-text label="status" id="status" data="hoge" validate="required"></input-text>
      <input-area label="memo" id="memo" data="hoge hoge"></input-area>
      <input-date label="birthday" id="birthdaty" data="2011-01-01" validate="required" allowinput=true></input-date>
      <select-datais label="sex" id="sex" datais="sex-option"></select-datais>
      <input-text label="email" id="email" validate="required|email"></input-text>
      <hr class="dashed-line">
    </div>
  </fieldset>
  <fieldset>
    <legend id="group1-labelledby">
      Repeat Contents
      <a href="#group-2" class="collapsed text-body" role="button" data-toggle="collapse" aria-expanded="true"
        aria-controls="group-2"></a>
    </legend>
    <div class="collapse show" role="tabpanel" id="group-2" aria-labelledby="group2-labelledby" aria-expanded="true">
      <hr class="dashed-line">
    </div>
  </fieldset>
  <script>
    const tag = this
    tag.on('mount', _onMount)
    tag.mixin('lang')
    tag.mixin('notify')
    tag.lang.loads(require('./lang/en'))
    tag.lang.loads(require('./lang/ja'))

    function _onMount() {
    }
  </script>
</demo>