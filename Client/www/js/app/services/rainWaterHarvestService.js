lloydApp.service('rainWaterHarvestService', ['mapService' , '$http', 'serverUrl',
    function (mapService, $http, serverUrl) {
        var appRoot = serverUrl;
        var layerVisible = false;
        var heatLayer;
        var grad = {
            //0.0001: 'blue',
            0.01: '#556EBF',
            0.2: '#6CCFF1',
            0.35: '#92CA95',
            0.5: '#A2C95C',
            0.65: '#FBEB40',
            0.85: '#F2AF42',
            1.0: 'red'
        };
        var length = 3;
        var gradient = generateGradient(grad, length);
        var colors = [];
        for(var i = 0; i<length ; i+=1){
            var red = gradient[i * 4];
            var green = gradient[i * 4 + 1];
            var blue = gradient[i * 4 + 2];
            var alpha = gradient[i * 4 + 3];
            colors.push('rgb('+red+','+green+','+blue+')');
        }

        return {
            showRainWaterHarvestMap: function () {
                var mainMap = mapService.getMap();
                if(layerVisible){
                    mainMap.removeLayer(heatLayer);
                    layerVisible = false;
                    return;
                }

                $http.get(appRoot + "RainWater/GetRainHarvestGrid").success(function(data){
                    layerVisible = true;
                    var heat = L.heatLayer(mainMap, data, {radius: 25, blur: 15,
                        gradient: {
                            //0.0001: 'blue',
                            0.01: '#556EBF',
                            0.2: '#6CCFF1',
                            0.35: '#92CA95',
                            0.5: '#A2C95C',
                            0.65: '#FBEB40',
                            0.85: '#F2AF42',
                            1.0: '#E45543'
                        },
                        calcFunction: function (obj) {
                            return obj;
                            var lpd = obj[0];
                            var cmy = 0.365 * lpd;
                            return (17 - (cmy / obj[1])) / 17;
                        },
                        getCellSize: function () {
                            return {x: 0.1, y: 0.1};
                            if (map.getZoom() > 6)
                                return {x: 0.1, y: 0.1};
                            else
                                return {x: 0.5, y: 0.5};
                        },
                        getStartLatLng: function () {
                            return {lat: 89.95, lng: -179.95, columnCount: 3600};
                            if (map.getZoom() > 6)
                                return {lat: 89.95, lng: -179.95, columnCount: 3600};
                            else
                                return {lat: 89.75, lng: -179.75, columnCount: 720};
                        },
                        getLatLngs: function () {
                            return data;
                            if (map.getZoom() > 6)
                                return addressPoints;
                            else
                                return addressPointsHigherZoom;
                        },
                        colorCodeCalculator: function(value){
                            value = Math.round(value);
                            value = value >= length ? length-1 : value;
                            return colors[value];
                        }
                        /*colorCodeCalculator: function(value){
                            if(value > 0.8){
                                return 'red';
                            }
                            else if(value <= 0.8 && value > 0.6){
                                return 'orange';
                            }
                            else if(value <= 0.6 && value > 0.4){
                                return 'yellow';
                            }
                            else if(value <= 0.4 && value > 0.2){
                                return 'cyan';
                            }
                            else if(value <= 0.2 && value > 0.0){
                                return 'green';
                            }
                            else{
                                return 'blue';
                            }
                        }*/
                    }).addTo(mainMap);
                    heatLayer = heat;
                    //heat.setZIndex(-100);
                });

            }
        }
    }]);