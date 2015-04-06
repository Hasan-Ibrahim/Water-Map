appModule.factory('messageListService', [
    function () {
        var _messages = [];
        return {
            getMessages: function () {
                return _messages;
            },
            addMessage: function (message) {
                _messages.push(message);
            }
        }
    }
]);
