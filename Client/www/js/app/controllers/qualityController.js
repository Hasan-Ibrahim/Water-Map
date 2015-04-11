lloydApp.controller('qualityController', ['$scope', '$rootScope', 'sidebarService', 'mapService', 'markerIconService',
    function ($scope, $rootScope, sidebarService, mapService, markerIconService) {

        $scope.source = {quality: null};
        $scope.submit = function () {
            mapService.rateSource(mapService.selectedSourceId,$scope.source.quality).then(function(response){
                console.log(response);
                markerIconService.changeLayerColor(mapService.selectedSource, response.data.MajorQuality);
            });
            $scope.source = {quality: null};
            $scope.closeWaterQualityWindow();
            mapService.selectedSource.closePopup();

        };

        $scope.close = function(){
            $scope.source = {quality: null};
            $scope.closeWaterQualityWindow();

        }
    }]);
