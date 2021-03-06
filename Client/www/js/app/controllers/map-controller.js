lloydApp.controller('MapCtrl', ['$scope', '$rootScope', 'mapService', 'ConvexHull', 'sourceCoverageService', '$rootScope', 'sidebarService', 'markerIconService', '$ionicModal', '$templateCache',
    function ($scope, $rootScope, mapService, ConvexHull, sourceCoverageService, $rootScope, sidebarService, markerIconService, $ionicModal,$templateCache) {
        init();
        function init() {
            var currentSourceType, preferredAreaMode = false, rainWaterMode = false;

            var mainMap = mapService.getMap();
            var myFeatureGroup = L.featureGroup().addTo(mainMap), otherFeatureGroup = L.featureGroup().addTo(mainMap);
            var preferredAreaStyle = {
                dashArray: "8, 6"
            };
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
                        addLayerToMap(layer, sources.MySources[i], myFeatureGroup);
                    }

                    for (var j = 0; j < sources.OthersSources.length; j++) {
                        var layer = getLeafletLayer(sources.OthersSources[j].Geometry);
                        layer = markerIconService.getAwesomeMarker(layer, sources.OthersSources[j], false);
                        addLayerToMap(layer, sources.OthersSources[j], otherFeatureGroup);
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
                        link.title = 'Create a stream';
                        link.innerHTML = '<img src="img/streamIco.png" />';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                currentSourceType = "Well";
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
                        link.title = 'Create a reservoir';
                        link.innerHTML = '<img src="img/reservoir.png" />';
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
                        link.title = 'Add a well';
                        link.innerHTML = '<img src="img/wellIco.png" />';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                currentSourceType = "Well";
                                map.editTools.startWell();
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
                        link.title = 'Add a preferred zone';
                        link.innerHTML = '<img src="img/alertIco.png" />';
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
                        link.title = 'Add a rain water source';
                        link.innerHTML = '<img src="img/rainIco.png" />';
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                currentSourceType = "Rain_Water";
                                map.editTools.startRainWater();
                                rainWaterMode = true;
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

                $ionicModal.fromTemplateUrl('partials/notificationForArea.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                });

                $scope.showNotificationForAreaWindow = function () {
                    $scope.modal.show();
                };

                $scope.closeNotificationForAreaWindow = function () {
                    $scope.modal.hide();

                };

                $ionicModal.fromTemplateUrl('partials/rainArea.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.rainAreaModal = modal;
                });

                $scope.showRainAreaModal = function () {
                    $scope.rainAreaModal.show();
                };

                $scope.closeRainAreaModal = function () {
                    $scope.rainAreaModal.hide();
                };

                var tempLayer = undefined;

                $scope.$on('modal.hidden', function () {
                    if (preferredAreaMode) {
                        if ($rootScope.areaOptions && $rootScope.areaOptions.length) {
                            mapService.subscribeArea(toWKT(tempLayer), $rootScope.areaOptions).then(function (data) {
                                tempLayer.options.id = data.data.Id;
                                tempLayer.disableEdit();
                                tempLayer.setStyle(preferredAreaStyle);
                            });
                        } else {
                            if (tempLayer && tempLayer.remove) {
                                tempLayer.remove();
                            }
                        }
                    } else if (rainWaterMode) {
                        if($rootScope.rainArea){
                            mapService.postRainWaterSource(toWKT(tempLayer),$rootScope.rainArea).then(function (data) {
                                //tempLayer.options.id = data.data.Id;
                                tempLayer.disableEdit();
                            });
                        }else{
                            if (tempLayer && tempLayer.remove) {
                                tempLayer.remove();
                            }
                        }
                    }
                    preferredAreaMode = false;
                    rainWaterMode = false;
                });

                mainMap.on("editable:drawing:end", function (e) {
                    console.log("layer created");
                    e.layer.addTo(mainMap);
                    var sourceType = currentSourceType ? currentSourceType : "Test";
                    e.layer.options.sourceType = sourceType;
                    if (preferredAreaMode) {
                        addLayerToMap(e.layer, {Id: 0}, myFeatureGroup);
                        tempLayer = e.layer;
                        $scope.showNotificationForAreaWindow();

                    } else if (rainWaterMode) {
                        addLayerToMap(e.layer, {Id: 0}, myFeatureGroup);
                        tempLayer = e.layer;
                        $scope.showRainAreaModal();
                    } else {
                        addLayerToMap(e.layer, {Id: 0}, otherFeatureGroup);
                        mapService.addFeature(toWKT(e.layer), sourceType).then(function (data) {
                            e.layer.options.id = data.data.Id;
                            e.layer.disableEdit();
                        });
                    }

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
                    link.innerHTML = '<img src="img/scIco.png" />';
                    sourceCoverageService.storeLink(link);
                    L.DomEvent.on(link, 'click', L.DomEvent.stop)
                        .on(link, 'click', function () {
                            sourceCoverageService.toggleSourceCoverage(selectedSource.options.id);
                        });
                    return container;
                }
            });

            var sourceCoverageControlAdded = false;

            function addLayerToMap(layer, source, featureGroup) {

                layer.options.id = source.Id;
                layer.options.sourceType = source.SourceType;
                layer.addTo(featureGroup);
                layer.on('click', function (e) {
                    if (!e.target.options.id)return;
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

                    if(selectedSource.options.sourceType == "Rain_Water"){
                        return;
                    }

                    mapService.getProperties(e.target.options.id).success(function (data) {

                        var template = $('#water-source-description').html();
                        layer.bindPopup(template);
                        layer.openPopup();
                        for (var i in data) {
                            var container = $('#water-quality td#' + i);
                            if (container.length) {
                                !isNaN(data[i]) && container.text(data[i].toFixed(1) + "%");
                            }
                        }
                        $('#water-quality #water-source-accessibility').text(data.Accessibility);
                        $('#water-quality #water-source-rater-count').text(data.TotalRatings);
                    });
                });
            }
        }
    }]);
