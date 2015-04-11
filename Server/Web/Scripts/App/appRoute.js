appModule.config([
    '$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/oAuth/:token/:redirectUrl', {
            resolve: {
                oAuthTokenManager: ['$route', '$location', 'accountService',
                    function ($route, $location, accountService) {
                        var redirectUrl = $route.current.params.redirectUrl;
                        accountService.setNewToken($route.current.params.token);
                        $location.path(redirectUrl.replace(/,/g, '/'));
                    }]
            }
        })
        .when('/home', {
            templateUrl: '/Home/home.html'
        })
        .when('/account/register', {
            templateUrl: '/Account/registration.html',
            controller: 'registrationController'
        })
        .when('/account/login/:redirectUrl?', {
            templateUrl: '/Account/login.html',
            controller: 'loginController'
        })
        .when('/account/changePassword', {
            templateUrl: '/Account/changePassword.html',
            controller: 'changePasswordController'
        })
        .when('/profile', {
            templateUrl: '/UserProfile/userProfile.html',
            controller: 'userProfileController'
        })
        .when('/signalr', {
            templateUrl: '/signalRTest/signalrTest.html',
            controller: 'signalrTestController'
        }).otherwise({
            redirectTo: '/home'
        });
    }
]);
