appModule.factory('accountRepository', ['urlResolver', '$http',
    function (urlResolver, $http) {
        return {
            register: function (registerModel) {
                return $http.post(urlResolver.resolveAccount('Register'), registerModel);
            },
            login: function (loginModel) {
                return $http.post(urlResolver.resolveAccount('Login'), loginModel);
            },
            logout: function () {
                return $http.get(urlResolver.resolveAccount('Logout'));
            },
            changePassword: function (passwordModel) {
                return $http.post(urlResolver.resolveAccount('ChangePassword'), passwordModel);
            },
            renewToken: function (token) {
                return $http.post(urlResolver.resolveAccount('RenewToken'), { token: token });
            }
        }
    }
]);
