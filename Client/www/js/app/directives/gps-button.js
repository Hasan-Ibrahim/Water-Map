lloydApp.directive('gpsButton', ['mapService',
    function (mapService) {
        return {

            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, controller) {
                scope.toggleDisplayTracking = function () {
                    mapService.moveToCurrentLocation();
                };
            },
            templateUrl: 'partials/gps-button.html',
            controller: function () {

            }
        }
    }
]);