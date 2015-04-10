appModule.factory('navigationService', ['$location',
    function ($location) {
        return {
            inactiveActiveNav: function () {
                $('li.active').removeClass('active');
            },
            setActiveNav: function () {
                $('a[href="#' + $location.path() + '"]').parent().addClass('active');
            }
        }
    }
]);