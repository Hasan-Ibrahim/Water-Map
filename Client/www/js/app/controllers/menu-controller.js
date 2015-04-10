lloydApp.controller('MenuCtrl', ['$scope', '$rootScope', 'loginService',
    function ($scope, $rootScope, loginService) {
        $scope.toggleDisplayHomePlace = function () {
            if ($rootScope.showHomePlace) {
                $('.sp-right-box').removeClass('animated fadeInRight');
                $('.sp-right-box').addClass('animated fadeOutRight');
            } else {
                $('.sp-right-box').removeClass('animated fadeOutRight');
                $('.sp-right-box').addClass('animated fadeInRight');
            }
            $rootScope.showHomePlace = !$rootScope.showHomePlace;
        }
    }]);
