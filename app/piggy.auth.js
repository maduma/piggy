/* global angular */

(function() {
'use strict';

angular
    .module('piggy.auth', ['piggy.user'])
    .factory('authFactory', authFactory);
    
   
authFactory.$inject = ['userFactory'] ; 

function authFactory(user) {
    return {
        signin: signin,
        signout: signout,
        createAccount : createAccount
    };
    
    function signin(strategy) {
        if (! strategy) {
            user.isAuthenticated = true;
            user.uid = 'anonymous';
            return true;
        } else if (strategy.email === 'maduma@pt.lu'
            && strategy.password === 'password') {
            user.isAuthenticated = true;
            user.uid = 'maduma@pt.lu';
            return true;
        } else if (strategy.provider === 'facebook') {
            user.isAuthenticated = true;
            user.uid = 'facebook0';
            return true;
        }
        return false;
        
    }
    
    function signout() {
        user.isAuthenticated = false;
        return;
    }
    
    function createAccount(account) {
        user.isAuthenticated = true;
        user.uid = account.email;
        return true;
    }
}
    
})();