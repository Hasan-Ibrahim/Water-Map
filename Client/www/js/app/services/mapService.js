lloydApp.factory('mapService',['$http',function($http){
    var appRoot = 'http://10.50.210.88:6543/';
    return {
        getSources: function(){
            return $http.get(appRoot+'WaterSourceSubscription/GetWaterSources');
        }
    }
}]);
