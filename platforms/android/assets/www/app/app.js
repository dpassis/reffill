
		var app = angular.module('reffill', [
											  'ngRoute',
											  'ngMockE2E',
											  'ngSanitize',
											  'ngLocalize',
											  'ngCookies'
												]);

		app.value('localeSupported', [
		    'en-US',
		    'pt-BR',
		    'es'
		  ])

	
		app.controller('MainController', function($scope, $route, $location, locale) {
		     $scope.$route = $route;
		     $scope.$location = $location;
		     $scope.setLocale = locale.setLocale;

		     console.log(locale.getLocale());
		 })


		app.config(function($routeProvider, $locationProvider) {

			$routeProvider
			.when('/', {
				
				templateUrl: 'app/components/home/views/homeView.html',
				resolve: {
				  langs: function (locale) {
				  return locale.ready('home');
		    	}
		    }
		    	//console.log("passei aki no home");
			})


			.when('/auth', {
				templateUrl: 'app/components/auth/views/authView.html',
				controller: 'authController',
				//controllerAs: 'auth',
				resolve: {
				    langs: function (locale) {
				      return locale.ready('auth');
		    		}
		    	}

			})


			.when('/about', {
				templateUrl: 'app/components/about/views/aboutView.html',
				//controller: 'AboutController',
				//controllerAs: 'authController			',
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


		app.run(function($httpBackend) {
		    $httpBackend.whenGET('languages/en-US/')
		      .respond(angular.toJson({
		      }));
		    $httpBackend.whenGET('languages/pt-BR/')
		      .respond(angular.toJson({
		      }));
		    $httpBackend.whenGET('languages/es/')
		      .respond(angular.toJson({
		      }));
		    $httpBackend.whenGET(/.*/).passThrough();
	  });

