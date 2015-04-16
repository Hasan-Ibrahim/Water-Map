function GeoLocationService($q, $cordovaGeolocation) {
    var ACQUIRING_STATE = {
        NEVER_TRIED: 0,
        ACQUIRING: 1,
        ACQUIRED: 2,
        FAILED: 3
    };

    var defaultLocation = {coords: {longitude: 90, latitude: 23}};
    var userLocation = defaultLocation;
    var acquiringState = ACQUIRING_STATE.NEVER_TRIED;

    this.getCurrentPosition = function () {
        acquiringState = ACQUIRING_STATE.ACQUIRING;
        return $cordovaGeolocation.getCurrentPosition().then(function (position) {
            acquiringState = ACQUIRING_STATE.ACQUIRED;
            console.log(position);
            storeUserLocation(position);
            return position
        }, function (error) {

            acquiringState = ACQUIRING_STATE.FAILED;
            return error;
        });
    };

    this.watchPosition = function () {
        var watchOptions = {
            frequency: 1000,
            timeout: 3000,
            enableHighAccuracy: false // may cause errors if true
        };
        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        return watch.then(null, function (error) {
            acquiringState = ACQUIRING_STATE.FAILED;
            return error;
        }, function (position) {
            console.log(position);
            acquiringState = ACQUIRING_STATE.ACQUIRED;
            storeUserLocation(position);
            return position;
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

    function storeUserLocation(position) {
        userLocation = position;
    }
}

lloydApp.service('geoLocationService', ['$q', '$cordovaGeolocation', GeoLocationService]);