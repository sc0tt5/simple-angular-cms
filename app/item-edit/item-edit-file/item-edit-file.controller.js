/**
 * @ngdoc controller
 * @name Item Edit File Controller
 * @description Controller for managing uploads
 * 
 */

(function () {

    'use strict';

    angular
        .module('app')
        .controller('ItemEditFileCtrl', ItemEditFileCtrl);

    // manually identify dependencies - minification-safe
    ItemEditFileCtrl.$inject = ['$scope', '$mdDialog'];

    function ItemEditFileCtrl($scope, $mdDialog) {

        var vm = this;

        vm.cancel = () => {
            $mdDialog.cancel();
        }

        vm.upload = (file, fileName) => {
            $mdDialog.hide(); // close dialog
            fileName + '.' + file.name.split('.', 2)[1]; // set file name from file name input
            $scope.$$prevSibling.$resolve.appService.uploadFile(file); // save file
        }

    }

})();