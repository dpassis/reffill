var app = angular.module('reffill.auth',[]);


app.controller('AuthController',
							['$scope',
							 '$route',
							  '$location', 
							  'locale', 
							  'Auth',
							  function ($scope, $route, $location, locale, Auth){

	 $scope.name = "auth";
    //$scope.params = $routeParams;
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.setLocale = locale.setLocale;

     console.log(locale.getLocale());

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
		

     $scope.deleteUser = function() {
	      $scope.message = null;
	      $scope.error = null;

	      // Delete the currently signed-in user
	      Auth.$deleteUser().then(function() {
	        $scope.message = "User deleted";
	      }).catch(function(error) {
	        $scope.error = error;
	      });
    };

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