appModule.controller('sellerProfileController', [
    '$scope', 'userProfileService', '$routeParams', function ($scope, userProfileService, $routeParams) {

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

        $scope.sellerProfile = { products: [] };

        userProfileService.getSellerProfile($routeParams.id).success(function (profile) {
            $scope.sellerProfile.name = profile.UserProfile.FullName;
            $scope.sellerProfile.rating = profile.UserProfile.Rating;
            $scope.sellerProfile.email = profile.UserProfile.LoginId;
            $scope.sellerProfile.address = profile.UserProfile.Address;
            $scope.sellerProfile.phoneNumber = profile.UserProfile.PhoneNumber;
        });

        userProfileService.getSellingHistory($routeParams.id).success(function (products) {
            $scope.sellerProfile.products = products;
        });
    }
]);