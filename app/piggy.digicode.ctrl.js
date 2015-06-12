/* global angular */

(function() {
'use strict';

angular
    .module('piggy.page.digicode', ['piggy.bank'])
    .controller('digicodeController', digicodeController);
    
digicodeController.$inject = ['$location', '$routeParams', 'bankFactory'];    
function digicodeController($location, $routeParams, bank) {
    var caller = $routeParams.caller;
    delete($routeParams.caller);
    this.access = function(password) {
        if (bank.unLock(password)) {
            $location.path(caller).search($routeParams);
        } else {
            $location.path('/').search($routeParams);
        }
    };
}

})();