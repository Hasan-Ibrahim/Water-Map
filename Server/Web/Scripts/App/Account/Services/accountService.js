appModule.factory('accountService', ['accountRepository', 'toastr', 'userProfileService', 'tokenStorage','validator',
    function (accountRepository, toastr, userProfileService, tokenStorage, validator) {

        var activeUser = userProfileService.activeUser;

        var _thisService = {
            register: function (registerModel) {
                return accountRepository.register(registerModel).success(function () {
                    toastr.success('Your account has been registered');
                }).error(function (result) {
                    toastr.error(result.Message);
                });
            },
            login: function (loginModel) {
                return accountRepository.login(loginModel).success(function (response, status, headers) {
                    activeUser.IsAuthenticated = true;
                    setAuthToken(response);
                    toastr.success("You are logged in");
                }).error(function (result) {
                    toastr.error(result.Message);
                });
            },
            logout: function () {
                return accountRepository.logout().success(function () {
                    tokenStorage.removeItem();
                    activeUser.IsAuthenticated = false;
                    userProfileService.getUserProfile();
                    toastr.info("You have been logged out");
                }).error(function (result) {
                    toastr.error(result.Message);
                });
            },
            changePassword: function (passwordModel) {
                return accountRepository.changePassword(passwordModel).success(function () {
                    toastr.success('Password changed');
                }).error(function (result) {
                    toastr.error(result.Message);
                });
            },
            setNewToken: function (oldToken) {
                return accountRepository.renewToken(oldToken).success(function (response, status, headers) {
                   setAuthToken(response);
                });
            },
            isPasswordModelValid: function (changePasswordModel) {
                if (!validator.passwordsMatch(changePasswordModel.newPassword, changePasswordModel.retypePassword)) {
                    toastr.error("Passwords do not match");
                    return false;
                }
                return true;
            },
            isRegisterModelValid: function (registerModel) {

                if (!validator.isNameValid(registerModel.fullName)) {
                    toastr.error("Invalid name. Only alphabets and '.' are valid");
                    return false;
                }

                if (!validator.isEmailValid(registerModel.email)) {
                    toastr.error("Invalid email address");
                    return false;
                }

                if (!validator.isPhoneNumberValid(registerModel.phoneNumber)) {
                    toastr.error("Invalid phone number");
                    return false;
                }

                if (!validator.passwordsMatch(registerModel.password, registerModel.retypePassword)) {
                    toastr.error("Passwords do not match");
                    return false;
                }
                return true;
            }
        }

        function setAuthToken(response) {
            tokenStorage.setItem(response.Token, response.RememberMe);
            userProfileService.getUserProfile();
        }

        return _thisService;
    }
]);
