/**
 * @ngdoc module
 * @name app module
 * @requires textAngular 
 * @requires ngMaterial
 * @requires ui.router
 * @requires ngFileUpload
 * @requires ngclipboard
 * @description App module - includes all components
 * 
 */

(function(){

    'use strict';

    angular.module('app', [
        'textAngular',
        'ngMaterial',
        'ui.router',
        'ngFileUpload',
        'ngclipboard'
    ]);

})();    