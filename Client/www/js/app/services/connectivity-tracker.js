lloydApp.constant('connectivityTracker', {
    requestCallbacks: [],
    successfulPingCallbacks: [],
    unsuccessfulPingCallbacks: [],
    addRequestingEventListener: function (callback) {
        this.requestCallbacks.push(callback)
    },
    addSuccessfulPingEventListener: function (callback) {
        this.successfulPingCallbacks.push(callback)
    },
    addUnsuccessfulPingEventListener: function (callback) {
        this.unsuccessfulPingCallbacks.push(callback);
    },
    requesting: function (requestObject) {
        for (var i = 0; i < this.successfulPingCallbacks.length; i++) {
            this.requestCallbacks[i](requestObject);
        }
    },
    successfulPing: function (requestObject, statusCode) {
        for (var i = 0; i < this.successfulPingCallbacks.length; i++) {
            this.successfulPingCallbacks[i](requestObject, statusCode);
        }
    },
    unsuccessfulPing: function (requestObject, statusCode) {
        for (var i = 0; i < this.unsuccessfulPingCallbacks.length; i++) {
            this.unsuccessfulPingCallbacks[i](requestObject, statusCode);
        }
    }
});