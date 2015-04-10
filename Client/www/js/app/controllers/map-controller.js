lloydApp.controller('MapCtrl', ['mapService', 'ConvexHull', 'sourceCoverageService',
    function (mapService, ConvexHull, sourceCoverageService) {
        init();
        function init() {
            var mainMap = mapService.getMap();

            var deleteMode = false;

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
                        addLayerToMap(layer, sources.MySources[i].Id);
                    }

                    for(var j = 0 ; j < sources.OthersSources.length;j++){
                        var layer = getLeafletLayer(sources.OthersSources[j].Geometry);
                        addLayerToMap(layer, sources.OthersSources[j].Id);
                    }

                    //mainMap.fitBounds(mainMap.getBounds())
                });
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
                        link.innerHTML = 'Stream';
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
                        link.innerHTML = 'Reservior';
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
                        link.innerHTML = 'Well';
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
                    e.layer.addTo(mainMap);
                    addLayerToMap(e.layer, 0);
                    mapService.addFeature(toWKT(e.layer), "Test", function(data){
                        e.layer.options.id = data.Id;
                        e.layer.disableEdit();
                    });
                });
            }

            var selectedSource = undefined;
            L.SourceCoverageControl = L.Control.extend({
                options: {
                    position: 'topright'
                },

                onAdd: function (map) {
                    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                        link = L.DomUtil.create('a', '', container);

                    var showingCoverage = false;
                    link.href = '#';
                    link.title = 'Add a new marker';
                    link.innerHTML = 'SC';
                    sourceCoverageService.storeLink(link);
                    L.DomEvent.on(link, 'click', L.DomEvent.stop)
                        .on(link, 'click', function () {
                            sourceCoverageService.toggleSourceCoverage(selectedSource.options.id);
                        });
                    return container;
                }
            });

            var sourceCoverageControlAdded = false;

            function addLayerToMap(layer, id){
                layer.options.id=id;
                layer.addTo(mainMap);
                layer.bindPopup(formTemplates.source);

                layer.on('click', function(e){
                    if(selectedSource && selectedSource != this){
                        sourceCoverageService.hideCoveragePolygon();
                    }
                    selectedSource = this;
                    if(!sourceCoverageControlAdded) {
                        mainMap.addControl(new L.SourceCoverageControl());
                        sourceCoverageControlAdded = true;
                    }
                    mapService.getProperties(e.target.options.id).success(function(data){
                        console.log(data);
                    });
                });
            }
        }
    }]);
