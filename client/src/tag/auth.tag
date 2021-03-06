<auth>
    <div class="ui middle aligned center aligned grid drop" >
        <div id="auth" class="column" style="max-width:450px;top:200px;">
            <h2 class="ui teal image header">
            <!--  <img src="assets/images/logo.png" class="image">  -->
            <div class="content">
                {opts.type=='Signup' ? 'Sign Up' : 'Login to your account'}
            </div>
            </h2>
            <form name="auth-form" class={check=='on' ? "ui form large loading" : "ui form large"}>
                <div class="ui stacked segment">
                    <div class="field">
                        <div class="ui left icon input focus">
                            <i class="user icon"></i>
                            <input id="user" ref="user" type="text" name="user" placeholder="User Id">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input ref="password" type="password" name="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="ui fluid large teal submit button">
                        {opts.type=='signup' ? 'Register' : 'Login'}
                    </div>
                    <div class="ui message">
                        <p if={ opts.type=='Signup' }>Already user? <a href="#signin">Sign In</a></p>
                        <p if={ opts.type=='Signin' }>New to us? <a href="#signup">Sign Up</a></p>
                    </div>
                </div>
                <div if={ !error_message } class="ui error message"></div>
                <div if={ error_message } class="ui visible error message small text">{ error_message }</div>
            </form>

        </div>
    </div>
    <script>
        var that = this
        that.check = ""

        //enterキーでsubmitを行わない指定
        <!--  $(function() {
            $("input").keydown(function(e) {
                if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                    return false;
                } else {
                    return true;
                }
            })
        })  -->

        this.on('mount', function() {
            $('#auth').transition('scale in')
            $('#user').eq(0).focus()

            // バリデーションルール
            $('.ui.form')
              .form({
                fields: {
                    user: 'empty',
                    password: 'empty'
                },
                onSuccess: function (event) {
                    (opts.type=='Signup') ? signup() : signin()
                    event.preventDefault()
                }
            })
        })
    </script>
    <script>
        function signin() {
            let content = {"user":that.refs.user.value, "password": that.refs.password.value}
            that.check = "on";
            fetch(/service/ + '?id=' + opts.type, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(content) })
            .then(data => data.json())
            .then(json => {
                if (json.code =='0') {
                    if (('sessionStorage' in window) && (window.sessionStorage != null)){
                        sessionStorage.setItem('token', json.value.token)
                    }
                    that.error_message = null
                    obs.trigger("logined", {"name":json.value.name})
                } else {
                    that.error_message= json.message
                }
                that.check = ""
                that.update()
            })
            .catch( e => {
                that.check = ""
                that.error_message= e.message
                that.update()
            })
        }

        function signup() {
            let content = {"user":that.refs.user.value, "password": that.refs.password.value}
            that.check = "on";
            fetch(/service/ + '?id=' + opts.type, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(content) })
            .then(data => data.json())
            .then(json => {
                if (json.code =='0') {
                    if (('sessionStorage' in window) && (window.sessionStorage != null)){
                        sessionStorage.setItem('token', json.value.token)
                    }
                    that.error_message = null
                    obs.trigger("signuped", {"name":that.refs.user.value})
                } else {
                    that.error_message= json.message
                }
                that.check = ""
                that.update()
            })
            .catch( e => {
                that.check = ""
                that.error_message= e.message
                that.update()
            })
        }
    </script>
</auth>