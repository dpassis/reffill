var app = angular.module('reffill.auth',['reffill']);

app.value('localeSupported', [
		    'en-US',
		    'pt-BR',
		    'es'
		  ]);

app.controller('authController',function ($scope,$route,$location, locale){

	$scope.name = "auth";
    //$scope.params = $routeParams;
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.setLocale = locale.setLocale;

     console.log(locale.getLocale());

});


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
