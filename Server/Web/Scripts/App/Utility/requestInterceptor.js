utilModule.config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                'request': function (config) {

                    var headers = (function getSecurityHeaders() {
                        return { 'authentication': localStorage.getItem('authentication') || sessionStorage.getItem('authentication') };
                    })();

                    config.headers = config.headers || {};
                    for (var i in headers) {
                        config.headers[i] = headers[i];
                    }
                    return config;
                }
            }
        });
    }]);