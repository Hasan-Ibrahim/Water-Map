appModule.controller('changePasswordController', ['$scope', 'accountService', '$location',
    function ($scope, accountService, $location) {

        $scope.changePassword = function () {
            if (accountService.isPasswordModelValid($scope.changePasswordModel)) {
                accountService.changePassword($scope.changePasswordModel).success(function () {
                    $location.path('/');
                });
            }
        };
    }
]);
