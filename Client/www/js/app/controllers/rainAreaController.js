lloydApp.controller('rainAreaController', ['$scope', '$rootScope', 'sidebarService', 'mapService',
    function ($scope, $rootScope, sidebarService, mapService) {
        $scope.area = null;

        $scope.submit = function () {
            $rootScope.rainArea = $scope.area;
            $scope.area = null;
            $scope.closeRainAreaModal();
        };

        $scope.cancel = function () {
            $scope.area = null;
            $rootScope.rainArea = $scope.area;
            $scope.closeRainAreaModal();
        };
    }]);
