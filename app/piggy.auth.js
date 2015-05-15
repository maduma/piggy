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
        signout: signout
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
        }
        return false;
        
    }
    
    function signout() {
        user.isAuthenticated = false;
        return;
    }
}
    
})();