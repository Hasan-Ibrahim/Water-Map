appModule.controller('navigationController',
    ['$scope', 'accountService', '$location', 'navigationService', 'userProfileService', 'accessControl', 'tokenStorage',
    function ($scope, accountService, $location, navigationService, userProfileService, accessControl, tokenStorage) {

        tokenStorage.setAuthKey('authentication');
        userProfileService.getUserProfile();

        $scope.activeUser = userProfileService.activeUser;
        
        $scope.$on('$routeChangeStart', function (event, next, current) {
            if (accessControl.isUrlRestricted(next.originalPath, $scope.activeUser)) {
                $location.path('/home');
            }
        });

        $scope.$on('$routeChangeSuccess', function () {
            navigationService.inactiveActiveNav();
            navigationService.setActiveNav();
        });

        $scope.logout = function() {
            accountService.logout().success(function() {
                $location.path('/account/login');
            });
        };
    }
]);
