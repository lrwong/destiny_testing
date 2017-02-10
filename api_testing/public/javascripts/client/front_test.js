
function test_click(){
	$.ajax({
		url: '../../test',
		success: function(res){
			$('#test').html(res);
		}
	});
}