lloydApp.factory('mapService', ['$http', '$q', 'serverUrl', function ($http, $q, serverUrl) {
    var appRoot = serverUrl;
    var mainMap = null;

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
        getMap: function () {
            mainMap = mainMap || L.map('map', {editable: true});
            return mainMap;
        },
        getSources: function () {
            return $http.get(appRoot + 'WaterSourceSubscription/GetWaterSources');
        },
        getProperties: function (id) {
            return $http.get(appRoot + 'WaterSource/GetSourceProperties?sourceId=' + id);
        },
        getCoveragePoints: function(id){
            return $http.get(appRoot + 'DailySupply/GetSuppliedLocationsForSource?sourceId=' + id);
        },
        addFeature: function (geometry, sourceType, onSuccess) {
            $.post(appRoot + "WaterSource/AddWaterSource", {
                Geometry: geometry,
                SourceType: sourceType
            }, function (data) {
                onSuccess(data);
            });
        },
        moveToCurrentLocation: moveToCurrentLocation
    }
}]);

