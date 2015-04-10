lloydApp.factory('mapService',['$http',function($http){
    var appRoot = 'http://10.50.210.88:6543/';
    return {
        getSources: function(){
            return $http.get(appRoot+'WaterSourceSubscription/GetWaterSources');
        },
        getProperties: function(id){
            return $http.get(appRoot+'WaterSource/GetSourceProperties?sourceId='+id);
        }
        ,login: function(){
            return $http.post(appRoot+'account/login',{
                "LoginId": "Mohayemin",
                "Password": "123",
                "RememberMe": true
            }).success(function(){
                alert('success');
            }).error(function(){
                alert("failed");
            });
        }
    }
}]);
