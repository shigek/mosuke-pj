<repeat>

<div class="container">
	<virtual each={item, i in items}>
		<virtual each={textarea, j in layout.textarea}>
			<div class="form-group row text-right">
				<div class="col-sm-2">
					<label for="{layout.ref[j]}">{layout.label[j]}-{i+1}</label>
				</div>
				<div if="{textarea}" class="col-sm-10">
					<textarea
						row="3"
						type="{layout.type[j]}"
						name="{i}"
						id="{layout.ref[j]}"
						ref="{layout.ref[j]}" 
						class="{opts.subclass} {layout.class[j]}" 
						value="{item[layout.ref[j]]}"></textarea>
				</div>
				<div if="{!textarea}" class="col-sm-10">
					<input
						type={type}
						name="{i}"
						id="{layout.ref[j]}"
						ref="{layout.ref[j]}" 
						class="{opts.subclass} {layout.class[j]}" 
						value="{item[layout.ref[j]]}">
				</div>
			</div>
		</virtual>
	</virtual>
	<div class="button-group">
		<button type="button" id="a" class="btn btn-outline-primary" onClick={plus}>plus</button>
		<button if="{button}" type="button" id="b" class="btn btn-outline-primary" onClick={minus}>minus</button>
	</div>
</div>
<script>
	let self = this;
	self.layout = opts.layout
	self.items = opts.items
	self.bkpickr = [];
	this.on('mount', () => {
		self.update({button: (self.items.length === 1) ? false : true})
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
		self.update({button:true})
	}

	this.minus = (e) => {
		self.items.pop()
		self.bkpickr.pop()
		if( self.items.length <= 1) {
			self.update({button:false})
		}
	}
</script>
</repeat>