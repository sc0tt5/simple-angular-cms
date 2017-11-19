/**
 * @ngdoc controller
 * @name Item Edit Controller
 * @description Controller for textAngular edit page
 * 
 */

 (function () {

    'use strict';

    angular
        .module('app')
        .controller('ItemEditCtrl', ItemEditCtrl);

    // manually identify dependencies - minification-safe
    ItemEditCtrl.$inject = ['$stateParams', '$mdDialog', '$window', 'contentService'];

    function ItemEditCtrl($stateParams, $mdDialog, $window, contentService) {

        var vm = this;
        vm.id = $stateParams.id ? $stateParams.id : null;
        vm.contentService = contentService;

        // set content if id
        if (vm.id) {
            vm.isNewId = false;
            vm.content = contentService.get($stateParams.id);
        }
        else {
            vm.isNewId = true;
            vm.content = {
                id: Math.max(...vm.contentService.get().map(o => o.id)) + 1,
                name: '',
                articleId: '',
                body: '',
                headline: '',
                status: 'draft',
                publishDate: ''
            }
        }

        // update article id on name change
        vm.updateArticleId = x => {
            vm.content.articleId = x;
        }

        // file upload dialog
        vm.fileUpload = (ev) => {

            $mdDialog.show({
                controller: 'ItemEditFileCtrl',
                controllerAs: 'file',
                templateUrl: 'app/item-edit/item-edit-file/item-edit-file.tpl.html',
                targetEvent: ev,
                clickOutsideToClose: true
            });

        }

        // go back to previous state
        vm.goBack = function() {
            $window.history.back();
        };

    }

})();