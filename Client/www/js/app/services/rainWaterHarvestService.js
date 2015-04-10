lloydApp.service('rainWaterHarvestService', ['mapService' ,
    function (mapService) {

        return {
            showRainWaterHarvestMap: function () {
                var mainMap = mapService.getMap();
                var heat = L.heatLayer(mainMap, supplyData, {radius: 25, blur: 15,
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
                        //return (obj/100).toFixed(2);
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
                        return supplyData;
                        if (map.getZoom() > 6)
                            return addressPoints;
                        else
                            return addressPointsHigherZoom;
                    },
                    colorCodeCalculator: function(value){
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
                    }
                }).addTo(mainMap);
            }
        }
    }]);