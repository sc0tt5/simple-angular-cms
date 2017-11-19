/**
 * @ngdoc controller
 * @name Items List Controller
 * @description Controller for listing items on main page
 * 
 */

(function () {

    'use strict';

    angular
        .module('app')
        .controller('ItemsListCtrl', ItemsListCtrl);

    // manually identify dependencies - minification-safe
    ItemsListCtrl.$inject = ['$stateParams', 'contentService'];

    function ItemsListCtrl($stateParams, contentService) {

        const vm = this;
        vm.content = contentService.get();

        // build grid fn
        vm.buildGrid = () => {

            vm.grid = [];

            let maxInt = 0,
                searchContent = $stateParams.search ? vm.content.filter(o => o.body.includes($stateParams.search)) : vm.content, // first apply search 
                filterContent = searchContent; // default if not filter then will just use search

            // if filter exist
            if ($stateParams.filter) {
                
                if ($stateParams.filter === 'scheduled') { // if filter equals scheduled then get published with future date

                    filterContent = searchContent.filter(o => o.status === 'published' && new Date(o.publishDate) > new Date());

                } else if ( $stateParams.filter === 'published') { // published then get todays date or earlier

                    filterContent = searchContent.filter(o => o.status === 'published' && new Date(o.publishDate) <= new Date());

                } else if ( $stateParams.filter !== '(all)') { // otherwise apply filter if not all      

                    filterContent = searchContent.filter(o => o.status === $stateParams.filter); 

                }
            } 

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