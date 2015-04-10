function GeoLocationService($rootScope, $window, remote) {
    var ACQUIRING_STATE = {
        NEVER_TRIED: 0,
        ACQUIRING: 1,
        ACQUIRED: 2,
        FAILED: 3
    };

    var defaultLocation = {longitude: 90, latitude: 23};
    var userLocation = defaultLocation;
    var acquiringState = ACQUIRING_STATE.NEVER_TRIED;

    this.acquireLocation = function (success, fail) {
        success = success || function () {
        };
        fail = fail || function () {
        };
        acquiringState = ACQUIRING_STATE.ACQUIRING;
        $window.navigator.geolocation.getCurrentPosition(function (geoLocation) {
            storeUserLocation(geoLocation);
            remote.sendUserLocationToServer(userLocation.latitude, userLocation.longitude);
            acquiringState = ACQUIRING_STATE.ACQUIRED;
            success();
            $rootScope.$apply();
        }, function (error) {
            acquiringState = ACQUIRING_STATE.FAILED;
            fail();
            $rootScope.$apply();
        });
    };

    this.resetLocation = function () {
        userLocation = defaultLocation;
        acquiringState = ACQUIRING_STATE.NEVER_TRIED;
    };

    this.getUserLocation = function () {
        return userLocation;
    };

    this.isAcquiringLocation = function () {
        return acquiringState == ACQUIRING_STATE.ACQUIRING;
    };

    this.isLocationAcquired = function () {
        return acquiringState == ACQUIRING_STATE.ACQUIRED;
    };

    this.isLocationAcquiringFailed = function () {
        return acquiringState == ACQUIRING_STATE.FAILED;
    };

    this.hasLocation = function () {
        return acquiringState == ACQUIRING_STATE.ACQUIRED;
    };

    function storeUserLocation(geoLocation) {
        userLocation.latitude = geoLocation.coords.latitude;
        userLocation.longitude = geoLocation.coords.longitude;
    }
}

lloydApp.service('geoLocationService', ['$rootScope', '$window', 'remote', GeoLocationService]);