<auth>
    <div class="ui middle aligned center aligned grid drop" >
        <div id="auth" class="column" style="max-width:450px;top:200px;">
            <h2 class="ui teal image header">
            <!--  <img src="assets/images/logo.png" class="image">  -->
            <div class="content">
                {opts.type=='signup' ? 'Sign Up' : 'Login to your account'}
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
                    <div class="ui fluid large teal button" onclick={opts.type=='signup' ? signup : signin}>
                        {opts.type=='signup' ? 'Register' : 'Login'}
                    </div>
                    <div class="ui message">
                        <p if={ opts.type=='signup' }>Already user? <a href="#signin">Sign In</a></p>
                        <p if={ opts.type=='signin' }>New to us? <a href="#signup">Sign Up</a></p>
                    </div>
                </div>
                <div if={ !error_message } class="ui error message"></div>
                <div if={ error_message } class="ui visible error message">{ error_message }</div>
            </form>

        </div>
    </div>
    <script>
        var that = this
        that.check = ""

        //enterキーでsubmitを行わない指定
        $(function() {
            $("input").keydown(function(e) {
                if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                    return false;
                } else {
                    return true;
                }
            });
        });

        this.on('mount', function() {
            $('#auth').transition('scale in')
            $('#user').eq(0).focus()

            // バリデーションルール
            $('.ui.form')
              .form({
                fields: {
                    user: 'empty',
                    password: 'empty'
                }
            });
        });

        signin(event) {
            if (!$('.ui.form').form('is valid', 'user') ||
                !$('.ui.form').form('is valid', 'password')) {
                return false
            }
            event.preventDefault();
            let content = {"user":this.refs.user.value, "password": this.refs.password.value}
            that.check = "on";
            fetch(/service/ + '?id=Signin', {
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
            return false
        }

        signup() {
        }
    </script>
</auth>