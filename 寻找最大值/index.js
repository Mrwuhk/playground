var tool = new ArrayTool();
	function ArrayTool(){
		this .getMax = function (arr){
			var max=arr[0];
			for (var i = 1; i < arr.length; i++) {
				if(arr[i]>max){
					max=arr[i];
				}
			}
			return max;
		}
		this.searchEle =function(arr,target){
			for (var i = 0; i < arr.length; i++) {
				if (arr[i]==target) {
					return i;
				}
			}
			return -1;
		}
}