/**
 * @ngdoc controller
 * @name Items Controller
 * @description Controller for listing and filtering items on main page
 * 
 */

(function () {

    'use strict';

    angular
        .module('app')
        .controller('ItemsCtrl', ItemsCtrl);

    // manually identify dependencies - minification-safe
    ItemsCtrl.$inject = ['$scope', '$timeout', 'contentService'];

    function ItemsCtrl($scope, $timeout, contentService) {

        const vm = this;
        vm.statusList = ['(all)', 'draft', 'approved', 'published'];
        vm.content = contentService.get();

        // build grid fn
        vm.buildGrid = (search, filter) => {

            vm.grid = [];

            let maxInt = 0,
                searchContent = search ? vm.content.filter(o => o.body.includes(search)) : vm.content, // first apply search 
                filterContent = filter && filter !== '(all)' ? searchContent.filter(o => o.status === filter) : searchContent; // then apply filter

            // build rows of 3
            for (let i = 0; i < filterContent.length / 3; i++) {

                vm.grid.push([
                    filterContent[maxInt] ? filterContent[maxInt] : '',
                    filterContent[maxInt + 1] ? filterContent[maxInt + 1] : '',
                    filterContent[maxInt + 2] ? filterContent[maxInt + 2] : ''
                ]);
                maxInt = maxInt + 3;

            }

        }

        vm.buildGrid(); // display all on load


        // TODO: See deferred loading source for md-on-demand  
        // https://material.angularjs.org/latest/demo/virtualRepeat
        // https://www.coditty.com/code/how-to-add-infinite-scroll-in-angular-material-using-virtual-repeat

    }

})();