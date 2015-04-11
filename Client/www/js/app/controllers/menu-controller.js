lloydApp.controller('MenuCtrl', ['$scope', '$rootScope', 'sidebarService', 'rainWaterHarvestService', 'trmmDataService', '$ionicSideMenuDelegate',
    function ($scope, $rootScope, sidebarService, rainWaterHarvestService, trmmDataService, $ionicSideMenuDelegate) {
        $scope.toggleRightBar = function () {
            sidebarService.toggleRightBar();
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.toggleTopBar = function () {
            sidebarService.toggleTopBar();
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.showRainWaterHarvest = function () {
            console.log('rain water harvest');
            rainWaterHarvestService.showRainWaterHarvestMap();
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.showTRMMMap = function () {
            console.log('trmm map');
            trmmDataService.showTrmmDataMap();
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.reloadApp = function () {
            window.location.reload();
            $ionicSideMenuDelegate.toggleLeft();
        };
    }]);
