
define(['angular',
		'angular_route',
		'angular_mocks',
		'angular_sanitize',
		'angular_localization',
		'angular_cookies',
		'angular_ocLazyLoad'], 
	function () {

		var app = angular.module('Reffill', [
											  'ngRoute',
											  'ngMockE2E',
											  'ngSanitize',
											  'ngLocalize',
											  'ngCookies',
											  'oc.lazyLoad'
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


		app.config(function($routeProvider, $locationProvider, $ocLazyLoadProvider, $controllerProvider, $provide) {

				app.registerController = $controllerProvider.register;
			 	app.$register = $provide;


			 	console.log("principal route");
				$ocLazyLoadProvider.config({
			     modules: [{
			    		name: 'auth',
			    		files: ['components/auth/auth.js'],
			    		name: 'about',
			    		files: ['components/about/about.js']
			 	 }]

			  });
					

			$routeProvider
			.when('/', {
				templateUrl: 'app/components/home/views/homeView.html',
				resolve: {
				  langs: function (locale) {
				  return locale.ready('home');
		    	}
		    }

			})


			.when('/auth', {
				templateUrl: 'app/components/auth/views/authView.html',
				//controller: 'authController',
				//controllerAs: 'authController',
				resolve: {
				    langs: function (locale) {
				      return locale.ready('auth');
		    		},
		    		loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                        //debugger
                        var deferred = $q.defer();

                        // After loading the controller file we need to inject the module
                        // to the parent module
                        require(["authController"], function () {
                            // Using OcLazyLoad we can inject the any module to the parent module
                            $ocLazyLoad.inject('Togheter.auth');
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
		    	}

			})


			.when('/about', {
				templateUrl: 'app/components/about/views/aboutView.html',
				controller: 'AboutController',
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

		})


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

});
