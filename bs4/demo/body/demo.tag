<demo>
  <fieldset>
    <legend>Controls Bootstrap</legend>
    <input-text label="status" id="status" data="hoge" required=true validate="required"></input-text>
    <input-area label="memo" id="memo" data="hoge hoge" required=true></input-area>
    <input-date label="birthday" id="birthdaty" data="2011-01-01" required=true allowinput=true></input-date>
    <select-datais label="sex" id="sex" required=true></select-datais>
    <input-text label="email" id="email" required=true validate="required|email"></input-text>
  </fieldset>
  <hr class="dashed-line">
  <script>
    const tag = this
  </script>
</demo>