<datatables>

<div class="container">
	<div class="card">
		<div class="card-header">
		</div>
		<div class="card-body">
			<table id="table1" class="table table-bordered">
					<thead>
					<tr>
							<th>No</th>
							<th>氏名</th>
							<th>メールアドレス</th>
					</tr>
					</thead>
					<tbody>
					<tr>
							<td>1</td>
							<td>ほげほげ太郎</td>
							<td>hogehoge@example.com</td>
					</tr>
					<tr>
							<td>2</td>
							<td>ほげふが次郎</td>
							<td>hogefuga@example.com</td>
					</tr>
					</tbody>
			</table>
		</div>
	</div>
</div>
<script>
	$(function(){
        // datatableの設定を変更
        $("#table1").DataTable({responsive: true,select: true});
    });
</script>
</datatables>