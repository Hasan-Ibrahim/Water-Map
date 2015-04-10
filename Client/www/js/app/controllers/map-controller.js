lloydApp.controller('MapCtrl', ['mapService', 'ConvexHull', 'sourceCoverageService', '$rootScope','sidebarService',
    function (mapService, ConvexHull, sourceCoverageService, $rootScope, sidebarService) {
        var preferredAreaMode = false;
        init();
        function init() {
            var mainMap = mapService.getMap();
            var myFeatureGroup = L.featureGroup().addTo(mainMap), otherFeatureGroup = L.featureGroup().addTo(mainMap);

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
                        addLayerToMap(layer, sources.MySources[i].Id, myFeatureGroup);
                    }

                    for (var j = 0; j < sources.OthersSources.length; j++) {
                        var layer = getLeafletLayer(sources.OthersSources[j].Geometry);
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
                            });

                        return container;
                    }
                });

                mainMap.addControl(new L.NewMarkerControl());
                mainMap.addControl(new L.NewLineControl());
                mainMap.addControl(new L.NewPolygonControl());
                mainMap.addControl(new L.NewPreferredZoneControl());

                mainMap.on("editable:drawing:end", function (e) {
                    console.log("layer created");
                    e.layer.addTo(mainMap);
                    if(preferredAreaMode){
                        addLayerToMap(e.layer, 0, myFeatureGroup);
                    }else{
                        addLayerToMap(e.layer, 0, otherFeatureGroup);
                    }
                    mapService.addFeature(toWKT(e.layer), "Test").then(function(data){
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
                layer.bindPopup(formTemplates.source).on('popupclose', function(){
                    $rootScope.$broadcast('popupClosed');
                });
                layer.on('click', function (e) {
                    $rootScope.$broadcast('markerClicked',e.target.options.id);
                    sidebarService.showBottomBar = true;
                    mapService.selectedSourceId = e.target.options.id;

                    if (selectedSource && selectedSource != this) {
                        sourceCoverageService.hideCoveragePolygon();
                    }
                    selectedSource = this;
                    if (!sourceCoverageControlAdded) {
                        mainMap.addControl(new L.SourceCoverageControl());
                        sourceCoverageControlAdded = true;
                    }
                    mapService.getProperties(e.target.options.id).success(function (data) {
                        layer.openPopup();
                        for (var i in data) {
                            var container = $('#water-quality td#' + i);
                            if (container.length) {
                                container.text(data[i].toFixed(1) + "%");
                            }
                        }

                        $('#water-quality input[type="radio"]').click(function () {
                            var submitButton = $('#water-quality #submit-quality');
                            if (submitButton.is(":disabled")) {
                                submitButton.removeAttr('disabled');
                            }
                        });

                        $('#water-quality #submit-quality').click(function () {
                            var checked = $('#water-quality input[type=radio]:checked');

                            if (checked.length) {
                                mapService.rateSource(layer.options.id, checked[0].value);
                                layer.closePopup();
                            }
                        });
                    });
                });
            }
        }
    }]);
