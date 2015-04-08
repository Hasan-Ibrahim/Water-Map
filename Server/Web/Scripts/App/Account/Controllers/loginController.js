appModule.controller('loginController', ['$scope', 'accountService', '$location', 'urlResolver', '$routeParams',
    function ($scope, accountService, $location, urlResolver, $routeParams) {
        $scope.redirectUrl = urlResolver.resolveAppRoot('%23/oAuth/{token}/home');

        $scope.login = function () {
            accountService.login($scope.loginModel).success(function () {
                var redirecUrl = $routeParams.redirectUrl || '/';
                redirecUrl = redirecUrl.replace(',', '/');

                if (redirecUrl[0] != '/') {
                    redirecUrl = '/' + redirecUrl;
                }

                $location.path(redirecUrl);
            });
        }
    }
]);

