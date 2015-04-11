lloydApp.factory('mapService', ['$http', '$q', 'serverUrl', 'jqHttp', 'geoLocationService', function ($http, $q, serverUrl, jqHttp, geoLocationService) {
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
        getCoveragePoints: function(id){
            return $http.get(appRoot + 'DailySupply/GetSuppliedLocationsForSource?sourceId=' + id);
        },
        addFeature: function (geometry, sourceType) {
            return jqHttp.post(appRoot + "WaterSource/AddWaterSource", {
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
            var selectedTypes = [];
            for(var i in subscriptions){
                if(subscriptions[i]){
                    selectedTypes.push(i);
                }
            }
            return jqHttp.post(appRoot + "WaterSourceSubscription/Subscribe", {
                SourceId: sourceId,
                SubscriptionTypes: selectedTypes
            });
        },
        getSourceSubscriptionStatus: function (sourceId) {
            return $http.get(appRoot + '/WaterSourceSubscription/GetSourceSubscription?sourceId=' + sourceId);
        },
        subscribeArea: function (geometry, subscriptions) {
            return jqHttp.post(appRoot + "WaterSourceSubscription/SubscribeToArea", {
                Geometry: geometry,
                SubscriptionTypes: subscriptions
            });
        },
        selectedSourceId: null
    }
}]);

