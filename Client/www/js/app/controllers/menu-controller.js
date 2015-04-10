lloydApp.controller('MenuCtrl', ['$scope', '$rootScope', 'loginService',
    function ($scope, $rootScope, loginService) {
        $scope.toggleDisplayHomePlace = function () {
            //$rootScope.showHomePlace = !$rootScope.showHomePlace;
            $('.sp-right-box').style('opacity', '100%');

            $('.sp-right-box').removeClass('fadeOutUp');
            $('.sp-right-box').addClass('fadeOutUp');

            //$('#newsletter button').on('click', function () {
            //    $(this).addClass('animated shake');
            //});
        }
    }]);
