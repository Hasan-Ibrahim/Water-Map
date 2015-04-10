appModule.factory('userProfileRepository', ['$http', 'urlResolver',
    function ($http, urlResolver) {
        return {
            getUserProfile: function () {
                return $http.get(urlResolver.resolveUserProfile('GetUserProfile'));
            },
            getUserAddress: function (userId) {
                return $http.get(urlResolver.resolveUserProfile('GetUserAddress', userId));
            },
            updateUserProfile: function (userProfile) {
                return $http.post(urlResolver.resolveUserProfile('UpdateUserProfile'), userProfile);
            },
            getPurchaseHistory: function () {
                return $http.get(urlResolver.resolveUserProfile('getPurchaseHistory'));
            },
            getSellingHistory: function (userId) {
                return $http.get(urlResolver.resolveUserProfile('GetSellingHistory', {userId:userId}));
            },
            getSellerProfile: function (userId) {
                return $http.get(urlResolver.resolveUserProfile('GetSellerProfile', { userId: userId ? userId : null }));
            }
        }
    }
]);