<blank>
  <fieldset>
    <div class="custom-file">
      <input type="file" name='files' class="custom-file-input" id="custom_file_input" lang="ja">
      <label class="custom-file-label" for="customFile">ファイル選択...</label>
    </div>
  </fieldset>
  <script>
    const tag = this
    tag.on('mount', _onMount)
    tag.mixin('lang')
    tag.mixin('notify')

    function _onMount() {
      $('.custom-file-input').on('change', function () {
        $(this).next('.custom-file-label').html($(this)[0].files[0].name);
      })
    }

    tag.notify.on('submit-blank', (obj) => {
      const formData = new FormData()
      const fileInput = document.querySelector('.custom-file-input')
      formData.append('name', 'files');
      formData.append('file', fileInput.files[0]);
      formData.append('api', 'json')
      fetch('/api/download', {
        method: 'POST',
        body: formData
      }).then(res => { return res.json() })
        .catch((e) => { })
    })

  </script>
</blank>