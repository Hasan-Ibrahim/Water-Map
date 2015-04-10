lloydApp.controller('preferredSourceController', ['$scope', '$rootScope', 'sidebarService', 'mapService',
    function ($scope, $rootScope, sidebarService, mapService) {
        $scope.isPreferred = false;
        $scope.options = {
            Quality: true,
            Accessibility: false,
            DryOut: false,
            Damages: false,
            WaterStressIndex: false
        };

        $scope.submit = function () {
            console.log($scope.options);
            sidebarService.showBottomBar = false;
            mapService.subscribeFeature(mapService.selectedSourceId, $scope.options);
        }
    }]);
