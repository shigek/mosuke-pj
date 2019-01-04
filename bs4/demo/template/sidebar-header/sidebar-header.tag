<sidebar-header>
  <div class="sidebar-header">
    <div class="user-pic">
      <i class="fas fa-3x fa-user-tie"></i>
    </div>
    <div class="user-info">
      <span class="user-name">{first_name}
        <strong>{last_name}</strong>
      </span>
      <span class="user-role">{role}</span>
      <span class="user-status">
        <i class="fa fa-circle"></i>
        <span>Online</span>
      </span>
    </div>
  </div>
  <!-- sidebar-header  -->
  <script>
  const tag = this
  tag.first_name = opts.first_name || '{first_name}'
  tag.last_name = opts.last_name || '{last_name}'
  tag.role = opts.role || '{role}'
  
  
  </script>
</sidebar-header>