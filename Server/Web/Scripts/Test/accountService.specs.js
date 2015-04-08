///<reference path="~/Scripts/Test/scriptReferences.js"/>

describe("accountService unit testing.", function () {

    beforeEach(function () {
        module('appModule');
    });

    describe("passwordsMatch function testing", function () {
        it("The passwords should match", inject(function (accountService) {
            expect(accountService.passwordsMatch('els#d&@n', 'els#d&@n')).toBeTruthy();
        }));

        it("The passwords should not match", inject(function (accountService) {
            expect(accountService.passwordsMatch('els5d&@n', 'els#d&@n')).toBeFalsy();
        }));

        it("The blank passwords should not match", inject(function (accountService) {
            expect(accountService.passwordsMatch('', '')).toBeFalsy();
        }));
    });

    describe("isEmailValid function testing", function () {
        it("This should be a valid email address", inject(function (accountService) {
            expect(accountService.isEmailValid("example@example.com")).toBeTruthy();
        }));

        it("This should not be a valid email address without triling part", inject(function (accountService) {
            expect(accountService.isEmailValid('example')).toBeFalsy();
        }));

        it("The email address ends with dot should be invalid", inject(function (accountService) {
            expect(accountService.isEmailValid('example@example.')).toBeFalsy();
        }));

        it("The email address without @ should be invalid", inject(function (accountService) {
            expect(accountService.isEmailValid('example#example.com')).toBeFalsy();
        }));

        it("The blank email should be invalid", inject(function (accountService) {
            expect(accountService.isEmailValid('')).toBeFalsy();
        }));
    });
});
