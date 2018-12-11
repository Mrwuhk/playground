new Vue({
  el: '#app',
  data: function() {
		return {
			tasks: [],
		};
	},
	created: function() {
		this.tasks = response.data.map((task, index, tasks) => {
			return {
				...task,
				isHover: false,
			};
		});
	},
	methods: {
		getDate: function(task){
			const createAt=task.createAt;
			return new Date(createAt).getFullYear()+'/'
				+(new Date(createAt).getMonth()+1 )+'/'+
				new Date(createAt).getDate() ;
		},
		mouseover: function(index) {
			this.tasks = [
				...this.tasks.slice(0, index),
				{
					...this.tasks[index],
					isHover: true,
				},
				...this.tasks.slice(index + 1),
			];
		},
		mouseout: function(index) {
			this.tasks = [
				...this.tasks.slice(0, index),
				{
					...this.tasks[index],
					isHover: false,
				},
				...this.tasks.slice(index + 1),
			];
		},
	},
})
