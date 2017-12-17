<inquire>
    <div class="ui fluid very padded basic container segment" style="margin-top:70px;max-width:500px!important;">
      <div if={ error_message } class="ui visible error message">{ error_message }</div>
      <div class="ui center aligned very padded basic segment">
        <h1 class="ui icon header">
          <i class="qq teal icon"></i>
          <div class="content">
            Hello Inquire! {count}
          </div>
        </h1>
        <div class="sub header">
          .... F....... . PDF load example.
        </div>
      </div>
    </div>
    <script>
      this.count = '( Loading...)';
      var self = this;
      this.on('mount', function() {
        self.update();

        //JSONで受け取る　https://qiita.com/tomoyukilabs/items/9b464c53450acc0b9574
        fetch( opts.url + '?id=get' )
        .then( data => data.json() )
        .then( json => {
          self.count = json.share.share_count
          self.update()
        })
        .catch ( e => {
          self.error_message = e.message;
          self.update();
        })
      });
    </script>
</inquire>