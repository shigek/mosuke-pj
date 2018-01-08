<profile>
    <div class="ui fluid very padded basic container segment" style="margin-top:70px;max-width:500px!important;">
      <div id="profile" class="ui center aligned very padded basic segment">
        <h1 class="ui icon header">
          <i class="qq teal icon"></i>
          <div class="content">
            Hello Inquire! {path}
          </div>
        </h1>
        <div class="sub header">
          .... F....... . PDF load example.
        </div>
      </div>
    </div>
    <script>
      var self = this;
      this.on('mount', function() {
        $('#profile').transition('scale in');
      });
    </script>
</profile>