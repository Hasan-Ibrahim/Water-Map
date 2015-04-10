lloydApp.service('markerIconService', function () {

    return {
        getSourceMarkerIcon: function (marker) {

        },
        getAwesomeMarker: function (layer, isMySource) {

            if (layer.feature.geometry.type != "Point")
                return layer;
            var icon;
            if (isMySource) {
                icon = L.AwesomeMarkers.icon({icon: 'coffee', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'});
            }
            else {
                icon = L.AwesomeMarkers.icon({icon: 'spinner', prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'});
            }
            return L.marker([layer._latlng.lat, layer._latlng.lng], {icon: icon});
        }
    };
});