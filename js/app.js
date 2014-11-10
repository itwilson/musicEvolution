	// create the module and name it for the EPILOG
	var infovisApp = angular.module('infovisApp', ['ngRoute']);

	// configure routes
	infovisApp.config(function($routeProvider) {
		$routeProvider

			// home (splash screen)
			.when('/', {
				templateUrl : 'partial/home.html',
				controller  : 'mainController'
			})

			// people main page
			.when('/meta', {
				templateUrl : 'partial/meta.html',
				controller  : 'metaController'
			})

			// schedule page
			.when('/location', {
				templateUrl : 'partial/location.html',
				controller  : 'locationController'
			})
        
            // applications main page
			.when('/lyrics', {
				templateUrl : 'partial/lyrics.html',
				controller  : 'lyricsController'
			})
        
            // settings page
			.when('/subgenres', {
				templateUrl : 'partial/subgenres.html',
				controller  : 'subgenresController'
			});
	});
