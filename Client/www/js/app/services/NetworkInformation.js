function CordovaNetworkInformation($window, $rootScope, $cordovaNetwork) {
    this.isOnline = function () {
        return $cordovaNetwork.isOnline();
    };

    this.addOnlineEventListener = function (success) {
        $window.document.addEventListener('online', function () {
            success();
            $rootScope.$apply();
        }, false);
    };

    this.addOfflineEventListener = function (success) {
        $window.document.addEventListener('offline', function () {
            success();
            $rootScope.$apply();
        }, false);
    };
}

function BrowserNetworkInformation($window, $timeout) {
    var onlineCallbacks = [];
    var offlineCallbacks = [];

    function isOnline() {
        return $window.navigator.onLine;
    }

    this.isOnline = isOnline;

    this.addOnlineEventListener = function (success) {
        onlineCallbacks.push(success);
    };

    this.addOfflineEventListener = function (success) {
        offlineCallbacks.push(success);
    };

    var networkCheckingGap = 5000;
    $timeout(checkStateChange, networkCheckingGap);

    var isOnlinePrev = isOnline();

    function checkStateChange() {
        var isOnlineCurrent = isOnline();
        if (isOnlinePrev != isOnlineCurrent) {
            isOnlinePrev = isOnlineCurrent;
            if (isOnlineCurrent) {
                callEvents(onlineCallbacks);
            } else {
                callEvents(offlineCallbacks);
            }
        }
        $timeout(checkStateChange, networkCheckingGap)
    }

    function callEvents(callbacks) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks();
        }
    }
}