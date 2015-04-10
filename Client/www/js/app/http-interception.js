lloydApp.config(['$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push(['$q', '$window', 'connectivityTracker', function ($q, $window, connectivityTracker) {
        return {
            request: function (request) {
                request.headers.authToken = $window.localStorage['auth-token'];
                connectivityTracker.requesting(request);
                return request || $q.when(request);
            },
            response: function (response) {
                connectivityTracker.successfulPing(response.config, response.status);
                return $q.when(response);
            },
            responseError: function (responseError) {
                connectivityTracker.unsuccessfulPing(responseError.config, responseError.status);

                if (responseError.status == 401) {
                    $window.localStorage['logged-in-user-id'] = '';
                    $window.localStorage['auth-token'] = '';
                    $window.location = '#login';
                }
                return $q.reject(responseError);
            }
        };
    }]);
}]);