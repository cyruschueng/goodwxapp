function search() {

	var name = $('#crxk-input').val();
	console.log(name);
	$.post('/admin/query',{
		name:name
	},function(data){
		console.log(data);
		console.log(data.length)
		if (data.length<1) {
			alert('没有记录~');
			return 0;
		}
		$('#crxk-table').empty()
		//遍历输出查询的结果
		for (var i = data.length - 1; i >= 0; i--) {
			var child = '<tr><td>'+data[i].account+'</td><td>'+data[i].name+'</td><td>'+data[i].intelligence+'</td><td>'+data[i].irank+'</td><td>'+data[i].morality+'</td><td>'+data[i].mrank+'</td><td>'+data[i].sports+'</td><td>'+data[i].srank+'</td><td>'+data[i].sum+'</td><td>'+data[i].rank+'</td></tr>';
			$('#crxk-table').append(child)
		  }  
	})
}
function add() {
	var name = $('#crxk-name').val()
	var snum = $('#crxk-snum').val()
	var intelligence = $('#crxk-intelligence').val()
	var morality = $('#crxk-morality').val()
	var sports = $('#crxk-sports').val()
	console.log(" 看结果");
	if(name ==''||snum==''||intelligence==''||morality==''||sports=='') 
		{
			alert('请把数据填写完整呀');
			return 0;
		}
	$.post('/admin/add',{
		name:name,
		snum:snum,
		intelligence:intelligence,
		morality:morality,
		sports:sports
	},function(data){
		console.log(data);
		alert('添加成功');
		$('#crxk-name').empty();
		$('#crxk-snum').empty();
		$('#crxk-intelligence').empty();
		$('#crxk-morality').empty();
		$('#crxk-sports').empty();

	})
}
function update() {
	var snum = $('#ucrxk-snum').val()
	var intelligence = $('#ucrxk-intelligence').val()
	var morality = $('#ucrxk-morality').val()
	var sports = $('#ucrxk-sports').val()

	if(snum==''||intelligence==''||morality==''||sports=='') 
		{
			alert('请把数据填写完整呀');
			return 0;
		}

	$.post('/admin/update',{
		snum:snum,
		intelligence:intelligence,
		morality:morality,
		sports:sports
	},function(data){
		console.log(data);
		if(data.affectedRows>0){
			alert('修改成功');
		}else{
			alert('没有此用户')
		}
		$('#ucrxk-snum').empty();
		$('#ucrxk-intelligence').empty();
		$('#ucrxk-morality').empty();
		$('#ucrxk-sports').empty();

	})
}
function deleteUser() {
	var snum = $('#dcrxk-snum').val()
	if (snum=='') {
		alert('请输入学号')
		return 0;
	}

	$.post('/admin/delete',{
		snum:snum,
	},function(data){
		console.log(data);
		if(data.affectedRows>0){
			alert('删除成功');
			$('#dcrxk-snum').empty();

		}else{
			alert('没有此用户')
		}
	})
}