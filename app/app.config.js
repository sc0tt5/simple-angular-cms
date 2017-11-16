/**
 * @ngdoc config
 * @name app config
 * @description Config, run, and filter
 * 
 */

(function () {

    'use strict';

    angular
        .module('app')
        .config(configure)
        .run(stateChange)
        .filter('removeSpaces', removeSpaces);


    // manually identify dependencies - minification-safe
    configure.$inject = ['$stateProvider', '$locationProvider', '$provide'];

    function configure($stateProvider, $locationProvider, $provide) {

        $locationProvider.html5Mode(true); // exclude hash from urls

        // routes
        $stateProvider
            .state('app', {
                abstract: true,
                url: '',
                resolve: {
                    appService: ['ContentService',
                        (ContentService) => {
                            return ContentService.init(); // build json and save to local storage for demo                                
                        }]
                }
            })

            .state('app.list', {
                url: '/',
                templateUrl: 'app/items/items.tpl.html',
                resolve: {
                    contentService: ['appService',
                        (appService) => {
                            return appService; // return parent resolve
                            
                        }]
                },
                controller: 'ItemsCtrl',
                controllerAs: 'items'
            })

            .state('app.view', {
                url: 'view/:id',
                templateUrl: 'app/item-view/item-view.tpl.html',
                resolve: {
                    contentService: ['appService',
                        (appService) => {
                            return appService; // return parent resolve
                            
                        }]
                },                
                controller: 'ItemViewCtrl',
                controllerAs: 'view'
            })

            .state('app.new', {
                url: 'new',
                templateUrl: 'app/item-edit/item-edit.tpl.html',
                resolve: {
                    contentService: ['appService',
                        (appService) => {
                            return appService; // return parent resolve
                            
                        }]
                },                
                controller: 'ItemEditCtrl',
                controllerAs: 'edit'
            })

            .state('app.edit', {
                url: 'edit/:id',
                templateUrl: 'app/item-edit/item-edit.tpl.html',
                resolve: {
                    contentService: ['appService',
                        (appService) => {
                            return appService; // return parent resolve
                            
                        }]
                },                
                controller: 'ItemEditCtrl',
                controllerAs: 'edit'
            });


        // textAngular custom settings for ngMaterial
        $provide.decorator('taOptions', ['$delegate', taOptions => {  // eslint-disable-line angular/function-type
            taOptions.forceTextAngularSanitize = true;
            taOptions.keyMappings = [];
            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'p', 'pre', 'quote'],
                ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['html', 'insertImage', 'insertLink']
            ];
            taOptions.classes = {
                focussed: 'md-input-focused', // md-input-focused
                toolbar: 'ta-toolbar',
                toolbarGroup: 'ta-button-group',
                toolbarButton: '',
                toolbarButtonActive: 'active',
                disabled: 'disabled',
                textEditor: 'ta-text-editor',
                htmlEditor: 'md-input'
            };
            taOptions.defaultTagAttributes.a.target = '_blank'; // links onpen in new tab
            return taOptions; // whatever you return will be the taOptions
        }]);

        // textAngular material buttons
        $provide.decorator('taTools', ['$delegate', taTools => { // eslint-disable-line angular/function-type
            taTools.h1.display = '<md-button class="md-icon-text" aria-label="Heading 1">H1</md-button>';
            taTools.h2.display = '<md-button class="md-icon-text" aria-label="Heading 2">H2</md-button>';
            taTools.h3.display = '<md-button class="md-icon-text" aria-label="Heading 3">H3</md-button>';
            taTools.p.display = '<md-button class="md-icon-text" aria-label="Paragraph">P</md-button>';
            taTools.pre.display = '<md-button class="md-icon-text" aria-label="Pre">pre</md-button>';
            taTools.quote.display = '<md-button class="md-icon-text" aria-label="Quote"><md-icon md-font-set="material-icons">format_quote</md-icon></md-button>';
            taTools.bold.display = '<md-button class="md-icon-text" aria-label="Bold"><md-icon md-font-set="material-icons">format_bold</md-icon></md-button>';
            taTools.italics.display = '<md-button class="md-icon-text" aria-label="Italic"><md-icon md-font-set="material-icons">format_italic</md-icon></md-button>';
            taTools.underline.display = '<md-button class="md-icon-text" aria-label="Underline"><md-icon md-font-set="material-icons">format_underlined</md-icon></md-button>';
            taTools.ul.display = '<md-button class="md-icon-text" aria-label="Buletted list"><md-icon md-font-set="material-icons">format_list_bulleted</md-icon></md-button>';
            taTools.ol.display = '<md-button class="md-icon-text" aria-label="Numbered list"><md-icon md-font-set="material-icons">format_list_numbered</md-icon></md-button>';
            taTools.undo.display = '<md-button class="md-icon-text" aria-label="Undo"><md-icon md-font-set="material-icons">undo</md-icon></md-button>';
            taTools.redo.display = '<md-button class="md-icon-text" aria-label="Redo"><md-icon md-font-set="material-icons">redo</md-icon></md-button>';
            taTools.justifyLeft.display = '<md-button class="md-icon-text" aria-label="Align left"><md-icon md-font-set="material-icons">format_align_left</md-icon></md-button>';
            taTools.justifyRight.display = '<md-button class="md-icon-text" aria-label="Align right"><md-icon md-font-set="material-icons">format_align_right</md-icon></md-button>';
            taTools.justifyCenter.display = '<md-button class="md-icon-text" aria-label="Align center"><md-icon md-font-set="material-icons">format_align_center</md-icon></md-button>';
            taTools.justifyFull.display = '<md-button class="md-icon-text" aria-label="Justify"><md-icon md-font-set="material-icons">format_align_justify</md-icon></md-button>';
            taTools.clear.display = '<md-button class="md-icon-text" aria-label="Clear formatting"><md-icon md-font-set="material-icons">format_clear</md-icon></md-button>';
            taTools.html.display = '<md-button class="md-icon-text" aria-label="Show HTML"><md-icon md-font-set="material-icons">code</md-icon></md-button>';
            taTools.insertLink.display = '<md-button class="md-icon-text" aria-label="Insert link"><md-icon md-font-set="material-icons">insert_link</md-icon></md-button>';
            taTools.insertImage.display = '<md-button class="md-icon-text" aria-label="Insert photo"><md-icon md-font-set="material-icons">insert_photo</md-icon></md-button>';
            return taTools;
        }]);

    }

    // manually identify dependencies - minification-safe
    stateChange.$inject = ['$rootScope'];
    // state change 
    function stateChange($rootScope) {

        $rootScope.$on('$viewContentLoaded', function (event, toState) { // eslint-disable-line angular/no-run-logic  
            /* , toParams, fromState, fromParams */
            // update title
            $rootScope.title = toState ? (toState.controller ? `News CMS - ${toState.viewDecl.controllerAs.toUpperCase()}` : `News CMS`) : `News CMS`;
        });

    }

    // filter
    function removeSpaces() {
        return string => {
            if (!angular.isString(string)) {
                return string;
            }
            return string
                .toLowerCase()
                .split(' ')
                .map(word => word[0].toUpperCase() + word.substr(1))
                .join(' ')
                .replace(/[\s]/g, '');
        };
    }

})();