function Db($window) {
    this.getHomeLocaiton = function () {
        return JSON.parse($window.localStorage['home-location']);
    };

    this.setHomeLocaiton = function (homeLocation) {
        $window.localStorage['home-location'] = angular.toJson(homeLocation);
    };

    this.setLoginToken = function (loginToken) {
        $window.localStorage['login-token'] = loginToken;
    };

    this.getLoginToken = function () {
        return $window.localStorage['login-token'];
    };
}

lloydApp.service('db', Db);