/* global describe, it, expect, beforeEach, module, inject */

(function() {
'use strict';

describe('Auth Module - Integrator', function() {
    
    var authenticator;
    var user;
    beforeEach(module('piggy.auth', 'piggy.user'));
    beforeEach(inject(function(authFactory, userFactory) {
        authenticator = authFactory;
        user = userFactory;
    }));
    
    it('should exists a authFactory that provide an authenticator', function() {
        expect(authenticator).toBeDefined();
    });
    
    it('the authenticator sould have a signin method', function() {
        expect(typeof authenticator.signin === 'function').toBeTruthy();
    });
    
    it('the authenticator sould have a signout method', function() {
        expect(typeof authenticator.signout === 'function').toBeTruthy();
    });
    
    describe('Signin', function() {  
        
        it('signin should authenticate the user (anonymous)', function() {
            expect(authenticator.signin()).toBeTruthy();
            expect(user.isAuthenticated).toBeTruthy();
            expect(user.uid).toBe('anonymous');
        });
        
        it('signin should authenticate the user (good credential)', function() {
            var credential = {email: 'maduma@pt.lu', password : 'password'};
            expect(authenticator.signin(credential)).toBeTruthy();
            expect(user.isAuthenticated).toBeTruthy();
            expect(user.uid).toBe('maduma@pt.lu');
        });
        
        it('signin should fail (bad credential)', function() {
            var credential = {email: 'maduma@pt.lu', password : 'bad'};
            expect(authenticator.signin(credential)).toBeFalsy();
            expect(user.isAuthenticated).toBeFalsy();
        });
        
    });
    
    describe('Signout', function() {  
        
        beforeEach(function() {
            authenticator.signin();
        });
        
        it('the user sould not be authenticated', function() {
            authenticator.signout();
            expect(user.isAuthenticated).toBeFalsy();
        });
        
    });
    
});


})();