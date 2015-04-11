lloydApp.service('markerIconService', function () {

    return {
        getSourceMarkerIcon: function (marker) {

        },
        getAwesomeMarker: function (layer, sourceType, isMySource) {

            if (layer.feature.geometry.type != "Point")
                return layer;
            var icon;
            var iconImage;
            if (isMySource) {
                iconImage = 'coffee';
            }
            else {
                iconImage = 'spinner';
            }
            if(sourceType == "Well"){
                iconImage = 'shopping-cart';
            }
            else if(sourceType == "Rain_Water"){
                iconImage = 'info';
            }
            icon = L.AwesomeMarkers.icon({icon: iconImage, prefix: 'fa', markerColor: 'red', iconColor: '#f28f82'});
            return L.marker([layer._latlng.lat, layer._latlng.lng], {icon: icon});
        }
    };
});