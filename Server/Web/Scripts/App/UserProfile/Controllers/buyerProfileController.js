appModule.controller('buyerProfileController', ['$scope', 'userProfileService',
    function ($scope, userProfileService) {

        $scope.pageConfig = {
            maxPagination: 5,
            totalItems: 1,
            currentPage: 1,
            itemsPerPage: 10
        };

        $scope.onPageChange = function () {
            //service.getPage($scope.pageConfig.currentPage - 1, $scope.pageConfig.itemsPerPage).success(function (products) {
            //    $scope.products = products;
            //});
        };

        $scope.products = [];

        userProfileService.getPurchaseHistory().success(function(products) {
            $scope.products = products;
        });
    }
]);
