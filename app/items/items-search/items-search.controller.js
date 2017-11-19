/**
 * @ngdoc controller
 * @name Items Search Controller
 * @description Controller for filtering items on main page
 * 
 */

(function () {

    'use strict';

    angular
        .module('app')
        .controller('ItemsSearchCtrl', ItemsSearchCtrl);

    // manually identify dependencies - minification-safe
    ItemsSearchCtrl.$inject = ['$state', '$timeout'];

    function ItemsSearchCtrl($state, $timeout) {

        const vm = this;
        vm.statusList = ['(all)', 'draft', 'approved', 'published', 'scheduled'];
        vm.searchText = $state.params.search;
        vm.filterText = $state.params.filter;

        // search
        vm.search = (search, filter) => {
            $state.go('app.search.results', { search: search, filter: filter }, { notify: false });
        }

        // delay fn for search
        let timer = 0;
        const delay = (callback, ms) => {
            clearTimeout(timer);
            timer = $timeout(callback, ms);
        }

        // search with delay
        vm.searchList = (search, filter) => {
            delay(() => { 
                vm.search(search, filter)
            }, 1000);
        }

        // filter with search param
        vm.filterList = (search, filter) => {
            vm.search(search, filter);
        }
        
    }

})();