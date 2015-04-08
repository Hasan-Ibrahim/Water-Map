appModule.factory('signalrService', ['$rootScope', 'messageListService', 'urlResolver',
    function ($rootScope, messageListService, urlResolver) {

        $.connection.hub.url = urlResolver.resolveApiRoot() + '/signalr';
        var hub = $.connection.signalRHub;

        hub.client.getMessage = function (message) {
            messageListService.addMessage(message);
            $rootScope.$apply();
        }

        function startSignalR() {
            return $.connection.hub.start();
        }

        return {
            connect: function () {
                return startSignalR();
            },
            sendMessage: function (message) {
                hub.server.sendMessage(message);
            }
        };
    }]);
