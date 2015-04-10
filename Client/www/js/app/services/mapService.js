lloydApp.factory('mapService',['$http',function($http){
    var appRoot = 'http://172.16.0.228:6543/';
    return {
        getSources: function(){
            return $http.get(appRoot+'WaterSourceSubscription/GetWaterSources');
        },
        getProperties: function(id){
            return $http.get(appRoot+'WaterSource/GetSourceProperties?sourceId='+id);
        },
        addFeature: function(geometry, sourceType, onSuccess){
            $.post(appRoot+"WaterSource/AddWaterSource",{
                Geometry: geometry,
                SourceType: sourceType
            }, function(data){
                onSuccess(data);
            });
        }
    }
}]);

