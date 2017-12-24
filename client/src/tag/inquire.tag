<inquire>
    <div class="ui fluid very padded basic container segment" style="margin-top:70px;max-width:500px!important;">
      <!--  <div if={ error_message } class="ui negative message">
        <i class="close icon"></i>
          <div class="header">
            There were some errors with your request.
          </div>
          <p>{ error_message }</p>
      </div>
      <div if={ message } class="ui success message">
        <i class="close icon"></i>
          <div class="header">
            {message}
          </div>
      </div>  -->
      <div class="ui center aligned very padded basic segment">
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
      this.path = '( Loading...)';
      var self = this;
      this.on('mount', function() {
        //JSONで受け取る　https://qiita.com/tomoyukilabs/items/9b464c53450acc0b9574
        fetch(opts.url + '?id=Report')
          .then( data => data.json() )
          .then( json => {
            if (json.code =='0') {
              obs.trigger("guidanceChanged", {type:"success",text:"Your report generation request was successful."})
              self.path = json.result.path
            }  else {
              obs.trigger("guidanceChanged", {type:"error",text:json.message})
            }
            self.update() })
          .catch( e => {
            <!--  console.log(e);  -->
            obs.trigger("guidanceChanged", {type:"error",text:e.message})
          })
      });
    </script>
</inquire>