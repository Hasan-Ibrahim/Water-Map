lloydApp.controller('notificationController', ['$scope', '$rootScope', 'sidebarService', 'mapService',
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
            mapService.subscribeFeature(mapService.selectedSourceId, $scope.options);
            $scope.closeNotificationWindow();
        };

        $scope.cancel  = function(){
            $scope.closeNotificationWindow();
        };

    }]);
