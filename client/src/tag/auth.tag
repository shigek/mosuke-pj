<auth>
    <div class="ui middle aligned center aligned grid">
    <div class="column">
        <h2 class="ui teal image header">
        <!--  <img src="assets/images/logo.png" class="image">  -->
        <div class="content">
            {opts.type=='signup' ? 'Sign Up' : 'Login to your account'}
        </div>
        </h2>
        <form class="ui large form">
            <div class="ui stacked segment">
                <div class="field">
                <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="text" name="email" placeholder="E-mail address">
                </div>
                </div>
                <div class="field">
                <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input type="password" name="password" placeholder="Password">
                </div>
                </div>
                <div class="ui fluid large teal submit button" onclick={opts.type=='signup' ? signup : signin}>
                    {opts.type=='signup' ? 'Register' : 'Login'}
                </div>
            </div>
            <div if={ error_message } class="ui visible error message">{ error_message }</div>
        </form>

        <div class="ui message">
            <p if={ opts.type=='signup' }>Already user? <a href="#signin">Sign In</a></p>
            <p if={ opts.type=='signin' }>New to us? <a href="#signup">Sign Up</a></p>
        </div>
    </div>
    </div>

    <script>
        var that = this;

        that.error_message = "error\nerror\n";
        signin() {
            console.log('sign in')
        }
        signup() {
            console.log('sign up')
        }
        that.update();
    </script>
</auth>