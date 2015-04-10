function Remote($http, serverUrl) {

    this.login = function (loginId, passoword, rememberMe) {
        var url = serverUrl + 'Account/Login';
        var data = {
            LoginId: loginId,
            Password: passoword,
            RememberMe: rememberMe
        };
        return $http.post(url, data);
    };
}

function DummyRemote($q) {
    this.login = function (loginId, passoword, rememberMe) {
        var q = $q.defer();
        q.resolve();
        return q.promise;
    };
}

//lloydApp.service('remote', ['$http', 'serverUrl', Remote]);
lloydApp.service('remote', ['$q', DummyRemote]);