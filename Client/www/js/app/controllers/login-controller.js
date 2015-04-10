lloydApp.controller('LoginCtrl', ['$scope', '$state', 'loginService',
    function ($scope, $state, loginService) {
        $scope.loginId = '';
        $scope.password = '';

        $scope.login = function () {
            loginService.login($scope.loginId, $scope.password, true).then(function () {
                $state.go('eventmenu.map');
            });
        }
    }]);
