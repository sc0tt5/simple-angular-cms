/**
 * @ngdoc controller
 * @name Card Controller
 * @description Controller for card content
 * 
 */

(function () {

    'use strict';

    angular
        .module('app')
        .controller('CardCtrl', CardCtrl);

    function CardCtrl() {

        const vm = this;

        // future dates get a different icon
        vm.isFutureDate = date => {
            const todayDate = new Date(), checkDate = new Date(date);
            return checkDate > todayDate ? true : false;
        }

    }

})();