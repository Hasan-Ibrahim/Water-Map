lloydApp.controller('qualityController', ['$scope', '$rootScope', 'sidebarService', 'mapService', '$ionicModal',
    function ($scope, $rootScope, sidebarService, mapService, $ionicModal) {

        $scope.source = {quality: null};
        $scope.submit = function () {
            mapService.rateSource(mapService.selectedSourceId,$scope.source.quality);
            $scope.closeWaterQualityWindow();
        }
    }]);
