lloydApp.directive('detectGestures', function ($ionicGesture) {
    return {
        restrict: 'A',
        scope: {
            type: '@',
            activity: '&'
        },
        link: function (scope, element, attrs) {
            //var gestureType = attrs.gestureType;
            console.log("agsdj", scope, scope.type);
            scope.activity();
            switch (scope.type) {
                case 'swipe':
                    $ionicGesture.on('swipe', scope.activity, element);
                    break;
                case 'swiperight':
                    $ionicGesture.on('swiperight', scope.activity, element);
                    break;
                case 'swipeleft':
                    $ionicGesture.on('swipeleft', scope.activity, element);
                    break;
                case 'doubletap':
                    $ionicGesture.on('doubletap', scope.activity, element);
                    break;
                case 'scroll':
                    $ionicGesture.on('scroll', scope.activity, element);
                    break;
            }

        }

    }
});
