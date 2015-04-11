utilModule.factory('urlResolver', ['$window',
    function ($window) {

        function getActionUrl(controllerName, actionName, params) {
            var url = $window.location.origin + "/" + controllerName + "/" + actionName;
            url = addParams(url, params);
            return url;
        }

        function addParams(url, params) {
            if (angular.isDefined(params)) {
                if (typeof params === 'object') {
                    url += "?";
                    for (var key in params) {
                        url += ("&" + key + "=" + params[key]);
                    }

                    url = url.replace("?&", "?");
                } else {
                    url += ('/' + params);
                }
            }

            return url;
        }

        function resolveAppRoot(relativeUrl) {
            return $window.location.origin + '/app/' + relativeUrl;
        }

        function resolveApiRoot() {
            return $window.location.origin;
        }

        function resolveTemplatePath(relativePath) {
            return resolveAppRoot('Templates' + relativePath);
        }

        function resolveImageServerUploadUrl() {
            return $window.location.origin + '/content/image/uploadImage';
        }

        return {
            resolveAccount: function (actionName) {
                return getActionUrl('Account', actionName);
            },
            resolveHome: function (actionName) {
                return getActionUrl('Home', actionName);
            },
            resolveUserProfile: function (actionName, params) {
                return getActionUrl('UserProfile', actionName, params);
            },
            resolveRest: function (controller, param) {
                var relative = controller + (param ? '/' + param : '');
                return resolveAppRoot(relative);
            },
            resolveProduct: function (actionName, params) {
                return getActionUrl('Product', actionName, params);
            },
            resolveSearch: function(actionName) {
                return getActionUrl('Search', actionName);
            },
            resolveCategory: function(actionName) {
                return getActionUrl('Category', actionName);
            },
            resolveWishlist: function (actionName) {
                return getActionUrl('Wishlist', actionName);
            },
            resolveCart: function(actionName) {
                return getActionUrl('Cart', actionName);
            },
            resolveOrder: function(actionName) {
                return getActionUrl('Order', actionName);
            },
            getActionUrl: getActionUrl,
            resolveAppRoot: resolveAppRoot,
            resolveApiRoot: resolveApiRoot,
            resolveTemplatePath: resolveTemplatePath,
            resolveImageServerUploadUrl: resolveImageServerUploadUrl
        }
    }
]);

