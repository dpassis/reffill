define(['angular',
		'angular_route',
		'angular_mocks',
		'angular_sanitize',
		'angular_localization',
		'angular_cookies',
		'angular_resource',
		'angular_ocLazyLoad',
		'angular_fire',
		'firebase'], 
	function () {

		var app = angular.module('reffill', [
											  'ngRoute',
											  'ngMockE2E',
											  'ngSanitize',
											  'ngLocalize',
											  'ngCookies',
											  'ngResource',
											  'oc.lazyLoad',
											  'firebase'
												]);

		app.value('localeSupported', [
		    'en-US',
		    'pt-BR',
		    'es'
		  ]);

		//var ref = new Firebase('https://reffill-7ffbe.firebaseio.com/');
		var config = {
            apiKey: "AIzaSyBhgTxcOfXOH9CZfzK9kcixaN6MOUtbxDo",
            authDomain: "reffill-7ffbe.firebaseapp.com",
            databaseURL: "https://reffill-7ffbe.firebaseio.com",
            projectId: "reffill-7ffbe",
            storageBucket: "reffill-7ffbe.appspot.com",
            messagingSenderId: "1047992509132"
        };
        firebase.initializeApp(config);

	
		app.controller('MainController', function($scope, $route, $location, locale, $firebaseAuth) {
			 var auth = $firebaseAuth();

			 console.log(auth);

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
			    		name: 'auth-controller',
			    		files: ['components/auth/controllers/auth-controller.js'],
			    		name: 'about',
			    		files: ['components/about/controllers/about-controller.js']
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
				controller: 'AuthController',
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
                            $ocLazyLoad.inject('reffill.auth');
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
		    	}

			})


			.when('/about', {
				templateUrl: 'app/components/about/views/aboutView.html',
				//controller: 'AboutController',
				//controllerAs: 'authController			',
				resolve: {
					    langs: function (locale) {
					      return locale.ready('common');
			    		},
						loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
	                        //debugger
	                        var deferred = $q.defer();

	                        // After loading the controller file we need to inject the module
	                        // to the parent module
	                        require(["authController"], function () {
	                            // Using OcLazyLoad we can inject the any module to the parent module
	                            $ocLazyLoad.inject('reffill.auth');
	                            deferred.resolve();
	                        });
	                        return deferred.promise;
                    	}]
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