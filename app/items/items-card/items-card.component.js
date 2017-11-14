/**
 * @ngdoc component
 * @name Items Card
 * @description Card component JS
 * 
 */

 (function () {

    'use strict';

    angular
        .module('app')

        .component('itemsCard', {
            bindings: {
                content: '<'
            },
            templateUrl: '/app/items/items-card/items-card.tpl.html',
            controller: 'CardCtrl',
            controllerAs: 'card'
        });

})();