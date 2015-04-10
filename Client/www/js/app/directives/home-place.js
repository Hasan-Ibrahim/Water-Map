lloydApp.directive('homePlace', [
    function () {
        return {

            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, controller) {
                scope.takeGpsLocation = function () {
                    $rootScope.addNewSource = function () {
                    }
                }
            },
            templateUrl: 'partials/home-place.html',
            controller: function () {

            }
        }
    }
]);