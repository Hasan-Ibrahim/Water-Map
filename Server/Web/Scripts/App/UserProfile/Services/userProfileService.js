appModule.factory('userProfileService', ['userProfileRepository', 'toastr', 'accessControl', '$location', 'validator', 'tokenStorage',
    function (userProfileRepository, toastr, accessControl, $location, validator, tokenStorage) {

        var _userProfileStorageKey = "vazar_userProfile";
        var _storageType = tokenStorage.isTokenPersistant() ? localStorage : sessionStorage;

        var _activeUser = {};

        function loadActiveUser(userProfile) {
            copyProperties(userProfile, _activeUser);
            _storageType.setItem(_userProfileStorageKey, JSON.stringify(_activeUser));
        }

        function copyProperties(from, to) {
            angular.forEach(from, function (val, key) {
                to[key] = from[key];
            });
        }

        function loadActiveUserFromStorage() {
            loadActiveUser(JSON.parse(_storageType.getItem(_userProfileStorageKey)) || {});
        }

        return {
            getUserProfile: function () {
                loadActiveUserFromStorage();
                return userProfileRepository.getUserProfile().success(function (userProfile) {
                    loadActiveUser(userProfile);
                    if (accessControl.isUrlRestricted($location.path(), _activeUser)) {
                        $location.path('/home');
                    }
                }).error(function () {
                    loadActiveUser({});
                });
            },
            getSellerProfile: function(userId) {
                return userProfileRepository.getSellerProfile(userId);
            },
            getUserAddress: function(userId) {
                return userProfileRepository.getUserAddress(userId);
            },
            updateUserProfile: function (userProfile) {
                return userProfileRepository.updateUserProfile(userProfile).success(function () {
                    toastr.success('Profile has been updated');
                    loadActiveUser(userProfile);
                }).error(function (response) {
                    toastr.error(response.Message);
                });
            },
            isProfileModelValid: function (profileModel) {
                if (!validator.isNameValid(profileModel.FullName)) {
                    toastr.error("Invalid name. Only alphabets and '.' are valid");
                    return false;
                }

                if (!validator.isPhoneNumberValid(profileModel.PhoneNumber)) {
                    toastr.error("Invalid phone number");
                    return false;
                }

                return true;
            },
            getPurchaseHistory: function () {
                return userProfileRepository.getPurchaseHistory();
            },
            getSellingHistory: function (userId) {
                return userProfileRepository.getSellingHistory(userId);
            },
            activeUser: _activeUser
        }
    }
]);
