///<reference path="~/Scripts/Test/scriptReferences.js"/>

describe('loginController tests', function () {
    beforeEach(function () {
        module('appModule');
    });

    var scope = {};
    it("should have a method login.", inject(function ($controller, $rootScope, accountService) {
        scope = $rootScope.$new();
        $controller('loginController', { $scope: scope, accountService: accountService });
        expect(scope.login).toBeDefined();
    }));
});