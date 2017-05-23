var app = angular.module('About', []);
	var app = angular.module('Reffill.about',[]);

app.controller('aboutController',['$scope','$route', function ($scope,$route){

	$scope.name = "aboutController";
    //$scope.params = $routeParams;
    $scope.$route = $route;

}]);









