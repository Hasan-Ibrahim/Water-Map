lloydApp.service('supplyDemandService', function ($q, geoLocationService, mapService, remote) {
    this.submitDemandSupply = function (waterDemand, waterSupply, totalConsumer) {
        if (geoLocationService.hasLocation()) {
            var position = geoLocationService.getUserLocation();
            var sourceId = mapService.selectedSourceId;
            return remote.submitDemandSupply(waterDemand, waterSupply, totalConsumer,
                sourceId,
                position.coords.latitude,
                position.coords.longitude
            );
        } else {
            return $q.reject('Turn on Your GPS');
        }
    };
});