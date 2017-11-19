/**
 * @ngdoc component
 * @name Items Search
 * @description Search component JS
 * 
 */

 (function () {

    'use strict';

    angular
        .module('app')

        .component('itemsSearch', {           
            templateUrl: '/app/items/items-search/items-search.tpl.html',
            controller: 'ItemsSearchCtrl',
            controllerAs: 'search'
        });

})();