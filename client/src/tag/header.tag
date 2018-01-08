<header>
  <div class="ui grid">
    <div class="ui fixed inverted borderless menu">
      <a if={user} onclick={sidebar} class="header item">
          <i class="icon large grey content"></i>
      </a>
      <a  if={!user} href="#" class="header item">
        <h4>
          <i class="qq teal icon"></i>
          Agu pig Project
        </h4>
      </a>
      <div class="right menu"> 
        <div if={user} class="icon user item">{ user.name } でログイン中</div>
        <a if={user} onclick={signout} class="item"><i>Sign Out</i></a>
        <a if={!user} href="#signin" class="item"><i>Sign In</i></a>
        <div if={!user} class="item"><i>or</i></div>
        <a if={!user} href="#signup" class="item"><i>Sign Up</i></a>
      </div>
    </div>
  </div>
  <script>
      var that = this;
      that.user = null
      obs.on("logined", function(obj) {
        that.user = obj
        that.update()
        route.default('/');
      })

      sidebar() {
        obs.trigger('menuClicked', {})
      }

      signout() {
        if (('sessionStorage' in window) && (window.sessionStorage != null)){
            sessionStorage.removeItem('token')
        }
        that.user = null
        that.update();
        route.default('/');
      }
  </script>
    
</header>
