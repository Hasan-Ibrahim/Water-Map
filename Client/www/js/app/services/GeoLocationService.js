function GeoLocationService($cordovaGeolocation) {
    var ACQUIRING_STATE = {
        NEVER_TRIED: 0,
        ACQUIRING: 1,
        ACQUIRED: 2,
        FAILED: 3
    };

    var defaultLocation = {longitude: 90, latitude: 23};
    var userLocation = defaultLocation;
    var acquiringState = ACQUIRING_STATE.NEVER_TRIED;

    this.getCurrentPosition = function () {
        acquiringState = ACQUIRING_STATE.ACQUIRING;
        return $cordovaGeolocation.getCurrentPosition().then(function (position) {
            acquiringState = ACQUIRING_STATE.ACQUIRED;
            storeUserLocation(position);
            return position
        }, function (error) {
            acquiringState = ACQUIRING_STATE.FAILED;
            return error;
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

lloydApp.service('geoLocationService', ['$cordovaGeolocation', GeoLocationService]);