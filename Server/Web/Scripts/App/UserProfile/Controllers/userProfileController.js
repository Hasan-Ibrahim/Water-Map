appModule.controller('userProfileController', ['$scope', 'userProfileService', '$location',
    function ($scope, userProfileService, $location) {

        $scope.userProfileForm = { isEditable: false };
        $scope.userProfile = userProfileService.activeUser;

        $scope.cancelProfileUpdate = function () {
            $scope.userProfileForm.isEditable = false;
            $scope.userProfile = userProfileService.activeUser;
        };

        $scope.updateUserProfile = function () {
            if (userProfileService.isProfileModelValid($scope.userProfile)) {
                userProfileService.updateUserProfile($scope.userProfile).success(function () {
                    $location.path('/home');
                });
            }
        };

        $scope.editProfile = function () {
            $scope.userProfileForm.isEditable = true;
            $scope.userProfile = angular.copy(userProfileService.activeUser);
        };

        userProfileService.getPurchaseHistory().success(function (history) {
            $scope.purchaseHistory = history;
        });

        userProfileService.getSellingHistory().success(function (history) {
            $scope.sellingHistory = history;
        });
    }]);