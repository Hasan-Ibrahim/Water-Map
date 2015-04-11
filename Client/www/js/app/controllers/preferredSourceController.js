lloydApp.controller('preferredSourceController', ['$scope', '$rootScope', 'sidebarService', 'mapService',
    function ($scope, $rootScope, sidebarService, mapService) {

        $scope.options = null;
        $rootScope.$on('markerClicked', function (e, sourceId) {
            mapService.getSourceSubscriptionStatus(sourceId).success(function (data) {
                $scope.options = data.Subscriptions;
            }).error(function () {
                alert('failed to get subscription status.');
            });
        });

        $scope.submit = function () {
            sidebarService.showBottomBar = false;
            mapService.subscribeFeature(mapService.selectedSourceId, $scope.options);
        }

        $scope.cancel  = function(){
            sidebarService.showBottomBar = false;
        };
    }]);
