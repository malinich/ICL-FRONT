(function () {
    'use strict';

    var urls = {
        'points': 'points',
        'points-detail': 'points/:id'
    };

    angular.module("http.point",[])

        .run(['$urls', function ($urls) {
            $urls.update(urls)
        }])
        .factory('GetPoints', GetPoints);


    GetPoints.$inject = ['app.http', '$urls', '$log'];

    function GetPoints(http, $urls, $log) {

        return {
            getPoint: getPoint,
            getPoints: getPoints,
            pointsFailed: pointsFailed,
            setD3Data: setD3Data
        };

        //////
        function getPoint(id) {
            var url = $urls.resolve('points-detail', {id: id});
            return http.get(url);
        }

        function getPoints() {
            var url = $urls.resolve('points');
            return http.get(url);
        }

        function pointsFailed() {
            $log.error('XHR Failed for getPoints.' + error.data);
        }

        function setD3Data(data) {
            
            var d3Data = [];
            angular.forEach(data.points, function (item) {
                d3Data.push(item)
            });
            d3Data = [{
                key: data.name,
                values: d3Data
            }];
            
            return d3Data
        }
    }

})();

