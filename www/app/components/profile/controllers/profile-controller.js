var app = angular.module('reffill.profile',[]);


app.controller('ProfilerController',
							['$scope',
							 '$route',
							  '$location', 
							  'locale', 
							  'currentAuth'
							  function ($scope, $route, $location, locale, currentAuth){

	 $scope.name = "profile";
    //$scope.params = $routeParams;
     //$scope.$route = $route;
     $scope.$location = $location;
     $scope.setLocale = locale.setLocale;
     //$scope.$routeProvider = $routeProvider;


     console.log(locale.getLocale());

}]);


app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

				//app.registerController = $controllerProvider.register;
			 	//app.$register = $provide;
			
					
			$routeProvider
			.when('/profile/edit', {
				templateUrl: 'app/components/auth/views/createView.html',
 				controller: 'AuthController',
				resolve: {
				  langs: function (locale) {
				  return locale.ready('auth');
		    		}
		    	}

			})

			.otherwise({ redirectTo: '/auth' });


		 	// Add HTML5 History API support
			$locationProvider.html5Mode(true);

}]);


