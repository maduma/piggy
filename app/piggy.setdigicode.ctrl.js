/* global angular */

(function() {
'use strict';

angular
    .module('piggy.page.setdigicode', ['piggy.bank'])
    .controller('setDigicodeController', setDigicodeController);
    
setDigicodeController.$inject = ['$location', '$routeParams', 'bankFactory'];    
function setDigicodeController($location, $routeParams, bank) {
    this.isInitialCode = bank.isInitialCode;
    this.setNewCode = function(oldpassword, newpassword) {
        console.log(oldpassword, newpassword);
        var result = false;
        if (this.isInitialCode) {
            result = bank.changeSecret(newpassword);
        } else {
            result = bank.changeSecret(oldpassword, newpassword);
        }
        if (result) {
            $location.path('/');
        }
    };
}

})();