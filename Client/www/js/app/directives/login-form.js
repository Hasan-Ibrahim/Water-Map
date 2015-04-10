lloydApp.directive('loginForm', [
    function () {
        return {
            scope: {},
            restrict: 'E',
            link: function (scope, element, attrs, controller) {
            },
            templateUrl: 'partials/login-form.html',
            controller: 'LoginCtrl'
        }
    }
]);
