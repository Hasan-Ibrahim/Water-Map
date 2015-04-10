function Db($window) {
    this.getHomeLocaiton = function () {
        return JSON.parse($window.localStorage['home-location']);
    };

    this.setHomeLocaiton = function (homeLocation) {
        $window.localStorage['home-location'] = angular.toJson(homeLocation);
    }
}

lloydApp.service('db', Db);