var app = angular.module('perffill.auth',[]);


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


	$scope.auth = Auth;

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });

    console.log(locale.getLocale());

    /********************************************
    * Create new User with email and passowrd   *
    *********************************************/
	$scope.createUser = function() {
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
    * SignIn a app user                         *
    *********************************************/
    $scope.signInWithProvider = function(providerId) {
      	$scope.message = null;
      	$scope.error = null;

      	var provider;


      	if(providerId == 'facebook'){

      		provider = new firebase.auth.FacebookAuthProvider();

      		console.log('provider: facebook');

      	}else if(providerId == 'google'){

      		provider = new firebase.auth.GoogleAuthProvider();
      		provider.addScope('https://www.googleapis.com/auth/plus.login');

      		console.log('provider: google');

      	}else if(providerId == 'twitter'){

      		provider = new firebase.auth.TwitterAuthProvider();

      		console.log('provider: twitter');

      	}


		Auth.$signInWithRedirect(provider).then(function() {
		 Auth.getRedirectResult().then(function(result) {
		    // This gives you a Google Access Token.
		    // You can use it to access the Google API.
		    var token = result.credential.accessToken;
		    // The signed-in user info.
		    var user = result.user;

		    alert(user);
		    // ...
		  }).catch(function(error) {
		    // Handle Errors here.
		  	 $scope.error = error;
		  });
		}).catch(function(error) {
		    // Handle Errors here.
		  	 $scope.error = error;
		  	 alert(error);
		  });
	

	};

	/********************************************
    * SignOut the app                           *
    *********************************************/
	$scope.signOut = function () {
		Auth.$signOut().then(function() {
	    	console.log('signOut sucessfull');
	    	$location.path("auth");
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