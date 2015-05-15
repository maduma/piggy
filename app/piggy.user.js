/* global angular */

(function() {
'use strict';

angular
    .module('piggy.user', [])
    .factory('userFactory', userFactory);
    
function userFactory() {
    return {
        uid: null,
        isAuthenticated: false
    };
}

})();