require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    
    waitSeconds: 0,

	paths: {

		/** load angular **/
		angular: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min',

		/** angular route **/
        angular_route: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route',

        /** angular mocks **/
        angular_mocks: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-mocks',

        /** angular mocks **/
        angular_cookies: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-cookies',

        /** angular sanitize **/
        angular_sanitize: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-sanitize',

        /** angular localization **/
        angular_localization: 'https://rawgit.com/doshprompt/bower-angular-localization/master/angular-localization',

		/** load ocLazyLoad **/
		angular_ocLazyLoad: 'https://cdnjs.cloudflare.com/ajax/libs/oclazyload/1.0.9/ocLazyLoad',

        /** load ui_bootstrap **/
        angular_ui_bootstrap: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min',


        /********* Required Controllers *****************/
        authController: 'components/auth/auth',
        aboutController: 'components/about/about'

	},

	 // Mention the dependencies
    shim: {

        angular: {
            exports: 'angular'
        },

    	/** deps to angular_route **/
    	angular_route: {
            deps: ['angular']
        },

        /** deps to angular_mocks **/
        angular_mocks: {
            deps: ['angular']
        },

        /** deps to angular_cookies **/
        angular_cookies: {
            deps: ['angular']
        },

        /** deps to angular_sanitize **/
        angular_sanitize: {
            deps: ['angular']
        },

        /** deps to angular_localization **/
        angular_localization: {
            deps: ['angular']
        },

        /** deps to angular_ocLazyLoad **/
        angular_ocLazyLoad: {
            deps: ['angular']
        },

        /** deps to angular_ui_bootstrap **/
        angular_ui_bootstrap: {
            deps: ['angular']
        },

        /** deps to app **/
        app: {
        	deps: ['angular','angular_ocLazyLoad', 'angular_ui_bootstrap']
        },

        authController: {
            deps: ['app']
        },

    },

    deps:['app']


});

baseUrl:'/';



require(['angular','app'], function (app) {

    console.log('passei no require');

  if(window.cordova){
    
    document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            angular.bootstrap(document, ['Reffill']);
        }
   }else{
        angular.bootstrap(document, ['Reffill']);
   }
   
});