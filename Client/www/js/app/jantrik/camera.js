(function (Jantrik) {
    Jantrik.Camera = function () {
        var _camera = this;

        _camera.takePhoto = function (imagePathHandler) {
            function cameraSuccess(imagePath) {
                imagePathHandler(imagePath);
            }

            function cameraError(message) {
            }

            var cameraOptions =
            {
                limit: 1
            };
            navigator.device.capture.captureImage(cameraSuccess, cameraError, cameraOptions);
        };

        _camera.takeVideo = function (imagePathHandler) {

            function videoSuccess(imagePath) {
                imagePathHandler(imagePath);
            }

            function videoError(message) {
            }

            var videoOptions =
            {
                duration: 5000
            };
            navigator.device.capture.captureVideo(videoSuccess, videoError, videoOptions);
        };
    };

    Jantrik.Gallery = function () {
        var _gallery = this;

        _gallery.openGallery = function (imagePathHandler) {

            function gallerySuccess(imagePath) {
                imagePathHandler(imagePath);
            }

            function galleryError(message) {
            }

            var galleryOptions =
            {
                quality: 100,
                targetWidth: 600,
                targetHeight: 600,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                cameraDirection: Camera.Direction.FRONT
            };
            navigator.camera.getPicture(gallerySuccess, galleryError, galleryOptions);
        };
    };
}(window.Jantrik = window.Jantrik || {}));