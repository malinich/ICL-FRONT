(function () {
    'use strict';
    var AppHttp = function ($http) {
        this.http = $http;
    };

    AppHttp.prototype.request = function(options) {
        options.headers = angular.merge({}, options.headers);
        if (angular.isObject(options.data)) {
            options.data = JSON.stringify(options.data);
        }
        return this.http(options);
    };

    AppHttp.prototype.get = function (url, params, options) {
        options = angular.merge({
            method: "GET",
            url: url
        }, options);
        if (params) {
            options.params = params;
        }
        return this.request(options);
    };

    AppHttp.$inject = ['$http'];
    app.service('app.http', AppHttp);
})();
