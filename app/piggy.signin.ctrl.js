/* global angular */

(function() {
'use strict';

angular
    .module('piggy.signin', ['piggy.auth'])
    .controller('signinController', signinController);
    
signinController.$inject = ['$location', 'authFactory'];    
function signinController($location, authenticator) {
    
    this.createEmailAccount = function(email, password, passwordBis) {
        console.log('createEmailAccount', email, password, passwordBis);
        if (password === passwordBis) {
            if (authenticator.createAccount(email, password)) {
                $location.path('/');
            }
        }
    };
    
    this.emailSignin = function(email, password) {
        console.log('emailSignin', email, password);
        var credential = {email: email, password: password};
        if (authenticator.signin(credential)) {
            $location.path('/');
        }
    };
    
    this.anonSignin = function() {
        console.log('anonSignin');
        if (authenticator.signin()) {
            $location.path('/');
        }
    };
    
    this.facebookSignin = function() {
        console.log('facebookSignin');
        if (authenticator.signin({provider: 'facebook'})) {
            $location.path('/');
        }
    };
}

})();