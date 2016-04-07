(function () {
    'use strict';
    angular.module('point', ['ngRoute', 'http.point',  'angularFileUpload', 'nvd3'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/point', {
                templateUrl: 'point/point.html',
                controller: 'PointCtrl',
                controllerAs: 'vm'
            });
        }])

        .controller('PointCtrl', PointCtrl);

    PointCtrl.$inject = ['$urls', 'FileUploader', 'GetPoints'];

    function PointCtrl($urls, FileUploader, GetPoints) {
        var vm = this;
        var url = $urls.resolve('points');

        vm.api = undefined;
        vm.d3Data = undefined;
        vm.fileForm = undefined;
        vm.points = undefined;
        vm.selected = undefined;

        vm.options = app.utilize.d3_options;
        vm.select = select;
        vm.upload = upload;

        vm.uploader = new FileUploader({url: url});
        vm.uploader.onErrorItem = errorUploadFile;
        vm.uploader.onSuccessItem = seccuessUploadFile;

        activate();

        function activate() {
            GetPoints.getPoints()
                .success(function (data) {
                    vm.points = data;
                })
                .error(GetPoints.pointsFailed)
        }

        function upload () {
            vm.uploader.uploadAll();
        }

        function select() {
            var id = vm.selected.id;
            GetPoints.getPoint(id)
                .success(function (data) {
                    vm.d3Data = GetPoints.setD3Data(data);
                    vm.api.refresh()
                })
        }

        function seccuessUploadFile() {
            activate();
            clearForm()
        }

        function errorUploadFile(item, response, status, headers) {
            angular.forEach(response, function (message, name) {
                vm.fileForm.$error[name] = message;
            });
            vm.uploader.clearQueue();
        }

        function clearForm() {
            vm.fileForm.$error = {};
        }
    }
})();
