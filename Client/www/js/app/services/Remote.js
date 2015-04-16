function Remote($http, serverUrl, jqHttp) {
    this.login = function (loginId, passoword, rememberMe) {
        var url = serverUrl + 'Account/Login';
        var data = {
            LoginId: loginId,
            Password: passoword,
            RememberMe: rememberMe
        };
        return jqHttp.post(url, data);
    };

    this.submitDemandSupply = function (waterDemand, waterSupply, totalConsumer, sourceId, lat, lon) {
        var url = serverUrl + 'DailySupply/AddDailyAverageWaterSupply';
        var supplyDate = new Date().toISOString().slice(0, 10);
        var location = 'POINT(' + lat + ' ' + lon + ')';
        var supply = [{
            SourceId: sourceId,
            Supply: waterSupply
        }];
        var data = {
            SupplyDate: supplyDate,
            NumberOfPeople: totalConsumer,
            Location: location,
            Supply: supply
        };
        return jqHttp.post(url, data);
    }
}

function DummyRemote($q) {
    this.login = function (loginId, passoword, rememberMe) {
        var q = $q.defer();
        q.resolve();
        return q.promise;
    };
}

lloydApp.service('remote', ['$http', 'serverUrl', 'jqHttp', Remote]);
//lloydApp.service('remote', ['$q', DummyRemote]);