function LoginService(remote, db) {

    this.login = function (loginId, passoword, rememberMe) {
        return remote.login(loginId, passoword, rememberMe).then(function (response) {
            db.setLoginToken(response.data['Token']);
            return response;
        }, function (error) {
            db.setLoginToken('');
            return error;
        });
    };

    this.logout = function () {
        db.setLoginToken('');
    };

    this.isLoggedIn = function () {
        return !!db.getLoginToken();
    };

    this.getLoginToken = function () {
        return db.getLoginToken();
    };
}

lloydApp.service('loginService', ['remote', 'db', LoginService]);

lloydApp.value('loginObject', {loginToken: ''});