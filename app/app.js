app.conf = {
    "api": "http://127.0.0.1:9005/api/"
};

app
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/point'});
    }])
    .constant('$urls', new app.utilize.UrlCore(app.conf));

angular.module('app',[
        'ngRoute',
        'point'
    ]);