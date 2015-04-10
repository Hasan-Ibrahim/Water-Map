function HomePlaceService(db) {

    this.getHomePlace = function () {
        return db.getHomeLocaiton();
    };

    this.updateToCurrentLocation = function () {

    }
}

lloydApp.service('homePlaceService', HomePlaceService);