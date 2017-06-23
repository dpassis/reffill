var app = angular.module('perffill.auth',[]);

app.factory("Auth", ["$firebaseAuth",
            function($firebaseAuth) {
            return $firebaseAuth();
            }
        ]);