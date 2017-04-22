define(['angular'], function (angular) {
	var app = angular.module('Reffill.auth',[]);

app.controller('authController',['$scope','$route', function ($scope,$route){

	$scope.name = "authController";
    //$scope.params = $routeParams;
    $scope.$route = $route;

}]);


app.config(function($routeProvider, $locationProvider, $ocLazyLoadProvider, $controllerProvider, $provide) {

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

			.when('/auth', {
				templateUrl: 'app/components/auth/views/authView.html',
				controller: 'authController',
				resolve: {
				  langs: function (locale) {
				  return locale.ready('auth');
		    	}
		    }

			})

			//.otherwise({ redirectTo: '/auth' });


		 // Add HTML5 History API support
		// $locationProvider.html5Mode(true);

});


});