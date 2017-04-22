angular.module('about')
.config(function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/auth/', {
		templateUrl: 'app/components/auth/views/authView.html',
		controller: 'AuthController',
		controllerAs: 'authController',
		resolve: {
		    langs: function (locale) {
		      return locale.ready('common');
    	}
    }

	})

	.otherwise({ redirectTo: '/' });


 // Add HTML5 History API support
  $locationProvider.html5Mode(true);

});
