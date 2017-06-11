var app = angular.module('reffill.auth',[]);


app.controller('AuthController',
							['$scope',
							 '$route',
							  '$location', 
							  'locale', 
							  'Auth',
							  function ($scope, $route, $location, locale, Auth){

	$scope.name = "auth";
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.setLocale = locale.setLocale;

    console.log(locale.getLocale());

    /********************************************
    * Create new User with email and passowrd   *
    *********************************************/
	$scope.createUser = function(providerId) {
      	$scope.message = null;
      	$scope.error = null;

      	console.log(providerId);

      	if($scope.password == $scope.confPassword){

		      // Create a new user
		    Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
		        .then(function(firebaseUser) {
		          $scope.message = "User created with uid: " + firebaseUser.uid;
		        }).catch(function(error) {
		          $scope.error = error;
		    });

		}else{

			console.log('senhas diferentes');
		}

	};
		
    /********************************************
    * Delete currente signed-in user            *
    *********************************************/
    $scope.deleteUser = function() {
	    $scope.message = null;
	    $scope.error = null;

	    Auth.$deleteUser().then(function() {
	        $scope.message = "User deleted";
	    }).catch(function(error) {
	        $scope.error = error;
	    });
    };

 	/********************************************
    * SignIn a app user                         *
    *********************************************/
    $scope.signIn = function() {
      	$scope.message = null;
      	$scope.error = null;

		    Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
		        .then(function(authData) {

		         $scope.message = "SignIn User: " + authData;
		         console.log(authData);
		          $location.path("/timeline");
		          $("nav-bar").show();
		        }).catch(function(error) {
		          $scope.error = error;

		        if (error === 'auth/wrong-password') {
		       		console.log('Passord Errado');
		       	}

		    });

	};

	/********************************************
    * SignOut the app                           *
    *********************************************/
	$scope.signOut = function () {
		Auth.$signOut().then(function() {
	    	console.log('signOut sucessfull');
	    	$location.path("/auth");
		    $("nav-bar").hide();
		}, function(error) {
	    	console.log('Erro ao sair');
		});
	}

	

}]);


app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

			$routeProvider
			.when('/auth/create', {
				templateUrl: 'app/components/auth/views/createView.html',
 				controller: 'AuthController',
				resolve: {
				  langs: function (locale) {
				  return locale.ready('auth');
		    		}
		    	}

			})

			.otherwise({ redirectTo: '/auth' });

			$locationProvider.html5Mode(true);

}]);



app.factory("Auth", ["$firebaseAuth",
            function($firebaseAuth) {
            return $firebaseAuth();
            }
]);