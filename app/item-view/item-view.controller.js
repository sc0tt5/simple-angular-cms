/**
 * @ngdoc controller
 * @name Item View Controller
 * @description Controller for item view page
 * 
 */

 (function () {

    'use strict';

    angular
        .module('app')
        .controller('ItemViewCtrl', ItemViewCtrl);

    // manually identify dependencies - minification-safe
    ItemViewCtrl.$inject = ['$stateParams', '$window', 'contentService'];

    function ItemViewCtrl($stateParams, $window, contentService) {

        const vm = this;
        vm.id = $stateParams.id ? $stateParams.id : null;
        vm.contentService = contentService;
        vm.content = contentService.get($stateParams.id);

        vm.buttonClick = (x) => {
            vm.content.status = x;
            vm.contentService.set(vm.content);
        }

        // go back to previous state
        vm.goBack = function() {
            $window.history.back();
        };

    }

})();