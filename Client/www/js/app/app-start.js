var app = {
    initialize: function () {
        injectDependency(!isPhoneGap());
        this.bindEvents();
    },
    bindEvents: function () {
        if (isPhoneGap()) {
            document.addEventListener('deviceready', this.startAngular, false);
        } else {
            angular.element(document).ready(this.startAngular);
        }
    },
    startAngular: function () {
        angular.bootstrap(document, ['CleanWaterApp']);
    }
};
