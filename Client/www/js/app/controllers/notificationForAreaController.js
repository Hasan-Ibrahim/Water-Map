lloydApp.controller('notificationForAreaController', ['$scope', '$rootScope', 'sidebarService', 'mapService',
    function ($scope, $rootScope, sidebarService, mapService) {
        $scope.options = [{name: "Quality", value: "Quality", isSelected: false},
            {name: "Accessibility", value: "Accessibility", isSelected: false}];

        $scope.submit = function () {
            var values = [];
            for(var i in $scope.options){
                if($scope.options[i].isSelected){
                    values.push($scope.options[i].value)
                }
            }
            $rootScope.areaOptions = values;
            $scope.options = [{name: "Quality", value: "Quality", isSelected: false},
                {name: "Accessibility", value: "Accessibility", isSelected: false}];
            $scope.closeNotificationForAreaWindow();
        };

        $scope.cancel = function () {
            $scope.options = [{name: "Quality", value: "Quality", isSelected: false},
                {name: "Accessibility", value: "Accessibility", isSelected: false}];
            $rootScope.areaOptions = null;
            $scope.closeNotificationForAreaWindow();
        };
    }]);
