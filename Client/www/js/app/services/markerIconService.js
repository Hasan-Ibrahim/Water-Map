lloydApp.service('markerIconService', function () {

    return {
        getSourceMarkerIcon: function (marker) {

        },
        getAwesomeMarker: function (layer, source, isMySource) {
            var sourceType = source.SourceType;
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

            var quailityIconColors = {
                "Drinkable" : "green",
                "NeedTreatment": "orange",
                "Undrinkable": "red",
                "Unknown": "darkblue"
            };
            var markerColor = quailityIconColors[source.MajorQuality];
            icon = L.AwesomeMarkers.icon({icon: iconImage, prefix: 'fa', markerColor: markerColor, iconColor: '#ffffff'});
            return L.marker([layer._latlng.lat, layer._latlng.lng], {icon: icon});
        }
    };
});