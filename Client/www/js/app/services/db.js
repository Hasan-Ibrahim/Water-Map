function Db($window, loginObject) {
    this.getHomeLocation = function () {
        return JSON.parse($window.localStorage['home-location']);
    };

    this.setHomeLocation = function (homeLocation) {
        // TODO: stringify it correctly
        $window.localStorage['home-location'] = JSON.stringify(homeLocation);
    };

    this.setLoginToken = function (loginToken) {
        loginObject.loginToken = loginToken;
        $window.localStorage['login-token'] = loginToken;
    };

    this.getLoginToken = function () {
        return $window.localStorage['login-token'];
    };
}

lloydApp.service('db', Db);