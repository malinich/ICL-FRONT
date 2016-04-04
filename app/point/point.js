angular.module('point', ['ngRoute', 'http.point',  'angularFileUpload', 'nvd3'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/point', {
            templateUrl: 'point/point.html',
            controller: 'PointCtrl'
        });
    }])

    .controller('PointCtrl', ['$scope', '$urls', 'app.http', 'FileUploader', function($scope, $urls, http, FileUploader) {
        var url = $urls.resolve('points');
        $scope.uploader = new FileUploader({url: url});
        $scope.uploader.onErrorItem = errorUploadFile;
        $scope.uploader.onCompleteAll = seccuessUploadFile;

        updatePoints();

        $scope.upload = function () {
            $scope.uploader.uploadAll();
        };

        $scope.select = function () {
            var id = $scope.selected.id;
            var url = $urls.resolve('points-detail', {id: id});
            http.get(url).success(setD3Data);
        };

        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                duration: 10,

                x: function(d){return d[0];},
                y: function(d){ return d[1];},

                showValues: true,

                valueFormat: function(d){
                    return d3.format(',f')(d);
                },

                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',2f')(d);
                    }
                }
            }
        };

        function setD3Data(data) {
            var d3Data = [];
            angular.forEach(data.points, function (item) {
                d3Data.push(item)
            });
            $scope.d3Data = [{
                key: data.name,
                values: d3Data
            }];
            $scope.api.refresh();
        }

        function errorUploadFile(item, response, status, headers) {
            angular.forEach(response, function (message, name) {
                $scope.fileForm.$error[name] = message;
            });
            $scope.uploader.clearQueue();
        }

        function seccuessUploadFile() {
            updatePoints();
            clearForm()
        }

        function updatePoints() {
            http.get(url).success(function (data) {
                $scope.points = data;
            });
        }
        function clearForm() {
            $scope.fileForm.$error = {};
        }
    }]);