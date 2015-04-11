function CameraService($rootScope, $window) {
    var camera = new $window.Jantrik.Camera();
    var gallery = new $window.Jantrik.Gallery();

    this.takePhoto = function (success) {
        camera.takePhoto(function (url) {
            success(url);
            $rootScope.$apply();
        });
    };

    this.openGallery = function (success) {
        gallery.openGallery(function (url) {
            success(url);
            $rootScope.$apply();
        });
    };

    this.takeVideo = function (success) {
        camera.takeVideo(function (url) {
            success(url);
            $rootScope.$apply();
        });
    };
}

lloydApp.service('cameraService', ['$rootScope', '$window', CameraService]);