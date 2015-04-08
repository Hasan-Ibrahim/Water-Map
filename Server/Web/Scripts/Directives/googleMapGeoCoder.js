directiveModule.directive('googleMapGeoCoder', [
    function () {
        return {
            restrict: 'AE',
            scope: {
                searchText: '='
            },
            link: function (scope, elem) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(-34.397, 150.644);
                var mapOptions = {
                    zoom: 8,
                    center: latlng
                }
                var map = new google.maps.Map(elem[0], mapOptions);
                function showAddress(address) {
                    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                        }
                    });
                }
                scope.$watch("searchText", function () {
                    showAddress(scope.searchText);
                });
            }
        }
    }
]);