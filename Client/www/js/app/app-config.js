var appConfig = (function () {
    var urlConfig = {
        localUrl: 'http://localhost:29094/',
        mohayeminPcDeployUrl: 'http://10.50.210.197:6543/'
    };

    return {
        serverUrlForBrowser: urlConfig.mohayeminPcDeployUrl,
        serverUrlForDevice: urlConfig.mohayeminPcDeployUrl
    }
}());