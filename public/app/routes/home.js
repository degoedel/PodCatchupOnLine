(function(){
	angular.config(function($routeProvider){
		return $routeProvider.when("/", {
			templateUrl:"app/views/home.html"
		});
	});
})();