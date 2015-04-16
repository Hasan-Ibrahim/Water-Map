var appConfig = (function () {
    var urlConfig = {
        localUrl: 'http://localhost:29094/',
        mohayeminPcDeployUrl: 'http://172.16.0.9:8765/'
    };

    return {
        serverUrlForBrowser: urlConfig.mohayeminPcDeployUrl,
        serverUrlForDevice: urlConfig.mohayeminPcDeployUrl
    }
}());