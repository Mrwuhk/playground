$(document).ready(function() {
	var taskInfo = window.sessionStorage.getItem("taskInfo");
	$(".taskInfo").html(taskInfo);
	/* 点击返回按钮，跳转至我的任务页面 */
	$("button").click(function() {
		window.location.href = "../index.html";
	});
});
