/* global angular */

(function() {
'use strict';

angular
    .module('piggy.bank', [])
    .factory('bankFactory', bankFactory);
    
bankFactory.$inject = ['$timeout'];
    
function bankFactory($timeout) {
    
    var secret = 'password';
    var timer = 15000; // 15 sec
    
    var bank = {
        isLocked: true,
        isInitialCode: false,
        unLock: unLock,
        lock: lock,
        changeSecret: changeSecret,
        boxes: [{
            owner: 'Bob',
            amount: 1,
            type : 'kiss'
        }]
    };
    return bank;
    
    function unLock(password) {
        if (password === secret) bank.isLocked = false;
        return $timeout(function() {
            bank.isLocked = true;            
        }, timer);
    }
    
    function lock() {
        bank.isLocked = true;
    }
    
    function changeSecret(oldPassword, newPassword) {
        if (typeof newPassword === 'undefined' && bank.isInitialCode) {
            secret = oldPassword;
            return;
        }
        if (oldPassword === secret) {
            secret = newPassword;
        }
    }
}

})();