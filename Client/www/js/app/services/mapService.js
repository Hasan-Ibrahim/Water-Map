lloydApp.factory('mapService', ['$http', '$q', 'serverUrl', 'jqHttp', function ($http, $q, serverUrl, jqHttp) {
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
        addFeature: function (geometry, sourceType) {
            jqHttp.post(appRoot + "WaterSource/AddWaterSource", {
                Geometry: geometry,
                SourceType: sourceType
            });
        },
        moveToCurrentLocation: moveToCurrentLocation,
        rateSource: function (sourceId, quality) {
            return jqHttp.post(appRoot + "WaterSource/RateWaterSource", {
                WaterSourceId: sourceId,
                Potability: quality
            });
        },
        subscribeFeature: function (sourceId, subscriptions) {
            return jqHttp.post(appRoot + "WaterSourceSubscription/Subscribe", {
                SourceId: sourceId,
                Subscriptions: subscriptions
            });
        },
        selectedSourceId: null
    }
}]);

