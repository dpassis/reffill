require.config({
    urlArgs: "bust=" + new Date().getTime(),

    waitSeconds: 0,

    //baseUrl:'/',

	paths: {

        //app: 'app/app',

		/** load angular **/
		angular: 'https://code.angularjs.org/1.5.6/angular.min',

		/** angular route **/
        angular_route: 'https://code.angularjs.org/1.5.6/angular-route.min',

        /** angular mocks **/
        angular_mocks: 'https://code.angularjs.org/1.5.6/angular-mocks',

        /** angular mocks **/
        angular_cookies: 'https://code.angularjs.org/1.5.6/angular-cookies.min',

        /** angular sanitize **/
        angular_sanitize: 'https://code.angularjs.org/1.5.6/angular-sanitize.min',

        /** angular localization **/
        angular_localization: 'https://rawgit.com/doshprompt/bower-angular-localization/master/angular-localization',

		/** load ocLazyLoad **/
		angular_ocLazyLoad: 'https://cdnjs.cloudflare.com/ajax/libs/oclazyload/1.1.0/ocLazyLoad.min',

        /** load ui_bootstrap **/
        angular_ui_bootstrap: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min',

        /** load resource **/
        angular_resource: 'https://code.angularjs.org/1.5.6/angular-resource.min',


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

        angular_resource: {
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



require(['angular','app'], function (app) {

  if(window.cordova){
    
    document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            angular.bootstrap(document, ['reffill']);
        }
   }else{
        angular.bootstrap(document, ['reffill']);
   }
   
});