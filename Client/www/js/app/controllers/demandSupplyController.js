lloydApp.controller('demandSupplyController', ['$scope', '$rootScope', 'supplyDemandService', 'mapService', '$ionicModal',
    function ($scope, $rootScope, supplyDemandService, mapService, $ionicModal) {
        $scope.waterDemand = '';
        $scope.waterSupply = '';
        $scope.totalConsumer = '';
        $scope.submitDemandSupply = function () {
            supplyDemandService.submitDemandSupply(
                $scope.waterDemand,
                $scope.waterSupply,
                $scope.totalConsumer).then(function () {
                    $scope.closeSupplyDemandWindow();
                }, function () {
                    $scope.closeSupplyDemandWindow();
                });
            $scope.closeSupplyDemandWindow();
        }
    }]);
