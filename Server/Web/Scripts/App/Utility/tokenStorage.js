utilModule.factory('tokenStorage', [
    function () {
        var _authKey = '';
        var factory = {
            setAuthKey: function (authKey) {
                _authKey = authKey;
            },
            getAuthKey: function () {
                return _authKey;
            },
            setItem: function (item, isPersistant) {
                factory.removeItem();

                if (isPersistant) {
                    localStorage.setItem(_authKey, item);
                } else {
                    sessionStorage.setItem(_authKey, item);
                }
            },
            getItem: function () {
                return localStorage[_authKey] || sessionStorage[_authKey];
            },
            removeItem: function () {
                localStorage.removeItem(_authKey);
                sessionStorage.removeItem(_authKey);
            },
            isTokenPersistant: function() {
                return !!localStorage.getItem(_authKey);
            }
        }

        return factory;
    }
]);
