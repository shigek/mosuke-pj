<repeat>

<div class="container">
	<br>
	<div class="card">
		<div class="card-header">
		</div>
		<div class="card-body">
		<form id="submit-form">
			<virtual each={item,i in items}>
				<div class="form-group row text-right">
					<label for="picker"> 日付 </label>
					<input
						name="{i}"
						id="pickers" 
						ref="picker" 
						class="createdate" 
						value="{data.createdate}"
						placeholder="ピッカーが表示されます">
				</div>
			</virtual>
		</form>
		</div>
		<div class="card-footer">
			<div class="button-group">
				<button type="button" id="a" class="btn btn-outline-primary" onClick={plus}>plus</button>
				<button type="button" id="b" class="btn btn-outline-primary" onClick={minus}>minus</button>
				<button type="button" id="c" class="btn btn-outline-primary" onClick={refresh}>refresh</button>
			</div>
		</div>
	</div>
</div>
<script>
	let self = this;
	self.items = [1,2,3]
	self.data = {createdate:'2001-01-01'}
	self.bkpickr = [];
	this.on('mount', () => {
		self.update()
	})

	this.on('update', () => {
	})

	this.on('updated', () => {
		self.picker = flatpickr('.createdate',{ 
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