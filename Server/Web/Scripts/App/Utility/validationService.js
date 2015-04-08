utilModule.factory('validator', [function() {
    return {
        passwordsMatch: function (password, confirmPassword) {
            return password.length != 0 && confirmPassword.length != 0 && password == confirmPassword;
        },
        isEmailValid: function (email) {
            var emailValidationRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return emailValidationRegex.test(email);
        },
        isNameValid: function (name) {
            var nameRegex = new RegExp(/^[a-zA-Z]+[.]*[a-zA-Z ]*[a-zA-Z]+$/);
            return nameRegex.test(name);
        },
        isPhoneNumberValid: function (phoneNumber) {
            var validPhoneNumberRegex = new RegExp(/^(\+88)?(\d{4})[ .-]?(\d{3})[ .-]?(\d{4})$/);
            return validPhoneNumberRegex.test(phoneNumber);
        }
    }
}]);