function injectDependency(isBrowser) {
    if (isBrowser) {
        injectBrowserDependency();
    } else {
        injectCordovaDependency();
    }
}

function injectBrowserDependency() {
    lloydApp.constant('serverUrl', appConfig.serverUrlForBrowser);
    lloydApp.service('oAuthService', [MockOAuthService]);
    lloydApp.service('networkInformation', ['$window', '$timeout', BrowserNetworkInformation]);
}

function injectCordovaDependency() {
    lloydApp.constant('serverUrl', appConfig.serverUrlForDevice);
    lloydApp.service('oAuthService', ['$window', PluginOAuthService]);
    lloydApp.service('networkInformation', ['$window', '$rootScope', '$cordovaNetwork', CordovaNetworkInformation]);
}