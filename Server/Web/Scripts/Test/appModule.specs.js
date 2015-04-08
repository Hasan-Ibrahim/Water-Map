///<reference path="~/Scripts/Test/scriptReferences.js"/>

describe("appModule unit testing.", function () {
    beforeEach(function() {
        module('appModule');
    });

    it('It should have a login controller.', function() {
        expect('appModule.loginController').toBeDefined();
    });

    it('It should have a registration controller', function() {
        expect('appModule.registrationController').toBeDefined();
    });

    it("It should have a change password controller", function() {
        expect("appModule.changePasswordController").toBeDefined();
    });

    it("It should have an account service.", function() {
        expect('appModule.accountService').toBeDefined();
    });

    it("It should have an account repository.", function() {
        expect("appModule.accountRepository").toBeDefined();
    });
});
