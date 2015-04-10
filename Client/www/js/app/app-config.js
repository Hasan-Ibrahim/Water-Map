var appConfig = (function () {
    var urlConfig = {
        localUrl: 'http://localhost:29094/',
        mohayeminPcDeployUrl: 'http://172.16.0.124:6543/'
    };

    return {
        serverUrlForBrowser: urlConfig.mohayeminPcDeployUrl,
        serverUrlForDevice: urlConfig.mohayeminPcDeployUrl
    }
}());