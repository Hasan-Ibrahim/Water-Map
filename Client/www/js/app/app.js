var lloydApp = angular.module('CleanWaterApp', ['ui.router', 'ngTouch', 'ionic', 'ionic.rating', 'ionic.contrib.ui.cards', 'SignalR', 'ngCordova', 'ui.bootstrap-slider']);

lloydApp.run(['$rootScope', '$ionicSideMenuDelegate', 'sidebarService', 'loginService',
    function ($rootScope, $ionicSideMenuDelegate, sidebarService, loginService) {
        $rootScope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.showRightBar = function () {
            return sidebarService.showRightBar;
        };

        $rootScope.showTopBar = function () {
            return sidebarService.showTopBar;
        };

        $rootScope.showBottomBar = function () {
            return sidebarService.showBottomBar;
        };

        $rootScope.toggleBottomBar = function () {
            return sidebarService.toggleBottomBar();
        };

        $rootScope.isLoggedIn = function () {
            return loginService.isLoggedIn();
        };

        $rootScope.logout = function () {
            loginService.logout();
        };
    }]);

lloydApp.run(function (db, loginObject) {
    loginObject.loginToken = db.getLoginToken();
});
