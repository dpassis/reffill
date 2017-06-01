var app = angular.module('reffill.auth',[]);

app.factory("Auth", ["$firebaseAuth",
            function($firebaseAuth) {
            return $firebaseAuth();
            }
        ]);