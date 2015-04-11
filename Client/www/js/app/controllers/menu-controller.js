lloydApp.controller('MenuCtrl', ['$scope', '$rootScope', 'sidebarService', 'rainWaterHarvestService', 'trmmDataService',
    function ($scope, $rootScope, sidebarService, rainWaterHarvestService, trmmDataService) {
        $scope.toggleRightBar = function () {
            sidebarService.toggleRightBar();
        };

        $rootScope.toggleTopBar = function () {
            sidebarService.toggleTopBar();
        };

        $scope.showRainWaterHarvest = function () {
            console.log('rain water harvest');
            rainWaterHarvestService.showRainWaterHarvestMap();
        };

        $scope.showTRMMMap = function () {
            console.log('trmm map');
            trmmDataService.showTrmmDataMap();
        }
    }]);
