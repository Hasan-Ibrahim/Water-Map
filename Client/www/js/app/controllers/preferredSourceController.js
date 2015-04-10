lloydApp.controller('preferredSourceController', ['$scope', '$rootScope', 'sidebarService', 'mapService', '$timeout',
    function ($scope, $rootScope, sidebarService, mapService, timeout) {

        $scope.options = null;
        $rootScope.$on('markerClicked', function (e, sourceId) {
            mapService.getSourceSubscriptionStatus(sourceId).success(function (data) {
                $scope.options = data.Subscriptions;
            }).error(function () {
                alert('failed to get subscription status.');
            });
        });

        $rootScope.$on('popupClosed', function () {
            $scope.options = null;
            timeout(function () {
                sidebarService.showBottomBar = false;
            }, 150);
        });

        $scope.submit = function () {
            console.log($scope.options);
            sidebarService.showBottomBar = false;
            mapService.subscribeFeature(mapService.selectedSourceId, $scope.options);
        }
    }]);
