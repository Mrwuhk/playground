Vue.component('list', {
	props: {
		data: Array,
	},
  data: function () {
    return {};
  },
  template: '<ul>'+
  	'<li v-for="item in data" v-bind:key="item.name">{{item.name}}</li>' +
  '</ul>',
});