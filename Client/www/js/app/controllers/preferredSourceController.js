lloydApp.controller('preferredSourceController', ['$scope', '$rootScope', 'sidebarService', 'mapService', '$ionicModal',
    function ($scope, $rootScope, sidebarService, mapService, $ionicModal) {

        /*$scope.options = null;
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
         };

         $scope.cancel  = function(){
         sidebarService.showBottomBar = false;
         };*/

        $ionicModal.fromTemplateUrl('partials/water-quality.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.waterQualityWindow = modal;
        });

        $scope.showWaterQualityWindow = function () {
            $scope.waterQualityWindow.show();
        };

        $scope.closeWaterQualityWindow = function () {
            $scope.waterQualityWindow.hide();
        };

        $ionicModal.fromTemplateUrl('partials/accessibility.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.accesibilityWindow = modal;
        });

        $scope.showAccessibilityWindow = function () {
            $scope.accesibilityWindow.show();
        };

        $scope.closeAccessibilityWindow = function () {
            $scope.accesibilityWindow.hide();
        };

        $ionicModal.fromTemplateUrl('partials/notification.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.notificationWindow = modal;
        });


        $scope.showNotificationWindow = function () {
            $scope.notificationWindow.show();
        };

        $scope.closeNotificationWindow = function () {
            $scope.notificationWindow.hide();
        };

        $ionicModal.fromTemplateUrl('partials/demand-supply.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.demandAndSupplyWindow = modal;
        });

        $scope.showDemandAndSupplyWindow = function () {
            $scope.demandAndSupplyWindow.show();
        };

        $scope.hideDemandAndSupplyWindow = function () {
            $scope.demandAndSupplyWindow.hide();
        };

        $ionicModal.fromTemplateUrl('partials/picture.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.addPhotoWindow = modal;
        });

        $scope.showAddPhotoWindow = function () {
            $scope.addPhotoWindow.show();
        };

        $scope.hideAddPhotoWindow = function () {
            $scope.addPhotoWindow.hide();
        };

        $scope.$on('$destroy', function () {
            $scope.demandAndSupplyWindow.remove();
            $scope.addPhotoWindow.remove();
            $scope.notificationWindow.remove();
            $scope.accesibilityWindow.remove();
            $scope.waterQualityWindow.remove();
        });

    }]);
