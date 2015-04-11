lloydApp.directive('homePlace', ['sidebarService',
    function (sidebarService) {
        return {

            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, controller) {
                scope.takeGpsLocation = function () {
                    $rootScope.addNewSource = function () {
                    }
                };
                scope.toggleRightBar = function () {
                    sidebarService.toggleRightBar();
                };
                scope.toggleTopBar = function () {
                    sidebarService.toggleTopBar();
                };
            },
            templateUrl: 'partials/home-place.html',
            controller: function () {

            }
        }
    }
]);