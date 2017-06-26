var app = angular.module('authModule',['firebase']);

app.factory("Auth", ["$firebaseAuth",
            function($firebaseAuth) {
            return $firebaseAuth();
            }
        ]);