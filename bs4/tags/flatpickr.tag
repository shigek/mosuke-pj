<flatpickr>

<div class="container">
	<div class="card">
		<div class="card-header">
		</div>
		<div class="card-body">
			<p><input class="createdate" placeholder="ピッカーが表示されます"></p>
		</div>
		<div class="card-footer">
			<button type="button" id="a-b" class="btn btn-outline-primary" onClick={a}>...</button>
		</div>
	</div>
</div>
<script>
	$(document).ready(() => {
		flatpickr('.createdate', { dateFormat: 'Y-m-d'})
	})
	this.a = (e) => {
		$('#a-b').LoadingOverlay('show')
		setTimeout(() => {
      $('#a-b').LoadingOverlay('hide')
			flatpickr('.createdate', {defaultDate: '2009-01-01'})	
    }, 3000)
	}
</script>
</flatpickr>