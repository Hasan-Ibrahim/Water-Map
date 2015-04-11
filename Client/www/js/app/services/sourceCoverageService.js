lloydApp.service('sourceCoverageService', ['mapService', 'ConvexHull',
    function (mapService, ConvexHull) {

        var consumerPointsFeatureGroup = undefined;
        var coveragePolygon = undefined;
        var _link;
        var showingCoverage = false;

        function showCoveragePolygon(userLocations){
            _link.innerHTML = "HC";
            showingCoverage = true;
            var mainMap = mapService.getMap();
            if(!consumerPointsFeatureGroup){
                consumerPointsFeatureGroup = L.featureGroup().addTo(mainMap);
            }
            var points = [];
            for(var date in userLocations){
                points.push.apply(points, userLocations[date]);
            }
            //console.log(points);
            if(points.length == 0)
                return;

            var hull = new ConvexHull();
            for(var i=0;i<points.length;i++){
                var marker = getLeafletLayer(points[i]);
                //consumerPointsFeatureGroup.addLayer(marker);
                hull.addPoint(marker._latlng.lng, marker._latlng.lat);
            }

            var h = hull.getHull();
            var convexPoints = [];
            for(var i=0; i< h.length; i++){
                convexPoints.push([h[i].y, h[i].x]);
                //L.marker([h[i].y, h[i].x]).addTo(mainMap);
            }
            var polygon = L.polygon(convexPoints, {color: "#ff7800", weight: 1});
            if(polygon){
                polygon.addTo(mainMap);
            }
            //console.log(h);
            coveragePolygon = polygon;
        }

        function hideCoveragePolygon(){
            showingCoverage = false;
            _link.innerHTML = "SC";
            var mainMap = mapService.getMap();
            if(coveragePolygon){
                mainMap.removeLayer(coveragePolygon);
            }
        }

    return {
        showCoveragePolygon: showCoveragePolygon,
        hideCoveragePolygon: hideCoveragePolygon,
        storeLink: function(link){
            _link = link;
        },
        toggleSourceCoverage: function (sourceId) {
            showingCoverage = !showingCoverage;
            if(showingCoverage) {
                mapService.getCoveragePoints(sourceId)
                    .success(function (response) {
                        //console.log(response);
                        showCoveragePolygon(response);
                    });
            }
            else{
                hideCoveragePolygon();
            }
        }
    }
}]);