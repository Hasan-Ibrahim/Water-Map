lloydApp.directive('preferredSource', [
    function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/preferred-source.html',
            controller: 'preferredSourceController'
        }
    }
]);
