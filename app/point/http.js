app.http = angular.module("http.point",[]);

app.http.urls = {
    'points': 'points',
    'points-detail': 'points/:id'
};

app.http.run(['$urls', function ($urls) {
    $urls.update(app.http.urls)
}]);
