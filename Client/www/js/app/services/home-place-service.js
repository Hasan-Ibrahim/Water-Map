function HomePlaceService(db, geoLocationService) {

    this.getHomePlace = function () {
        return db.getHomeLocation();
    };

    this.updateToCurrentLocation = function () {
        if (geoLocationService.hasLocation()) {
            var position = geoLocationService.getUserLocation();
            db.setHomeLocation(position);
        }
    }
}

lloydApp.service('homePlaceService', HomePlaceService);
