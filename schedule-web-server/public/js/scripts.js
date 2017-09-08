$().ready(function(){
	var tasksReq = $.getJSON("68.115.32.93:1022/api/tasks");
	var task = new Vue({
		el: '#task',
		data:{
			tasks: tasksReq
		}
	});
});