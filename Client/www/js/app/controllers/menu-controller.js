lloydApp.controller('MenuCtrl', ['$scope', '$rootScope', 'sidebarService',
    function ($scope, $rootScope, sidebarService) {
        $scope.toggleRightBar = function () {
            sidebarService.toggleRightBar();
        };

        $rootScope.toggleTopBar = function () {
            sidebarService.toggleTopBar();
        };
    }]);
