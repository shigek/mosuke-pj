<menu>
  <div class="ui sidebar inverted vertical menu">
    <a class="item">
      1
    </a>
    <a class="item">
      2
    </a>
    <a class="item">
      3
    </a>
  </div>  
  <script>
    obs.on("menuClicked", function(obj) {
      $('.ui.sidebar').sidebar('toggle');
    })
  </script>
</menu>
