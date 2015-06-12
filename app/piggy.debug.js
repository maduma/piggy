/* global angular */

(function() {
'use strict';

angular
    .module('piggy.debug', ['piggy.user', 'piggy.bank'])
    .run(debug);
    
// add isRouteLoading on rootScope for displaying loading page
debug.$inject = ['$rootScope', 'userFactory', 'bankFactory'];
function debug($rootScope, user, bank) {
    $rootScope.user = user;
    $rootScope.bank = bank;
}

})();