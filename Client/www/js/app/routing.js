lloydApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/event/login');
    var templateRoot = 'partials/';

    $stateProvider
        .state('eventmenu', {
            url: '/event',
            abstract: true,
            templateUrl: 'event-menu.html',
            controller: 'MenuCtrl'
        })
        .state('eventmenu.login', {
            url: '/login',
            views: {
                menuContent: {
                    templateUrl: templateRoot + 'login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('eventmenu.map', {
            url: '/map',
            views: {
                menuContent: {
                    templateUrl: templateRoot + 'map.html',
                    controller: 'MapCtrl'
                }
            }
        });
}]);