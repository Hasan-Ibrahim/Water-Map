appModule.controller('registrationController', ['$scope', 'accountService', '$location',
    function ($scope, accountService, $location) {

        $scope.register = function () {
            if (accountService.isRegisterModelValid($scope.registerModel)) {
                accountService.register($scope.registerModel).success(function() {
                    $location.path("/account/login");
                });
            }
        }
    }
]);
