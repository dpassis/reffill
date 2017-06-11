define(['app'], 
	function () {

		var app = angular.module('reffill', [
											  'ngRoute',
											  'ngMockE2E',
											  'ngSanitize',
											  'ngLocalize',
											  'ngCookies',
											  'ngResource',
											  'oc.lazyLoad',
											  'firebase',
											  'shareddirective'
												]);

		app.value('localeSupported', [
		    'en-US',
		    'pt-BR',
		    'es'
		  ]);

		app.controller('MainController', function($scope, $route, $location, locale, $firebaseAuth) {
			 var auth = $firebaseAuth();
			 var storage = firebase.storage();

			 console.log(auth);
			 console.log(storage);

		     $scope.$route = $route;
		     $scope.$location = $location;
		     $scope.setLocale = locale.setLocale;

		     console.log(locale.getLocale());
		 })


		app.config(function($routeProvider, $locationProvider, $ocLazyLoadProvider, $controllerProvider, $provide) {

			

				//app.registerController = $controllerProvider.register;
			 	//app.$register = $provide;

			 	/** Initialize firebase config **/
			 	var config = {
		            apiKey: "AIzaSyBhgTxcOfXOH9CZfzK9kcixaN6MOUtbxDo",
		            authDomain: "reffill-7ffbe.firebaseapp.com",
		            databaseURL: "https://reffill-7ffbe.firebaseio.com",
		            projectId: "reffill-7ffbe",
		            storageBucket: "reffill-7ffbe.appspot.com",
		            messagingSenderId: "1047992509132"
		        };
		        if(firebase.initializeApp(config)!== null)
		        	console.log('Firebase init is ok!');


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
				resolve: {
					    langs: function (locale) {
					      return locale.ready('common');
			    		},
						loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
	                       
	                        var deferred = $q.defer();
	                       
	                        require(["authController"], function () {
	                            
	                            $ocLazyLoad.inject('reffill.auth');
	                            deferred.resolve();
	                        });
	                        return deferred.promise;
                    	}]
			    	}

			})


			.when('/about', {
				templateUrl: 'app/components/about/views/aboutView.html',
				resolve: {
					    langs: function (locale) {
					      return locale.ready('common');
			    		}
			    	}

			})


			.when('/profile', {
				templateUrl: 'app/components/profile/views/profileView.html',
				resolve: {

				     	"currentAuth": ["Auth", function(Auth) {
				        	return Auth.$requireSignIn();
				      	}],

					    langs: function (locale) {
					      return locale.ready('common');
			    		}
			    	}

			})


			.when('/timeline', {
				templateUrl: 'app/components/timeline/views/timelineView.html',
				resolve: {

				     	"currentAuth": ["Auth", function(Auth) {
				        	return Auth.$requireSignIn();
				      	}],

					    langs: function (locale) {
					      return locale.ready('common');
			    		}
			    	}

			})
			.otherwise({ redirectTo: '/' });

		  $locationProvider.html5Mode(true);

		})


		app.run(function($httpBackend,$rootScope, $location) {

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


	     $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		 
			    if (error === "AUTH_REQUIRED") {
			      $location.path("/auth");
			    }
		  });
	  });


		app.factory("Auth", ["$firebaseAuth",
  			function($firebaseAuth) {
    		return $firebaseAuth();
  			}
		]);

});