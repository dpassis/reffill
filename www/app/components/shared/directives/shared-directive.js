angular.module('shareddirective',[])

.directive('menuBar', function () {

	//directive definition object
	var ddo = {} ;

	//A = Atribut E = Element
	ddo.restrict = "AE";

	ddo.templateUrl =  'app/components/shared/views/menu.html';

	return ddo;
})


.directive('navBar', function () {

	//directive definition object
	var ddo = {} ;

	//A = Atribut E = Element
	ddo.restrict = "AE";

	ddo.templateUrl =  'app/components/shared/views/navbar.html';

	return ddo;
})