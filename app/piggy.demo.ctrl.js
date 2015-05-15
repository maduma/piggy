/* global angular */

(function() {
'use strict';

angular
    .module('piggy.demo.ctrl', ['piggy.auth', 'piggy.user'])
    .controller('DemoController', DemoController);
    
DemoController.$inject = ['authFactory', 'userFactory']; 
    
function DemoController(auth, user) {
    this.user = user;
    this.signin = signin;
    this.signout = signout;
    
    function signin() {
        auth.signin({
            email: 'maduma@pt.lu',
            password: 'password'
        });
    }
    
    function signout() {
        auth.signout();
    }
}
    
})();