var app = angular.module('auth',['reffill']);

app.controller('authController',['$scope','$route', function ($scope,$route){

	$scope.name = "auth";
    //$scope.params = $routeParams;
    $scope.$route = $route;

}]);


app.config(function($routeProvider,$route, $locationProvider) {

				app.registerController = $controllerProvider.register;
			 	app.$register = $provide;
			
					
			$routeProvider
			.when('/auth/create', {
				templateUrl: 'app/components/auth/views/createView.html',
				controller: 'authController',
				resolve: {
				  langs: function (locale) {
				  return locale.ready('auth');
		    	}
		    }

			})

			//.otherwise({ redirectTo: '/auth' });


		 // Add HTML5 History API support
		$locationProvider.html5Mode(true);

});
