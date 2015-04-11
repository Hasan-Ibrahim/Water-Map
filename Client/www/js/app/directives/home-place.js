lloydApp.directive('homePlace', ['sidebarService',
    function (sidebarService) {
        return {
            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, controller) {
            },
            templateUrl: 'partials/home-place.html',
            controller: function ($scope, supplyDemandService) {
                $scope.waterDemand = '';
                $scope.waterSupply = '';
                $scope.totalConsumer = '';
                $scope.submitDemandSupply = function () {
                    supplyDemandService.submitDemandSupply(
                        $scope.waterDemand,
                        $scope.waterSupply,
                        $scope.totalConsumer).then(function () {
                        }, function () {

                        });
                }
            }
        }
    }
]);