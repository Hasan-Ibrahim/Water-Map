lloydApp.factory('mapService', ['$http', '$q', 'serverUrl', 'geoLocationService', function ($http, $q, serverUrl, geoLocationService) {
    var appRoot = serverUrl;
    var mainMap = null;

    function moveToCurrentLocation() {
        function showPosition(position) {
            mainMap.setView([position.coords.latitude, position.coords.longitude], 14);
        }

        return geoLocationService.getCurrentPosition().then(function (position) {
            showPosition(position);
            return position;
        });
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
        addFeature: function (geometry, sourceType, onSuccess) {
            $.post(appRoot + "WaterSource/AddWaterSource", {
                Geometry: geometry,
                SourceType: sourceType
            }, function (data) {
                onSuccess(data);
            });
        },
        moveToCurrentLocation: moveToCurrentLocation,
        rateSource: function (sourceId, quality, onSuccess) {
            $.post(appRoot + "WaterSource/RateWaterSource", {
                WaterSourceId: sourceId,
                Potability: quality
            }, function (data) {
                if (onSuccess)onSuccess(data);
            });
        }
    }
}]);

