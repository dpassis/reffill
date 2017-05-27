angular.module('myApp', ['firebase'])
.factory('AuthService', function($firebaseAuth) {
    var auth = $firebaseAuth();
    var login = function() {
        auth.$signInWithPopup('google');
    };
    var logout = function() {
        auth.$signOut();
    };
    var user = {};
    auth.$onAuthStateChanged(function(authData) {
        angular.copy(authData, user);
    }
    return {
        login: login,
        logout: logout,
        user: user
    };
});