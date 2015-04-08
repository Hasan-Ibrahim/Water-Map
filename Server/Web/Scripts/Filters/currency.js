appModule.filter('currency', [
    function() {
        return function(input) {
            input = isNaN(input) ? 0 : input;
            return '$' + input;
        }
    }
]);