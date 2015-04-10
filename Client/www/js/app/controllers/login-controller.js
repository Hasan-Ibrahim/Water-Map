lloydApp.controller('LoginCtrl', ['$scope', 'sidebarService', 'loginService',
    function ($scope, sidebarService, loginService) {
        $scope.loginId = 'TestUser';
        $scope.password = '123';

        $scope.login = function () {
            loginService.login($scope.loginId, $scope.password, true).then(function () {
                sidebarService.toggleRightBar();
            }, function () {
                // TODO: show error
                alert('Login Failed');
            });
        };

        $scope.toggleRightBar = function () {
            sidebarService.toggleRightBar();
        }
    }]);
