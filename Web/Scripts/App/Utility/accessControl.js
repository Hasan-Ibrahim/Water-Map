utilModule.factory('accessControl', [
    function () {

        var unLoggedInRestrictedUrls = {
            '/profile': true
            , '/account/changePassword': true
            , '/account/logout': true
            , '/addProduct': true
        };

        var loggedInRestrictedUrls = {
            '/account/login': true
            , '/account/register': true
        };

        var loggedInOAuthRestrictedUrls = {
            '/account/login': true
            , '/account/register': true
            , '/account/changePassword': true
        };

        var getRestrictedUrlSet = function (activeUser) {
            if (activeUser.IsAuthenticated) {
                if (activeUser.IsOAuthUser) {
                    return loggedInOAuthRestrictedUrls;
                }

                return loggedInRestrictedUrls;
            }
            return unLoggedInRestrictedUrls;
        }

        function isUrlRestricted(url, activeUser) {
            return getRestrictedUrlSet(activeUser)[url];
        }

        return {
            isUrlRestricted: isUrlRestricted
        };
    }
])