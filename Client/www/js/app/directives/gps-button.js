lloydApp.directive('gpsButton', ['mapService', 'sidebarService',
    function (mapService, sidebarService) {
        return {

            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, controller) {
                scope.gpsButtonClicked = function () {
                    mapService.moveToCurrentLocation().then(function () {
                        sidebarService.toggleTopBar();
                    });
                };
            },
            templateUrl: 'partials/gps-button.html',
            controller: function () {

            }
        }
    }
]);