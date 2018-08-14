<flatpickr>

<div class="container">
	<div class="card">
		<div class="card-header">
		</div>
		<div class="card-body">
		<form id="submit-form">
			<input type="text" name="sample" ref="sample">
			<input type="text" name="sample" ref="sample">
			<input type="text" name="sample" ref="sample">
			<input type="text" name="sample" ref="sample">
			<p><input name="picker" ref="picker" class="createdate" placeholder="ピッカーが表示されます"></p>
			<button type="submit" id="b-b" class="btn btn-outline-primary">submit</button>
		</form>
		</div>
		<div class="card-footer">
			<button type="button" id="a-b" class="btn btn-outline-primary" onClick={a}>...</button>
		</div>
	</div>
</div>
<script>
	$(document).ready(() => {
		flatpickr('.createdate', { dateFormat: 'Y-m-d'})
		$('#submit-form').on('submit', ()=> {
			try {
				let data = {}
				let inputs = $('#submit-form :input')
				inputs.each( (i, v) => {
					if (v.attributes['ref']) {
						data['ref'] = v.value;
					}
				})
			console.log(data);
			} catch (err) {
			}
			return false
		})
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