function JqHttp($q, $, loginObject) {
    this.post = function (url, data) {
        data.authentication = loginObject.loginToken;
        var q = $q.defer();
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            dataType: "json"
        }).done(function (data) {
            q.resolve({data: data});
        })
            .fail(function (error) {
                q.reject(error);
            });

        return q.promise;
    }
}

lloydApp.service('jqHttp', ['$q', '$', 'loginObject', JqHttp]);