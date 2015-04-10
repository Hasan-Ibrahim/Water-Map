lloydApp.factory('mapService', ['$http', 'serverUrl', '$q', function ($http, serverUrl, $q) {
    var appRoot = serverUrl;
    var mainMap = null;

    function getSources() {
        return $http.get(appRoot + 'WaterSourceSubscription/GetWaterSources');
    }

    function moveToCurrentLocation() {
        navigator.geolocation.getCurrentPosition(showPosition, error);
        var q = $q.defer();

        function showPosition(position) {
            mainMap.setView([position.coords.latitude, position.coords.longitude], 14);
            q.resolve();
        }

        function error() {
            q.reject();
        }

        return q.promise;
    }

    return {
        getSources: getSources,
        getMap: function () {
            mainMap = mainMap || L.map('map', {editable: true});
            return mainMap;
        },
        moveToCurrentLocation: moveToCurrentLocation
    }
}]);
