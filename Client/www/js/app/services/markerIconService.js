lloydApp.service('markerIconService', function () {

    var quailityIconColors = {
        "Drinkable" : "green",
        "NeedTreatment": "orange",
        "Undrinkable": "red",
        "Unknown": "darkblue"
    };

    return {

        changeLayerColor: function (layer, majorQuality) {
            var featurecolor = quailityIconColors[majorQuality];
            if(!layer.setStyle){
                layer.markerColor = featurecolor;
            }
            else {
                layer.setStyle({fillColor: featurecolor, color: featurecolor});
            }
        },
        getAwesomeMarker: function (layer, source, isMySource) {
            var sourceType = source.SourceType;
            var featurecolor = quailityIconColors[source.MajorQuality];
            if (layer.feature.geometry.type != "Point"){
                /*LineString, Polygon*/
                layer.setStyle({fillColor: featurecolor, fillOpacity: .75, color: featurecolor});
                return layer;
            }
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
            icon = L.AwesomeMarkers.icon({icon: iconImage, prefix: 'fa', markerColor: featurecolor, iconColor: '#ffffff'});
            return L.marker([layer._latlng.lat, layer._latlng.lng], {icon: icon});
        }
    };
});