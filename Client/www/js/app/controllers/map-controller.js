lloydApp.controller('MapCtrl', ['mapService', 'ConvexHull', 'sourceCoverageService', '$rootScope','sidebarService', 'markerIconService',
    function (mapService, ConvexHull, sourceCoverageService, $rootScope, sidebarService, markerIconService) {
        var preferredAreaMode = false;
        init();
        function init() {
            var currentSourceType;

            var mainMap = mapService.getMap();
            var myFeatureGroup = L.featureGroup().addTo(mainMap), otherFeatureGroup = L.featureGroup().addTo(mainMap);
            var myFeatureGroupStyle = {
                radius: 8,
                fillColor: "#5AD75A",
                color: "#D65AD6",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6
            };
            otherFeatureGroup.setStyle(myFeatureGroupStyle);
            L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                maxZoom: 20,
                attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
            }).addTo(mainMap);

            mapService.moveToCurrentLocation().then(function (position) {
                drawFeatures();
                addControls();
            }, function (error) {
                // TODO: show error
                alert('Could not get current location' + JSON.stringify(error));
            });

            function drawFeatures() {

                mapService.getSources().success(function (sources) {
                    for (var i = 0; i < sources.MySources.length; i++) {
                        var layer = getLeafletLayer(sources.MySources[i].Geometry);
                        layer = markerIconService.getAwesomeMarker(layer, sources.MySources[i], true);
                        addLayerToMap(layer, sources.MySources[i].Id, myFeatureGroup);
                        if(layer.setStyle){
                            layer.setStyle(myFeatureGroupStyle);
                        }
                    }

                    for (var j = 0; j < sources.OthersSources.length; j++) {
                        var layer = getLeafletLayer(sources.OthersSources[j].Geometry);
                        //sources.OthersSources[j].SourceType = "Rain_Water";
                        layer = markerIconService.getAwesomeMarker(layer, sources.OthersSources[j], false);
                        addLayerToMap(layer, sources.OthersSources[j].Id, otherFeatureGroup);
                    }
                });
            }

            function addControls() {
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
                                currentSourceType = "Stream";
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
                        link.innerHTML = 'Reservoir';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                currentSourceType = "Reservoir";
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
                                currentSourceType = "Well";
                                map.editTools.startMarker();
                            });

                        return container;
                    }
                });

                L.NewPreferredZoneControl = L.Control.extend({
                    options: {
                        position: 'topleft'
                    },
                    onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                            link = L.DomUtil.create('a', '', container);

                        link.href = '#';
                        link.title = 'Add preferred zone';
                        link.innerHTML = 'preferred zone';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                map.editTools.startPolygon();
                                preferredAreaMode = true;
                            });

                        return container;
                    }
                });

                L.RainWaterSourceControl = L.Control.extend({
                    options: {
                        position: 'topleft'
                    },

                    onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                            link = L.DomUtil.create('a', '', container);

                        link.href = '#';
                        link.title = 'Add a new marker';
                        link.innerHTML = 'Rain Water';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                currentSourceType = "Rain_Water";
                                map.editTools.startMarker();
                            });
                        return container;
                    }
                });

                mainMap.addControl(new L.NewMarkerControl());
                mainMap.addControl(new L.RainWaterSourceControl());
                mainMap.addControl(new L.NewLineControl());
                mainMap.addControl(new L.NewPolygonControl());
                mainMap.addControl(new L.NewPreferredZoneControl());

                new L.Control.GeoSearch({
                    provider: new L.GeoSearch.Provider.OpenStreetMap()
                }).addTo(mainMap);

                mainMap.on("editable:drawing:end", function (e) {
                    console.log("layer created");
                    e.layer.addTo(mainMap);
                    var sourceType = currentSourceType ? currentSourceType : "Test";
                    e.layer.options.sourceType = sourceType;
                    if (preferredAreaMode) {
                        addLayerToMap(e.layer, 0, myFeatureGroup);
                        preferredAreaMode = false;
                    } else {
                        addLayerToMap(e.layer, 0, otherFeatureGroup);
                    }
                    mapService.addFeature(toWKT(e.layer), sourceType).then(function(data){
                        e.layer.options.id = data.data.Id;
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

            function addLayerToMap(layer, id, featureGroup) {
                layer.options.id = id;
                layer.addTo(featureGroup);
                layer.on('click', function (e) {
                    $rootScope.$broadcast('markerClicked', e.target.options.id);
                    sidebarService.showBottomBar = true;
                    mapService.selectedSourceId = e.target.options.id;

                    if (selectedSource && selectedSource != this) {
                        sourceCoverageService.hideCoveragePolygon();
                    }
                    selectedSource = this;
                    mapService.selectedSource = selectedSource;
                    if (!sourceCoverageControlAdded) {
                        mainMap.addControl(new L.SourceCoverageControl());
                        sourceCoverageControlAdded = true;
                    }
                    mapService.getProperties(e.target.options.id).success(function (data) {
                        layer.bindPopup(formTemplates.source);
                        layer.openPopup();
                        for (var i in data) {
                            var container = $('#water-quality td#' + i);
                            if (container.length) {
                                container.text(data[i].toFixed(1) + "%");
                            }
                        }
                    });
                });
            }
        }
    }]);
