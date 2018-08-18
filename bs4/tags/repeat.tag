<repeat>

<div class="container">
	<virtual each={item, i in items}>
		<virtual each={layout, j in layouts}>
			<div class="form-group row text-right">
				<label for="{layout.ref}">{layout.label}-{i+1}</label>
				<input
					type="{layout.type}"
					name="{i}"
					id="{layout.ref}"
					ref="{layout.ref}" 
					class="{layout.class}" 
					value="{item[layout.ref]}">
			</div>
		</virtual>
	</virtual>
	<div class="button-group">
		<button type="button" id="a" class="btn btn-outline-primary" onClick={plus}>plus</button>
		<button type="button" id="b" class="btn btn-outline-primary" onClick={minus}>minus</button>
	</div>
</div>
<script>
	let self = this;
	self.layouts = opts.layout
	self.items = opts.items
	self.bkpickr = [];
	this.on('mount', () => {
		self.update()
	})

	this.on('update', () => {
	})

	this.on('updated', () => {
		self.picker = flatpickr('.sub-flatpickr',{ 
			dateFormat: 'Y-m-d', 
			onReady: (selectedDates, dateStr, e) => {
				let index = parseInt(e.input.name)
				if (self.bkpickr.length === index) {
					self.bkpickr[index] = e.input.value
				} else {
					e.input.value = self.bkpickr[index]
					self.bkpickr[index] = e.input.value
				}
			},
			onChange: (selectedDates, dateStr, e) => {
				let index = parseInt(e.input.name)
				self.bkpickr[index] = dateStr
			}
		})
	})

	this.plus = (e) => {
		self.items.push(1)
	}

	this.minus = (e) => {
		if( self.items.length > 1) {
			self.items.pop()
			self.bkpickr.pop()
		}
	}
</script>
</repeat>