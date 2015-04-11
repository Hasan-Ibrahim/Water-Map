lloydApp.controller('accessibilityController', ['$scope', '$rootScope', 'sidebarService', 'mapService','$ionicModal',
    function ($scope, $rootScope, sidebarService, mapService, $ionicModal) {

        $scope.source = {accessibility:null};

        $scope.submit = function () {
            mapService.postSourceAccessibility(mapService.selectedSourceId, $scope.source.accessibility);
            $scope.closeAccessibilityWindow();
        };

        $scope.cancel  = function(){
            $scope.closeAccessibilityWindow();
        };

    }]);
