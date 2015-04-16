lloydApp.factory('DistanceCalculatorService', ['geoLocationService', function (geoLocationService) {
    var PIx = 3.141592653589793;
    var Radius = 6378.137;
    var MilePerKm = 0.621371;

    function radians(x) {
        return (x * PIx)/180;
    }

    function distanceBetweenPlacesInKm(lon1, lat1, lon2, lat2)
    {
        var dlon = radians(lon2 - lon1);
        var dlat = radians(lat2 - lat1);
        var a = (Math.sin(dlat / 2) * Math.sin(dlat / 2)) +
        Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * (Math.sin(dlon / 2) * Math.sin(dlon / 2));
        var angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return angle * Radius;
    }

    function distanceBetweenPlacesInMile(lon1, lat1, lon2, lat2)
    {
        var distance = distanceBetweenPlacesInKm(lon1, lat1, lon2, lat2);
        return distance*MilePerKm;
    }

    function getDistance (itemLon, itemLat) {
        var lon = parseFloat(itemLon);
        var lat = parseFloat(itemLat);
        var userLocation = geoLocationService.getUserLocation();
        return distanceBetweenPlacesInMile(lon, lat, userLocation.longitude, userLocation.latitude);
    }

    return {
        getDistance: getDistance
    };
}]);
