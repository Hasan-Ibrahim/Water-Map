lloydApp.factory('mapService', ['$http', '$q', 'serverUrl', 'jqHttp', 'geoLocationService', 'homePlaceService', function ($http, $q, serverUrl, jqHttp, geoLocationService, homePlaceService) {
    var appRoot = serverUrl;
    var mainMap = null;
    var displayTracking = true;
    var trackingLocation = false;

    function getMap() {
        mainMap = mainMap || L.map('map', {editable: true});
        if (!trackingLocation) {
            trackingLocation = true;
            trackLocation();
        }
        return mainMap;
    }

    function moveToCurrentLocation() {
        function showPosition(position) {
            mainMap.setView([position.coords.latitude, position.coords.longitude], 14);
        }

        return geoLocationService.getCurrentPosition().then(function (position) {
            showPosition(position);
            return position;
        }, function (error) {
            console.log(error);
        });
    }


    function trackLocation() {
        var map = getMap();

        var marker = L.marker([29, 90]).addTo(map);
        var circle = L.circle([29, 90], 5, {
            color: 'blue',
            fillColor: '#30B5F8',
            fillOpacity: 0.2,
            weight: 0
        }).addTo(map);

        marker.bindPopup('<button id="setHomeLocation">Set Home Location</button>');
        marker.on('click', function () {
            $('#setHomeLocation').click(function () {
                homePlaceService.updateToCurrentLocation();
            });
        });

        function panToPosition(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            map.setView([lat, lon], map.getZoom());
        }

        function highLightLocation(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var accuracy = position.coords.accuracy;
            marker.setLatLng([lat, lon]);
            circle.setLatLng([lat, lon]);
            circle.setRadius(accuracy);
        }

        geoLocationService.watchPosition().then(null, function (error) {
            alert(error);
        }, function (position) {
            if (displayTracking) {
                panToPosition(position);
            }
            highLightLocation(position);
        });
    }

    function toggleDisplayTracking() {
        displayTracking = !displayTracking;
    }

    return {
        getMap: getMap,
        getSources: function () {
            return $http.get(appRoot + 'WaterSourceSubscription/GetWaterSources');
        },
        getProperties: function (id) {
            return $http.get(appRoot + 'WaterSource/GetSourceProperties?sourceId=' + id);
        },
        getCoveragePoints: function (id) {
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
            for (var i in subscriptions) {
                if (subscriptions[i]) {
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
        postSourceAccessibility: function(sourceId, accessibility){
            return jqHttp.post(appRoot + "WaterSource/UpdateAccessibility", {
                WaterSourceId: sourceId,
                Accessibility: accessibility
            });
        },
        toggleDisplayTracking: toggleDisplayTracking,
        selectedSourceId: null
    }
}]);

