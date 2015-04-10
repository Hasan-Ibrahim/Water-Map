function Remote($http, serverUrl, jqHttp) {
    this.login = function (loginId, passoword, rememberMe) {
        var url = serverUrl + 'Account/Login';
        var data = {
            LoginId: loginId,
            Password: passoword,
            RememberMe: rememberMe
        };
        return jqHttp.post(url, data);
    };
}

function DummyRemote($q) {
    this.login = function (loginId, passoword, rememberMe) {
        var q = $q.defer();
        q.resolve();
        return q.promise;
    };
}

lloydApp.service('remote', ['$http', 'serverUrl', 'jqHttp', Remote]);
//lloydApp.service('remote', ['$q', DummyRemote]);