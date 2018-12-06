/**
 * 根据参数list渲染任务列表
 */
function renderTaskList (list) {
	list.forEach(function(task, index, tasks){
		var time = task.createAt;
		var dateObject = new Date(time); // 精确到毫秒
		/* getMonth返回一个0 到 11的整数值 */
		var createAt = dateObject.getFullYear() + '/' +
			(dateObject.getMonth() + 1) + '/' + dateObject.getDate();

		var taskHtml = '<div class="task">' +
			'<div class="taskInfo">' +
				'<div class="taskImage">'+
					'<img class="image" src="images/task.jpg">' +
				'</div>' +
				'<div class="text1">' + task.name + '</div>' +
				'<div class="time" >创建的时间：' + createAt + '</div>'+
			'</div>' +
			'<div class="buttonList">' +
				'<div class="Rectangle">' +
					'<div class="rect">' +
						'<div class="viewTask">查看任务</div>' +
						'<div class="deleteTask" data-id="'+ task.id +'">删除任务</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		$(".taskList").append(taskHtml);
		/* 取消监听、监听任务的hover事件 */
		$(".task").unbind("mouseenter").unbind("mouseleave");
		$(".task").hover(
			function() {
				$(this).find(".taskInfo").hide();
				$(this).find(".buttonList").show();
			},
			function() {
				$(this).find(".buttonList").hide();
				$(this).find(".taskInfo").show();
			},
		);
		/* 取消监听、监听任务的删除按钮 */
		$('.deleteTask').unbind('click');
		$('.deleteTask').click(function() {
			let that = this;
			let taskId = $(that).attr("data-id");
			$.ajax({
			  method: "DELETE",
			  url: "http://192.168.125.120:3000/task",
			  data: { id: taskId },
			  success: function(res) {
			  	/* 向上遍历DOM树，找到class为task的元素，移除 */
					$(that).parents('.task').remove();
			  },
			});
		});
		/* 监听查看按钮点击事件，跳转到任务详情页 */
		$(".viewTask").click(function() {
			/* 将点击的任务的相应信息存到缓存：sessionStorage */
			window.sessionStorage.setItem('taskInfo', JSON.stringify(task));
			window.location.href = "./taskDetail/index.html";
		});
	});
}

$(document).ready(function() {
	$.get('http://192.168.125.120:3000/task/taskList', function(res) {
		let taskList = res.data;
		renderTaskList(taskList);
	});
	/* 监听新建任务的点击事件 */
	$('.createTask').click(function() {
		let name = 'new';
		$.post('http://192.168.125.120:3000/task/createTask',{name},function(res){
			let newTask = [{
				createAt: res.data.createAt,
				id: res.data.id,
				name,
			}];
			renderTaskList(newTask);
		});
	});
});
