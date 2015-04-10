function JqHttp($q, $) {
    this.post = function (url, data) {
        var q = $q.defer();
        $.post(url, data)
            .done(function (data) {
                q.resolve({data: data});
            })
            .fail(function (error) {
                q.reject(error);
            });

        return q.promise;
    }
}

lloydApp.service('jqHttp', ['$q', '$', JqHttp]);