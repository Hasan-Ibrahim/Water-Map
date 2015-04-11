directiveModule.directive('ratingDisplay', [
    function () {
        return {
            templateUrl: '/app/Templates/Directives/ratingDisplay.html',
            scope: {
                value: '=?'
            },
            controller: [
                '$scope',
                function ($scope) {
                    $scope.value = $scope.value || 0;
                }]
        };
    }
])