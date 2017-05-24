var app = {

    
    initFirebase : function() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();

    console.log('Firebase init is ok');
    },



    /***************************
    * Authentication Functions *
    ***************************/
    createUser: function (providerId) {

        var provider;
        var email = $("#email").val();
        var password = $("#password").val();
        var confPassword = $("#confPassword").val();


        if(providerId == 'email'){

            if(password == confPassword){ 


                this.auth.createUserWithEmailAndPassword(email, password)
                .then(function (authData) {
                   console.log(authData);
                })
                .catch(function(error) {
                    console.error(error.code +" = "+error.message);
                });

            }else{

                $(".errMsg").css("background-color", "#FFE4E1");
                $(".errMsg").show();
                 console.error("senhas diferentes");
            }


        }else {

            if(providerId === 'facebook'){
                provider = new firebase.auth.FacebookAuthProvider();
                console.log("Provider: "+ providerId);
            }else if(providerId === 'google'){
                provider = new firebase.auth.GoogleAuthProvider();
                console.log("Provider: "+ providerId);
            }else if(providerId === 'twitter'){
                provider = new firebase.auth.FacebookAuthProvider();
                console.log("Provider: "+ providerId);
            }


            firebase.auth().signInWithRedirect(provider).then(function() {
              firebase.auth().getRedirectResult().then(function(result) {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
              });
            });
        }

     },



    signIn: function () {

        console.log('signin');

        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });

    },

    signOut : function() {
        // Sign out of Firebase.
        this.auth.signOut();
    }

};


/**Initialize app**/
window.onload = function() {

    app.initFirebase();
    console.log('Reffill is ON');
    Materialize.updateTextFields();
    console.log('Materialize is ON');
};