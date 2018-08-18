<main>

<div class="container">
	<br>
	<div class="card">
		<div class="card-header">
		</div>
		<form id="submit-form">
			<div class="card-body">
				<repeat layout={layout} ref="repeat" items="{data.repeat}"></repeat>
			</div>
			<div class="card-footer">
				<button type="submit" id="a-b" class="btn btn-outline-primary"}>Submit</button>
			</div>
		</form>
	</div>
</div>
<script>
	let self = this;
	self.data = { 
		repeat:[{
		address: "hino",
		name: "hoge piyo",
		birthday: "1967-08-21",
		},{
		address: "hono",
		name: "hoge pao",
		birthday: "1967-10-16",
		}
	]}

	self.layout = [
		{
			type: "text",
			class: "form-control row text-right repeat",
			label: "address",
			ref: "address"
		},
		{
			type: "text",
			class: "form-control row text-right repeat",
			label: "name",
			ref: "name"
		},
		{
			type: "text",
			class: "sub-flatpickr form-control row text-right repeat",
			label: "birthday",
			ref: "birthday"
		},
	]

	this.on('mount', () => {
		let hoge = [];
		$('#submit-form').on('submit', ()=> {
			try {
				let data = {}
				let inputs = $('#submit-form :input')
				inputs.each( (i, v) => {
					if (v.attributes['ref']) {
						let ref = v.attributes['ref'].value
						console.log(ref + ": " + v.value);
						data[ref] = v.value;
					}
				})
			console.log(data);
			} catch (err) {
			}
			return false
		})
	})











</script>
</main>