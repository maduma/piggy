/* global angular */

(function() {
'use strict';

angular
    .module('piggy.auth', [])
    .factory('authFactory', authFactory);
    
function authFactory() {
    return {
       listAuthModules: listAuthModules 
    };
    
    function listAuthModules() {
        return ['anonymous', 'email'];
    }
}    
    
})();