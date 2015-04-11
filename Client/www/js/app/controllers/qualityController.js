lloydApp.controller('qualityController', ['$scope', '$rootScope', 'sidebarService', 'mapService',
    function ($scope, $rootScope, sidebarService, mapService) {

        $scope.source = {quality: null};
        $scope.submit = function () {
            mapService.rateSource(mapService.selectedSourceId,$scope.source.quality);
            $scope.source = {quality: null};
            $scope.closeWaterQualityWindow();
        };

        $scope.close = function(){
            $scope.source = {quality: null};
            $scope.closeWaterQualityWindow();
        }
    }]);
