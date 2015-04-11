function NetworkMonitor($rootScope, $ionicLoading, serverUrl, networkInformation, connectivityTracker) {
    function initMonitoring() {
        if (!networkInformation.isOnline()) {
            showLoading();
        }

        networkInformation.addOnlineEventListener(hideLoading);
        networkInformation.addOfflineEventListener(showLoading);
        connectivityTracker.addRequestingEventListener(handleRequesting);
        connectivityTracker.addSuccessfulPingEventListener(handleSuccessfulPing);
        connectivityTracker.addUnsuccessfulPingEventListener(handleUnsuccessfulPing);
    }

    function isServerUrl(url) {
        return url.indexOf(serverUrl) != -1;
    }

    function handleRequesting(requestObject) {
        if (isServerUrl(requestObject.url))
            showRequestingLoading();
    }

    function handleSuccessfulPing(requestObject, statusCode) {
        if (isServerUrl(requestObject.url))
            hideLoading();
    }

    function handleUnsuccessfulPing(requestObject, statusCode) {
        if (isServerUrl(requestObject.url))
            if (statusCode == 401) {
                hideLoading();
            } else {
                showUnsuccessfulPingLoading();
            }
    }

    function showRequestingLoading() {
        $ionicLoading.show({
            showDelay: 100
        });
    }

    function showUnsuccessfulPingLoading() {
        $ionicLoading.show({
            templateUrl: 'partials/unsuccessful-ping.html',
            scope: $rootScope
        });
    }

    function showLoading() {
        $ionicLoading.show({
            templateUrl: 'partials/no-internet-loading.html'
        });
    }

    function hideLoading() {
        $ionicLoading.hide();
    }

    this.initMonitoring = initMonitoring;
}

lloydApp.service('networkMonitor', ['$rootScope', '$ionicLoading', 'serverUrl', 'networkInformation', 'connectivityTracker', NetworkMonitor]);