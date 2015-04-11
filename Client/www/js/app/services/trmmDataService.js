lloydApp.service('trmmDataService', ['mapService' ,
    function (mapService) {

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
        var gradient = generateGradient(grad, 2000);
        var colors = [];
        for(var i = 0; i<2000 ; i+=4){
            var red = gradient[i * 4];
            var green = gradient[i * 4 + 1];
            var blue = gradient[i * 4 + 2];
            var alpha = gradient[i * 4 + 3];
            colors.push('rgb('+red+','+green+','+blue+')');
        }

        return {
            showTrmmDataMap: function () {
                var mainMap = mapService.getMap();
                var heat = L.heatLayer(mainMap, trmmData, {radius: 25, blur: 15,
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
                        //return (obj/100).toFixed(2);
                        var lpd = obj[0];
                        var cmy = 0.365 * lpd;
                        return (17 - (cmy / obj[1])) / 17;
                    },
                    getCellSize: function () {
                        return {x: 0.5, y: 0.5};
                        if (map.getZoom() > 6)
                            return {x: 0.1, y: 0.1};
                        else
                            return {x: 0.5, y: 0.5};
                    },
                    getStartLatLng: function () {
                        return {lat: 89.75, lng: -179.75, columnCount: 720};
                        if (map.getZoom() > 6)
                            return {lat: 89.95, lng: -179.95, columnCount: 3600};
                        else
                            return {lat: 89.75, lng: -179.75, columnCount: 720};
                    },
                    getLatLngs: function () {
                        return trmmData;
                        if (map.getZoom() > 6)
                            return addressPoints;
                        else
                            return addressPointsHigherZoom;
                    },
                    colorCodeCalculator: function(value){
                        value = Math.round(value);
                        value = value >= 2000 ? 1999 : value;
                        return colors[value];
                    }
                }).addTo(mainMap);
            }
        }
    }]);