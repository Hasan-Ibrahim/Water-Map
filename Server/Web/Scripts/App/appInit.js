appModule.run([
    '$rootScope', 'urlResolver',
    function ($rootScope, urlResolver) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next.templateUrl) {
                next.templateUrl = urlResolver.resolveTemplatePath(next.templateUrl);
            }
        });
    }
]);
