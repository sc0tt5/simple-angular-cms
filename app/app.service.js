/**
 * @ngdoc service
 * @name Content Service
 * @module app
 * @description Content service 
 *
 */

(function () {

    'use strict';

    angular
        .module('app')
        .factory('ContentService', ContentService);

    // manually identify dependencies - minification-safe
    ContentService.$inject = ['$http', '$window', 'Upload'];

    function ContentService($http, $window, Upload) {

        // interface
        const service = {
            get: getContent,
            set: setContent,
            init: init,
            uploadFile: uploadFileToUrl
        };
        return service;

        // set json obj to local storage for demo
        function init() {
            
            if (!localStorage.getItem('contentData')) {
                return $http.get('/app/common/mock-data/mock-content.json', { cache: true })
                    .then(setContentData)
                    .catch(message => {
                        console.log(message); // TODO send errors to db
                    });
            } else {
                return setContentData(localStorage.getItem('contentData'));                    
            }

            function setContentData(data) {

                if (data) {

                    if (!localStorage.getItem('contentData')) {
                        const dataToStore = JSON.stringify(data.data);
                        $window.localStorage.setItem('contentData', dataToStore);                        
                    } 
                    return service;

                }
                
            }

        }

        // get
        function getContent(id) {

            const contentData = JSON.parse($window.localStorage.getItem('contentData'));
            contentData.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            return id ? contentData.find(item => item.id === parseInt(id)) : contentData;

        }

        // set
        function setContent(obj) {

            const contentData = JSON.parse($window.localStorage.getItem('contentData')); // get obj

            if (!contentData.find(item => item.id === obj.id)) {
                contentData.push(obj); // add new item to array
            } else {
                contentData[contentData.findIndex(item => item.id === obj.id)] = obj; // update this item
            }

            const dataToStore = JSON.stringify(contentData); // stringify before save
            $window.localStorage.setItem('contentData', dataToStore); // save to localstorage

        }

        // upload file
        function uploadFileToUrl($files) {

            // SEE for server setup examples: https://github.com/danialfarid/ng-file-upload#server

            Upload.upload({
                url: 'app/common/mock-upload/to',
                file: $files,
            }).progress(e => {
                console.log(e); // progress
            }).then((data, status, headers, config) => {
                console.log(status); // file is uploaded successfully                
            }).catch(mssg => {
                console.log(mssg); // error (update your url to prevent this)
            });

        }

    }

})();