appModule.controller('signalrTestController', [
    '$scope', 'messageListService', 'signalrService', function ($scope, messageListService, signalrService) {
        signalrService.connect();
        $scope.service = messageListService;

        $scope.addMessage = function() {
            signalrService.sendMessage($scope.messageToBeSent);
        }
    }
]);
/*
appModule.controller('testController', ['$scope', 'signalrService', 'messageListService', function ($scope, signalrService, messageListService) {
    $scope.service = messageListService;

    $scope.addMessage = function () {
        signalrService.sendAnother($scope.messageToBeSent);
    }
}])*/