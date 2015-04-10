function LoginService(remote) {
    this.login = function (loginId, passoword, rememberMe) {
        return remote.login(loginId, passoword, rememberMe);
    };
}

lloydApp.service('loginService', ['remote', LoginService]);