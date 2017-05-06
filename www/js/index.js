var app = {
    initFirebase : function() {
        this.auth = firebase.auth();
        this.database = firebase.database();
        this.storage = firebase.storage();

        console.log('Firebase init is ok');
    },

};


/**Initialize app**/
window.onload = function() {


    app.initFirebase();
    console.log('Reffill is ON');
    Materialize.updateTextFields()
    console.log('Materialize is ON');
};