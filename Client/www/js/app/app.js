var lloydApp = angular.module('CleanWaterApp', ['ui.router', 'ngTouch', 'ionic', 'ionic.rating', 'ionic.contrib.ui.cards', 'SignalR', 'ngCordova', 'ui.bootstrap-slider']);

lloydApp.run(['$rootScope', '$ionicSideMenuDelegate',
    function ($rootScope, $ionicSideMenuDelegate) {
        $rootScope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.showHomePlace = false;
    }]);
