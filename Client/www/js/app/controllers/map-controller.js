lloydApp.controller('MapCtrl', ['mapService',
    function (mapService) {
        init();
        function init() {
            var mainMap = L.map('map', { editable: true });
            var myStyle={};
            var otherStyle = {};
            var myFeatureGroup = L.featureGroup().addTo(mainMap);
            var otherFeatureGroup = L.featureGroup().addTo(mainMap);

            var deleteMode = false;
            var editMode = false;

            L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom: 20, attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT' }).addTo(mainMap);

            navigator.geolocation.getCurrentPosition(showPosition);

            function showPosition(position) {
                mainMap.setView([position.coords.latitude, position.coords.longitude], 14);
                drawFeatures();
                addControls();
            }

            function drawFeatures() {

                mapService.getSources().success(function(sources){
                    for(var i = 0 ; i < sources.MySources.length;i++){
                        var layer = getLeafletLayer(sources.MySources[i].Geometry);
                        layer.options.id=sources.MySources[i].Id;
                        layer.addTo(myFeatureGroup);
                        layer.bindPopup(formTemplates.source);
                    }
                    for(var j = 0 ; j < sources.OthersSources.length;j++){
                        var layer = getLeafletLayer(sources.OthersSources[j].Geometry);
                        layer.options.id=sources.OthersSources[j].Id;
                        layer.addTo(otherFeatureGroup);
                        layer.bindPopup(formTemplates.source);
                    }

                    myFeatureGroup.on('click', function(e){
                        mapService.getProperties(e.layer.options.id).success(function(data){
                            if(deleteMode){
                                e.layer.openPopup();
                            }else{
                                e.layer.remove();
                            }
                        });
                    });

                    otherFeatureGroup.on('click', function(e){
                        mapService.getProperties(e.layer.options.id).success(function(){
                            e.layer.openPopup();
                        });
                    });

                    mainMap.fitBounds(otherFeatureGroup.getBounds())
                });
               // mapService.login();
               /* var polyline = L.polyline([[43.1, 1.2], [43.2, 1.3], [43.3, 1.2]]).addTo(featureGroup);
                var polyline2 = L.polyline([[43.3, 1.25], [43.22, 1.34], [43.33, 1.23]]);
                polyline2.addTo(featureGroup);
                var point1 = L.marker(L.latLng(-80.1, 0)).addTo(featureGroup);
                var point = getLeafletLayer('POINT(-80 0)');
                point.addTo(featureGroup);
                point.enableEdit();
                point1.enableEdit();
                polyline.enableEdit();
                featureGroup.addTo(mainMap);
                mainMap.fitBounds(featureGroup.getBounds());

                mainMap.on("editable:drawing:end", function (e) {
                    console.log("layer created");
                    e.layer.addTo(featureGroup);
                });*/

                /*featureGroup.bindPopup(formTemplates.source);
                featureGroup.on('click', function (e) {
                    if (!deleteMode) {
                        e.layer.openPopup();
                    } else {
                        e.layer.remove();
                    }
                });
                polyline2.on('click', function (e) {
                    polyline.disableEdit();
                });

                console.log(toWKT(polyline));*/
            }

            function addControls(){
                L.NewLineControl = L.Control.extend({
                    options: {
                        position: 'topleft'
                    },

                    onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                            link = L.DomUtil.create('a', '', container);

                        link.href = '#';
                        link.title = 'Create a new line';
                        link.innerHTML = 'line';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                map.editTools.startPolyline();
                            });

                        return container;
                    }
                });

                L.NewPolygonControl = L.Control.extend({
                    options: {
                        position: 'topleft'
                    },

                    onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                            link = L.DomUtil.create('a', '', container);

                        link.href = '#';
                        link.title = 'Create a new polygon';
                        link.innerHTML = 'polygon';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                map.editTools.startPolygon();
                            });

                        return container;
                    }
                });

                L.NewMarkerControl = L.Control.extend({
                    options: {
                        position: 'topleft'
                    },

                    onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                            link = L.DomUtil.create('a', '', container);

                        link.href = '#';
                        link.title = 'Add a new marker';
                        link.innerHTML = 'marker';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                map.editTools.startMarker();
                            });

                        return container;
                    }
                });

                mainMap.addControl(new L.NewMarkerControl());
                mainMap.addControl(new L.NewLineControl());
                mainMap.addControl(new L.NewPolygonControl());

                mainMap.on("editable:drawing:end", function (e) {
                    console.log("layer created");
                    e.layer.addTo(myFeatureGroup);
                });
            }
        }
    }]);
