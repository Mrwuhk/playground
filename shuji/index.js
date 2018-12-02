/**
 * 根据参数list渲染任务列表
 */
function renderTaskList (list) {
	list.forEach(function(task, index, tasks){
		var time = task.createAt;
		var dateObject = new Date(time); // 精确到毫秒
		var year = dateObject.getFullYear();
		var month = dateObject.getMonth() + 1; // getMonth返回一个0 到 11的整数值
		var date = dateObject.getDate();
		var createAt = year +'/'+month+'/'+ date;

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
						'<div class="deleteTask">删除任务</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		$(".taskList").append(taskHtml);
		/* 监听任务的hover事件 */
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
	});
}

$(document).ready(function() {
	var taskList = response.data;
	renderTaskList(taskList);
	/* 监听新建任务的点击事件 */
	$('.createTask').click(function() {
		var newTask = [{
			createAt: Date.now(),
			id: Date.now().toString(),
			name: "新任务",
		}];
		renderTaskList(newTask);
	});
	/* 监听任务的删除按钮 */
	$('.deleteTask').click(function() {
		/* 向上遍历DOM树，找到class为task的元素，移除 */
		$(this).parents('.task').remove();
	});
});
